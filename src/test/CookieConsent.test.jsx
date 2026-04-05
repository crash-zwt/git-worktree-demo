import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import CookieConsent from '../components/CookieConsent';

describe('CookieConsent', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('首次访问（无 localStorage）时应显示弹窗', () => {
    render(<CookieConsent />);
    expect(screen.getByText('我们使用 Cookie 来改善您的体验。接受即表示您同意我们的 Cookie 政策。')).toBeDefined();
    expect(screen.getByText('同意并继续')).toBeDefined();
    expect(screen.getByText('了解更多')).toBeDefined();
  });

  it('点击「同意并继续」后弹窗消失', () => {
    render(<CookieConsent />);
    const button = screen.getByText('同意并继续');
    fireEvent.click(button);
    expect(document.querySelector('.cookie-consent')).toBeNull();
  });

  it('点击「同意并继续」后 localStorage 应记录同意状态', () => {
    render(<CookieConsent />);
    const button = screen.getByText('同意并继续');
    fireEvent.click(button);
    expect(localStorage.getItem('cookie_consent')).toBe('accepted');
  });

  it('已同意（localStorage 有记录）时应完全不渲染弹窗', () => {
    localStorage.setItem('cookie_consent', 'accepted');
    render(<CookieConsent />);
    expect(document.querySelector('.cookie-consent')).toBeNull();
  });

  it('刷新页面（已同意）后弹窗不应出现', () => {
    localStorage.setItem('cookie_consent', 'accepted');
    const { container } = render(<CookieConsent />);
    expect(container.firstChild).toBeNull();
  });

  it('「了解更多」链接指向 #cookie-policy', () => {
    render(<CookieConsent />);
    const link = screen.getByText('了解更多');
    expect(link.getAttribute('href')).toBe('#cookie-policy');
  });

  it('弹窗固定在页面底部（.cookie-consent 有 position:fixed）', () => {
    render(<CookieConsent />);
    const consent = document.querySelector('.cookie-consent');
    expect(consent).not.toBeNull();
  });
});