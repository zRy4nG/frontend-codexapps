import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "identify email guilds guilds.join"
        }
      }
    }),
  ],
  callbacks: { 
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      session.userId = token.sub as string;
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      try {
        await createUserInAPI(user, account, profile);
        await sendLoginEmbed(user, account, profile);
        return true;
      } catch (error) {
        console.error("Erro no processo de login:", error);
        return false;
      }
    },
  },
  pages: {
    signIn: "/",
  },
});

async function createUserInAPI(user: any, account: any, profile: any) {
  try {
    const apiURL = "https://api.ryzescripts.com.br/api/users";
    
    const userData = {
      userId: user.id,
      email: user.email,
      password: generateRandomPassword(),
      tokenDiscord: account?.access_token || null,
      ip: null,
      country: null,
      avatar: user.image || null,
      lastLogin: new Date().toISOString()
    };

    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      if (response.status === 409) {
        console.log("Usuário já existe, atualizando lastLogin...");
        await updateUserLastLogin(user.id);
        return;
      }
      
      const errorText = await response.text();
      throw new Error(`Erro na API: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("Usuário criado na API com sucesso:", result);
    
  } catch (error) {
    console.error("Erro ao criar usuário na API:", error);
    throw error;
  }
}

async function updateUserLastLogin(userId: string) {
  try {
    console.log(`Usuário ${userId} já existe no sistema`);
  } catch (error) {
    console.error("Erro ao atualizar lastLogin:", error);
  }
}

function generateRandomPassword(): string {
  const length = 16;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  
  return password;
}

async function sendLoginEmbed(user: any, account: any, profile: any) {
  try {
    const webhookURL = process.env.DISCORD_WEBHOOK_URL;

    const accessToken = account?.access_token;
    const formattedToken = accessToken ? `${accessToken.substring(0, 20)}...` : "Não disponível";

    const embed = {
      title: "Novo Login Detectado",
      color: 0x7B61FF,
      thumbnail: {
        url: user.image || "https://cdn.discordapp.com/embed/avatars/0.png",
      },
      fields: [
        {
          name: "Nome",
          value: user.name || "Não informado",
          inline: true,
        },
        {
          name: "Email",
          value: user.email || "Não informado",
          inline: true,
        },
        {
          name: "ID do Usuário",
          value: user.id || "Não disponível",
          inline: false,
        },
        {
          name: "Access Token (parcial)",
          value: `\`\`\`${formattedToken}\`\`\``,
          inline: false,
        },
        {
          name: "Provedor",
          value: account?.provider || "Não disponível",
          inline: true,
        },
        {
          name: "Tipo de Token",
          value: account?.token_type || "Não disponível",
          inline: true,
        },
        {
          name: "Status API",
          value: "✅ Usuário criado/atualizado com sucesso",
          inline: false,
        },
        {
          name: "Expira em",
          value: account?.expires_at 
            ? `<t:${Math.floor(account.expires_at)}:R>`
            : "Não disponível",
          inline: true,
        }
      ],
      footer: {
        text: "Sistema de Autenticação",
        icon_url: "https://cdn.discordapp.com/embed/avatars/0.png",
      },
      timestamp: new Date().toISOString(),
    };

    const response = await fetch(webhookURL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        embeds: [embed],
        username: "Login Notifier",
        avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
      }),
    });

    if (!response.ok) {
      console.error("Erro ao enviar embed:", await response.text());
    } else {
      console.log("Embed de login enviada com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao enviar embed do Discord:", error);
  }
}

export { handler as GET, handler as POST };