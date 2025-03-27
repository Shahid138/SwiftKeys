import { useState, useEffect, useRef } from 'react';
import { faker } from '@faker-js/faker';
import { Hourglass, Clock, Award, PieChart, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TypingTest = () => {
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
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);
  const containerRef = useRef(null);

  // Generate random words when component mounts or word count changes
  useEffect(() => {
    generateWords();
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [wordCount]);

  // Generate random words using Faker with explicit spacing
  const generateWords = () => {
    setIsLoading(true);
    // Simulate loading for smoother transitions
    setTimeout(() => {
      // Generate random words using Faker with clearer spacing
      const randomWords = [];
      for (let i = 0; i < wordCount; i++) {
        randomWords.push(faker.word.sample());
      }
      const wordList = randomWords.join(' '); // Ensure proper spacing
      
      setWords(wordList);
      setUserInput('');
      setStartTime(null);
      setIsFinished(false);
      setWpm(0);
      setAccuracy(0);
      setTimeTaken(0);
      setErrorCount(0);
      setIsLoading(false);
    }, 300);
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

  // Render text with highlighting and proper spacing
  const renderText = () => {
    if (!words) return null;
    
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
        className = 'text-white';
        return (
          <motion.span 
            key={index} 
            className={`${className} inline-block`}
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        );
      }
      
      // Use non-breaking space for space characters to make them visible
      const displayChar = char === ' ' ? '\u00A0' : char;
      
      return (
        <motion.span 
          key={index} 
          className={`${className} inline-block ${char === ' ' ? 'mx-1' : ''}`}
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.01, duration: 0.2 }}
        >
          {displayChar}
        </motion.span>
      );
    });
  };

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Word count button variants
  const buttonVariants = {
    active: { 
      backgroundColor: "#2563eb", 
      scale: 1.05,
      transition: { type: "spring", stiffness: 500 }
    },
    inactive: { 
      backgroundColor: "#1f2937",
      scale: 1
    },
    hover: {
      scale: 1.1,
      transition: { type: "spring", stiffness: 400 }
    }
  };

  // Debug display of the current word list - can be removed in production
  const wordDebug = words ? words.split(' ').map((word, i) => `[${word}]`).join(' ') : '';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto p-6 mt-16 bg-[rgb(21,21,20)] rounded-xl shadow-2xl"
    >
      <motion.div 
        className="flex space-x-4 justify-center items-center mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Hourglass size={28} className="text-blue-400" />
        </motion.div>
        <span className="px-3 py-2 rounded-xl text-sm text-white bg-gray-800 font-medium">Words</span>
        
        {[10, 20, 30].map(count => (
          <motion.button 
            key={count}
            variants={buttonVariants}
            initial="inactive"
            animate={wordCount === count ? "active" : "inactive"}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl text-sm text-white font-medium"
            onClick={() => changeWordCount(count)}
          >
            {count}
          </motion.button>
        ))}
      </motion.div>
      
      {/* Text display with overlay input */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex justify-center items-center p-4 bg-[rgb(21,21,20)] text-xl rounded mb-4 h-32"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw size={30} className="text-blue-400" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-6 bg-[rgb(25,26,25)] text-xl font-mono rounded-lg mb-6 relative h-36 overflow-hidden cursor-text border border-gray-800 shadow-inner"
            onClick={() => inputRef.current && inputRef.current.focus()}
          >
            <div className="text-2xl leading-relaxed tracking-wide whitespace-pre">
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
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Debug display - uncomment if needed */}
      {/* <div className="mb-4 p-2 bg-gray-900 text-gray-300 text-xs rounded">
        <p>Debug - Words: {wordDebug}</p>
        <p>Word count: {words ? words.split(' ').length : 0}</p>
      </div> */}
      
      {/* Progress indicator when typing */}
      {startTime && !isFinished && (
        <motion.div 
          className="mb-6 bg-gray-800 h-2 rounded-full overflow-hidden"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="bg-blue-500 h-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(userInput.length / words.length) * 100}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          ></motion.div>
        </motion.div>
      )}
      
      {/* Results */}
      <AnimatePresence>
        {isFinished && (
          <motion.div 
            className="mb-6 p-6 bg-[rgb(25,26,25)] rounded-lg border border-gray-800 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <motion.h2 
              className="text-center font-bold text-white text-2xl mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Your Results
            </motion.h2>
            
            <div className="grid grid-cols-3 gap-6">
              {[
                { Icon: Clock, color: "blue", label: "Time", value: formatTime(timeTaken) },
                { Icon: Award, color: "green", label: "WPM", value: wpm },
                { Icon: PieChart, color: "yellow", label: "Accuracy", value: `${accuracy}%` }
              ].map((item, index) => (
                <motion.div 
                  key={item.label}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.8 + index * 0.2, type: "spring", stiffness: 200 }}
                  >
                    <item.Icon size={30} className={`text-${item.color}-400 mb-2`} />
                  </motion.div>
                  <p className="text-white font-medium">{item.label}</p>
                  <motion.p 
                    className={`text-3xl text-${item.color}-400 font-bold`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 + index * 0.2 }}
                  >
                    {item.value}
                  </motion.p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-6 bg-[rgb(30,31,30)] p-4 rounded-lg text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <p className="text-gray-300">
                You typed <span className="text-white font-bold">{words.split(' ').length}</span> words in <span className="text-white font-bold">{timeTaken.toFixed(1)}</span> seconds with <span className="text-white font-bold">{errorCount}</span> errors.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Reset button */}
      <motion.div className="flex justify-center">
        <motion.button
          onClick={resetTest}
          className="px-6 py-3 bg-[rgb(59,207,161)] text-white font-medium rounded-lg hover:bg-emerald-500 transition shadow-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isFinished ? 1.8 : 0.5 }}
        >
          {isFinished ? "Try Again" : "Reset"}
        </motion.button>
      </motion.div>
      
      {!isFinished && !startTime && (
        <motion.p 
          className="text-gray-400 text-center mt-6 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Click and start typing to begin
        </motion.p>
      )}
    </motion.div>
  );
};

export default TypingTest;