'use client'
import { BadgeCheck, Crown, Star, Zap } from "lucide-react";
import ScrollReveal from 'scrollreveal'
import { useEffect, useState } from 'react'

// Define the TypeScript interface for the plan object
interface Plan {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  color: string;
  recursos: string[];
  slogan?: string;
  sloganIcon?: any;
}

const planos = [
  { 
    id: 1,
    nome: "Bot de Vendas", 
    descricao: "Faça vendas automáticas no conforto da sua casa.", 
    preco: "8,00", 
    color: "#3B82F6",
    slogan: "Mais vendido",
    sloganIcon: Star,
    recursos: ["Personalização Completa", "Sistema de Vendas Automatizado", "Integração com Mercado Pago, Efí, Pagbank e Nubank", "Sistema de Vendas Semi-Automática", "Relatórios de Vendas", "Segurança de Dados"] 
  },
  { 
    id: 2,
    nome: "Bot de Tickets IA", 
    descricao: "Atendimento automatizado com IA, personalização total e gestão eficiente.", 
    preco: "6,00", 
    color: "#00A63E",
    slogan: "Beta",
    sloganIcon: Crown,
    recursos: ["Sistema de Atendimento com IA Inteligente", "Personalização Completa de Interface e Fluxo", "Controle de Atendimento por Horário Comercial", "Gestão Automática de Tickets com Filtros Avançados", "Logs Detalhados e Histórico de Atendimento", "Respostas Rápidas e Templates Personalizáveis"] 
  },
  { 
    id: 3,
    nome: "Bot Roblox", 
    descricao: "Edição Limitada para vendas de Robux e Gamepasses com integração total ao Roblox.", 
    preco: "18,00", 
    color: "#7939FF",
    slogan: "Edição Limitada",
    sloganIcon: Zap,
    recursos: ["Integração com Roblox e Loja Automática", "Personalização Completa com Sistema de Tema", "Venda de Gamepasses e Robux Facilitada", "Organização Inteligente de Produtos", "Integração com Mercado Pago e Efi", "Sistema de Vendas Automatizado e Semi-Automática"] 
  }
];

export default function Products() {
  const [plans, setPlans] = useState<Plan[]>(planos)

  useEffect(() => {
    const initScrollReveal = async () => {
      const ScrollReveal = (await import('scrollreveal')).default
      
      ScrollReveal().reveal('.h1Products', {
        delay: 100,
        origin: 'top',
        distance: '50px',
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
        <section id="plans" className="w-full bg-[#07080C] mt-[160px] border-t border-white/5">
          <div className="w-[90%] md:w-[80%] lg:w-[70%] ml-auto mr-auto text-center pt-[130px]">
            <div className="bg-[#7B61FF]/10 w-[125px] h-[40px] ml-auto mr-auto rounded-full flex items-center justify-center h1Products">
              <h2 className="font-medium text-[#7B61FF]">Planos</h2>
            </div>
            <h1 className="h1Products font-bold text-3xl sm:text-4xl lg:text-5xl bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent mt-[10px]">Escolha o plano ideal para você</h1>
            <p className="h1Products max-w-[770px] ml-auto mr-auto font-normal text-lg sm:text-xl text-[#71717A] mt-[17px]">Planos flexíveis para bots de todos os tamanhos, com recursos que crescem com suas necessidades.</p>
            
            <div className="flex flex-col lg:flex-row justify-center gap-8 mt-[100px]">
              {plans.map((plano, index) => (
                <div 
                  key={plano.id} 
                  className="h1Products ml-auto mr-auto w-full sm:w-[400px] lg:w-[337px] border p-6 sm:p-[25px] rounded-[8px] transition-all duration-300 hover:scale-105 hover:shadow-2xl text-left"
                  style={{ 
                    borderColor: plano.color,
                    boxShadow: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 25px 50px -12px ${plano.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div className="w-[156px] h-[30px] flex items-center justify-center ml-[-17px] mt-[-40px] gap-2 rounded-[7px] border" style={{ background: `linear-gradient(to right, ${plano.color}, ${plano.color}40)`, borderColor: plano.color }}>
                    <BadgeCheck className="w-[16px] text-white"/>
                    <p className="font-normal text-white text-base">Premium</p>
                  </div>
                  <h1 className="font-bold text-2xl bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent mt-3">{plano.nome}</h1>
                  <p className="ml-auto mr-auto font-normal text-base text-[#71717A] mt-[8px]">{plano.descricao}</p>
                  <h1 className="font-bold text-4xl bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent mt-[10px]">R$ {plano.preco}<span className="text-lg font-normal">/Mês</span></h1>
                  <button className="w-full h-[40px] font-medium rounded-[6px] mt-[19px] hover:opacity-80 transition-all cursor-pointer text-white" style={{ backgroundColor: plano.color }}>Adquirir plano</button>
                  <div className="w-full h-[2px] bg-white/5 mt-[14px]"></div>
                  <div className="mt-[5px]">
                    {plano.recursos.map((recurso, idx) => (
                      <div key={idx} className="flex mt-[10px]">
                        <BadgeCheck style={{ color: plano.color }}/>
                        <p className="font-normal text-base text-[#71717A] ml-[8px]">{recurso}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
    </>
  );
}