import React, { useState, useEffect, useRef } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { RotateCcw, Activity, Clock, Award, PieChart } from "lucide-react";
import { WORD_CORPUS } from "../data/wordCorpus";
import { generateWords } from "../utils/generateWords";

type AnalyticsPoint = {
  time: number;
  charsTyped: number;
};

const TypingTest = () => {
  const [words, setWords] = useState("");
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [duration, setDuration] = useState(10);
  const [mode, setMode] = useState<"time" | "words">("words");
  const [visibleStartIndex, setVisibleStartIndex] = useState(0);
  const [errorCount, setErrorCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const [analytics, setAnalytics] = useState<AnalyticsPoint[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    resetTest();
  }, [duration, mode]);

  useEffect(() => {
    if (textContainerRef.current && words) {
      const charsPerLine = calculateCharsPerLine();
      const currentLine = Math.floor(userInput.length / charsPerLine);
      const startLine = Math.max(0, currentLine - 1);
      const newStartIndex = startLine * charsPerLine;

      if (newStartIndex !== visibleStartIndex) {
        setVisibleStartIndex(newStartIndex);
      }
    }
  }, [userInput.length, words]);

  // Timer countdown for time mode
  useEffect(() => {
    if (mode === "time" && startTime && !isFinished) {
      timerRef.current = setInterval(() => {
        const elapsed = (Date.now() - startTime.getTime()) / 1000;
        const remaining = duration - elapsed;

        if (remaining <= 0) {
          setTimeLeft(0);
          setEndTime(new Date());
          setIsFinished(true);
          if (timerRef.current) clearInterval(timerRef.current);
        } else {
          setTimeLeft(remaining);
        }
      }, 100);

      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [mode, startTime, isFinished, duration]);

  const calculateCharsPerLine = () => {
    const containerWidth = textContainerRef.current?.offsetWidth || 700;
    const charWidth = 14;
    return Math.floor(containerWidth / charWidth);
  };

  const resetTest = () => {
    // Generate more words for time mode or exact amount for words mode
    const wordAmount = mode === "time" ? 200 : duration;
    setWords(generateWords(WORD_CORPUS, wordAmount));
    setUserInput("");
    setStartTime(null);
    setEndTime(null);
    setIsFinished(false);
    setAnalytics([]);
    setVisibleStartIndex(0);
    setErrorCount(0);
    setTimeLeft(mode === "time" ? duration : null);
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFinished) return;

    const value = e.target.value;

    if (!startTime && value.length === 1) {
      setStartTime(new Date());
    }

    if (value.length > userInput.length) {
      const newChar = value[value.length - 1];
      const expectedChar = words[value.length - 1];
      if (newChar !== expectedChar) {
        setErrorCount((prev) => prev + 1);
      }
    }

    if (startTime) {
      const elapsed = (Date.now() - startTime.getTime()) / 1000;

      setAnalytics((prev) => [
        ...prev,
        {
          time: Number(elapsed.toFixed(1)),
          charsTyped: value.length,
        },
      ]);
    }

    setUserInput(value);

    // Only finish on word completion in words mode
    if (mode === "words" && value.length === words.length) {
      setEndTime(new Date());
      setIsFinished(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const renderText = () => {
    const charsPerLine = calculateCharsPerLine();
    const linesToShow = 3;
    const endIndex = Math.min(
      words.length,
      visibleStartIndex + charsPerLine * linesToShow
    );
    const visibleText = words.slice(visibleStartIndex, endIndex);

    return visibleText.split("").map((char, i) => {
      const actualIndex = visibleStartIndex + i;
      let className = "text-gray-600";

      if (actualIndex < userInput.length) {
        if (char === userInput[actualIndex]) {
          className = "text-gray-400";
        } else {
          className = "text-red-500";
        }
      } else if (actualIndex === userInput.length) {
        className = "text-white border-b-2 border-gray-400 animate-pulse";
      }

      return (
        <span key={actualIndex} className={className}>
          {char}
        </span>
      );
    });
  };

  // Real-time calculations
  const currentTime = startTime
    ? (Date.now() - startTime.getTime()) / 1000
    : 0;

  const currentWpm =
    startTime && userInput.length > 0
      ? Math.round(userInput.length / 5 / (currentTime / 60))
      : 0;

  const currentAccuracy =
    userInput.length > 0
      ? Math.max(
          0,
          Number(
            (((userInput.length - errorCount) / userInput.length) * 100).toFixed(
              2
            )
          )
        )
      : 100.0;

  const wpmSeries = analytics.map((p) => {
    const minutes = p.time / 60;
    const wpm = minutes > 0 ? p.charsTyped / 5 / minutes : 0;

    return {
      time: p.time,
      wpm: Math.round(wpm),
    };
  });

  const averageWpm =
    wpmSeries.length > 0
      ? wpmSeries.reduce((sum, p) => sum + p.wpm, 0) / wpmSeries.length
      : 0;

  const totalTime =
    startTime && endTime ? (endTime.getTime() - startTime.getTime()) / 1000 : 0;

  const finalWpm =
    totalTime > 0 ? Math.round(userInput.length / 5 / (totalTime / 60)) : 0;

  const accuracy =
    userInput.length > 0
      ? Number(
          (((userInput.length - errorCount) / userInput.length) * 100).toFixed(2)
        )
      : 100.0;

  const formatTime = (seconds: number) => {
    const secs = Math.floor(seconds);
    return `${secs}s`;
  };

  const wordsTyped = userInput.trim().split(/\s+/).filter(w => w.length > 0).length;

  return (
    <div className="min-h-[70dvh] text-white flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* MODE TOGGLE */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            onClick={() => setMode("time")}
            disabled={startTime !== null && !isFinished}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              mode === "time"
                ? "text-[rgb(59,207,161)] border-b-2 border-[rgb(59,207,161)]"
                : "text-gray-500"
            } disabled:opacity-50`}
          >
            <Clock size={16} />
            <span className="text-sm">time</span>
          </button>
          <button
            onClick={() => setMode("words")}
            disabled={startTime !== null && !isFinished}
            className={`flex items-center gap-2 px-4 py-2 rounded ${
              mode === "words"
                ? "text-[rgb(59,207,161)] border-b-2 border-[rgb(59,207,161)]"
                : "text-gray-500"
            } disabled:opacity-50`}
          >
            <span className="text-lg">T</span>
            <span className="text-sm">words</span>
          </button>
        </div>

        {/* DURATION/COUNT OPTIONS */}
        <div className="flex gap-4 mb-8 justify-center">
          {mode === "words" ? (
            <>
              {[10, 25, 50, 100].map((c) => (
                <button
                  key={c}
                  onClick={() => setDuration(c)}
                  disabled={startTime !== null && !isFinished}
                  className={`px-4 py-1 rounded text-sm ${
                    c === duration
                      ? "bg-gray-700 text-white"
                      : "text-gray-500 hover:text-gray-300"
                  } disabled:opacity-50`}
                >
                  {c}
                </button>
              ))}
            </>
          ) : (
            <>
              {[15, 30, 60, 120].map((t) => (
                <button
                  key={t}
                  onClick={() => setDuration(t)}
                  disabled={startTime !== null && !isFinished}
                  className={`px-4 py-1 rounded text-sm ${
                    t === duration
                      ? "bg-gray-700 text-white"
                      : "text-gray-500 hover:text-gray-300"
                  } disabled:opacity-50`}
                >
                  {t}
                </button>
              ))}
            </>
          )}
        </div>

        {/* TYPING AREA */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="bg-transparent mb-8 cursor-text overflow-hidden"
          style={{ height: '180px' }}
        >
          <div
            ref={textContainerRef}
            className="font-mono text-2xl leading-relaxed break-words max-w-3xl mx-auto tracking-wide"
          >
            {renderText()}
          </div>

          <input
            ref={inputRef}
            value={userInput}
            onChange={handleInputChange}
            disabled={isFinished}
            className="sr-only"
            spellCheck={false}
            autoComplete="off"
            aria-label="Type the text shown above"
          />
        </div>

        {/* REAL-TIME STATS */}
        <div className="flex items-center justify-center gap-8 text-sm text-gray-500 mb-8">
          <div>
            <span className="text-[rgb(59,207,161)]">
              {mode === "time" ? "Time Left:" : "Time:"}
            </span>{" "}
            {mode === "time" && timeLeft !== null
              ? formatTime(timeLeft)
              : formatTime(currentTime)}
          </div>
          <div className="text-gray-700">|</div>
          <div>
            <span className="text-[rgb(59,207,161)]">WPM:</span> {currentWpm}
          </div>
          <div className="text-gray-700">|</div>
          <div>
            <span className="text-[rgb(59,207,161)]">Accuracy:</span> {currentAccuracy}%
          </div>
          {mode === "time" && (
            <>
              <div className="text-gray-700">|</div>
              <div>
                <span className="text-[rgb(59,207,161)]">Words:</span> {wordsTyped}
              </div>
            </>
          )}
        </div>

        {/* RESET BUTTON */}
        <div className="flex justify-center mb-8">
          <button
            onClick={resetTest}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-300 transition"
            aria-label="Reset test"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        {/* PERFORMANCE GRAPH */}
        {isFinished && (
          <div className="bg-gray-800 p-8 rounded-lg mt-12">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <Activity className="text-blue-400" size={20} />
                <h2 className="text-xl font-semibold">Performance Analysis</h2>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Clock className="text-blue-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">Time</p>
                    <p className="text-lg font-bold text-blue-400">
                      {formatTime(totalTime)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Award className="text-green-400" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">WPM</p>
                    <p className="text-lg font-bold text-green-400">
                      {finalWpm}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <PieChart className="text-[rgb(59,207,161)]" size={18} />
                  <div>
                    <p className="text-xs text-gray-400">Accuracy</p>
                    <p className="text-lg font-bold text-[rgb(59,207,161)]">
                      {accuracy}%
                    </p>
                  </div>
                </div>

                {mode === "time" && (
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 text-lg">📝</span>
                    <div>
                      <p className="text-xs text-gray-400">Words</p>
                      <p className="text-lg font-bold text-blue-400">
                        {wordsTyped}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={wpmSeries}
                margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
              >
                <XAxis
                  dataKey="time"
                  stroke="#9ca3af"
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  label={{
                    value: "Time (seconds)",
                    position: "insideBottom",
                    offset: -5,
                    fill: "#9ca3af",
                    fontSize: 12,
                  }}
                />
                <YAxis
                  stroke="#9ca3af"
                  tick={{ fill: "#9ca3af", fontSize: 12 }}
                  label={{
                    value: "WPM",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#9ca3af",
                    fontSize: 12,
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                    color: "#fff",
                  }}
                  labelStyle={{ color: "#9ca3af" }}
                  formatter={(value: number | undefined) =>
                    value !== undefined
                      ? [`${value} WPM`, "Speed"]
                      : ["0 WPM", "Speed"]
                  }
                  labelFormatter={(label) => `Time: ${label}s`}
                />

                <ReferenceLine
                  y={averageWpm}
                  stroke="#f59e0b"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  label={{
                    value: `Avg: ${Math.round(averageWpm)} WPM`,
                    position: "right",
                    fill: "#f59e0b",
                    fontSize: 12,
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="wpm"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 6, fill: "#10b981" }}
                />
              </LineChart>
            </ResponsiveContainer>

            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 bg-green-500"></div>
                <span className="text-gray-400">Speed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-0.5 border-t-2 border-dashed border-amber-500"></div>
                <span className="text-gray-400">AVG</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TypingTest;