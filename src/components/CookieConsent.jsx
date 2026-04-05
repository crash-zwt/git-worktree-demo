import { useState, useEffect } from 'react';

const COOKIE_CONSENT_KEY = 'cookie_consent';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consent !== 'accepted') {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-consent">
      <div className="cookie-consent__card">
        <p className="cookie-consent__text">
          我们使用 Cookie 来改善您的体验。接受即表示您同意我们的 Cookie 政策。
        </p>
        <div className="cookie-consent__actions">
          <button
            className="btn btn--primary cookie-consent__accept"
            onClick={handleAccept}
          >
            同意并继续
          </button>
          <a href="#cookie-policy" className="cookie-consent__link">
            了解更多
          </a>
        </div>
      </div>
    </div>
  );
}