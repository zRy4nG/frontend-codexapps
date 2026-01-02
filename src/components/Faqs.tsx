'use client'

import { Cpu, DollarSign, PcCase, Rocket, ShieldCheck, UserStar } from "lucide-react";
import { useEffect } from 'react'

const recursos = [
  { icon: Rocket, title: "Desempenho Otimizado", description: "Servidores de alta performance garantem que seu bot responde instantaneamente." },
  { icon: ShieldCheck, title: "Segurança Robusta", description: "Proteção avançada para manter seus dados e operações sempre seguros." },
  { icon: Cpu, title: "Controle Total", description: "Tenha acesso completo às configurações e personalizações do seu bot." },
  { icon: UserStar, title: "Suporte Dedicado", description: "Equipe especializada disponível para ajudar você a qualquer momento." },
  { icon: PcCase, title: "Uptime 24/7", description: "Garantia de funcionamento contínuo com monitoramento constante." },
  { icon: DollarSign, title: "Preços Acessíveis", description: "Planos que cabem no seu orçamento sem abrir mão da qualidade." }
];

export default function Faqs() {
    useEffect(() => {
        const initScrollReveal = async () => {
            const ScrollReveal = (await import('scrollreveal')).default
        

            ScrollReveal().reveal('.h1Faq', {
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
                <div className="h1Faq bg-[#7B61FF]/10 w-[125px] h-10 mx-auto rounded-full flex items-center justify-center">
                    <h2 className="font-medium text-[#7B61FF] text-sm sm:text-base">Recursos</h2>
                </div>
                
                <h1 className="h1Faq font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent mt-2 sm:mt-[10px] px-4">
                    Por que escolher a CodeXapps?
                </h1>
                
                <p className="h1Faq max-w-[770px] mx-auto font-normal text-base sm:text-lg lg:text-xl text-[#71717A] mt-3 sm:mt-[17px] px-2 sm:px-4">
                    Oferecemos tudo o que você precisa para manter seus bots Discord funcionando perfeitamente.
                </p>
                
                <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-8 sm:mt-12 lg:mt-[100px]">
                    {recursos.map((recurso, index) => (
                        <div 
                            key={index} 
                            className="h1Faq w-full text-center p-6 sm:p-8 rounded-lg border border-white/5 hover:border-white/6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/1"
                        >
                            <div className="flex justify-center">
                                <div className="p-3 rounded-xl bg-[#7B61FF]/10">
                                    <recurso.icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-8 lg:h-8 text-[#7B61FF]" />
                                </div>
                            </div>
                            
                            <h1 className="font-bold text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent mt-4 sm:mt-6">
                                {recurso.title}
                            </h1>
                            
                            <p className="font-normal text-sm sm:text-base text-[#71717A] mt-3 sm:mt-4 leading-relaxed max-w-[280px] mx-auto">
                                {recurso.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="sm:hidden mt-[70px]">
                    <div className="space-y-5">
                        {recursos.map((recurso, index) => (
                            <div 
                                key={index} 
                                className="h1Faq text-center p-4 rounded-lg border border-white/5 bg-white/2"
                            >
                                <div className="flex items-center justify-center gap-3">
                                    <div className="p-2 rounded-lg bg-[#7B61FF]/10">
                                        <recurso.icon className="w-5 h-5 text-[#7B61FF]" />
                                    </div>
                                    <div className="text-left flex-1">
                                        <h1 className="font-bold text-sm bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                                            {recurso.title}
                                        </h1>
                                        <p className="font-normal text-xs text-[#71717A] mt-1 leading-relaxed">
                                            {recurso.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    </>
  );
}