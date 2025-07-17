import './../styles/Header.css';

const Header = () => {
  return (
    <header className="app-header">
      <a href="https://t.me/SafeVibeCode" target="_blank" rel="noopener noreferrer" className="header-link">
        <svg
          className="laptop-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55A1 1 0 0 1 20.7 20H3.3a1 1 0 0 1-.58-1.45L4 16" />
        </svg>
        <span>BY PRIZRAKJJ</span>
      </a>
    </header>
  );
};

export default Header; 