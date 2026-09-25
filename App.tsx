import React, { useState } from 'react';

// Initial starting data
const INITIAL_SUBSCRIPTIONS = [
  {
    id: 1,
    name: 'Netflix Premium',
    category: 'Streaming',
    cost: 22.99,
    lastCharged: '2 days ago',
    status: 'Active',
    isHiddenOrUnused: false,
  },
  {
    id: 2,
    name: 'Cloud Storage 200GB',
    category: 'Utilities',
    cost: 2.99,
    lastCharged: '5 days ago',
    status: 'Active',
    isHiddenOrUnused: false,
  },
  {
    id: 3,
    name: 'Forgotten Gym Pass',
    category: 'Fitness',
    cost: 45.0,
    lastCharged: '45 days ago (Unused)',
    status: 'At Risk',
    isHiddenOrUnused: true,
  },
];

export default function SubscriptionAuditor() {
  const [subscriptions, setSubscriptions] = useState(INITIAL_SUBSCRIPTIONS);
  const [loadingAudit, setLoadingAudit] = useState(false);
  const [auditMessage, setAuditMessage] = useState('');

  // Interactive Filters
  const [filter, setFilter] = useState('All');

  // Interactive Form Inputs
  const [newName, setNewName] = useState('');
  const [newCost, setNewCost] = useState('');
  const [newCategory, setNewCategory] = useState('Streaming');

  // Total spend calculation
  const totalMonthlySpend = subscriptions
    .filter((sub) => sub.status === 'Active' || sub.status === 'At Risk')
    .reduce((acc, sub) => acc + sub.cost, 0)
    .toFixed(2);

  // Add new subscription
  const handleAddSubscription = (e) => {
    e.preventDefault();
    if (!newName || !newCost) return;

    const newSub = {
      id: Date.now(),
      name: newName,
      category: newCategory,
      cost: parseFloat(newCost),
      lastCharged: 'Just added',
      status: 'Active',
      isHiddenOrUnused: false,
    };

    setSubscriptions([newSub, ...subscriptions]);
    setNewName('');
    setNewCost('');
  };

  // Delete item completely
  const handleDeleteSubscription = (id) => {
    setSubscriptions(subscriptions.filter((sub) => sub.id !== id));
  };

  // Cancel item
  const handleCancelSubscription = (id) => {
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.id === id ? { ...sub, status: 'Cancelled ($Saved)', cost: 0 } : sub
      )
    );
  };

  // Run audit simulation
  const handleDeepAudit = () => {
    setLoadingAudit(true);
    setAuditMessage(
      'Scanning transaction history for hidden recurring loops...'
    );

    setTimeout(() => {
      setLoadingAudit(false);
      setAuditMessage('Audit complete! Transaction scan finished.');
    }, 2000);
  };

  // Filter subscriptions
  const displayedSubscriptions = subscriptions.filter((sub) => {
    if (filter === 'Active')
      return sub.status === 'Active' || sub.status === 'At Risk';
    if (filter === 'Cancelled') return sub.status === 'Cancelled ($Saved)';
    return true;
  });

  return (
    <div
      style={{
        backgroundColor: '#0F172A',
        color: '#F8FAFC',
        minHeight: '100vh',
        padding: '24px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        {/* Header Section */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            borderBottom: '2px solid #334155',
            paddingBottom: '20px',
            marginBottom: '24px',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: '32px',
                margin: '0 0 6px 0',
                fontWeight: '800',
                color: '#FFFFFF',
              }}
            >
              ClarityAudit
            </h1>
            <p style={{ margin: 0, color: '#94A3B8', fontSize: '16px' }}>
              Automated Micro-Subscription & Bill Manager
            </p>
          </div>

          <button
            onClick={handleDeepAudit}
            disabled={loadingAudit}
            style={{
              backgroundColor: '#059669',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4)',
              opacity: loadingAudit ? 0.6 : 1,
            }}
          >
            {loadingAudit ? 'Scanning...' : '⚡ Run Deep Bank Audit'}
          </button>
        </header>

        {/* Audit Status Notification Banner */}
        {auditMessage && (
          <div
            style={{
              backgroundColor: '#064E3B',
              border: '2px solid #10B981',
              borderRadius: '10px',
              padding: '16px',
              marginBottom: '24px',
              color: '#A7F3D0',
              fontSize: '16px',
              fontWeight: '600',
            }}
          >
            {auditMessage}
          </div>
        )}

        {/* High Contrast Financial Summary Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              backgroundColor: '#1E293B',
              border: '2px solid #334155',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <p
              style={{
                margin: 0,
                color: '#94A3B8',
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
              }}
            >
              Total Monthly Burn
            </p>
            <p
              style={{
                margin: '8px 0 0 0',
                fontSize: '32px',
                fontWeight: '800',
                color: '#FB7185',
              }}
            >
              ${totalMonthlySpend}
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#1E293B',
              border: '2px solid #334155',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <p
              style={{
                margin: 0,
                color: '#94A3B8',
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
              }}
            >
              Active Subscriptions
            </p>
            <p
              style={{
                margin: '8px 0 0 0',
                fontSize: '32px',
                fontWeight: '800',
                color: '#38BDF8',
              }}
            >
              {
                subscriptions.filter((s) => s.status !== 'Cancelled ($Saved)')
                  .length
              }
            </p>
          </div>

          <div
            style={{
              backgroundColor: '#1E293B',
              border: '2px solid #334155',
              borderRadius: '12px',
              padding: '20px',
            }}
          >
            <p
              style={{
                margin: 0,
                color: '#94A3B8',
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
              }}
            >
              Zombie Bills Found
            </p>
            <p
              style={{
                margin: '8px 0 0 0',
                fontSize: '32px',
                fontWeight: '800',
                color: '#FBBF24',
              }}
            >
              {
                subscriptions.filter(
                  (s) => s.isHiddenOrUnused && s.status !== 'Cancelled ($Saved)'
                ).length
              }
            </p>
          </div>
        </div>

        {/* ACCESSIBLE FORM: Add New Subscription */}
        <div
          style={{
            backgroundColor: '#1E293B',
            border: '2px solid #3B82F6',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '28px',
          }}
        >
          <h2
            style={{
              margin: '0 0 16px 0',
              fontSize: '18px',
              color: '#60A5FA',
              fontWeight: '700',
            }}
          >
            + Add New Subscription
          </h2>
          <form
            onSubmit={handleAddSubscription}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
            }}
          >
            <input
              type="text"
              placeholder="Name (e.g. Spotify)"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                border: '2px solid #475569',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '15px',
              }}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Cost ($)"
              value={newCost}
              onChange={(e) => setNewCost(e.target.value)}
              style={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                border: '2px solid #475569',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '15px',
              }}
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              style={{
                backgroundColor: '#0F172A',
                color: '#FFFFFF',
                border: '2px solid #475569',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '15px',
              }}
            >
              <option value="Streaming">Streaming</option>
              <option value="Utilities">Utilities</option>
              <option value="Fitness">Fitness</option>
              <option value="Software">Software</option>
              <option value="Gaming">Gaming</option>
            </select>
            <button
              type="submit"
              style={{
                backgroundColor: '#2563EB',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              Add Subscription
            </button>
          </form>
        </div>

        {/* Subscriptions List */}
        <div
          style={{
            backgroundColor: '#1E293B',
            border: '2px solid #334155',
            borderRadius: '12px',
            overflow: 'hidden',
          }}
        >
          {/* Header & Prominent Filter Tabs */}
          <div
            style={{
              padding: '20px',
              borderBottom: '2px solid #334155',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700' }}>
              Detected Charges
            </h2>

            <div style={{ display: 'flex', gap: '8px' }}>
              {['All', 'Active', 'Cancelled'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  style={{
                    backgroundColor: filter === tab ? '#3B82F6' : '#0F172A',
                    color: filter === tab ? '#FFFFFF' : '#94A3B8',
                    border: '2px solid #334155',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    fontWeight: '700',
                    fontSize: '14px',
                    cursor: 'pointer',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {displayedSubscriptions.length === 0 ? (
              <p
                style={{
                  padding: '24px',
                  textAlign: 'center',
                  color: '#94A3B8',
                  margin: 0,
                }}
              >
                No subscriptions found in this view.
              </p>
            ) : (
              displayedSubscriptions.map((sub) => (
                <div
                  key={sub.id}
                  style={{
                    padding: '16px 20px',
                    borderBottom: '1px solid #334155',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '12px',
                    flexWrap: 'wrap',
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                      }}
                    >
                      <span
                        style={{
                          fontSize: '18px',
                          fontWeight: '700',
                          color: '#FFFFFF',
                        }}
                      >
                        {sub.name}
                      </span>
                      {sub.isHiddenOrUnused &&
                        sub.status !== 'Cancelled ($Saved)' && (
                          <span
                            style={{
                              backgroundColor: '#9F1239',
                              color: '#FECDD3',
                              padding: '4px 8px',
                              borderRadius: '6px',
                              fontSize: '12px',
                              fontWeight: '800',
                            }}
                          >
                            ⚠️ UNUSED / HIDDEN
                          </span>
                        )}
                    </div>
                    <p
                      style={{
                        margin: '4px 0 0 0',
                        fontSize: '14px',
                        color: '#94A3B8',
                      }}
                    >
                      Category: {sub.category} • Last charged: {sub.lastCharged}
                    </p>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '20px',
                        fontWeight: '800',
                        color: '#FFFFFF',
                      }}
                    >
                      ${sub.cost.toFixed(2)}/mo
                    </span>

                    {sub.status === 'Cancelled ($Saved)' ? (
                      <span
                        style={{
                          backgroundColor: '#334155',
                          color: '#94A3B8',
                          padding: '8px 14px',
                          borderRadius: '6px',
                          fontSize: '14px',
                          fontWeight: '700',
                        }}
                      >
                        Cancelled
                      </span>
                    ) : (
                      <button
                        onClick={() => handleCancelSubscription(sub.id)}
                        style={{
                          backgroundColor: '#DC2626',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '10px 16px',
                          fontSize: '14px',
                          fontWeight: '800',
                          cursor: 'pointer',
                        }}
                      >
                        1-Tap Cancel
                      </button>
                    )}

                    <button
                      onClick={() => handleDeleteSubscription(sub.id)}
                      style={{
                        backgroundColor: '#334155',
                        color: '#F8FAFC',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 14px',
                        fontSize: '14px',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                      title="Delete subscription"
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
    </div>
  );
}
