import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { doc, getDoc, setDoc, Timestamp } from 'firebase/firestore';
import { Building2, User, Hash, Loader2, CheckCircle2 } from 'lucide-react';

export default function BankingInfo() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    bankName: '',
    accountName: '',
    accountNumber: '',
    routingNumber: ''
  });

  useEffect(() => {
    if (!user) return;

    const fetchBankingInfo = async () => {
      try {
        const docRef = doc(db, 'users', user.uid, 'bankingInfo', 'default');
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormData({
            bankName: data.bankName || '',
            accountName: data.accountName || '',
            accountNumber: data.accountNumber || '',
            routingNumber: data.routingNumber || ''
          });
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.GET, `users/${user.uid}/bankingInfo/default`);
      } finally {
        setLoading(false);
      }
    };

    fetchBankingInfo();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setSaveSuccess(false);

    try {
      const docRef = doc(db, 'users', user.uid, 'bankingInfo', 'default');
      await setDoc(docRef, {
        ...formData,
        updatedAt: Timestamp.now()
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}/bankingInfo/default`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass p-8 rounded-2xl">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Banking Information</h2>
          <p className="text-muted">Update your direct deposit information for commission payouts.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-muted mb-2">Bank Name</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input 
                type="text" 
                value={formData.bankName}
                onChange={(e) => setFormData({...formData, bankName: e.target.value})}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="Chase Bank"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-muted mb-2">Account Holder Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
              <input 
                type="text" 
                value={formData.accountName}
                onChange={(e) => setFormData({...formData, accountName: e.target.value})}
                required
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Routing Number</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  type="text" 
                  value={formData.routingNumber}
                  onChange={(e) => setFormData({...formData, routingNumber: e.target.value})}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                  placeholder="123456789"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-2">Account Number</label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                <input 
                  type="text" 
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-accent transition-colors"
                  placeholder="000123456789"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            {saveSuccess ? (
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-5 h-5" />
                <span className="text-sm font-medium">Saved successfully!</span>
              </div>
            ) : (
              <div />
            )}
            <button 
              type="submit" 
              disabled={saving}
              className="btn-primary py-2.5 px-6 flex items-center gap-2 disabled:opacity-70"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Banking Info'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
