declare module 'chessboard-element' {
    class ChessBoardElement extends HTMLElement {
      position: string;
      draggablePieces: boolean;
      // Add any other attributes and methods from chessboard-element you plan to use
    }
  
    global {
      interface HTMLElementTagNameMap {
        'chess-board': ChessBoardElement;
      }
    }
  }
  