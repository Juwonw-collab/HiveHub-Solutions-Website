import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../contexts/AuthContext';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { collection, query, onSnapshot, addDoc, updateDoc, deleteDoc, doc, Timestamp, orderBy } from 'firebase/firestore';
import { Plus, Search, MoreVertical, Edit2, Trash2, Mail, Phone, LogOut, User as UserIcon, LayoutGrid, List, CreditCard } from 'lucide-react';
import PipelineView from '../components/PipelineView';
import BankingInfo from '../components/BankingInfo';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'Lead' | 'Qualification' | 'Active' | 'Closed' | 'Solar Lead' | 'Investor Lead' | 'Developer Lead' | 'Site Survey' | 'Permitting' | 'Installation' | 'PTO' | 'Completed';
  notes: string;
  isHomeowner?: boolean;
  address?: string;
  appointmentTime?: string;
  appointmentOutcome?: 'Pending' | 'Showed' | 'No Show' | 'Rescheduled' | 'Cancelled';
  presentedAndQualified?: boolean;
  homeownerQualified?: boolean;
  signedDocuments?: boolean;
  utilityBillUrl?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export default function CRM() {
  const { user, logout } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'list' | 'banking'>('pipeline');

  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    status: 'Lead' as 'Lead' | 'Qualification' | 'Active' | 'Closed' | 'Solar Lead' | 'Investor Lead' | 'Developer Lead' | 'Site Survey' | 'Permitting' | 'Installation' | 'PTO' | 'Completed',
    notes: '',
    isHomeowner: false,
    address: '',
    appointmentTime: '',
    appointmentOutcome: 'Pending' as 'Pending' | 'Showed' | 'No Show' | 'Rescheduled' | 'Cancelled',
    presentedAndQualified: false,
    homeownerQualified: false,
    signedDocuments: false,
    utilityBillUrl: ''
  });

  useEffect(() => {
    if (!user) return;

    const contactsRef = collection(db, 'users', user.uid, 'contacts');
    const q = query(contactsRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const contactsData: Contact[] = [];
      snapshot.forEach((doc) => {
        contactsData.push({ id: doc.id, ...doc.data() } as Contact);
      });
      setContacts(contactsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `users/${user.uid}/contacts`);
    });

    return () => unsubscribe();
  }, [user]);

  const handleOpenModal = (contact?: Contact) => {
    if (contact) {
      setEditingContact(contact);
      setFormData({
        firstName: contact.firstName,
        lastName: contact.lastName,
        email: contact.email || '',
        phone: contact.phone || '',
        status: contact.status,
        notes: contact.notes || '',
        isHomeowner: contact.isHomeowner || false,
        address: contact.address || '',
        appointmentTime: contact.appointmentTime || '',
        appointmentOutcome: contact.appointmentOutcome || 'Pending',
        presentedAndQualified: contact.presentedAndQualified || false,
        homeownerQualified: contact.homeownerQualified || false,
        signedDocuments: contact.signedDocuments || false,
        utilityBillUrl: contact.utilityBillUrl || ''
      });
    } else {
      setEditingContact(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        status: 'Lead',
        notes: '',
        isHomeowner: false,
        address: '',
        appointmentTime: '',
        appointmentOutcome: 'Pending',
        presentedAndQualified: false,
        homeownerQualified: false,
        signedDocuments: false,
        utilityBillUrl: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingContact(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const contactsRef = collection(db, 'users', user.uid, 'contacts');
      const now = Timestamp.now();

      if (editingContact) {
        const docRef = doc(db, 'users', user.uid, 'contacts', editingContact.id);
        await updateDoc(docRef, {
          ...formData,
          updatedAt: now
        });
      } else {
        await addDoc(contactsRef, {
          ...formData,
          createdAt: now,
          updatedAt: now
        });
      }
      handleCloseModal();
    } catch (error) {
      handleFirestoreError(error, editingContact ? OperationType.UPDATE : OperationType.CREATE, `users/${user.uid}/contacts`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user || !window.confirm('Are you sure you want to delete this contact?')) return;
    
    try {
      const docRef = doc(db, 'users', user.uid, 'contacts', id);
      await deleteDoc(docRef);
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `users/${user.uid}/contacts/${id}`);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    if (!user) return;
    try {
      const docRef = doc(db, 'users', user.uid, 'contacts', id);
      await updateDoc(docRef, {
        status: newStatus,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${user.uid}/contacts`);
    }
  };

  const filteredContacts = contacts.filter(contact => 
    `${contact.firstName} ${contact.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Lead': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Solar Lead': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Investor Lead': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Developer Lead': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Qualification': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'Site Survey': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Permitting': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'Installation': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'PTO': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
      case 'Completed': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Active': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Closed': return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
      default: return 'bg-white/5 text-gray-400 border-white/10';
    }
  };

  return (
    <div className="min-h-screen bg-black pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">CRM Dashboard</h1>
            <p className="text-muted mt-1">Manage your leads, projects, and payouts</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-4 py-2 rounded-full glass border border-white/10">
              <img src={user?.photoURL || ''} alt="Profile" className="w-8 h-8 rounded-full bg-zinc-800" />
              <span className="text-sm font-medium text-white">{user?.displayName}</span>
            </div>
            <button 
              onClick={logout}
              className="p-2 text-muted hover:text-red-400 transition-colors rounded-full hover:bg-red-400/10"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'pipeline' ? 'bg-accent text-black' : 'text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Pipeline View
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'list' ? 'bg-accent text-black' : 'text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <List className="w-4 h-4" />
            List View
          </button>
          <button
            onClick={() => setActiveTab('banking')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === 'banking' ? 'bg-accent text-black' : 'text-muted hover:text-white hover:bg-white/5'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Banking Info
          </button>
        </div>

        {activeTab === 'banking' ? (
          <BankingInfo />
        ) : (
          <>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all"
                />
              </div>
              <button 
                onClick={() => handleOpenModal()}
                className="btn-primary py-2.5 px-6 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Contact
              </button>
            </div>

            {activeTab === 'pipeline' ? (
              <PipelineView 
                contacts={filteredContacts}
                onEdit={handleOpenModal}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ) : (
              <div className="glass rounded-2xl border border-white/10 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Contact Info</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Added</th>
                  <th className="p-4 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted">Loading contacts...</td>
                  </tr>
                ) : filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted">
                      {searchTerm ? 'No contacts found matching your search.' : 'No contacts yet. Add your first lead!'}
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => (
                    <tr key={contact.id} className="hover:bg-white/[0.02] transition-colors group">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold">
                            {contact.firstName[0]}{contact.lastName[0]}
                          </div>
                          <div>
                            <div className="font-medium text-white">{contact.firstName} {contact.lastName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          {contact.email && (
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <Mail className="w-3.5 h-3.5 text-gray-500" />
                              <a href={`mailto:${contact.email}`} className="hover:text-accent transition-colors">{contact.email}</a>
                            </div>
                          )}
                          {contact.phone && (
                            <div className="flex items-center gap-2 text-sm text-gray-300">
                              <Phone className="w-3.5 h-3.5 text-gray-500" />
                              <a href={`tel:${contact.phone}`} className="hover:text-accent transition-colors">{contact.phone}</a>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getStatusColor(contact.status)}`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm text-gray-400">
                        {contact.createdAt?.toDate().toLocaleDateString()}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleOpenModal(contact)}
                            className="p-1.5 text-gray-400 hover:text-white transition-colors rounded-md hover:bg-white/10"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleDelete(contact.id)}
                            className="p-1.5 text-gray-400 hover:text-red-400 transition-colors rounded-md hover:bg-red-400/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
            )}
          </>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl"
            >
              <h2 className="text-xl font-bold text-white mb-6">
                {editingContact ? 'Edit Contact' : 'Add New Contact'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400">First Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-400">Last Name *</label>
                    <input
                      required
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as any})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent transition-colors appearance-none"
                  >
                    <option value="Lead">Lead (General)</option>
                    <option value="Qualification">Qualification</option>
                    <option value="Solar Lead">Solar Lead</option>
                    <option value="Investor Lead">Investor Lead</option>
                    <option value="Developer Lead">Developer Lead</option>
                    <option value="Active">Active</option>
                    <option value="Site Survey">Site Survey</option>
                    <option value="Permitting">Permitting</option>
                    <option value="Installation">Installation</option>
                    <option value="PTO">PTO</option>
                    <option value="Completed">Completed</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                {['Solar Lead', 'Qualification', 'Site Survey', 'Permitting', 'Installation', 'PTO', 'Completed'].includes(formData.status) && (
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <h3 className="text-sm font-semibold text-white">Solar Project Details</h3>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="isHomeowner"
                        checked={formData.isHomeowner}
                        onChange={(e) => setFormData({...formData, isHomeowner: e.target.checked})}
                        className="w-4 h-4 rounded border-white/10 bg-black/50 text-accent focus:ring-accent focus:ring-offset-black"
                      />
                      <label htmlFor="isHomeowner" className="text-sm text-gray-300">Is Homeowner</label>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-400">Address</label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent transition-colors"
                        placeholder="123 Main St, City, State, ZIP"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-400">Appointment Time</label>
                      <input
                        type="datetime-local"
                        value={formData.appointmentTime}
                        onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-400">Appointment Outcome</label>
                      <select
                        value={formData.appointmentOutcome}
                        onChange={(e) => setFormData({...formData, appointmentOutcome: e.target.value as any})}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent transition-colors appearance-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Showed">Showed</option>
                        <option value="No Show">No Show</option>
                        <option value="Rescheduled">Rescheduled</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                    {formData.appointmentOutcome === 'Showed' && (
                      <>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="presentedAndQualified"
                            checked={formData.presentedAndQualified}
                            onChange={(e) => setFormData({...formData, presentedAndQualified: e.target.checked})}
                            className="w-4 h-4 rounded border-white/10 bg-black/50 text-accent focus:ring-accent focus:ring-offset-black"
                          />
                          <label htmlFor="presentedAndQualified" className="text-sm text-gray-300">Presented and Qualified</label>
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            id="homeownerQualified"
                            checked={formData.homeownerQualified}
                            onChange={(e) => setFormData({...formData, homeownerQualified: e.target.checked})}
                            className="w-4 h-4 rounded border-white/10 bg-black/50 text-accent focus:ring-accent focus:ring-offset-black"
                          />
                          <label htmlFor="homeownerQualified" className="text-sm text-gray-300">Homeowner Qualified</label>
                        </div>

                        {formData.homeownerQualified && (
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              id="signedDocuments"
                              checked={formData.signedDocuments}
                              onChange={(e) => setFormData({...formData, signedDocuments: e.target.checked})}
                              className="w-4 h-4 rounded border-white/10 bg-black/50 text-accent focus:ring-accent focus:ring-offset-black"
                            />
                            <label htmlFor="signedDocuments" className="text-sm text-gray-300">Signed Documents</label>
                          </div>
                        )}
                      </>
                    )}

                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-400">Utility Bill Upload URL (Optional)</label>
                      <input
                        type="url"
                        value={formData.utilityBillUrl}
                        onChange={(e) => setFormData({...formData, utilityBillUrl: e.target.value})}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent transition-colors"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-400">Notes</label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-accent transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary px-6 py-2 text-sm"
                  >
                    {editingContact ? 'Save Changes' : 'Add Contact'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
