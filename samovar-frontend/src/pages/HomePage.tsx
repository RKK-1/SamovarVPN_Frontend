import React, { useEffect, useState } from 'react';
import { usePayment } from '@features/payment/hooks/usePayment';
import PaymentModal from '@features/payment/components/PaymentModal';
import SuccessModal from '@features/payment/components/SuccessModal';

const HomePage: React.FC = () => {
  const {
    state,
    isPaymentOpen,
    isSuccessOpen,
    loading,
    openForPlan,
    closePayment,
    closeSuccess,
    processPayment,
  } = usePayment();

  const [isFreeModalOpen, setFreeModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const navbar = document.querySelector<HTMLElement>('nav');
      if (navbar) {
        if (window.scrollY > 50) navbar.classList.add('scrolled');
        else navbar.classList.remove('scrolled');
      }

      const reveals = document.querySelectorAll<HTMLElement>('.reveal');
      const windowHeight = window.innerHeight;
      reveals.forEach((el) => {
        const revealTop = el.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
          el.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleTryFree = () => {
    setFreeModalOpen(true);
  };

  return (
    <main>
      <header className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content reveal">
              <span className="hero-tag">Новое поколение VPN</span>
              <h1>Свобода без границ.</h1>
              <p>
                Samovar VPN — это швейцарский стандарт безопасности и российское гостеприимство. Работает там, где
                другие сдаются.
              </p>
              <div className="hero-btns">
                <a href="#pricing" className="btn btn-cyan">
                  Посмотреть тарифы
                </a>
                <button type="button" className="btn btn-outline" onClick={handleTryFree}>
                  Попробовать 7 дней
                </button>
              </div>
            </div>
            <div className="hero-image-wrap reveal">
              <img src="/logopng.png" alt="Samovar VPN" />
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="features">
        <div className="container">
          <div className="section-title reveal">
            <h2>Зачем тебе Samovar?</h2>
            <p>Мы собрали всё лучшее в одном сервисе.</p>
          </div>
          <div className="features-grid">
            <div className="feature-card reveal">
              <div className="feature-icon">
                <i className="fas fa-bolt-lightning" />
              </div>
              <h3>Нереальная скорость</h3>
              <p>
                Серверы 10 Гбит/с. Забудь про пинг в играх и буферизацию в 4K. Твой провайдер будет завидовать.
              </p>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon">
                <i className="fas fa-ghost" />
              </div>
              <h3>Полная анонимность</h3>
              <p>
                Никаких логов. Никакой слежки. Только ты и интернет. Твои данные защищены шифрованием военного уровня.
              </p>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon">
                <i className="fas fa-globe" />
              </div>
              <h3>Всё работает</h3>
              <p>
                Instagram, Netflix, ChatGPT и любые сайты доступны 24/7. Мы обходим любые современные блокировки.
              </p>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon">
                <i className="fas fa-mobile-screen" />
              </div>
              <h3>Один на всех</h3>
              <p>
                Одна подписка на 5 устройств. Телефон, ноутбук, планшет и даже Smart TV. Всё под защитой.
              </p>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon">
                <i className="fas fa-headset" />
              </div>
              <h3>Живая поддержка</h3>
              <p>Не бот, а реальные люди в Telegram помогут с настройкой за пару минут. Мы всегда на связи.</p>
            </div>
            <div className="feature-card reveal">
              <div className="feature-icon">
                <i className="fas fa-shield-virus" />
              </div>
              <h3>Для РФ стабильно</h3>
              <p>Оптимизировано под российских провайдеров. Стабильный коннект даже на мобильном интернете.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing">
        <div className="container">
          <div className="section-title reveal">
            <h2>Честные тарифы</h2>
            <p>Никаких скрытых платежей. Только чистый сервис.</p>
          </div>
          <div className="pricing-grid">
            <div className="price-card reveal">
              <div className="price-header">
                <h3>Простой</h3>
              </div>
              <div className="price-amount">
                179<span>₽ / мес</span>
              </div>
              <ul className="price-features">
                <li className="price-feature">
                  <i className="fas fa-check" /> 2 устройства
                </li>
                <li className="price-feature">
                  <i className="fas fa-check" /> Все локации
                </li>
                <li className="price-feature">
                  <i className="fas fa-check" /> 10 Гбит/с
                </li>
              </ul>
              <button
                className="btn btn-cyan select-plan"
                type="button"
                onClick={() => openForPlan('1month', 179)}
              >
                Выбрать
              </button>
            </div>

            <div className="price-card featured reveal">
              <div className="price-header">
                <h3>Популярный</h3>
              </div>
              <div className="price-amount">
                449<span>₽ / 3 мес</span>
              </div>
              <ul className="price-features">
                <li className="price-feature">
                  <i className="fas fa-check" /> 5 устройств
                </li>
                <li className="price-feature">
                  <i className="fas fa-check" /> Приоритетная линия
                </li>
                <li className="price-feature">
                  <i className="fas fa-check" /> Поддержка 24/7
                </li>
              </ul>
              <button
                className="btn btn-primary select-plan"
                type="button"
                onClick={() => openForPlan('3months', 449)}
              >
                Выбрать
              </button>
            </div>

            <div className="price-card reveal">
              <div className="price-header">
                <h3>Выгодный</h3>
              </div>
              <div className="price-amount">
                749<span>₽ / 6 мес</span>
              </div>
              <ul className="price-features">
                <li className="price-feature">
                  <i className="fas fa-check" /> 5 устройств
                </li>
                <li className="price-feature">
                  <i className="fas fa-check" /> Максимальная выгода
                </li>
                <li className="price-feature">
                  <i className="fas fa-check" /> Все бонусы
                </li>
              </ul>
              <button
                className="btn btn-cyan select-plan"
                type="button"
                onClick={() => openForPlan('6months', 749)}
              >
                Выбрать
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="locations" className="locations">
        <div className="container">
          <div className="section-title reveal">
            <h2>Серверы, которые работают там, где нужно тебе</h2>
            <p>
              Европейские локации для скорости и отдельный сервер в РФ в белом списке — чтобы всё открывалось даже при
              жёстких блокировках.
            </p>
          </div>
          <div className="locations-card reveal">
            <div className="locations-badge-col">
              <div className="locations-country">
                <span className="code">
                  <img src="/flag-se.svg" alt="Швеция" />
                </span>
                <span className="name">Швеция</span>
              </div>
              <div className="locations-country">
                <span className="code">
                  <img src="/flag-fi.svg" alt="Финляндия" />
                </span>
                <span className="name">Финляндия</span>
              </div>
              <div className="locations-country">
                <span className="code">
                  <img src="/flag-de.svg" alt="Германия" />
                </span>
                <span className="name">Германия</span>
              </div>
              <div className="locations-country locations-country--ru">
                <span className="code">
                  <img src="/flag-ru.svg" alt="Россия" />
                </span>
                <span className="name">Россия</span>
                <span className="note">сервер в белом списке</span>
              </div>
            </div>
            <div className="locations-text">
              <div className="locations-pill">Оптимизировано под РФ</div>
              <h3>Европейская скорость + российский белый список</h3>
              <p>
                Мы держим отдельный сервер в России в белом списке провайдеров. Это значит, что даже когда всё остальное
                не открывается, Samovar VPN продолжает работать стабильно.
              </p>
              <ul className="locations-list">
                <li>
                  <i className="fas fa-signal" />
                  <span>Швеция, Финляндия, Германия для максимальной скорости и низкого пинга.</span>
                </li>
                <li>
                  <i className="fas fa-shield-heart" />
                  <span>Сервер в РФ в белом списке — доступ к нужным сервисам даже при жёстких блокировках.</span>
                </li>
                <li>
                  <i className="fas fa-route" />
                  <span>Умный выбор маршрута: Samovar сам выбирает, через какой сервер тебе сейчас лучше.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="steps">
        <div className="container">
          <div className="section-title reveal">
            <h2>3 шага к свободе</h2>
            <p>Справится даже твоя бабушка.</p>
          </div>
          <div className="steps-wrap">
            <div className="step-card reveal">
              <div className="step-num">1</div>
              <h3>Зайдите в бота</h3>
              <p>Нажмите кнопку и переходите в наш Telegram бот.</p>
            </div>
            <div className="step-card reveal">
              <div className="step-num">2</div>
              <h3>Выберите план</h3>
              <p>Оплатите подписку любым удобным способом.</p>
            </div>
            <div className="step-card reveal">
              <div className="step-num">3</div>
              <h3>Подключитесь</h3>
              <p>Получите ссылку и нажмите кнопку &quot;Подключить&quot;.</p>
            </div>
          </div>
        </div>
      </section>

      <PaymentModal
        open={isPaymentOpen}
        onClose={closePayment}
        onSubmit={processPayment}
        loading={loading}
        state={state}
      />
      <SuccessModal open={isSuccessOpen} onClose={closeSuccess} />

      {isFreeModalOpen && (
        <div
          className="modal"
          style={{
            display: 'flex',
            background: 'rgba(0,0,0,0.95)',
            backdropFilter: 'blur(15px)',
            zIndex: 3000,
          }}
          onClick={() => setFreeModalOpen(false)}
        >
          <div
            className="modal-content"
            style={{
              maxWidth: 500,
              textAlign: 'center',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="close-modal"
              aria-label="Закрыть"
              onClick={() => setFreeModalOpen(false)}
            >
              &times;
            </button>
            <h2 style={{ marginBottom: 24, fontSize: 32, fontWeight: 900 }}>🎁 Твой подарок</h2>
            <p
              style={{
                textAlign: 'left',
                color: '#9ca3af',
                marginBottom: 32,
                fontSize: 15,
                lineHeight: 1.6,
              }}
            >
              1. Перейди в нашего Telegram бота
              <br />
              2. Выбери кнопку &quot;🔑 Активировать&quot;
              <br />
              3. Введи свой email
              <br />
              4. Получи 7 дней бесплатного теста!
              <br />
              <br />
              <strong>Желаем приятного пользования!</strong>
            </p>
            <a
              href="https://t.me/SamovarVPN_Bot"
              className="btn btn-cyan full-width"
              style={{ marginBottom: 12 }}
            >
              Открыть Telegram
            </a>
            <button
              type="button"
              className="btn btn-outline full-width"
              onClick={() => setFreeModalOpen(false)}
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default HomePage;

