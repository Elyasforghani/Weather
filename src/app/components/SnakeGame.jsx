"use client";

import { useState, useEffect, useRef } from "react";

const GRID_SIZE = 20;
const CELL_SIZE = 30;
const INITIAL_SPEED = 100;

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 1, y: 0 });
  const [nextDirection, setNextDirection] = useState({ x: 1, y: 0 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const gameLoopRef = useRef(null);

  const generateFood = () => {
    return {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        setGameStarted(true);
        setGameOver(false);
        return;
      }

      if (gameOver && (e.key === " " || e.key === "Enter")) {
        e.preventDefault();
        setSnake([{ x: 10, y: 10 }]);
        setFood(generateFood());
        setDirection({ x: 1, y: 0 });
        setNextDirection({ x: 1, y: 0 });
        setScore(0);
        setGameOver(false);
        setGameStarted(true);
        return;
      }

      switch (e.key.toLowerCase()) {
        case "arrowup":
        case "w":
          e.preventDefault();
          if (direction.y === 0) setNextDirection({ x: 0, y: -1 });
          break;
        case "arrowdown":
        case "s":
          e.preventDefault();
          if (direction.y === 0) setNextDirection({ x: 0, y: 1 });
          break;
        case "arrowleft":
        case "a":
          e.preventDefault();
          if (direction.x === 0) setNextDirection({ x: -1, y: 0 });
          break;
        case "arrowright":
        case "d":
          e.preventDefault();
          if (direction.x === 0) setNextDirection({ x: 1, y: 0 });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction, gameStarted, gameOver]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    gameLoopRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        setDirection(nextDirection);
        const head = prevSnake[0];
        const newHead = {
          x: (head.x + nextDirection.x + GRID_SIZE) % GRID_SIZE,
          y: (head.y + nextDirection.y + GRID_SIZE) % GRID_SIZE,
        };

      
        if (prevSnake.some((segment) => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          setGameStarted(false);
          return prevSnake;
        }

        let newSnake = [newHead, ...prevSnake];

        
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 1);
          setFood(generateFood());
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, INITIAL_SPEED - score * 2); // Speed increases with score

    return () => clearInterval(gameLoopRef.current);
  }, [gameStarted, gameOver, food, nextDirection, score]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const width = GRID_SIZE * CELL_SIZE;
    const height = GRID_SIZE * CELL_SIZE;

    
    ctx.fillStyle = "#0f172a";
    ctx.fillRect(0, 0, width, height);

   
    ctx.strokeStyle = "rgba(148, 163, 184, 0.1)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(width, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw snake
    snake.forEach((segment, index) => {
      const x = segment.x * CELL_SIZE;
      const y = segment.y * CELL_SIZE;

      // Head is brighter
      if (index === 0) {
        ctx.fillStyle = "#06b6d4"; // Cyan
        ctx.shadowColor = "rgba(6, 182, 212, 0.6)";
        ctx.shadowBlur = 8;
      } else {
        ctx.fillStyle = "#0ea5e9"; // Light blue
        ctx.shadowColor = "none";
        ctx.shadowBlur = 0;
      }

      ctx.fillRect(x + 1, y + 1, CELL_SIZE - 2, CELL_SIZE - 2);
      ctx.shadowBlur = 0;
    });


    ctx.fillStyle = "#ec4899"; // Pink
    ctx.shadowColor = "rgba(236, 72, 153, 0.6)";
    ctx.shadowBlur = 8;
    const foodX = food.x * CELL_SIZE + CELL_SIZE / 2;
    const foodY = food.y * CELL_SIZE + CELL_SIZE / 2;
    ctx.beginPath();
    ctx.arc(foodX, foodY, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }, [snake, food]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-2">
      {/* Title */}
      <h1 className="text-4xl font-bold text-slate-50 mb-2">Snake Game</h1>
      <p className="text-slate-400 mb-4">Use arrow keys or WASD to move</p>

      {/* Score */}
      <div className="mb-2 text-center">
        <p className="text-slate-300 text-lg">
          Score: <span className="text-cyan-400 font-bold">{score}</span>
        </p>
      </div>

      {/* Canvas */}
      <div className="relative mb-8 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="border border-white/20 rounded-lg"
        />

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg">
            <p className="text-2xl font-bold text-slate-50 mb-4">Game Over</p>
            <p className="text-lg text-cyan-400 mb-6">Score: {score}</p>
            <button
              onClick={() => {
                setSnake([{ x: 10, y: 10 }]);
                setFood(generateFood());
                setDirection({ x: 1, y: 0 });
                setNextDirection({ x: 1, y: 0 });
                setScore(0);
                setGameOver(false);
                setGameStarted(true);
              }}
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg transition-colors duration-200"
            >
              Restart (Space)
            </button>
          </div>
        )}

        {/* Start Screen */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg">
            <p className="text-2xl font-bold text-slate-50 mb-6">Ready?</p>
            <button
              onClick={() => setGameStarted(true)}
              className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-lg transition-colors duration-200"
            >
              Start (Space)
            </button>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="text-center text-slate-400 text-sm max-w-md">
        <p className="mb-2">🐍 Eat the pink food to grow</p>
        <p className="mb-2">⚠️ Don't crash into yourself or the walls wrap around</p>
        <p>🚀 Speed increases as your score goes up</p>
      </div>
    </div>
  );
}