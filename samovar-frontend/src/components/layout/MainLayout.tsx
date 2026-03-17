import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileClosing, setMobileClosing] = useState(false);

  const navItems = useMemo(
    () => [
      { id: 'features', label: 'Возможности' },
      { id: 'pricing', label: 'Тарифы' },
      { id: 'locations', label: 'Сервера' },
      { id: 'how-it-works', label: 'Инструкция' },
    ],
    [],
  );

  const scrollToId = (id: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${id}`;
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    setMobileOpen(false);
    setMobileClosing(false);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (location.pathname !== '/') return;

    const ids = navItems.map((x) => x.id);
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!elements.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      {
        root: null,
        threshold: [0.15, 0.25, 0.35, 0.5, 0.65],
        rootMargin: '-20% 0px -65% 0px',
      },
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [location.pathname, navItems]);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    scrollToId(id);
    if (mobileOpen) {
      setMobileClosing(true);
      window.setTimeout(() => {
        setMobileOpen(false);
        setMobileClosing(false);
      }, 180);
    }
  };

  const closeMobile = () => {
    if (!mobileOpen) return;
    setMobileClosing(true);
    window.setTimeout(() => {
      setMobileOpen(false);
      setMobileClosing(false);
    }, 180);
  };
  return (
    <>
      <nav>
        <div className="container">
          <div className="nav-inner">
            <Link to="/" className="logo-text">
              <i className="fas fa-shield-halved" />
              Samovar VPN
            </Link>
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`link-like ${activeSection === item.id ? 'is-active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="nav-actions">
              <Link to="/auth?next=bot" className="btn btn-outline">
                Кабинет
              </Link>
              <button
                type="button"
                className="nav-burger"
                aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={mobileOpen}
                onClick={() => {
                  if (mobileOpen) closeMobile();
                  else setMobileOpen(true);
                }}
              >
                <i className={mobileOpen ? 'fas fa-xmark' : 'fas fa-bars'} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div
          className={`nav-mobile-overlay ${mobileClosing ? 'is-closing' : 'is-open'}`}
          onClick={closeMobile}
        >
          <div className="nav-mobile-panel" onClick={(e) => e.stopPropagation()}>
            <div className="nav-mobile-title">Навигация</div>
            <div className="nav-mobile-links">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`nav-mobile-link ${activeSection === item.id ? 'is-active' : ''}`}
                  onClick={() => handleNavClick(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="nav-mobile-actions">
              <Link to="/auth?next=bot" className="btn btn-outline full-width">
                Кабинет
              </Link>
            </div>
          </div>
        </div>
      )}

      {children}

      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo-text">
                <i className="fas fa-shield-halved" />
                Samovar VPN
              </div>
              <p>
                Создаём безопасный интернет для каждого. Твой надежный инструмент для обхода любых границ.
              </p>
            </div>
            <div>
              <h4 className="footer-title">Разделы</h4>
              <ul className="footer-links">
                <li>
                  <a href="#features">Возможности</a>
                </li>
                <li>
                  <a href="#pricing">Тарифы</a>
                </li>
                <li>
                  <a href="#how-it-works">Инструкция</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="footer-title">Связь</h4>
              <ul className="footer-links">
                <li>
                  <a href="https://t.me/SamovarVPN_Bot">Telegram Бот</a>
                </li>
                <li>
                  <a href="#">Техподдержка</a>
                </li>
                <li>
                  <a href="#">Политика конфиденциальности</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">&copy; 2024 Samovar VPN. Все права защищены.</div>
        </div>
      </footer>
    </>
  );
};

export default MainLayout;

