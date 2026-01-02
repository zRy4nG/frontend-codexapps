'use client'

import { useState } from 'react';
import { Cpu, PcCase, Rocket, ShieldCheck, UserStar, ChevronDown, ChevronUp } from "lucide-react";
import { useEffect } from 'react'

const recursos = [
  { 
    icon: Rocket, 
    title: "Que tipos de produtos posso vender na Mginex?", 
    description: "Servidores de alta performance garantem que seu bot responde instantaneamente. Utilizamos tecnologia de ponta para garantir a melhor experiência possível." 
  },
  { 
    icon: ShieldCheck, 
    title: "Posso personalizar completamente o meu site?", 
    description: "Sistema de segurança avançado com criptografia de ponta a ponta. Protegemos seus dados e garantimos a privacidade de todas as informações." 
  },
  { 
    icon: Cpu, 
    title: "A Codex fornece relatórios e estatísticas de vendas? ", 
    description: "Tenha controle completo sobre suas configurações e personalizações. Interface intuitiva para gerenciar todas as funcionalidades do seu bot." 
  },
  { 
    icon: UserStar, 
    title: "Como a Codex protege meus dados e a privacidade da minha loja?", 
    description: "Equipe de suporte especializada disponível 24/7 para ajudar com qualquer dúvida ou problema que possa surgir." 
  },
  { 
    icon: PcCase, 
    title: "A Codex integra com outras plataformas e serviços?", 
    description: "Garantia de 99.9% de uptime com monitoramento constante. Seu bot sempre disponível quando seus usuários precisarem." 
  },
];

export default function Accordion() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const isItemOpen = (index: number) => openItems.includes(index);

  // useEffect(() => {
    // }, [1])
    
  useEffect(() => {
      const initScrollReveal = async () => {
        const ScrollReveal = (await import('scrollreveal')).default
        
        ScrollReveal().reveal('.h1Accordion', {
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
        <div className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] mx-auto text-center pt-12 sm:pt-16 lg:pt-[130px] px-4">
          <div className="h1Accordion bg-[#7B61FF]/10 w-[125px] h-10 mx-auto rounded-full flex items-center justify-center">
            <h2 className="font-medium text-[#7B61FF] text-sm sm:text-base">Dúvidas</h2>
          </div>
          <h1 className="h1Accordion ont-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent mt-2 sm:mt-[10px]">
            Perguntas Frequentes
          </h1>
          <p className="h1Accordion max-w-[770px] mx-auto font-normal text-base sm:text-lg text-[#71717A] mt-3 sm:mt-[17px] px-2">
            Encontre respostas para perguntas comuns dos clientes sobre nossa plataforma.
          </p>

          <div className="mx-auto mt-8 sm:mt-12 lg:mt-[100px]">
            {recursos.map((recurso, index) => (
              <div 
                key={index} 
                className="h1Accordion border border-white/10 rounded-lg mb-4 overflow-hidden transition-all duration-300 hover:border-white/20 ml-auto mr-auto"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-6 text-left hover:bg-white/5 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="flex-shrink-0">
                      <recurso.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#7B61FF]" />
                    </div>
                    <h3 className="font-medium text-lg sm:text-xl bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                      {recurso.title}
                    </h3>
                  </div>
                  <div className="flex-shrink-0">
                    {isItemOpen(index) ? (
                      <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6 text-[#7B61FF]" />
                    ) : (
                      <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-[#7B61FF]" />
                    )}
                  </div>
                </button>

                <div 
                  className={`transition-all duration-300 overflow-hidden ${
                    isItemOpen(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-4 sm:p-6 pt-0 sm:pt-0 border-t border-white/5">
                    <div className="flex items-start gap-4 sm:gap-6">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0 opacity-0" aria-hidden="true" />
                      <p className="font-normal text-sm sm:text-base text-[#71717A] leading-relaxed text-left mt-3">
                        {recurso.description}
                      </p>
                    </div>
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