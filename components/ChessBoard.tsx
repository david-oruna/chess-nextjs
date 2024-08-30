
"use client";

import { useEffect, useRef } from 'react';
import { Chess } from 'chess.js';
import 'chessboard-element';

const ChessBoard = () => {
  const boardRef = useRef<any>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const fenRef = useRef<HTMLDivElement>(null);
  const pgnRef = useRef<HTMLDivElement>(null);
  const game = new Chess();

  useEffect(() => {
    const board = boardRef.current;

    const updateStatus = () => {
      let status = '';
      let moveColor = 'White';
      if (game.turn() === 'b') {
        moveColor = 'Black';
      }

      if (game.isCheckmate()) {
        status = `Game over, ${moveColor} is in checkmate.`;
      } else if (game.isDraw()) {
        status = 'Game over, drawn position';
      } else {
        status = `${moveColor} to move`;

        if (game.isCheck()) {
          status += `, ${moveColor} is in check`;
        }
      }

      if (statusRef.current) statusRef.current.innerHTML = status;
      if (fenRef.current) fenRef.current.innerHTML = game.fen();
      if (pgnRef.current) pgnRef.current.innerHTML = game.pgn();
    };

    board.addEventListener('drag-start', (e: any) => {
      const { source, piece, position, orientation } = e.detail;

      if (game.isGameOver() || (game.turn() === 'w' && piece.search(/^b/) !== -1) || (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        e.preventDefault();
      }
    });

    board.addEventListener('drop', (e: any) => {
      const { source, target, setAction } = e.detail;
      const move = game.move({
        from: source,
        to: target,
        promotion: 'q',
      });

      if (move === null) {
        setAction('snapback');
      }

      updateStatus();
    });

    board.addEventListener('snap-end', () => {
      board.setPosition(game.fen());
    });

    updateStatus();
  }, []);

  return (
    
    <div>

      <chess-board ref={boardRef} style={{ width: '400px' }} position="start" draggable-pieces />
      <label>Status:</label>
      <div ref={statusRef}></div>
      <label>FEN:</label>
      <div ref={fenRef}></div>
      <label>PGN:</label>
      <div ref={pgnRef}></div>
    </div>
  );
};

export default ChessBoard;
