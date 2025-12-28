"use client";

import React from 'react';
import { Montserrat } from 'next/font/google';

// Font ayarları
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['200', '500', '800'],
  display: 'swap',
});

export default function Home() {
  return (
    <div className={montserrat.className} style={{
      backgroundColor: '#000000', // Simsiyah zemin
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      padding: '20px',
      overflow: 'hidden',
      position: 'relative'
    }}>
      
      {/* CSS STİLLERİ */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Işıltı Animasyonu */
        @keyframes shimmerMove {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        
        /* Logo Stili */
        .kognitect-logo {
          font-size: 4rem;
          line-height: 1;
          /* Lüks metalik gradyan */
          background: linear-gradient(90deg, #666 0%, #fff 50%, #666 100%);
          background-size: 200% auto;
          
          /* Işıltı Efekti */
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          color: transparent;
          
          animation: shimmerMove 6s linear infinite;
        }

        /* Mobil Uyum */
        @media (min-width: 768px) {
          .kognitect-logo { font-size: 6rem; }
        }

        /* Input Placeholder Rengi */
        .input-field::placeholder {
          color: #888; /* Daha okunaklı bir gri */
        }
      `}} />

      {/* 1. LOGO SECTION */}
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 className="kognitect-logo">
          <span style={{ fontWeight: 800 }}>KOGNI</span>
          <span style={{ fontWeight: 200 }}>TECT</span>
        </h1>
      </div>

      {/* 2. SLOGAN SECTION */}
      <div style={{ textAlign: 'center', maxWidth: '600px', marginBottom: '4rem' }}>
        {/* Ana Slogan */}
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 500, 
          letterSpacing: '0.25em', 
          textTransform: 'uppercase', 
          color: '#fff', /* Tam beyaz */
          marginBottom: '1rem'
        }}>
          Perception is Engineered.
        </h2>
        {/* Alt Slogan (DÜZELTİLDİ: Rengi açıldı) */}
        <p style={{ 
          fontSize: '1rem', 
          fontWeight: 300, 
          color: '#ccc', /* Okunmayan koyu gri yerine açık lüks gri */
          lineHeight: '1.6' 
        }}>
          Decoding human attention with AI to minimize digital risk.
        </p>
      </div>

      {/* 3. FORM SECTION (DÜZELTİLDİ: Boyutlar eşitlendi) */}
      <div style={{ width: '100%', maxWidth: '420px', textAlign: 'center' }}>
        {/* Lab Başlığı (DÜZELTİLDİ: Rengi açıldı) */}
        <p style={{ 
          fontSize: '0.75rem', 
          color: '#999', /* Daha görünür bir gri */
          letterSpacing: '0.3em', 
          textTransform: 'uppercase', 
          marginBottom: '1.5rem' 
        }}>
          Kognitect Research Lab &trade;
        </p>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* E-posta Kutusu */}
          <input 
            type="email" 
            placeholder="Enter your email for exclusive access" 
            className="input-field"
            style={{
              width: '100%',
              padding: '16px 24px', /* Butonla aynı padding */
              backgroundColor: 'rgba(255,255,255,0.07)',
              border: '1px solid #333',
              color: 'white',
              textAlign: 'center',
              fontSize: '0.9rem',
              outline: 'none',
              borderRadius: '0',
              boxSizing: 'border-box' /* Boyut hesaplamasını garantiye al */
            }}
          />
          {/* Buton */}
          <button 
            type="button"
            style={{
              width: '100%',
              padding: '16px 24px', /* Input ile aynı padding */
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid white', /* Input ile aynı border kalınlığı (renk farklı) */
              fontWeight: 'bold',
              fontSize: '0.9rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '0',
              boxSizing: 'border-box', /* Boyut hesaplamasını garantiye al */
              transition: 'background-color 0.3s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e6e6e6'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
          >
            Join The Waitlist
          </button>
        </form>
      </div>

      {/* 4. FOOTER */}
      <footer style={{
        position: 'absolute',
        bottom: '30px',
        fontSize: '0.65rem',
        color: '#666', /* Görünür ama rahatsız etmeyen bir ton */
        letterSpacing: '0.3em',
        textTransform: 'uppercase'
      }}>
        Izmir &bull; San Francisco
      </footer>

    </div>
  );
}