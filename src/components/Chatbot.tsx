import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, MessageSquare } from 'lucide-react';
import { useBranding } from '../BrandingContext';
import { GoogleGenAI } from '@google/genai';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Message = {
  role: 'user' | 'model';
  text: string;
};

export default function Chatbot() {
  const { mascotUrl } = useBranding();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hello! I am the HiveHub assistant. How can I help you today? If you are looking to set an appointment, I can guide you to our booking page.' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<any>(null);

  useEffect(() => {
    // Initialize chat session
    chatRef.current = ai.chats.create({
      model: 'gemini-3.1-pro-preview',
      config: {
        systemInstruction: 'You are a helpful assistant for HiveHub Solutions, a capital brokerage and investment marketplace. Your primary goal is to help users understand our services and guide them to set an appointment. You can direct them to the "/book" page to schedule a consultation. Be professional, concise, and helpful. Do not use markdown formatting unless necessary.',
      }
    });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    try {
      // Add a temporary model message for streaming
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      const responseStream = await chatRef.current.sendMessageStream({ message: userText });
      
      let fullText = '';
      for await (const chunk of responseStream) {
        fullText += (chunk as any).text || '';
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullText;
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = 'Sorry, I encountered an error. Please try again later or visit our booking page directly.';
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-28 right-6 w-80 sm:w-96 h-[500px] bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-black border-b border-white/10 flex justify-between items-center">
              <div className="flex items-center gap-3">
                {mascotUrl ? (
                  <img src={mascotUrl} alt="Mascot" className="w-8 h-8 object-contain" referrerPolicy="no-referrer" />
                ) : (
                  <MessageSquare className="w-6 h-6 text-accent" />
                )}
                <h3 className="text-white font-medium">HiveHub Assistant</h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-muted hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.role === 'user' ? 'bg-accent text-black rounded-tr-sm' : 'bg-white/10 text-white rounded-tl-sm'}`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && messages[messages.length - 1].role === 'user' && (
                <div className="flex justify-start">
                  <div className="max-w-[80%] p-3 rounded-2xl bg-white/10 text-white rounded-tl-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-black border-t border-white/10">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-accent transition-colors"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-accent text-black p-2 rounded-xl hover:bg-accent/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-20 h-20 rounded-full bg-zinc-900 border border-white/10 shadow-2xl flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        {mascotUrl ? (
          <img src={mascotUrl} alt="Chat" className="w-16 h-16 object-contain" referrerPolicy="no-referrer" />
        ) : (
          <MessageSquare className="w-10 h-10 text-accent" />
        )}
      </button>
    </>
  );
}
