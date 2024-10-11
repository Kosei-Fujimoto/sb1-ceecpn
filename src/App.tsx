import React, { useState, useEffect } from 'react';
import { Skull, RotateCcw, Play } from 'lucide-react';

function App() {
  const [chamber, setChamber] = useState<number[]>([]);
  const [currentChamber, setCurrentChamber] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newChamber = Array(6).fill(0);
    newChamber[Math.floor(Math.random() * 6)] = 1;
    setChamber(newChamber);
    setCurrentChamber(0);
    setGameOver(false);
    setScore(0);
  };

  const pullTrigger = () => {
    if (chamber[currentChamber] === 1) {
      setGameOver(true);
    } else {
      setScore(score + 1);
      setCurrentChamber((currentChamber + 1) % 6);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6">ロシアンルーレット</h1>
        {gameOver ? (
          <div>
            <Skull className="w-24 h-24 mx-auto mb-4 text-red-500" />
            <p className="text-2xl font-bold mb-4">ゲームオーバー</p>
            <p className="text-xl mb-4">スコア: {score}</p>
            <button
              onClick={resetGame}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center mx-auto"
            >
              <RotateCcw className="mr-2" />
              リスタート
            </button>
          </div>
        ) : (
          <div>
            <div className="flex justify-center mb-6">
              {chamber.map((_, index) => (
                <div
                  key={index}
                  className={`w-8 h-8 rounded-full border-2 border-gray-400 mx-1 ${
                    index === currentChamber ? 'bg-yellow-400' : ''
                  }`}
                />
              ))}
            </div>
            <p className="text-xl mb-4">スコア: {score}</p>
            <button
              onClick={pullTrigger}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors flex items-center justify-center mx-auto"
            >
              <Play className="mr-2" />
              引き金を引く
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;