import * as React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'chess-board': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        position?: string;
        'draggable-pieces'?: boolean;
      };
    }
  }
}

declare class ChessBoardElement extends HTMLElement {
  setPosition(fen: string): void;
}