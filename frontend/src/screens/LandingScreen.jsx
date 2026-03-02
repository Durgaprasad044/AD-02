import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/common/Button';

export default function LandingScreen() {
  const navigate = useNavigate();

  return (
    <div className="landing-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 🔹 HERO SECTION (Elite Upgrade) */}
      <section className="hero section flex-center flex-column" style={{ 
        textAlign: 'center', 
        padding: 'var(--spacing-3xl) var(--spacing-lg)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
        gap: 'var(--spacing-xl)'
      }}>
        {/* Animated Background Layers */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'var(--color-background-gradient)',
          zIndex: -2
        }} />
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(62, 207, 142, 0.08) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: -1
        }} />

        <h1 className="animate-fade-in" style={{ 
          maxWidth: '900px', 
          fontSize: 'clamp(3rem, 6vw, 5rem)', 
          lineHeight: '1.1',
          letterSpacing: '-0.04em'
        }}>
          AI-Powered Smart Networking for Modern Events
        </h1>
        <p className="text-large animate-fade-in" style={{ 
          maxWidth: '650px', 
          animationDelay: '0.1s', 
          color: 'var(--color-text-secondary)',
          fontSize: '1.25rem',
          lineHeight: '1.7'
        }}>
          Connect intelligently. Collaborate instantly. Network meaningfully. ATRIUS uses advanced matchmaking to transform networking at hackathons and professional events.
        </p>
        <div className="flex-center gap-lg animate-fade-in" style={{ animationDelay: '0.2s', marginTop: 'var(--spacing-md)' }}>
          <Button 
            label="Enter Dashboard →" 
            variant="primary" 
            size="lg" 
            onClick={() => navigate('/dashboard')} 
          />
          <Button 
            label="See How It Works" 
            variant="secondary" 
            size="lg" 
          />
        </div>
      </section>
      
      {/* 🔹 VALUE PROPOSITION SECTION */}
      <section className="section container" style={{ padding: 'var(--spacing-3xl) var(--spacing-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
          <h2 style={{ color: 'var(--color-text-primary)' }}>Why ATRIUS?</h2>
          <p className="text-large" style={{ marginTop: 'var(--spacing-md)' }}>The intelligent layer missing from today's professional events.</p>
        </div>
        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-2xl)' }}>
          {[
            { title: 'AI-Powered Matchmaking', desc: 'Our embedding-based engine scans participant skills and goals to find your perfect network.' },
            { title: 'Real-Time Recommendations', desc: 'Constantly updating suggestions based on live event data, attendance, and interactions.' },
            { title: 'Event-Aware Networking', desc: 'Contextual connections intelligently routed based on the exact sessions you attend.' },
            { title: 'Structured Profiles', desc: 'Clean, objective data capturing skills and networking goals without the noise.' }
          ].map((feature, i) => (
            <div key={i} className="card flex-column gap-md" style={{ backgroundColor: 'var(--color-glass)', border: '1px solid var(--color-border)', backdropFilter: 'blur(12px)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-elevated)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', boxShadow: 'var(--shadow-glow)' }}>✦</div>
              <h3 style={{ fontSize: '1.25rem' }}>{feature.title}</h3>
              <p style={{ lineHeight: '1.6' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 HOW IT WORKS */}
      <section className="section container flex-column gap-xl" style={{ padding: 'var(--spacing-3xl) var(--spacing-lg)' }}>
        <h2 style={{ textAlign: 'center' }}>How It Works</h2>
        <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-2xl)', position: 'relative' }}>
          {/* Connector Line Illusion */}
          <div style={{ position: 'absolute', top: '32px', left: '10%', right: '10%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--color-border), transparent)', zIndex: 0, display: 'none' /* handled via CSS in a generic way usually but inline skip for now */ }} />
          
          {[
             { step: '01', title: 'Build Your Profile', desc: 'Tag skills & networking goals.' },
             { step: '02', title: 'AI Analyzes Context', desc: 'Event-aware vector mapping.' },
             { step: '03', title: 'Get Smart Matches', desc: 'Picks the highest compatibility.' },
             { step: '04', title: 'Connect & Collaborate', desc: 'Initiate chats immediately.' }
          ].map((item, i) => (
            <div key={i} className="flex-column gap-sm" style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: 'var(--spacing-xl) 0' }}>
              <div style={{ width: '64px', height: '64px', margin: '0 auto', borderRadius: '50%', backgroundColor: 'var(--color-elevated)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--color-primary)', boxShadow: 'var(--shadow-md)' }}>
                {item.step}
              </div>
              <h3 style={{ marginTop: 'var(--spacing-md)', fontSize: '1.1rem' }}>{item.title}</h3>
              <p className="text-small">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 BUILT FOR */}
      <section className="section container" style={{ padding: 'var(--spacing-3xl) var(--spacing-lg)' }}>
        <div className="card" style={{ padding: 'var(--spacing-3xl)', textAlign: 'center', background: 'var(--color-glass)', border: '1px solid var(--color-border)', backdropFilter: 'blur(20px)' }}>
          <h2 style={{ marginBottom: 'var(--spacing-2xl)' }}>Built For Modern Ecosystems</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--spacing-md)' }}>
            {['Hackathons', 'Tech Conferences', 'Startup Events', 'Professional Communities', 'Corporate Mixers'].map((tag, i) => (
              <span key={i} style={{ 
                padding: '12px 24px', 
                backgroundColor: 'var(--color-elevated)', 
                border: '1px solid var(--color-border)', 
                borderRadius: 'var(--radius-full)', 
                fontWeight: 500, 
                color: 'var(--color-text-primary)',
                boxShadow: 'var(--shadow-sm)'
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 🔹 FINAL CTA */}
      <section className="section flex-center flex-column gap-xl" style={{ 
        padding: 'var(--spacing-3xl) var(--spacing-lg)', 
        textAlign: 'center', 
        marginBottom: 'var(--spacing-3xl)',
        background: 'radial-gradient(circle at bottom, rgba(62, 207, 142, 0.05) 0%, transparent 70%)'
      }}>
        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', maxWidth: '800px' }}>Elevate Your Event Networking Experience</h2>
        <Button 
          label="Enter Dashboard →" 
          variant="primary"
          size="lg"
          onClick={() => navigate('/dashboard')}
        />
      </section>

    </div>
  );
}
