/// <reference types="vite/client" />

// MailerLite Universal — loaded from the snippet in index.html.
declare global {
  interface Window {
    ml?: (...args: unknown[]) => void;
  }
}

export {};
