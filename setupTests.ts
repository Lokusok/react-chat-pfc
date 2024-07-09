import { afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';

afterEach(() => cleanup());

Object.defineProperty(window, 'requestIdleCallback', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({})),
});

Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
  })),
});

// FAIL LOUDLY on unhandled promise rejections / errors
process.on('unhandledRejection', (reason) => {
  // eslint-disable-next-line no-console
  console.log(`FAILED TO HANDLE PROMISE REJECTION`);
  throw reason;
});
