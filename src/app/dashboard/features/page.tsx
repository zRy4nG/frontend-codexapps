'use client'

import NavBar from "@/components/NavBar";
import quadrilhos from "../../../../public/quadrilhos.svg";
import { ChevronRight, Plus, Search, Calendar, Filter, RefreshCw } from "lucide-react";
import Image from "next/image";
import { redirect } from 'next/navigation';
import ScrollReveal from 'scrollreveal'
import { useEffect, useState } from 'react'
import Link from "next/link";

export default function Invoices() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ScrollReveal().reveal('.componentPage', {
    //     delay: 100,
    //     duration: 1200,
    //     opacity: 0,
    //     distance: '0px',
    //     scale: 1,
    //     easing: 'ease',
    //     reset: true
    // });

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [])

  const invoices = [
    {
      id: 1,
      key: "66x16x9x21x89223f8bfb0b0",
      name: "Bot de teste - ticketv2",
      description: "Bot de Tickets IA",
      date: "05 de outubro de 2025 às 15:51",
      status: "Vencido",
      daysLeft: null,
      image: "https://i.imgur.com/qlY2lU9.png"
    },
    {
      id: 2,
      key: "78127d9eb6b834efb77fb80",
      name: "MusicBot Pro",
      description: "Bot de Música",
      date: "15 de dezembro de 2025 às 10:30",
      status: "70 dias restantes",
      daysLeft: 70,
      image: "https://i.imgur.com/qlY2lU9.png"
    }
  ];

  const selectInvoice = function(id: string) {
    if (id) {
      redirect("/dashboard/invoices/" + id)
    }
  }

  const handleRenew = function(e: React.MouseEvent, invoiceId: number) {
    e.stopPropagation();
    console.log("Renovar fatura:", invoiceId);
  }

  const SkeletonLoader = () => (
    <>
      <div className="componentPage flex gap-1 font-base text-base ">
        <div className="h-4 w-20 bg-white/20 rounded animate-pulse"></div>
        <ChevronRight className="w-4 opacity-20" />
        <div className="h-4 w-16 bg-white/20 rounded animate-pulse"></div>
      </div>

      <div className="componentPage mt-[40px]">
        <div className="h-8 w-32 bg-white/20 rounded animate-pulse"></div>
        <div className="h-5 w-64 bg-white/10 rounded animate-pulse mt-2"></div>
      </div>

      <div className="componentPage flex gap-10 text-base w-full border-b-2 border-white/5 mt-[40px]">
        <div className="h-6 w-24 bg-white/20 rounded animate-pulse pb-3"></div>
        <div className="h-6 w-16 bg-white/20 rounded animate-pulse pb-3"></div>
      </div>

      <div className="componentPage mt-8">
        <div className="h-6 w-32 bg-white/20 rounded animate-pulse mb-4"></div>
        <div className="relative">
          <div className="w-full h-12 bg-white/10 rounded-[8px] animate-pulse"></div>
        </div>
      </div>

      <div className="componentPage mt-8 space-y-4">
        {[1, 2].map((item) => (
          <div
            key={item}
            className="border-2 border-[#10121A]/60 p-5 rounded-[12px] bg-[#07080C]/60 w-full"
          >
            <div className="flex gap-4 items-start">
              <div className="w-[50px] h-[50px] bg-white/10 rounded-[8px] animate-pulse flex-shrink-0"></div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                  <div className="h-5 w-40 bg-white/20 rounded animate-pulse"></div>
                  <div className="h-6 w-24 bg-white/10 rounded animate-pulse"></div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm mb-3">
                  <div className="h-6 w-32 bg-white/10 rounded animate-pulse"></div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                  <div className="h-4 w-48 bg-white/10 rounded animate-pulse"></div>
                  <div className="h-9 w-24 bg-white/10 rounded-[8px] animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="componentPage mt-8 pb-20">
        <div className="h-6 w-20 bg-white/20 rounded animate-pulse mb-4"></div>
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-9 w-24 bg-white/10 rounded-[8px] animate-pulse"></div>
          ))}
        </div>
      </div>
    </>
  );

  return (
    <>
      <section
        className="absolute min-h-screen w-full bg-no-repeat bg-cover bg-center"
        style={{ backgroundImage: `url('${quadrilhos.src}')` }}
      >
        <NavBar />

        <div className="mt-[70px] w-[90%] md:w-[75%] mx-auto">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              <div className="componentPage flex gap-1 font-base text-base text-white ">
                <p className="opacity-40 cursor-pointer">Minha Conta</p>
                <ChevronRight className="w-4 opacity-40 cursor-pointer" />
                <p className="cursor-pointer">Faturas</p>
              </div>

              <h1 className="componentPage font-bold text-3xl md:text-4xl mt-[40px] text-white">Faturas</h1>
              <p className="componentPage font-normal text-base md:text-lg mt-[10px] opacity-25 text-white">
                Gerencia suas faturas e renovações
              </p>

              <div className="componentPage flex gap-10 text-base w-full border-b-2 border-white/5 mt-[40px] overflow-x-auto text-white">
                <Link href={'/dashboard/aplications'}>
                  <p className="opacity-40 cursor-pointer pb-3 whitespace-nowrap hover:opacity-100 transition-all">Aplicações</p>
                </Link>
                <p className="cursor-pointer border-b-2 pb-3 border-white whitespace-nowrap">Faturas</p>
              </div>

              <div className="componentPage mt-8 text-white">
                <h2 className="font-bold text-lg md:text-xl mb-4">Aplicações</h2>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Buscar por nome da fatura"
                    className="w-full bg-[#10121A]/60 border border-white/10 rounded-[8px] pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-white/30 transition-all"
                  />
                </div>
              </div>

              <div className="componentPage mt-8 space-y-4">
                {invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="border-2 border-[#10121A]/60 p-5 rounded-[12px] bg-[#07080C]/60 w-full"
                  >
                    <div className="flex gap-4 items-start">
                      <Image
                        src={invoice.image}
                        width={50}
                        height={50}
                        alt={invoice.name}
                        className="rounded-[8px] w-[50px] h-[50px] flex-shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                          <h3 className="text-white font-medium text-base truncate">
                            {invoice.name}
                          </h3>
                          <span className="text-white/60 text-sm bg-white/5 px-3 py-1 rounded-[6px] inline-block">
                            {invoice.description}
                          </span>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 text-sm text-white/60">
                          <span className={`px-3 py-1 rounded-[6px] text-xs ${
                            invoice.daysLeft 
                              ? "bg-[#00B76F]/20 text-[#00B76F] border border-[#00B76F]/30" 
                              : "bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/10"
                          }`}>
                            {invoice.status}
                          </span>
                        </div>

                        <div className="mt-1 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
                          <span className="text-white/40 text-sm font-mono truncate">
                            #{invoice.key}......
                          </span>
                          
                          <button 
                            onClick={(e) => handleRenew(e, invoice.id)}
                            className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-[8px] px-4 py-2 text-white/60 hover:bg-white/10 hover:text-white transition-all text-sm whitespace-nowrap"
                          >
                            <RefreshCw className="w-4 h-4" />
                            Renovar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="componentPage mt-8 pb-20">
                <h2 className="font-bold text-lg md:text-xl mb-4">Filtros</h2>
                
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-[8px] px-4 py-2 text-white/60 hover:bg-white/10 hover:text-white transition-all">
                    <Filter className="w-4 h-4" />
                    Adicionais
                  </button>
                  
                  <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-[8px] px-4 py-2 text-white/60 hover:bg-white/10 hover:text-white transition-all">
                    <Calendar className="w-4 h-4" />
                    Renovar
                  </button>
                  
                  <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-[8px] px-4 py-2 text-white/60 hover:bg-white/10 hover:text-white transition-all">
                    <Filter className="w-4 h-4" />
                    Adicionais
                  </button>
                  
                  <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-[8px] px-4 py-2 text-white/60 hover:bg-white/10 hover:text-white transition-all">
                    <Calendar className="w-4 h-4" />
                    Renovar
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}