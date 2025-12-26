
'use client';

import React, { useState, useEffect, useRef } from 'react';
// Remova o next/image se não tiver a imagem Hero Black.png ainda, ou use um placeholder
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { Fingerprint, Scale, Sparkles } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

export default function ElysianStream() {
  const [isConnected, setIsConnected] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // MOUSE TRACKING
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  function handleMouseMove({ clientX, clientY }: React.MouseEvent) {
    mouseX.set(clientX);
    mouseY.set(clientY);
  }

  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isConnected]);

  const handleConnect = () => {
    setIsConnected(true);
    setTimeout(() => {
      setMessages([
        {
          id: 'init',
          role: 'assistant',
          content:
            'Ambiente seguro ativo. A jurisprudência foi carregada. \n\nEstou pronto para analisar o mérito.',
        },
      ]);
    }, 1000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: Message = { id: Date.now().toString(), role: 'user', content: input };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            'Análise preliminar indica solidez na tese. O precedente do STJ favorece a estratégia de defesa. \n\nAguardando instruções para aprofundamento.',
        },
      ]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <main
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full overflow-hidden transition-colors duration-500
        bg-zinc-50 dark:bg-[#020202]
        text-zinc-900 dark:text-zinc-100 cursor-default"
    >
      {/* CAMADA 1: FUNDO VIVO */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-zinc-200/50 dark:via-[#020202]/80 dark:to-[#020202]" />

        {/* Spotlight (Só no Dark) */}
        <motion.div
          style={{ x: springX, y: springY }}
          className="hidden dark:block absolute top-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        />
      </div>

      {/* CAMADA 2: INTERFACE */}
      <div className="relative z-10 h-full flex flex-col justify-between px-6 sm:px-16 md:px-32 py-10">
        {/* HEADER */}
        <div className="flex justify-between items-center opacity-80">
          <div className="flex items-center gap-3">
            <Scale size={18} className="text-zinc-600 dark:text-zinc-400" />
            <span className="font-serif italic text-lg font-medium text-zinc-800 dark:text-zinc-300">
              Elysian Lex
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <div className="flex gap-2 text-[10px] font-sans tracking-widest uppercase text-zinc-500">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  isConnected
                    ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]'
                    : 'bg-zinc-400'
                }`}
              />
              {isConnected ? 'Soberania Ativa' : 'Offline'}
            </div>
          </div>
        </div>

        {/* TELA DE LOGIN */}
        <AnimatePresence mode="wait">
          {!isConnected && (
            <motion.div
              key="hero-login"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
              transition={{ duration: 0.6 }}
              className="flex-1 flex flex-col items-start justify-center max-w-2xl"
            >
              <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-6 text-zinc-900 dark:text-zinc-100">
                A inteligência jurídica <br />
                <span className="italic text-zinc-500 dark:text-zinc-400">
                  finalmente soberana.
                </span>
              </h1>
              <motion.button
                onClick={handleConnect}
                whileHover={{ scale: 1.01, paddingLeft: '2.5rem' }}
                whileTap={{ scale: 0.99 }}
                className="group relative flex items-center gap-4 px-8 py-3 rounded-lg transition-all duration-300 backdrop-blur-sm
                  bg-white border border-zinc-200 shadow-sm hover:shadow-md
                  dark:bg-zinc-900/50 dark:border-zinc-800 dark:hover:border-zinc-600"
              >
                <Fingerprint
                  className="text-zinc-600 dark:text-zinc-400 group-hover:text-blue-600 dark:group-hover:text-white transition-colors"
                  size={20}
                />
                <span className="font-sans text-xs tracking-widest uppercase text-zinc-600 dark:text-zinc-300 group-hover:text-blue-900 dark:group-hover:text-white">
                  Acessar Vault
                </span>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CHAT FLOW */}
        {isConnected && (
          <motion.div
            key="chat-flow"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex-1 flex flex-col justify-end pb-12 relative"
          >
            <div className="space-y-10 overflow-y-auto scrollbar-none max-h-[75vh] pr-4 pb-8 mask-image-gradient-top">
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${
                    m.role === 'user' ? 'items-end' : 'items-start'
                  }`}
                >
                  <span className="text-[10px] font-sans text-zinc-400 mb-3 uppercase tracking-widest opacity-70">
                    {m.role === 'user' ? 'Doutor(a)' : 'Parecer Elysian'}
                  </span>
                  <div
                    className={`max-w-3xl font-serif text-xl md:text-2xl leading-relaxed
                    ${
                      m.role === 'user'
                        ? 'text-zinc-500 dark:text-zinc-400 italic text-right'
                        : 'text-zinc-900 dark:text-zinc-100 antialiased font-medium'
                    }
                  `}
                  >
                    {m.role === 'assistant' && (
                      <Sparkles className="inline-block w-4 h-4 text-blue-600 dark:text-emerald-400 mr-3 mb-1" />
                    )}
                    {m.content.split('\n').map((line, i) => (
                      <p key={i} className="mb-4">
                        {line}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="text-zinc-400 font-sans text-xs uppercase tracking-widest animate-pulse">
                  Processando...
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="w-full max-w-3xl border-b border-zinc-300 dark:border-white/10 focus-within:border-blue-500 dark:focus-within:border-white/30 transition-colors py-4">
              <input
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Digite sua solicitação jurídica..."
                className="w-full bg-transparent font-serif text-xl text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-700 focus:outline-none italic"
              />
            </div>
          </motion.div>
        )}
      </div>
    </main>
  );
}
