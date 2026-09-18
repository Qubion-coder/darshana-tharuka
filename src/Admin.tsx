import React, { useState } from 'react';

export default function Admin() {
  const [prefix, setPrefix] = useState('ඔබට');
  const [guestName, setGuestName] = useState('');
  const [generatedResult, setGeneratedResult] = useState<{ url: string; message: string } | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const prefixes = [
    'ඔබට',
    'ඔබ දෙපළට',
    'ඔබ සැමට'
  ];

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const baseUrl = window.location.origin;
    const url = `${baseUrl}/?to=${encodeURIComponent(guestName.trim())}&prefix=${encodeURIComponent(prefix)}`;
    
    const message = `ආදරණීය ${guestName.trim()} ❤️

අපගේ නව ජීවන ගමන ආරම්භ කරන මේ සුවිශේෂී දිනයේ සතුට ඔබත් සමඟ බෙදා ගැනීමට අප ඉතා සතුටින් බලාපොරොත්තු වෙමු.

පහත සබැඳිය ඔස්සේ අපගේ විවාහ ආරාධනා පත්‍රය සහ උත්සවයේ සියලු විස්තර නරඹන්න 🌐:

${url}

මෙම සුන්දර මොහොත සැමරීමට ඔබගේ පැමිණීම අපට මහත් ආශීර්වාදයකි.

ආදරයෙන්,
❤️ දර්ශන සහ තාරුකා`;

    setGeneratedResult({ url, message });
    setGuestName('');
  };

  const handleCopyLink = async () => {
    if (!generatedResult) return;
    try {
      await navigator.clipboard.writeText(generatedResult.url);
      setCopiedId('link');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handleCopyMessage = async () => {
    if (!generatedResult) return;
    try {
      await navigator.clipboard.writeText(generatedResult.message);
      setCopiedId('msg');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="h-[100dvh] overflow-y-auto bg-slate-50 py-12 px-4 font-sans">
      <div className="max-w-3xl mx-auto space-y-8 pb-20">
        
        {/* Generator Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
            LINK GENERATOR
          </h1>

          <form onSubmit={handleGenerate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-600">Select Prefix</label>
                <select
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all appearance-none"
                >
                  {prefixes.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-slate-600">Guest Name</label>
                <input
                  type="text"
                  placeholder="e.g. Sanjaya"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition-colors shadow-sm active:scale-[0.99] flex justify-center items-center gap-2"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Generate Message
            </button>
          </form>
        </div>

        {/* Generated Result Card */}
        {generatedResult && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                <line x1="7" y1="9" x2="14" y2="9"></line>
              </svg>
              Generated Message Preview
            </h2>

            <div className="bg-slate-50 rounded-xl border border-slate-200 p-4 mb-6">
              <p className="whitespace-pre-wrap text-slate-700 text-sm md:text-base leading-relaxed font-sinhala">
                {generatedResult.message}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-xl transition-colors shadow-sm"
              >
                {copiedId === 'link' ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Link Copied!
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                    Copy Link Only
                  </>
                )}
              </button>
              
              <button
                onClick={handleCopyMessage}
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-50 border border-emerald-200 hover:border-emerald-300 hover:bg-emerald-100 text-emerald-700 text-sm font-medium rounded-xl transition-colors shadow-sm"
              >
                {copiedId === 'msg' ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Message Copied!
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                    Copy Full Message
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
