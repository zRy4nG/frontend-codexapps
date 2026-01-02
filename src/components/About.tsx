'use client'

import Link from "next/link";
import { useEffect } from 'react'

export default function About() {
  // useEffect(() => {
    // }, [1])
    
    
  useEffect(() => {
      const initScrollReveal = async () => {
        const ScrollReveal = (await import('scrollreveal')).default
        
        ScrollReveal().reveal('.h1About', {
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
    <section className="w-full h-[474px] bg-[#06070B] mt-16 sm:mt-24 lg:mt-[160px] border-t border-white/5">
        <div className="w-[90%] sm:w-[85%] md:w-[80%] lg:w-[70%] mx-auto text-center pt-12 sm:pt-16 lg:pt-[130px] px-4">
            <h1 className="h1About font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent mt-2 sm:mt-[10px]">
                Pronto para hospedar seu bot?
            </h1>
            <p className="h1About max-w-[770px] mx-auto font-normal text-base sm:text-lg text-[#71717A] mt-3 sm:mt-[17px] px-2">
                Junte-se à comunidade Codex e leve seu bot Discord para o próximo nível.
            </p>

            <Link href="/">
                <button className="h1About bg-white w-[249px] h-[44px] text-black font-semibold rounded-[8px] mt-[29px] cursor-pointer hover:scale-105 transition-transform">Começar agora</button>
            </Link>
        </div>
      </section>
    </>
  );
}