import React, { useState, useEffect } from 'react';
import { auth, db, loginWithGoogle, logout, handleFirestoreError, OperationType } from '../firebase';
import { doc, setDoc, getDoc, Timestamp } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { X, Upload, LogIn, LogOut, Loader2, Image as ImageIcon } from 'lucide-react';

export default function LogoUploader({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [user, setUser] = useState<User | null>(null);
  const [logoUrl, setLogoUrl] = useState('');
  const [mascotUrl, setMascotUrl] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isOpen && user) {
      const fetchBranding = async () => {
        setLoading(true);
        try {
          const docRef = doc(db, 'settings', 'global');
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setLogoUrl(data.logoUrl || '');
            setMascotUrl(data.mascotUrl || '');
          }
        } catch (err) {
          console.error("Error fetching branding:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchBranding();
    }
  }, [isOpen, user]);

  const isAdmin = user?.email?.toLowerCase() === 'juwonw@hivehubsolutions.net';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'mascot') => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 300000) { // 300KB each to allow both logo and mascot in one 1MB document (Base64 adds ~33%)
        setError("File too large. Please use an image under 300KB to ensure both logo and mascot fit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'logo') setLogoUrl(reader.result as string);
        else setMascotUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const [loggingIn, setLoggingIn] = useState(false);

  const handleLogin = async () => {
    setLoggingIn(true);
    setError(null);
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error("Login error:", err);
      if (err.code === 'auth/popup-blocked') {
        setError("Popup blocked. Please allow popups for this site.");
      } else if (err.code === 'auth/unauthorized-domain') {
        setError("Domain not authorized. Add this URL to Firebase Console > Auth > Settings > Authorized domains.");
      } else {
        setError(err.message || "Failed to sign in.");
      }
    } finally {
      setLoggingIn(false);
    }
  };

  const handleSave = async () => {
    if (!isAdmin) return;
    setSaving(true);
    setError(null);
    try {
      await setDoc(doc(db, 'settings', 'global'), {
        logoUrl,
        mascotUrl,
        updatedAt: Timestamp.now(),
        updatedBy: user?.uid
      });
      onClose();
    } catch (err: any) {
      if (err.message?.includes('exceeds the maximum allowed size')) {
        setError("Total branding data is too large. Please use smaller images (under 300KB each).");
      } else {
        handleFirestoreError(err, OperationType.WRITE, 'settings/global');
        setError("Failed to save branding. Check permissions.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass w-full max-w-lg p-8 rounded-3xl relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-6 right-6 text-muted hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Branding Settings</h2>

        {!user ? (
          <div className="text-center py-8">
            <p className="text-muted mb-6">Please sign in to manage branding.</p>
            {error && <p className="text-xs text-red-400 mb-4">{error}</p>}
            <button 
              onClick={handleLogin} 
              disabled={loggingIn}
              className="btn-primary flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              {loggingIn ? <Loader2 className="w-5 h-5 animate-spin" /> : <LogIn className="w-5 h-5" />}
              {loggingIn ? 'Signing in...' : 'Sign in with Google'}
            </button>
          </div>
        ) : !isAdmin ? (
          <div className="text-center py-8">
            <p className="text-red-400 mb-2 font-bold">Access Denied</p>
            <p className="text-muted text-sm mb-6">
              Logged in as: <span className="text-white">{user.email}</span><br/>
              Only <span className="text-white">Juwonw@hivehubsolutions.net</span> can change branding.
            </p>
            <button onClick={logout} className="text-sm text-muted hover:text-white underline">
              Sign out and try another account
            </button>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 text-accent animate-spin" />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Logo Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-muted">Company Logo (Max 300KB)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'logo')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center gap-2 group-hover:border-accent/50 transition-colors">
                    <Upload className="w-6 h-6 text-muted group-hover:text-accent" />
                    <span className="text-xs text-muted">Upload Logo</span>
                  </div>
                </div>
                {logoUrl && (
                  <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-center relative group">
                    <img src={logoUrl} alt="Logo Preview" className="max-h-16 object-contain" />
                    <button 
                      onClick={() => setLogoUrl('')}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mascot Section */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-muted">Company Mascot (Max 300KB)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'mascot')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center gap-2 group-hover:border-accent/50 transition-colors">
                    <ImageIcon className="w-6 h-6 text-muted group-hover:text-accent" />
                    <span className="text-xs text-muted">Upload Mascot</span>
                  </div>
                </div>
                {mascotUrl && (
                  <div className="p-4 bg-white/5 rounded-2xl flex items-center justify-center relative group">
                    <img src={mascotUrl} alt="Mascot Preview" className="max-h-16 object-contain" />
                    <button 
                      onClick={() => setMascotUrl('')}
                      className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {error && <p className="text-xs text-red-400">{error}</p>}

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Save Branding'}
              </button>
              <button onClick={logout} className="p-3 text-muted hover:text-white" title="Sign Out">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
