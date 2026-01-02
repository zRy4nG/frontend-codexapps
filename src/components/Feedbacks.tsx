'use client'

import { Star } from "lucide-react";
import Image from "next/image"
import { useEffect } from 'react'

const feedbacks = [
  {
    stars: 5,
    name: 'Lucas Mendes',
    cargo: 'Fundador, TechStore',
    descricao: 'O bot de vendas da Codex revolucionou nosso e-commerce no Discord. As vendas aumentaram 300% em apenas 2 meses! A integração com múltiplas formas de pagamento foi crucial.',
    image: 'https://i.imgur.com/qlY2lU9_d.png?maxwidth=520&shape=thumb&fidelity=high'
  },
  {
    stars: 5,
    name: 'Ana Silva',
    cargo: 'Gerente de Comunidade, GameHub',
    descricao: 'O atendimento automatizado com IA da Codex reduziu nosso tempo de resposta de horas para segundos. Nossa comunidade está muito mais satisfeita e engajada.',
    image: 'https://i.imgur.com/qlY2lU9_d.png?maxwidth=520&shape=thumb&fidelity=high'
  },
  {
    stars: 5,
    name: 'Ricardo Oliveira',
    cargo: 'CEO, RPX Games',
    descricao: 'O bot para Roblox superou todas as expectativas! A integração perfeita com a plataforma e o sistema de vendas automatizado transformou nosso negócio.',
    image: 'https://i.imgur.com/qlY2lU9_d.png?maxwidth=520&shape=thumb&fidelity=high'
  },
  {
    stars: 5,
    name: 'Camila Santos',
    cargo: 'Diretora, Digital Solutions',
    descricao: 'A personalização completa que a Codex oferece é incrível. Conseguimos criar uma experiência única para nossos clientes que nenhum outro bot proporcionava.',
    image: 'https://i.imgur.com/qlY2lU9_d.png?maxwidth=520&shape=thumb&fidelity=high'
  },
  {
    stars: 5,
    name: 'Pedro Costa',
    cargo: 'Head of Operations, E-Sports BR',
    descricao: 'A segurança e estabilidade dos bots da Codex são excepcionais. Operamos 24/7 sem nenhum problema técnico. Suporte técnico rápido e eficiente!',
    image: 'https://i.imgur.com/qlY2lU9_d.png?maxwidth=520&shape=thumb&fidelity=high'
  },
  {
    stars: 5,
    name: 'Mariana Lima',
    cargo: 'Community Manager, NFT Universe',
    descricao: 'Os relatórios detalhados e analytics da Codex nos deram insights valiosos sobre o comportamento dos usuários. Ferramenta essencial para qualquer comunidade séria.',
    image: 'https://i.imgur.com/qlY2lU9_d.png?maxwidth=520&shape=thumb&fidelity=high'
  }
];

export default function Feedbacks() {
  useEffect(() => {
      const initScrollReveal = async () => {
        const ScrollReveal = (await import('scrollreveal')).default
        
        ScrollReveal().reveal('.h1Feedbacks', {
            delay: 100,
            origin: 'top',
            distance: '-50px',
            duration: 800,
            scale: 1,
            easing: 'ease',
            reset: true
        });

    }

    initScrollReveal()
  }, [])


  return (
    <>
      <section className="w-full bg-[#07080C] mt-16 sm:mt-24 lg:mt-[160px] border-t border-white/5">
        <div className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] mx-auto text-center pt-16 sm:pt-20 lg:pt-[130px] px-4 sm:px-6">
          <div className="h1Feedbacks bg-[#7B61FF]/10 w-[125px] h-10 mx-auto rounded-full flex items-center justify-center">
            <h2 className="font-medium text-[#7B61FF] text-sm sm:text-base">Feedbacks</h2>
          </div>
          <h1 className="h1Feedbacks font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent mt-2 sm:mt-[10px]">
            O que nossos clientes dizem
          </h1>
          <p className="h1Feedbacks max-w-[770px] mx-auto font-normal text-base sm:text-lg text-[#71717A] mt-3 sm:mt-[17px] px-4">
            Veja como a mginex está transformando negócios e impulsionando resultados reais.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 lg:mt-[60px]">
            {feedbacks.map((feed, index) => (
              <div 
                key={index} 
                className="h1Feedbacks w-full border border-[#10121A]/50 p-4 sm:p-6 rounded-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl text-left"
              >
                <div className="flex gap-1 sm:gap-2">
                  {[...Array(feed.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[#EAB308] fill-current"/>
                  ))}
                </div>

                <p className="mt-3 sm:mt-[10px] font-normal text-sm sm:text-base text-[#71717A] leading-relaxed">
                  {feed.descricao}
                </p>

                <div className="w-full h-[1px] sm:h-[2px] bg-white/5 mt-3 sm:mt-[10px]"></div>

                <div className="flex items-center mt-4 sm:mt-[19px]">
                  <Image
                    src={feed.image}
                    width={48}
                    height={48}
                    alt={`Foto de ${feed.name}`}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                  />
                  <div className="ml-3 sm:ml-4">
                    <h1 className="font-normal text-sm sm:text-base text-white">{feed.name}</h1>
                    <p className="font-normal text-xs sm:text-base text-[#71717A]">{feed.cargo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}