import type { BrowserRouterProps, MemoryRouterProps } from 'react-router-dom';

export const DEFAULT_ROUTER_PROPS = {
  future: {
    v7_startTransition: true,
  },
} as const satisfies BrowserRouterProps satisfies MemoryRouterProps;
