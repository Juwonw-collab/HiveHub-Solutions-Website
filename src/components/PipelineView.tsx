import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MoreVertical, Edit2, Trash2, Clock } from 'lucide-react';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  notes: string;
  isHomeowner?: boolean;
  address?: string;
  appointmentTime?: string;
  utilityBillUrl?: string;
  createdAt: any;
  updatedAt: any;
}

interface PipelineViewProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, newStatus: string) => void;
}

const PIPELINE_STAGES = [
  { id: 'Lead', label: 'New Lead', color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
  { id: 'Qualification', label: 'Qualification', color: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400' },
  { id: 'Site Survey', label: 'Site Survey', color: 'bg-purple-500/10 border-purple-500/20 text-purple-400' },
  { id: 'Permitting', label: 'Permitting', color: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' },
  { id: 'Installation', label: 'Installation', color: 'bg-orange-500/10 border-orange-500/20 text-orange-400' },
  { id: 'PTO', label: 'PTO', color: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' },
  { id: 'Completed', label: 'Completed', color: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' }
];

export default function PipelineView({ contacts, onEdit, onDelete, onStatusChange }: PipelineViewProps) {
  
  const handleDragStart = (e: React.DragEvent, contactId: string) => {
    e.dataTransfer.setData('contactId', contactId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    const contactId = e.dataTransfer.getData('contactId');
    if (contactId) {
      onStatusChange(contactId, stageId);
    }
  };

  return (
    <div className="flex gap-6 overflow-x-auto pb-8 snap-x">
      {PIPELINE_STAGES.map((stage) => {
        const stageContacts = contacts.filter(c => c.status === stage.id || (stage.id === 'Lead' && ['Solar Lead', 'Investor Lead', 'Developer Lead', 'Active'].includes(c.status)));
        
        return (
          <div 
            key={stage.id} 
            className="flex-shrink-0 w-80 flex flex-col snap-start"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <div className={`px-4 py-3 rounded-t-xl border-t border-x ${stage.color} flex items-center justify-between`}>
              <h3 className="font-semibold">{stage.label}</h3>
              <span className="bg-black/20 px-2 py-0.5 rounded-full text-xs font-bold">
                {stageContacts.length}
              </span>
            </div>
            
            <div className="flex-1 bg-white/5 border border-white/10 rounded-b-xl p-3 flex flex-col gap-3 min-h-[500px]">
              {stageContacts.map((contact) => (
                <motion.div
                  layoutId={contact.id}
                  key={contact.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e as any, contact.id)}
                  className="bg-zinc-900/80 border border-white/10 p-4 rounded-lg cursor-grab active:cursor-grabbing hover:border-accent/50 transition-colors group"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-white">{contact.firstName} {contact.lastName}</h4>
                    <div className="relative">
                      <button className="text-gray-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                      <div className="absolute right-0 mt-2 w-32 bg-zinc-800 border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                        <button 
                          onClick={() => onEdit(contact)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                        >
                          <Edit2 className="w-4 h-4" /> Edit
                        </button>
                        <button 
                          onClick={() => onDelete(contact.id)}
                          className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300 flex items-center gap-2"
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {contact.address && (
                    <p className="text-xs text-muted mb-3 line-clamp-1">{contact.address}</p>
                  )}
                  
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    {contact.email && (
                      <a href={`mailto:${contact.email}`} className="hover:text-accent flex items-center gap-1">
                        <Mail className="w-3 h-3" /> Email
                      </a>
                    )}
                    {contact.phone && (
                      <a href={`tel:${contact.phone}`} className="hover:text-accent flex items-center gap-1">
                        <Phone className="w-3 h-3" /> Call
                      </a>
                    )}
                  </div>
                  
                  {contact.appointmentTime && (
                    <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs text-accent">
                      <Clock className="w-3.5 h-3.5" />
                      {new Date(contact.appointmentTime).toLocaleDateString()}
                    </div>
                  )}
                </motion.div>
              ))}
              
              {stageContacts.length === 0 && (
                <div className="flex-1 flex items-center justify-center text-sm text-muted border-2 border-dashed border-white/5 rounded-lg">
                  Drop here
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
