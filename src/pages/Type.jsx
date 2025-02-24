import React, { useState, useEffect, useRef } from 'react';
import { faker } from '@faker-js/faker';

const TypingSpeedTest = () => {
  const [words, setWords] = useState([]);
  const [typedWords, setTypedWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const inputRef = useRef(null);

  useEffect(() => {
    // Generate 10 random words
    const generatedWords = faker.word.words(10).toLowerCase().split(' ');
    setWords(generatedWords);
    setTypedWords(new Array(generatedWords.length).fill(''));
  }, []);

  const calculateStats = () => {
    if (startTime) {
      const timeElapsed = (Date.now() - startTime) / 1000;
      const wordsTyped = currentWordIndex;
      const newWpm = Math.round((wordsTyped / timeElapsed) * 60);
      setWpm(newWpm);
    }
  };

  const handleInput = (e) => {
    const value = e.target.value;
    
    if (!startTime) {
      setStartTime(Date.now());
    }

    if (value.endsWith(' ')) {
      // Word completed
      if (currentWordIndex < words.length - 1) {
        setCurrentWordIndex(prev => prev + 1);
        setCurrentInput('');
        const newTypedWords = [...typedWords];
        newTypedWords[currentWordIndex] = value.trim();
        setTypedWords(newTypedWords);
        calculateStats();
      }
    } else {
      setCurrentInput(value);
      const newTypedWords = [...typedWords];
      newTypedWords[currentWordIndex] = value;
      setTypedWords(newTypedWords);
    }
  };

  return (
    <div className="min-h-screen bg-[rgb(21,21,20)] p-8">
      <div className="max-w-2xl mx-auto">
        {/* Controls */}
        <div className="flex gap-4 mb-8 text-gray-400">
          <span className="flex items-center gap-2">⌛ time</span>
          <span className="flex items-center gap-2">T words</span>
          <div className="flex gap-2">
            <button className="px-2 py-1 rounded bg-gray-800 text-white">10</button>
            <button className="px-2 py-1 rounded">25</button>
            <button className="px-2 py-1 rounded">50</button>
          </div>
        </div>

        {/* Main typing area */}
        <div className="relative mb-8">
          {/* Words display */}
          <div className="text-xl leading-relaxed text-gray-600 font-mono">
            {words.map((word, index) => (
              <span
                key={index}
                className={`
                  ${index === currentWordIndex ? 'text-gray-300' : ''}
                  ${index < currentWordIndex ? 'text-gray-500' : ''}
                `}
              >
                {word}{' '}
              </span>
            ))}
          </div>

          {/* Invisible input - covers the entire typing area */}
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={handleInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-text"
            autoFocus
          />

          {/* Typed text overlay */}
          <div 
            className="absolute top-0 left-0 text-xl leading-relaxed font-mono pointer-events-none"
            style={{ 
              mixBlendMode: 'difference',
              color: '#ffffff'
            }}
          >
            {typedWords.map((word, index) => (
              <span key={index}>
                {word}{' '}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="text-sm text-gray-500">
          Time: {startTime ? Math.round((Date.now() - startTime) / 100) / 10 : 0}s |
          WPM: {wpm} |
          Accuracy: {accuracy.toFixed(2)}%
        </div>
      </div>
    </div>
  );
};

export default TypingSpeedTest;