import React, { useState, useEffect } from 'react';
import { XIcon } from './icons';

export const VideoModal = ({ youtubeId, onClose }) => {
    if (!youtubeId) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-slate-100 dark:bg-slate-900 rounded-xl shadow-2xl p-2 relative w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute -top-3 -right-3 bg-slate-200 dark:bg-slate-700 rounded-full p-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200">
                    <XIcon />
                </button>
                <div className="aspect-video">
                    <iframe
                        className="w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
};


export const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const winner = calculateWinner(board);
    const isDraw = !winner && board.every(Boolean);

    const handleClick = (i) => {
        if (winner || board[i]) return;
        const newBoard = board.slice();
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
    };

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (isDraw) {
        status = "It's a Draw!";
    } else {
        status = `Next player: ${isXNext ? 'X' : 'O'}`;
    }

    return (
        <div className="flex flex-col items-center gap-4">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Tic-Tac-Toe</h3>
            <div className="text-lg text-slate-600 dark:text-slate-400">{status}</div>
            <div className="grid grid-cols-3 gap-2">
                {board.map((value, i) => (
                    <button
                        key={i}
                        className="w-20 h-20 bg-slate-200 dark:bg-slate-700 rounded-lg text-4xl font-bold flex items-center justify-center text-slate-800 dark:text-slate-200"
                        onClick={() => handleClick(i)}
                    >
                        {value}
                    </button>
                ))}
            </div>
            <button
                onClick={resetGame}
                className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
            >
                Reset Game
            </button>
        </div>
    );
};

export const SnakeGame = () => {
    const boardSize = 20;
    const initialSnake = [{ x: 10, y: 10 }];
    const initialFood = { x: 15, y: 15 };

    const [snake, setSnake] = useState(initialSnake);
    const [food, setFood] = useState(initialFood);
    const [direction, setDirection] = useState({ x: 0, y: -1 }); // Start moving up
    const [speed, setSpeed] = useState(200);
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const generateFood = () => {
        const newFood = {
            x: Math.floor(Math.random() * boardSize),
            y: Math.floor(Math.random() * boardSize),
        };
        if (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
            return generateFood();
        }
        return newFood;
    };
    
    const resetGame = () => {
        setSnake(initialSnake);
        setFood(initialFood);
        setDirection({ x: 0, y: -1 });
        setGameOver(false);
        setScore(0);
        setSpeed(200);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            let newDirection;
            switch (e.key) {
                case 'ArrowUp': newDirection = { x: 0, y: -1 }; break;
                case 'ArrowDown': newDirection = { x: 0, y: 1 }; break;
                case 'ArrowLeft': newDirection = { x: -1, y: 0 }; break;
                case 'ArrowRight': newDirection = { x: 1, y: 0 }; break;
                default: return;
            }
            if (direction.x !== -newDirection.x || direction.y !== -newDirection.y) {
                setDirection(newDirection);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [direction]);

    useEffect(() => {
        if (gameOver) return;

        const gameInterval = setInterval(() => {
            setSnake(prevSnake => {
                const newSnake = [...prevSnake];
                const head = { x: newSnake[0].x + direction.x, y: newSnake[0].y + direction.y };

                if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
                    setGameOver(true);
                    return prevSnake;
                }
                
                for (let i = 1; i < newSnake.length; i++) {
                    if (head.x === newSnake[i].x && head.y === newSnake[i].y) {
                        setGameOver(true);
                        return prevSnake;
                    }
                }

                newSnake.unshift(head);

                if (head.x === food.x && head.y === food.y) {
                    setFood(generateFood());
                    setScore(s => s + 1);
                    setSpeed(s => Math.max(50, s * 0.95));
                } else {
                    newSnake.pop();
                }
                
                return newSnake;
            });
        }, speed);

        return () => clearInterval(gameInterval);
    }, [snake, direction, food, gameOver, speed]);

    return (
        <div className="flex flex-col items-center gap-2">
            <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">Snake Game</h3>
            <div className="text-lg text-slate-600 dark:text-slate-400">Score: {score}</div>
            <div className="grid p-2 bg-slate-300 dark:bg-slate-800 rounded-lg" style={{ gridTemplateColumns: `repeat(${boardSize}, 1fr)` }}>
                {Array.from({ length: boardSize * boardSize }).map((_, i) => {
                    const x = i % boardSize;
                    const y = Math.floor(i / boardSize);
                    const isSnake = snake.some(seg => seg.x === x && seg.y === y);
                    const isSnakeHead = isSnake && snake[0].x === x && snake[0].y === y;
                    const isFood = food.x === x && food.y === y;
                    return (
                        <div
                            key={i}
                            className={`w-4 h-4 rounded-sm ${
                                isSnakeHead ? 'bg-green-500' :
                                isSnake ? 'bg-green-400' :
                                isFood ? 'bg-red-500' :
                                'bg-slate-200 dark:bg-slate-700'
                            }`}
                        />
                    );
                })}
            </div>
            {gameOver && (
                <div className="mt-4 flex flex-col items-center gap-2">
                    <div className="text-2xl font-bold text-red-500">Game Over</div>
                    <button onClick={resetGame} className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                        Play Again
                    </button>
                </div>
            )}
        </div>
    );
};

export const GameModal = ({ game, onClose }) => {
    if (!game) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-slate-100 dark:bg-slate-900 rounded-xl shadow-2xl p-6 relative max-w-lg w-full">
                <button onClick={onClose} className="absolute top-3 right-3 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200">
                    <XIcon />
                </button>
                {game.id === 'tic-tac-toe' && <TicTacToe />}
                {game.id === 'snake' && <SnakeGame />}
            </div>
        </div>
    );
};