'use client'

import { ArrowDown } from "lucide-react";
import Link from "next/link";
import { useEffect } from 'react'

export default function Header() {
  useEffect(() => {
    const initScrollReveal = async () => {
      const ScrollReveal = (await import('scrollreveal')).default
      
      ScrollReveal().reveal('.h1Title', {
        delay: 100,
        origin: 'top',
        distance: '-50px',
        duration: 800,
        scale: 1,
        easing: 'ease',
        reset: true
      });

      ScrollReveal().reveal('.pHeader2', {
        delay: 100,
        origin: 'top',
        distance: '-50px',
        duration: 1100,
        scale: 1,
        easing: 'ease',
        reset: true
      });
    }

    initScrollReveal()
  }, [])

  return (
    <>
        <header className="pHeader2 w-full bg-transparent">
          <div className="w-[80%] max-w-[700px] ml-auto mr-auto text-center mt-[200px]">
            <h1 className="h1Title font-bold text-6xl bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent z-1">
              Encontre o seu bot perfeito com a <span className="font-bold text-6xl bg-gradient-to-r from-[#7939FF] to-[#5931b1] bg-clip-text text-transparent">Codex</span>
            </h1>
            <p className="ml-auto mr-auto font-normal text-xl text-[#71717A] mt-[17px]">A solução ideal para transformar o seu servidor Discord em uma ferramenta poderosa e eficiente.</p>
            <Link href="/">
              <button className="bg-white bHeader w-[249px] h-[44px] text-black font-semibold rounded-[8px] mt-[29px] cursor-pointer hover:scale-105 transition-transform">Começar agora</button>
            </Link>
            <div className="arrowHead w-full flex items-center justify-center mt-30">
              <ArrowDown className="animate-bounce" />
            </div>
          </div>
        </header>
    </>
  );
}