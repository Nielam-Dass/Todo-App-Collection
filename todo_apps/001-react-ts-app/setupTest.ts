import { afterEach, beforeAll, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
    cleanup();
    localStorage.clear();
});

beforeAll(() => {
    window.alert = vi.fn<(msg: string)=>void>();
});
