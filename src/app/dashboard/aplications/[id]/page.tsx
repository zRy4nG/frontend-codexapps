'use client'

import { redirect } from 'next/navigation';
import quadrilhos from '../../../../../public/quadrilhos.svg'
import NavBar from '@/components/NavBar';
import { ChevronRight, Activity, Power, Clock, Server, Users, Settings, Trash2, Save } from 'lucide-react'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import Image from 'next/image';
import axios from 'axios';
import { useSession } from 'next-auth/react';

interface BotInfo {
  userPlanId: number;
  name: string;
  uptime: string;
  key: string;
  image: string;
  status: 'online' | 'offline' | string;
  expiresAt: string;
  createdAt: string;
}

interface ApiResponse {
  success: boolean;
  data: BotInfo[];
  message: string;
}

interface Props {
  params: Promise<{ id?: string }>;
}

type TabType = 'servers' | 'moderators' | 'customize' | 'info';

export default function ApplicationsPage({ params }: Props) {
  const [resolvedParams, setResolvedParams] = useState<{ id?: string } | null>(null);
  const [infosBOT, setInfosBOT] = useState<BotInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('info');
  const [botName, setBotName] = useState('');
  const [botToken, setBotToken] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingToken, setIsEditingToken] = useState(false);

  const { data: session, status } = useSession();

  const userId = 
    session?.user?.id || 
    session?.user?.userId || 
    session?.userId ||
    (session as any)?.id;

  useEffect(() => {
    const fetchData = async () => {
      const resolved = await params;
      setResolvedParams(resolved);

      if (!resolved?.id) {
        redirect('/');
        return;
      }

      if (status === 'unauthenticated') {
        redirect('/auth/signin');
        return;
      }

      if (status === 'loading') {
        return;
      }

      if (status === 'authenticated') {
        try {
          const apiUrl = `https://api.ryzescripts.com.br/api/plans/${userId}/apps/${resolved.id}`;
          const result = await axios.get<ApiResponse>(apiUrl);

          if (result.data.success && result.data.data.length > 0) {
            const botData = result.data.data[0];
            setInfosBOT(botData);
            setBotName(botData.name);
            setBotToken('MTI:MDUZNzgSMDEyMzOfNjc4QGhijKLMnOpOfStUVWxYzAbCdEfGhijKIMnOpOfStUVWxYz');
          } else {
            redirect('/dashboard/aplications');
          }
        } catch (error) {
          redirect('/dashboard/aplications');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [params, status, userId]);

  const handleSaveName = async () => {
    try {
      console.log('Salvando nome:', botName);
      setIsEditingName(false);
    } catch (error) {
      console.error('Erro ao salvar nome:', error);
    }
  };

  const handleSaveToken = async () => {
    try {
      console.log('Salvando token:', botToken);
      setIsEditingToken(false);
    } catch (error) {
      console.error('Erro ao salvar token:', error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const calculateUptime = (uptimeString: string) => {
    const uptimeDate = new Date(uptimeString);
    const now = new Date();
    const diffMs = now.getTime() - uptimeDate.getTime();
    
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}min`;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'servers':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-white text-xl font-semibold mb-4">Configurações de Servidores</h3>
              <p className="text-white/25 mb-6">Gerencie os servidores onde sua aplicação está hospedada.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 className="text-white font-semibold mb-3">Servidor Principal</h4>
                <div className="space-y-2">
                  <p className="text-white/25 text-sm">Status: <span className="text-[#00B76F]">Online</span></p>
                  <p className="text-white/25 text-sm">Uptime: 24h 30min</p>
                  <p className="text-white/25 text-sm">Localização: São Paulo, BR</p>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 className="text-white font-semibold mb-3">Servidor de Backup</h4>
                <div className="space-y-2">
                  <p className="text-white/25 text-sm">Status: <span className="text-red-500">Offline</span></p>
                  <p className="text-white/25 text-sm">Uptime: 0h 0min</p>
                  <p className="text-white/25 text-sm">Localização: Rio de Janeiro, BR</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'moderators':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-white text-xl font-semibold mb-4">Gerenciar Moderadores</h3>
              <p className="text-white/25 mb-6">Adicione ou remova moderadores da sua aplicação.</p>
            </div>
            
            <div className="bg-white/5 rounded-lg p-6 border border-white/10">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-white font-semibold">Lista de Moderadores</h4>
                <button className="bg-white/10 text-white px-4 py-2 rounded-[6px] hover:bg-white/20 transition-all text-sm">
                  Adicionar Moderador
                </button>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                  <div>
                    <p className="text-white font-medium">João Silva</p>
                    <p className="text-white/25 text-sm">joao.silva@email.com</p>
                  </div>
                  <button className="text-red-500 hover:text-red-400 transition-all text-sm">
                    Remover
                  </button>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-white/5 rounded">
                  <div>
                    <p className="text-white font-medium">Maria Santos</p>
                    <p className="text-white/25 text-sm">maria.santos@email.com</p>
                  </div>
                  <button className="text-red-500 hover:text-red-400 transition-all text-sm">
                    Remover
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'customize':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-white text-xl font-semibold mb-4">Personalizar Aplicação</h3>
              <p className="text-white/25 mb-6">Personalize as configurações e aparência da sua aplicação.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 className="text-white font-semibold mb-3">Configurações Gerais</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm block mb-2">Prefixo do Bot</label>
                    <input 
                      type="text" 
                      defaultValue="!" 
                      className="bg-white/10 border border-white/20 rounded-[6px] px-3 py-2 text-white w-full"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm block mb-2">Linguagem</label>
                    <select className="bg-white/10 border border-white/20 rounded-[6px] px-3 py-2 text-white w-full">
                      <option value="pt-BR">Português (Brasil)</option>
                      <option value="en-US">English (US)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-6 border border-white/10">
                <h4 className="text-white font-semibold mb-3">Aparência</h4>
                <div className="space-y-4">
                  <div>
                    <label className="text-white text-sm block mb-2">Cor do Tema</label>
                    <input 
                      type="color" 
                      defaultValue="#5865F2" 
                      className="bg-white/10 border border-white/20 rounded-[6px] px-3 py-2 text-white w-full h-10"
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm block mb-2">Avatar do Bot</label>
                    <input 
                      type="file" 
                      className="bg-white/10 border border-white/20 rounded-[6px] px-3 py-2 text-white w-full text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'info':
      default:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-white text-xl font-semibold mb-4">Informações da Aplicação</h3>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-2">Nome da Aplicação</h4>
              <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                {isEditingName ? (
                  <input
                    type="text"
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-[6px] px-3 py-2 text-white w-full md:w-auto flex-1"
                  />
                ) : (
                  <p className="text-white/25 text-sm flex-1">{botName}</p>
                )}
                <button 
                  onClick={isEditingName ? handleSaveName : () => setIsEditingName(true)}
                  className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-[6px] hover:bg-white/20 transition-all text-sm"
                >
                  {isEditingName ? <Save className="w-4" /> : null}
                  {isEditingName ? 'Salvar' : 'Editar Nome'}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <h4 className="text-white font-medium mb-2">Token da Aplicação</h4>
              <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                {isEditingToken ? (
                  <input
                    type="text"
                    value={botToken}
                    onChange={(e) => setBotToken(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-[6px] px-3 py-2 text-white w-full md:w-auto flex-1 font-mono text-sm"
                  />
                ) : (
                  <p className="text-white/25 text-sm flex-1 break-all font-mono">{botToken}</p>
                )}
                <button 
                  onClick={isEditingToken ? handleSaveToken : () => setIsEditingToken(true)}
                  className="flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-[6px] hover:bg-white/20 transition-all text-sm"
                >
                  {isEditingToken ? <Save className="w-4" /> : null}
                  {isEditingToken ? 'Salvar' : 'Atualizar Token'}
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
    return null;
  }

  if (loading || status === 'loading') {
    return (
      <div>
        <section className="absolute min-h-screen w-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url('${quadrilhos.src}')` }}>
          <NavBar />
          <div className="mt-[70px] w-[90%] md:w-[75%] mx-auto">
            <div className="flex justify-center items-center min-h-[200px]">
              <p className="text-white">Carregando...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!infosBOT) {
    redirect('/dashboard/aplications');
    return null;
  }
  
  const { id } = resolvedParams!;
  
  if (!id) {
    redirect('/');
    return null;
  }

  return (
    <div>
      <section className="absolute min-h-screen w-full bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url('${quadrilhos.src}')` }}>
        <NavBar />

        <div className="mt-[70px] w-[90%] md:w-[75%] mx-auto pb-10">
          <div className="componentPage flex gap-1 font-base text-base flex-wrap">
            <p className="opacity-40 cursor-pointer">Minha Conta</p>
            <ChevronRight className="w-4 opacity-40 cursor-pointer" />
            <Link href="/dashboard/aplications/" className="opacity-40 cursor-pointer hover:opacity-100 transition-all">
              Aplicações
            </Link>
            <ChevronRight className="w-4 opacity-40 cursor-pointer" />
            <p className="cursor-pointer">{infosBOT.name} - {infosBOT.key}</p>
          </div>

          <div className="rounded-[12px] bg-[#07080C]/60 w-full mt-10 p-6">
            <div className="flex flex-col md:flex-row gap-5 items-start md:items-center">
              <Image
                src={infosBOT.image}
                width={96}
                height={96}
                className="rounded-[10px] w-[96px] h-[96px] object-cover"
                alt={infosBOT.name}
                onError={(e) => {
                  e.currentTarget.src = 'https://i.imgur.com/qlY2lU9.png';
                }}
              />

              <div className="flex-1">
                <div className="flex flex-wrap gap-2 items-center">
                  <p className="text-white text-2xl md:text-3xl font-bold">{infosBOT.name} - {infosBOT.key}</p>
                </div>

                <p className="text-white text-sm mt-1">
                  <span className="text-white/25">Seu bot expira em</span> {formatDate(infosBOT.expiresAt)}
                </p>

                <p className="text-white/25 mt-2 flex gap-2 items-center text-sm">
                  <Activity 
                    className={`w-4 ${
                      infosBOT.status === 'online' ? 'text-[#00B76F] animate-pulse' : 'text-red-500'
                    }`} 
                  />
                  
                  <span className={
                    infosBOT.status === 'online' ? 'text-[#00B76F]' : 'text-red-500'
                  }>
                    {infosBOT.status === 'online' ? 'online' : 'offline'}
                  </span>
                  
                  {infosBOT.status === 'online' && (
                    <>- {calculateUptime(infosBOT.uptime)}</>
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[12px] bg-[#07080C]/60 w-full mt-6 border border-[#10121A]/60 p-6 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <div>
              <div className='flex gap-2 items-center'>
                <Clock className='w-4 text-white/25'/>
                <p className='text-white/25 text-sm'>Expira em</p>
              </div>

              <p className="text-white text-2xl md:text-3xl font-bold mt-[8px]">{formatDate(infosBOT.expiresAt)}</p>

              <p className="text-white/25 mt-2 flex gap-2 items-center text-base mt-[8px]">Tempo restante: <span className='text-white font-bold'>{calculateUptime(infosBOT.uptime)}</span></p>
            </div>

            <div className='flex flex-wrap gap-2 w-full md:w-auto justify-center md:justify-start'>
              <button className='flex gap-2 bg-white text-black px-3 py-2 rounded-[6px] hover:opacity-90 transition-all cursor-pointer text-sm md:text-base'>
                <Power className='w-4 md:w-5'/>
                Iniciar Aplicação
              </button>
              <button className='flex gap-2 bg-white/2 text-white/80 px-3 py-2 rounded-[6px] border border-white/5 hover:bg-white/10 transition-all cursor-pointer text-sm md:text-base'>
                <Power className='w-4 md:w-5'/>
                Reiniciar
              </button>
              <button className='flex gap-2 bg-white/2 text-white/80 px-3 py-2 rounded-[6px] border border-white/5 hover:bg-white/10 transition-all cursor-pointer text-sm md:text-base'>
                <Power className='w-4 md:w-5'/>
                Parar
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <button 
              onClick={() => setActiveTab('servers')}
              className={`rounded-[12px] border p-4 transition-all cursor-pointer ${
                activeTab === 'servers' 
                  ? 'bg-[#07080C]/80 border-white/20' 
                  : 'bg-[#07080C]/60 border-[#10121A]/60 hover:bg-[#07080C]/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Server className="w-6 h-6 text-white/25" />
                <h3 className="text-white text-lg font-semibold">Servidores</h3>
              </div>
              <p className="text-white/25 mt-2 text-sm">Gerencie os servidores da sua aplicação</p>
            </button>

            <button 
              onClick={() => setActiveTab('moderators')}
              className={`rounded-[12px] border p-4 transition-all cursor-pointer ${
                activeTab === 'moderators' 
                  ? 'bg-[#07080C]/80 border-white/20' 
                  : 'bg-[#07080C]/60 border-[#10121A]/60 hover:bg-[#07080C]/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-white/25" />
                <h3 className="text-white text-lg font-semibold">Moderadores</h3>
              </div>
              <p className="text-white/25 mt-2 text-sm">Configure os moderadores do bot</p>
            </button>

            <button 
              onClick={() => setActiveTab('customize')}
              className={`rounded-[12px] border p-4 transition-all cursor-pointer ${
                activeTab === 'customize' 
                  ? 'bg-[#07080C]/80 border-white/20' 
                  : 'bg-[#07080C]/60 border-[#10121A]/60 hover:bg-[#07080C]/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-white/25" />
                <h3 className="text-white text-lg font-semibold">Personalizar</h3>
              </div>
              <p className="text-white/25 mt-2 text-sm">Personalize as configurações do bot</p>
            </button>
          </div>

          <div className="rounded-[12px] bg-[#07080C]/60 w-full mt-6 border border-[#10121A]/60 p-6">
            <div className="mb-6">
              <h2 className="text-white text-xl font-semibold">Configurações</h2>
              <p className="text-white/25 text-sm mt-1">
                {activeTab === 'servers' && 'Gerencie os servidores da sua aplicação'}
                {activeTab === 'moderators' && 'Configure os moderadores do bot'}
                {activeTab === 'customize' && 'Personalize as configurações do bot'}
                {activeTab === 'info' && 'Gerencie as informações básicas da sua aplicação'}
              </p>
            </div>
            
            {renderTabContent()}
          </div>

          <div className="rounded-[12px] bg-red-500/10 border border-red-500/20 w-full mt-6 p-6">
            <div className="flex items-center gap-3 mb-3">
              <Trash2 className="w-6 h-6 text-red-500" />
              <h3 className="text-white text-xl font-semibold">Zona de Perigo</h3>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-2">Excluir Aplicação</h4>
              <p className="text-white/25 text-sm mb-4">Esta ação não pode ser desfeita. Todos os dados serão perdidos.</p>
              <button className="bg-red-500 text-white px-4 py-2 rounded-[6px] hover:bg-red-600 transition-all text-sm">
                Excluir Aplicação
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}