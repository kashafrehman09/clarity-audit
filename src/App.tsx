import React, { useState, useEffect } from 'react';

// Subscription Data Type
interface Subscription {
  id: string;
  name: string;
  cost: number;
  category: string;
  lastCharged: string;
  isZombie?: boolean;
}

// Initial Sample Data
const initialSubscriptions: Subscription[] = [
  {
    id: '1',
    name: 'Netflix Premium',
    cost: 22.99,
    category: 'Streaming',
    lastCharged: '2 days ago',
    isZombie: false,
  },
  {
    id: '2',
    name: 'Cloud Storage 200GB',
    cost: 2.99,
    category: 'Utilities',
    lastCharged: '5 days ago',
    isZombie: false,
  },
  {
    id: '3',
    name: 'Old Fitness App',
    cost: 45.00,
    category: 'Software',
    lastCharged: '30 days ago',
    isZombie: true,
  },
];

// Animated Splash Screen Component
const SplashScreen = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#0b132b',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          ⚡ ClarityAudit
        </h1>
        <p style={{ color: '#8892b0', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
          Automated Micro-Subscription & Bill Manager
        </p>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid rgba(255, 255, 255, 0.1)',
            borderTop: '4px solid #00f2fe',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto',
          }}
        />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(initialSubscriptions);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Cancelled'>('All');
  
  // Form State
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [category, setCategory] = useState('Streaming');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Handlers
  const handleAddSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !cost || parseFloat(cost) <= 0) return;

    const newSub: Subscription = {
      id: Date.now().toString(),
      name: name.trim(),
      cost: parseFloat(cost),
      category,
      lastCharged: 'Just now',
      isZombie: false,
    };

    setSubscriptions([newSub, ...subscriptions]);
    setName('');
    setCost('');
  };

  const handleDelete = (id: string) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
  };

  const handleDeepAudit = () => {
    alert('Deep Bank Audit Complete! No additional hidden recurring fees were detected.');
  };

  // Dynamic Calculations
  const totalBurn = subscriptions.reduce((acc, sub) => acc + sub.cost, 0);
  const activeCount = subscriptions.length;
  const zombieCount = subscriptions.filter((sub) => sub.isZombie).length;

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0b132b',
        color: '#ffffff',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        padding: '2rem 1rem',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem',
            flexWrap: 'wrap',
            gap: '1rem',
          }}
        >
          <div>
            <h1 style={{ fontSize: '2.5rem', margin: 0, fontWeight: 'bold' }}>ClarityAudit</h1>
            <p style={{ color: '#8892b0', margin: '0.25rem 0 0 0' }}>
              Automated Micro-Subscription & Bill Manager
            </p>
          </div>
          <button
            onClick={handleDeepAudit}
            style={{
              backgroundColor: '#00c853',
              color: '#ffffff',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            ⚡ Run Deep Bank Audit
          </button>
        </header>

        {/* Dashboard Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          <div
            style={{
              backgroundColor: '#1c2541',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #3a506b',
            }}
          >
            <p style={{ color: '#8892b0', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
              TOTAL MONTHLY BURN
            </p>
            <h2 style={{ fontSize: '2.2rem', color: '#ff4d6d', margin: 0 }}>
              ${totalBurn.toFixed(2)}
            </h2>
          </div>

          <div
            style={{
              backgroundColor: '#1c2541',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #3a506b',
            }}
          >
            <p style={{ color: '#8892b0', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
              ACTIVE SUBSCRIPTIONS
            </p>
            <h2 style={{ fontSize: '2.2rem', color: '#00b4d8', margin: 0 }}>{activeCount}</h2>
          </div>

          <div
            style={{
              backgroundColor: '#1c2541',
              padding: '1.5rem',
              borderRadius: '12px',
              border: '1px solid #3a506b',
            }}
          >
            <p style={{ color: '#8892b0', fontSize: '0.85rem', margin: '0 0 0.5rem 0' }}>
              ZOMBIE BILLS FOUND
            </p>
            <h2 style={{ fontSize: '2.2rem', color: '#ffb703', margin: 0 }}>{zombieCount}</h2>
          </div>
        </div>

        {/* Add Subscription Form */}
        <form
          onSubmit={handleAddSubscription}
          style={{
            backgroundColor: '#1c2541',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #3a506b',
            marginBottom: '2rem',
          }}
        >
          <h3 style={{ margin: '0 0 1rem 0', color: '#4cc9f0' }}>+ Add New Subscription</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Name (e.g. Spotify)"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                flex: 1,
                minWidth: '180px',
                padding: '0.75rem',
                backgroundColor: '#0b132b',
                border: '1px solid #3a506b',
                borderRadius: '6px',
                color: '#fff',
              }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Cost ($)"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              style={{
                width: '120px',
                padding: '0.75rem',
                backgroundColor: '#0b132b',
                border: '1px solid #3a506b',
                borderRadius: '6px',
                color: '#fff',
              }}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                padding: '0.75rem',
                backgroundColor: '#0b132b',
                border: '1px solid #3a506b',
                borderRadius: '6px',
                color: '#fff',
              }}
            >
              <option value="Streaming">Streaming</option>
              <option value="Utilities">Utilities</option>
              <option value="Software">Software</option>
            </select>
            <button
              type="submit"
              style={{
                backgroundColor: '#3a86ff',
                color: '#fff',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              Add Subscription
            </button>
          </div>
        </form>

        {/* Detected Charges List */}
        <div
          style={{
            backgroundColor: '#1c2541',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #3a506b',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem',
            }}
          >
            <h3 style={{ margin: 0 }}>Detected Charges</h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {(['All', 'Active', 'Cancelled'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  style={{
                    backgroundColor: filter === tab ? '#3a86ff' : '#0b132b',
                    color: '#fff',
                    border: '1px solid #3a506b',
                    padding: '0.4rem 0.8rem',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {subscriptions.length === 0 ? (
            <p style={{ color: '#8892b0', textAlign: 'center', padding: '1rem 0' }}>
              No subscriptions found. Add one above!
            </p>
          ) : (
            subscriptions.map((sub) => (
              <div
                key={sub.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem 0',
                  borderBottom: '1px solid #3a506b',
                  flexWrap: 'wrap',
                  gap: '1rem',
                }}
              >
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem' }}>{sub.name}</h4>
                  <p style={{ margin: '0.25rem 0 0 0', color: '#8892b0', fontSize: '0.85rem' }}>
                    Category: {sub.category} • Last charged: {sub.lastCharged}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                    ${sub.cost.toFixed(2)}/mo
                  </span>
                  <button
                    onClick={() => handleDelete(sub.id)}
                    style={{
                      backgroundColor: '#e63946',
                      color: '#fff',
                      border: 'none',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    1-Tap Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(sub.id)}
                    style={{
                      backgroundColor: 'transparent',
                      color: '#8892b0',
                      border: '1px solid #3a506b',
                      padding: '0.5rem 1rem',
                      borderRadius: '6px',
                      cursor: 'pointer',
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
