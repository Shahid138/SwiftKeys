import React, { useState, useEffect, useRef } from 'react';
import { faker } from '@faker-js/faker';
import { Hourglass, Clock, Award, PieChart } from 'lucide-react';

const OverlayTypingTest = () => {
  // States
  const [words, setWords] = useState('');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [wordCount, setWordCount] = useState(10);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Generate random words when component mounts or word count changes
  useEffect(() => {
    generateWords();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [wordCount]);

  // Generate random words using Faker
  const generateWords = () => {
    // Generate random words using Faker - modified to use the number of words specified
    const wordList = Array(wordCount).fill(0).map(() => faker.word.sample()).join(' ');
    setWords(wordList);
    setUserInput('');
    setStartTime(null);
    setIsFinished(false);
    setWpm(0);
    setAccuracy(0);
    setTimeTaken(0);
    setErrorCount(0);
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    
    // Check for errors (by comparing with the target text)
    if (value.length > userInput.length) {
      // Only check the newest character
      const newChar = value[value.length - 1];
      const expectedChar = words[value.length - 1];
      
      if (newChar !== expectedChar) {
        setErrorCount(prev => prev + 1);
      }
    }
    
    setUserInput(value);
    
    // Start timer on first keystroke
    if (!startTime && value.length === 1) {
      setStartTime(new Date());
    }
    
    // Check if test is complete
    if (value.length === words.length) {
      const endTime = new Date();
      const timeInSeconds = (endTime - startTime) / 1000;
      const timeInMinutes = timeInSeconds / 60;
      const wordsCount = words.split(' ').length;
      const calculatedWpm = Math.round(wordsCount / timeInMinutes);
      
      // Calculate accuracy
      const totalChars = words.length;
      const calculatedAccuracy = Math.round(((totalChars - errorCount) / totalChars) * 100);
      
      setWpm(calculatedWpm);
      setAccuracy(calculatedAccuracy);
      setTimeTaken(timeInSeconds);
      setIsFinished(true);
    }
  };

  // Reset the test
  const resetTest = () => {
    generateWords();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Change word count
  const changeWordCount = (count) => {
    setWordCount(count);
  };

  // Render text with highlighting
  const renderText = () => {
    const wordsArray = words.split('');
    const userInputArray = userInput.split('');
    
    return wordsArray.map((char, index) => {
      let className = 'text-gray-500'; // Default color for untyped text
      
      if (index < userInputArray.length) {
        // Correct character
        if (char === userInputArray[index]) {
          className = 'text-green-400';
        } 
        // Incorrect character
        else {
          className = 'text-red-500';
        }
      }
      // Current position
      else if (index === userInputArray.length) {
        className = 'text-white bg-gray-700 animate-pulse';
      }
      
      return (
        <span key={index} className={className}>
          {char}
        </span>
      );
    });
  };

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-16 bg-[rgb(21,21,20)]">
      <div className="flex space-x-3 justify-center items-center mb-6">
        <Hourglass size={25} className="text-white" />
        <span className="px-2 py-2 rounded-xl text-sm text-white bg-gray-800">T Words</span>
        <button 
          className={`px-2 py-2 rounded-xl text-sm text-white ${wordCount === 10 ? 'bg-blue-600' : 'bg-gray-800'}`}
          onClick={() => changeWordCount(10)}
        >
          10
        </button>
        <button 
          className={`px-2 py-2 rounded-xl text-sm text-white ${wordCount === 20 ? 'bg-blue-600' : 'bg-gray-800'}`}
          onClick={() => changeWordCount(20)}
        >
          20
        </button>
        <button 
          className={`px-2 py-2 rounded-xl text-sm text-white ${wordCount === 30 ? 'bg-blue-600' : 'bg-gray-800'}`}
          onClick={() => changeWordCount(30)}
        >
          30
        </button>
      </div>
      
      {/* Text display with overlay input */}
      <div 
        ref={containerRef}
        className="p-4 bg-[rgb(21,21,20)] text-xl font-mono rounded mb-4 relative h-32 overflow-hidden cursor-text"
        onClick={() => inputRef.current && inputRef.current.focus()}
      >
        <div className="text-2xl leading-relaxed tracking-wide">
          {renderText()}
        </div>
        
        {/* Hidden input that receives typing */}
        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onChange={handleInputChange}
          disabled={isFinished}
          className="absolute opacity-0 top-0 left-0 h-full w-full cursor-text"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
        />
      </div>
      
      {/* Progress indicator when typing */}
      {startTime && !isFinished && (
        <div className="mb-4 bg-[rgb(21,21,20)] h-1 rounded-full overflow-hidden">
          <div 
            className="bg-blue-500 h-full transition-all duration-300"
            style={{ width: `${(userInput.length / words.length) * 100}%` }}
          ></div>
        </div>
      )}
      
      {/* Results */}
      {isFinished && (
        <div className="mb-4 p-4 bg-[rgb(21,21,20)] rounded-lg">
          <h2 className="text-center font-bold text-white text-xl mb-4">Your Results</h2>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <Clock size={24} className="text-blue-400 mb-1" />
              <p className="text-white font-medium">Time</p>
              <p className="text-2xl text-blue-400 font-bold">{formatTime(timeTaken)}</p>
            </div>  
            
            <div className="flex flex-col items-center">
              <Award size={24} className="text-green-400 mb-1" />
              <p className="text-white font-medium">WPM</p>
              <p className="text-2xl text-green-400 font-bold">{wpm}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <PieChart size={24} className="text-yellow-400 mb-1" />
              <p className="text-white font-medium">Accuracy</p>
              <p className="text-2xl text-yellow-400 font-bold">{accuracy}%</p>
            </div>
          </div>
          
          <div className="mt-4 bg-[rgb(21,21,20)] p-3 rounded text-center">
            <p className="text-gray-300 text-sm">
              You typed <span className="text-white font-bold">{words.split(' ').length}</span> words in <span className="text-white font-bold">{timeTaken.toFixed(1)}</span> seconds with <span className="text-white font-bold">{errorCount}</span> errors.
            </p>
          </div>
        </div>
      )}
      
      {/* Reset button */}
      <button
        onClick={resetTest}
        className="ml-[240px] w-[20%] p-2 bg-[rgb(59,207,161)] text-white rounded hover:bg-emerald-500 transition"
      >
        {isFinished ? "Try Again" : "Reset"}
      </button>
      
      {!isFinished && !startTime && (
        <p className="text-gray-500 text-center mt-4 text-sm">Click and start typing to begin</p>
      )}
    </div>
  );
};

export default OverlayTypingTest;