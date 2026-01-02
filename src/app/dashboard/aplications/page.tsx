'use client'

import NavBar from "@/components/NavBar";
import quadrilhos from "../../../../public/quadrilhos.svg";
import { ChevronRight, Plus, Activity } from "lucide-react";
import Image from "next/image";
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from "next/link";
import axios from 'axios';

interface Application {
  userPlanId: number;
  name: string;
  uptime: string;
  key: string;
  image: string;
  status: 'online' | 'offline' | string;
  expiresAt: string;
  createdAt: string;
}

export default function Aplications() {
  const [isLoading, setIsLoading] = useState(true);
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('https://api.ryzescripts.com.br/api/plans/user/784856544961495110');
        if (result.data.success) {
          setApplications(result.data.data);
        }
      } catch (error) {
        console.error('Erro ao buscar aplicações:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectAplication = (app: Application) => {
    redirect("/dashboard/aplications/" + app.key);
  };

  const SkeletonLoader = () => (
    <>
      <div className="componentPage flex gap-1 font-base text-base">
        <div className="h-4 w-20 bg-white/20 rounded animate-pulse"></div>
        <ChevronRight className="w-4 opacity-20" />
        <div className="h-4 w-24 bg-white/20 rounded animate-pulse"></div>
      </div>

      {/* Skeleton de cards */}
      <div className="componentPage mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="border-2 border-[#10121A]/60 p-[20px] rounded-[12px] bg-[#07080C]/60 w-full"
          >
            <div className="flex gap-3">
              <div className="w-[64px] h-[64px] bg-white/10 rounded-[10px] animate-pulse"></div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  <div className="h-5 w-32 bg-white/20 rounded animate-pulse"></div>
                  <div className="h-6 w-20 bg-white/10 rounded-[7px] animate-pulse"></div>
                </div>
                <div className="flex gap-2 items-center mt-2">
                  <div className="w-4 h-4 bg-white/10 rounded-full animate-pulse"></div>
                  <div className="h-4 w-24 bg-white/10 rounded animate-pulse"></div>
                </div>
                <div className="h-4 w-40 bg-white/10 rounded animate-pulse mt-1"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <section
      className="absolute min-h-screen w-full bg-no-repeat bg-cover bg-center pb-20"
      style={{ backgroundImage: `url('${quadrilhos.src}')` }}
    >
      <NavBar />
      <div className="mt-[70px] w-[90%] md:w-[75%] mx-auto">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <div className="componentPage flex gap-1 font-base text-base">
              <p className="opacity-40 cursor-pointer text-white">Minha Conta</p>
              <ChevronRight className="w-4 opacity-40 cursor-pointer text-white" />
              <p className="cursor-pointer">Aplicações</p>
            </div>

            <h1 className="componentPage font-bold text-3xl md:text-4xl mt-[40px] text-white">Minhas Aplicações</h1>
            <p className="componentPage font-normal text-base md:text-lg mt-[10px] opacity-25 text-white">
              Gerencie todas as suas aplicações de bots
            </p>

            <div className="componentPage flex gap-10 text-base w-full border-b-2 border-white/5 mt-[40px] overflow-x-auto text-white">
              <p className="cursor-pointer border-b-2 pb-3 border-white">Aplicações</p>
              <Link href={'/dashboard/features'}>
                <p className="opacity-40 cursor-pointer hover:opacity-100 transition-all">Faturas</p>
              </Link>
            </div>

            <div className="componentPage flex items-center mt-[40px] flex-wrap gap-3 text-white">
              <h1 className="font-bold text-lg md:text-xl">Minhas Aplicações</h1>
              <Link href={'/#plans'} className="ml-auto">
                <button className="cursor-pointer ml-auto flex gap-2 items-center text-sm md:text-base text-black bg-white px-4 py-2 rounded-[6px] hover:opacity-70 transition-all">
                  <Plus className="w-4 h-4" /> Nova Aplicação
                </button>
              </Link>
            </div>

            <div className="componentPage mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {applications.map((app) => (
                <div
                  key={app.key}
                  onClick={() => selectAplication(app)}
                  className="border-2 border-[#10121A]/60 p-[20px] rounded-[12px] bg-[#07080C]/60 w-full hover:opacity-70 transition-all cursor-pointer"
                >
                  <div className="flex gap-3">
                    <Image
                      src={app.image}
                      width={64}
                      height={64}
                      alt={app.name}
                      className="rounded-[10px] w-[64px] h-[64px]"
                    />

                    <div className="flex-1">
                      <div className="flex flex-wrap gap-2 items-center">
                        <p className="text-white text-sm md:text-base">{app.name} - {app.key}</p>
                        <p className="bg-white/5 border border-white/10 rounded-[7px] px-3 py-1 text-white/50 text-xs md:text-sm">
                          {app.name}
                        </p>
                      </div>

                      <p className="text-white/25 mt-2 flex gap-2 items-center text-sm">
                        <Activity
                          className={`w-4 ${
                            app.status === "online" ? "text-[#00B76F]" : "text-[#FF4747]"
                          } animate-pulse`}
                        />
                        <span className={app.status === "online" ? "text-[#00B76F]" : "text-[#FF4747]"}>
                          {app.status === "online" ? "Online" : "Offline"}
                        </span>
                        - {formatRelativeTime(app.uptime)}
                      </p>

                      <p className="text-white text-sm mt-1">
                        <span className="text-white/25">Seu bot expira em</span> {formatDateToDDMMYYYY(app.expiresAt)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export function formatRelativeTime(input: number | string | Date): string {
  let ts: number;

  if (input instanceof Date) ts = input.getTime();
  else if (typeof input === "string") ts = Date.parse(input);
  else ts = input;

  if (ts < 1e11) ts *= 1000;

  const now = Date.now();
  const diff = now - ts;
  const absDiff = Math.abs(diff);
  const isPast = diff >= 0;

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  let timeStr = "";

  if (days > 0) timeStr = `${days} ${days === 1 ? "dia" : "dias"}`;
  else if (hours > 0) timeStr = `${hours} ${hours === 1 ? "hora" : "horas"}`;
  else if (minutes > 0) timeStr = `${minutes} ${minutes === 1 ? "min" : "mins"}`;
  else timeStr = `${seconds} ${seconds === 1 ? "segundo" : "segundos"}`;

  return `${isPast ? "Há" : "Daqui a"} ${timeStr}`;
}

function formatDateToDDMMYYYY(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}
