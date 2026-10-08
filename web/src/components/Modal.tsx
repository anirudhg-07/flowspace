

export const Modal = ({ isOpen, onClose, title, children }: any) => {
  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
      <div className="card" style={{ width: '100%', maxWidth: '500px', margin: 'var(--spacing-4)', position: 'relative' }}>
        <h2 style={{ marginBottom: 'var(--spacing-4)', fontSize: '1.25rem' }}>{title}</h2>
        <button onClick={onClose} style={{ position: 'absolute', top: 'var(--spacing-5)', right: 'var(--spacing-5)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem', lineHeight: 1 }}>&times;</button>
        {children}
      </div>
    </div>
  );
};
