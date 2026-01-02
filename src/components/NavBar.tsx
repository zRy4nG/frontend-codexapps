'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { signIn, signOut, useSession } from 'next-auth/react'
import img from "../../public/logo.png"
import { ChevronRight, Menu, X, LogOut, LayoutDashboard, Settings, ArrowBigDown } from 'lucide-react'
import Image from "next/image"
import Link from 'next/link'

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { data: session } = useSession()
  const pathname = usePathname()

  const menuItems = [
    { name: 'Inicio', path: '/' },
    { name: 'Planos', path: '/planos' },
    { name: 'Serviços', path: '/servicos' },
    { name: 'Tutoriais', path: '/tutoriais' },
    { name: 'Discord', path: '/discord' }
  ]

  useEffect(() => {
    const initScrollReveal = async () => {
      const ScrollReveal = (await import('scrollreveal')).default
      
      ScrollReveal().reveal('.component', {
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


  const isActiveRoute = (path: string) => {
    if (path === '/') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const handleLogin = () => {
    signIn('discord')
  }

  const handleLogout = () => {
    signOut()
    setIsUserMenuOpen(false)
  }

  return (
    <section className="component w-full h-[64px] bg-amber-5 border-b border-[#14161E] bg-[#07080C]">
      <div className="w-[90%] md:w-[75%] h-full ml-auto mr-auto flex items-center justify-between">
        <Link href={"/"}>
          <Image
            src={img}
            width={65}
            height={65}
            alt="Logo"
            className="w-12 h-12 md:w-16 md:h-16"
          />
        </Link>

        <div className="hidden md:flex gap-[35px] items-center">
          {menuItems.map((item) => (
            <h2
              key={item.name}
              className={`cursor-pointer font-medium hover:text-white transition-all ${
                  isActiveRoute(item.path)
                    ? 'bg-[#10121A] pr-3 pl-3 pt-1 pb-1 rounded-[3px] text-white'
                    : 'text-white/45'
                }`}
              >
              {item.name}
            </h2>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          {session?.user ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center rounded-[10px] p-2  hover:bg-[#10121A] transition-all group"
              >
                <Image
                  src={session.user.image || '/default-avatar.png'}
                  width={35}
                  height={35}
                  alt={session.user.name || 'User'}
                  className="rounded-[10px]"
                />

                <ChevronRight className='rotate-90 opacity-30 group-hover:opacity-100 transition-all ml-2' />
              </button>

              {isUserMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#10121A] border border-[#14161E] rounded-lg shadow-lg z-50 py-2">
                    <div className="px-4 py-2 border-b border-[#14161E]">
                      <p className="text-white font-medium text-sm">{session.user.name}</p>
                      <p className="text-white/60 text-xs">{session.user.email}</p>
                    </div>
                    
                    <button 
                      onClick={() => window.location.href = '/dashboard/aplications'}
                      className="flex items-center gap-3 w-full px-4 py-2 text-white/80 hover:bg-[#7B61FF] hover:text-white transition-all text-sm"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </button>
                    
                    <button 
                      onClick={() => window.location.href = '/dashboard/aplications'}
                      className="flex items-center gap-3 w-full px-4 py-2 text-white/80 hover:bg-[#7B61FF] hover:text-white transition-all text-sm"
                    >
                      <Settings size={16} />
                      Admin
                    </button>
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-white/80 hover:bg-red-500 hover:text-white transition-all text-sm"
                    >
                      <LogOut size={16} />
                      Desconectar
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div 
              onClick={handleLogin}
              className="w-[162px] h-[40px] bg-[#7B61FF] rounded-full flex gap-2 items-center justify-center text-[#07080C] hover:opacity-80 cursor-pointer transition-all"
            >
              <h2 className="font-medium">Fazer Login</h2>
              <ChevronRight size={20} />
            </div>
          )}
        </div>

        <div className="flex md:hidden items-center gap-4">
          {session?.user ? (
            <div className="relative">
              <button
                onClick={toggleUserMenu}
                className="flex items-center p-2 rounded-lg hover:bg-[#10121A] transition-all"
              >
                <Image
                  src={session.user.image || '/default-avatar.png'}
                  width={36}
                  height={36}
                  alt={session.user.name || 'User'}
                  className="rounded-full"
                />
              </button>

              {isUserMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-48 bg-[#10121A] border border-[#14161E] rounded-lg shadow-lg z-50 py-2">
                    <div className="px-4 py-2 border-b border-[#14161E]">
                      <p className="text-white font-medium text-sm">{session.user.name}</p>
                      <p className="text-white/60 text-xs">{session.user.email}</p>
                    </div>
                    
                    <button 
                      onClick={() => window.location.href = '/dashboard'}
                      className="flex items-center gap-3 w-full px-4 py-2 text-white/80 hover:bg-[#7B61FF] hover:text-white transition-all text-sm"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </button>
                    
                    <button 
                      onClick={() => window.location.href = '/admin'}
                      className="flex items-center gap-3 w-full px-4 py-2 text-white/80 hover:bg-[#7B61FF] hover:text-white transition-all text-sm"
                    >
                      <Settings size={16} />
                      Admin
                    </button>
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2 text-white/80 hover:bg-red-500 hover:text-white transition-all text-sm"
                    >
                      <LogOut size={16} />
                      Desconectar
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div 
              onClick={handleLogin}
              className="w-40 h-10 bg-[#7B61FF] rounded-full flex items-center justify-center text-[#07080C] hover:opacity-80 cursor-pointer transition-all"
            >
              <h2 className="font-medium text-sm">Fazer Login</h2>
              <ChevronRight size={18} />
            </div>
          )}

          <button
            onClick={toggleMenu}
            className="text-white p-2"
            aria-label="Abrir menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className={`fixed top-[64px] left-0 right-0 bg-[#07080C] border-b border-[#14161E] z-2 md:hidden transform transition-all duration-300 ease-in-out ${
        isMenuOpen 
          ? 'translate-y-0 opacity-100' 
          : '-translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className="p-4 space-y-4">
          {menuItems.map((item) => (
            <h2
              key={item.name}
              className={`cursor-pointer font-medium hover:text-white transition-all p-3 rounded-lg ${
                isActiveRoute(item.path)
                  ? 'bg-[#10121A] text-white'
                  : 'text-white/45'
              }`}
              onClick={toggleMenu}
            >
              {item.name}
            </h2>
          ))}
        </div>
      </div>

      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden mt-[63px]"
          onClick={toggleMenu}
        />
      )}
    </section>
  )
}