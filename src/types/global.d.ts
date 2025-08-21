/// <reference types="react" />
/// <reference types="react-dom" />

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [elemName: string]: any;
    }
  }
}

declare module 'react' {
  export * from '@types/react';
}

declare module 'next/navigation' {
  export * from '@types/next';
}

declare module 'next/link' {
  export * from '@types/next';
}

export {};
