'use client'

import logo from '../../public/logo.png'
import Image from "next/image";
import Link from 'next/link';
import ScrollReveal from 'scrollreveal'
import { useEffect } from 'react'

export default function Footer() {
  // useEffect(() => {
    // }, [1])
    
    
    useEffect(() => {
      const initScrollReveal = async () => {
        const ScrollReveal = (await import('scrollreveal')).default
        
        ScrollReveal().reveal('.h1Footer', {
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
    <footer className="w-full bg-[#07080C] text-white py-12 border-t border-white/5">
      <div className="w-[75%] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
                <Image
                    src={logo}
                    width={75}
                    height={75}
                    alt="Logo"
                    className="h1Footer w-14 h-14 md:w-16 md:h-16"
                />
            </div>
            <div className="text-gray-400 h1Footer">
              <p>CNPJ: 12.345.678/0001-90</p>
              <p className="mt-2">© 2022 Codex apps. Todos os direitos reservados.</p>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 h1Footer">Links Rápidos</h3>
            <ul className="space-y-2">
              <li className='h1Footer'><a href="#" className="text-gray-300 hover:text-white transition-colors">Início</a></li>
              <li className='h1Footer'><a href="#" className="text-gray-300 hover:text-white transition-colors">Funcionalidades</a></li>
              <li className='h1Footer'><a href="#" className="text-gray-300 hover:text-white transition-colors">Projeto</a></li>
              <li className='h1Footer'><a href="#" className="text-gray-300 hover:text-white transition-colors">Suporte</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 h1Footer">Contato</h3>
            <div className="space-y-2">
              <a href="#" className="flex items-center text-gray-300 hover:text-white transition-colors h1Footer"><span className="mr-2">💬</span>Entrar no Discord</a>
              <a href="mailto:contato@codex.com" className="flex items-center text-gray-300 hover:text-white transition-colors h1Footer"><span className="mr-2">✉️</span>contato@codex.com</a>
            </div>
          </div>
        </div>
        <div className="h1Footer border-t border-gray-700 mt-8 pt-8 text-center md:text-left">
          <p className="text-gray-400 text-sm">Desenvolvido Com carinho por  <Link href='https://github.com/zRy4nG'>zRy4nG</Link> ❤️</p>
        </div>
      </div>
    </footer>
  );
}