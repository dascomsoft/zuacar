'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

const paymentMethods = [
  {
    name: "Orange Money",
    number: "+243 854 696 515",
    logo: "🟠",
    color: "from-orange-500 to-amber-600",
  },
  {
    name: "Airtel Money",
    number: "+243 976 115 657",
    logo: "🔴",
    color: "from-red-600 to-rose-600",
  },
  {
    name: "Vodacom M-Pesa",
    number: "+243 819 516 437",
    logo: "📱",
    color: "from-red-500 to-purple-600",
  },
  {
    name: "Equity Bank",
    accounts: [
      { currency: "CDF", number: "700100221928186" },
      { currency: "USD", number: "700100221923530" },
    ],
    logo: "🏦",
    color: "from-rose-700 to-red-800",
  },
];

export default function PaymentMethods({ reservationId }) {
  const [copied, setCopied] = useState(null);
  const [confirming, setConfirming] = useState(false);

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const confirmPayment = async (method) => {
    if (!confirm(`Confirmer le paiement par ${method} ?`)) return;
    
    setConfirming(true);
    try {
      const response = await fetch('/api/confirm-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservationId, method }),
      });
      
      if (response.ok) {
        alert('Paiement confirmé ! Vous allez recevoir un email.');
        window.location.href = '/booking/confirmation';
      }
    } catch (error) {
      alert('Erreur lors de la confirmation');
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-3xl p-8">
      <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
        Options de Paiement Disponibles
      </h3>

      <div className="space-y-4">
        {paymentMethods.map((method, index) => (
          <div key={index} className="group">
            <div className={`bg-gradient-to-r ${method.color} p-6 rounded-2xl text-white transition-all hover:scale-[1.02]`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{method.logo}</span>
                  <div>
                    <p className="text-xl font-semibold">{method.name}</p>
                    {method.number && (
                      <p className="font-mono text-lg tracking-wider">{method.number}</p>
                    )}
                  </div>
                </div>

                {method.number && (
                  <button
                    onClick={() => copyToClipboard(method.number, method.name)}
                    className="bg-white/20 hover:bg-white/30 p-3 rounded-xl transition-all"
                  >
                    {copied === method.name ? <Check size={24} /> : <Copy size={24} />}
                  </button>
                )}
              </div>

              {method.accounts && (
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  {method.accounts.map((acc, i) => (
                    <div key={i} className="bg-black/30 p-3 rounded-xl">
                      <p className="text-xs opacity-75">Compte {acc.currency}</p>
                      <p className="font-mono">{acc.number}</p>
                      <button
                        onClick={() => copyToClipboard(acc.number, `${method.name} ${acc.currency}`)}
                        className="text-xs mt-2 opacity-75 hover:opacity-100"
                      >
                        {copied === `${method.name} ${acc.currency}` ? '✓ Copié' : 'Copier'}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button
              onClick={() => confirmPayment(method.name)}
              disabled={confirming}
              className="w-full mt-2 bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-400 py-2 rounded-xl transition text-sm font-medium"
            >
              {confirming ? 'Confirmation...' : 'J\'ai effectué le paiement'}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center text-sm text-zinc-400">
        Paiement en espèces possible au bureau sur demande préalable
      </div>
    </div>
  );
}