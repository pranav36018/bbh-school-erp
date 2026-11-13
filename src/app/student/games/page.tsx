"use client";

import React, { useState, useEffect } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  Brain,
  Zap,
  Sparkles,
  Trophy,
  RotateCcw,
  Timer,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Award,
  Flame,
  ArrowRight,
  Lightbulb,
  Gamepad2,
  Star,
  Target,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Info,
  ListOrdered,
  Check,
  X,
} from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/mock-data";

// ==========================================
// GAME 1: VEDIC MATH BLITZ DATA & LOGIC
// ==========================================
interface MathQuestion {
  num1: number;
  num2: number;
  op: "+" | "-" | "×";
  answer: number;
  trickExplanation: string;
}

function generateMathQuestion(): MathQuestion {
  const types = ["multiply_11", "square_5", "addition", "multiplication"];
  const selectedType = types[Math.floor(Math.random() * types.length)];

  if (selectedType === "multiply_11") {
    const num = Math.floor(12 + Math.random() * 75); // 12 to 86
    const answer = num * 11;
    const d1 = Math.floor(num / 10);
    const d2 = num % 10;
    return {
      num1: num,
      num2: 11,
      op: "×",
      answer,
      trickExplanation: `Vedic Shortcut for ×11: Separate ${d1} and ${d2}, then place their sum (${d1 + d2}) in the middle! ${num} × 11 = ${answer}`,
    };
  }

  if (selectedType === "square_5") {
    const bases = [15, 25, 35, 45, 65, 75, 85, 95];
    const num = bases[Math.floor(Math.random() * bases.length)];
    const tens = Math.floor(num / 10);
    const answer = num * num;
    return {
      num1: num,
      num2: num,
      op: "×",
      answer,
      trickExplanation: `Ekadhikena Purvena Rule: Multiply tens (${tens}) by next integer (${tens + 1} = ${tens * (tens + 1)}) and suffix '25'. Thus ${num}² = ${answer}`,
    };
  }

  if (selectedType === "addition") {
    const num1 = Math.floor(25 + Math.random() * 70);
    const num2 = Math.floor(18 + Math.random() * 60);
    return {
      num1,
      num2,
      op: "+",
      answer: num1 + num2,
      trickExplanation: `Mental Breakdown: (${num1} + ${Math.floor(num2 / 10) * 10}) + ${num2 % 10} = ${num1 + num2}`,
    };
  }

  // General multiplication
  const num1 = Math.floor(6 + Math.random() * 9);
  const num2 = Math.floor(7 + Math.random() * 9);
  return {
    num1,
    num2,
    op: "×",
    answer: num1 * num2,
    trickExplanation: `Tables Mastery: ${num1} × ${num2} = ${num1 * num2}`,
  };
}

// ==========================================
// GAME 2: LOGIC WORD CIPHER DATA
// ==========================================
interface WordCipherItem {
  word: string; // all uppercase
  clue: string;
  category: string;
  funFact: string;
}

function getWordLetterHint(word: string) {
  const len = word.length;
  if (len <= 5) {
    // 1-letter hint for small words (<= 5 letters)
    const letter = word[0];
    const preview = [letter, ...Array(len - 1).fill("_")].join(" ");
    return {
      type: "small" as const,
      letterCount: 1,
      description: `Small Word (${len} letters): 1 letter revealed`,
      detail: `The 1st letter is "${letter}"`,
      preview,
    };
  } else {
    // 2-letter hint for big words (>= 6 letters)
    const firstLetter = word[0];
    const lastLetter = word[len - 1];
    const preview = [firstLetter, ...Array(len - 2).fill("_"), lastLetter].join(" ");
    return {
      type: "big" as const,
      letterCount: 2,
      description: `Big Word (${len} letters): 2 letters revealed`,
      detail: `Starts with "${firstLetter}" and ends with "${lastLetter}"`,
      preview,
    };
  }
}

const WORD_PUZZLES: WordCipherItem[] = [
  {
    word: "PRISM",
    clue: "Transparent optical glass block that disperses white light into seven spectrum colors (VIBGYOR).",
    category: "Physics (Class 10)",
    funFact: "Sir Isaac Newton proved using a double prism that prism itself does not color the light, but rather refracts existing wavelengths!",
  },
  {
    word: "OXYGEN",
    clue: "Crucial element produced during Photosynthesis, vital for cellular respiration.",
    category: "Biology & Chemistry",
    funFact: "Accounts for approximately 21% of Earth's atmosphere and 65% of the human body's mass!",
  },
  {
    word: "NEURON",
    clue: "Specialized microscopic cell in the human brain that transmits electrical and chemical nerve signals.",
    category: "Human Anatomy",
    funFact: "The human brain contains approximately 86 billion neurons communicating at speeds up to 430 km/h!",
  },
  {
    word: "EQUATOR",
    clue: "Imaginary zero-degree latitude dividing Earth into Northern and Southern hemispheres.",
    category: "Geography",
    funFact: "At the Equator, day and night are almost exactly 12 hours long throughout the entire year!",
  },
  {
    word: "VALENCE",
    clue: "Combining power of an element, determined by electrons in its outermost shell.",
    category: "Chemistry (Class 9-10)",
    funFact: "Derived from the Latin word 'valentia', meaning strength or capacity to bond!",
  },
];

// ==========================================
// GAME 3: MATRIX MEMORY CONFIG
// ==========================================
const GRID_SIZE = 4; // 4x4 = 16 tiles

function generateRandomPattern(count: number): number[] {
  const indices: number[] = [];
  while (indices.length < count) {
    const r = Math.floor(Math.random() * (GRID_SIZE * GRID_SIZE));
    if (!indices.includes(r)) indices.push(r);
  }
  return indices;
}

export default function StudentGamesPage() {
  const student = DEMO_STUDENTS[0];
  const [activeGame, setActiveGame] = useState<"VEDIC_MATH" | "WORD_CIPHER" | "MATRIX_MEMORY">("VEDIC_MATH");

  // Instructions drawer state
  const [showInstructions, setShowInstructions] = useState(true);

  // Global Brain Points
  const [brainPoints, setBrainPoints] = useState(380);

  // ----------------------------------------------------
  // GAME 1: VEDIC MATH BLITZ STATE
  // ----------------------------------------------------
  const [mathQuestion, setMathQuestion] = useState<MathQuestion>(generateMathQuestion());
  const [mathUserAnswer, setMathUserAnswer] = useState("");
  const [mathScore, setMathScore] = useState(0);
  const [mathStreak, setMathStreak] = useState(0);
  const [mathTimer, setMathTimer] = useState(30);
  const [mathActive, setMathActive] = useState(false);
  const [lastMathTrick, setLastMathTrick] = useState<string | null>(null);

  // Timer loop for Vedic Math
  useEffect(() => {
    if (!mathActive) return;
    if (mathTimer <= 0) {
      setMathActive(false);
      return;
    }
    const interval = setInterval(() => {
      setMathTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [mathActive, mathTimer]);

  const startMathGame = () => {
    setMathActive(true);
    setMathScore(0);
    setMathStreak(0);
    setMathTimer(30);
    setMathUserAnswer("");
    setLastMathTrick(null);
    setMathQuestion(generateMathQuestion());
  };

  const handleMathSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mathActive || !mathUserAnswer) return;

    const val = parseInt(mathUserAnswer.trim(), 10);
    if (val === mathQuestion.answer) {
      const addedPoints = 10 * (mathStreak + 1);
      setMathScore((s) => s + addedPoints);
      setMathStreak((st) => st + 1);
      setBrainPoints((bp) => bp + addedPoints);
      setLastMathTrick(`✅ Correct! ${mathQuestion.trickExplanation}`);
    } else {
      setMathStreak(0);
      setLastMathTrick(`❌ Incorrect (Answer was ${mathQuestion.answer}). ${mathQuestion.trickExplanation}`);
    }

    setMathUserAnswer("");
    setMathQuestion(generateMathQuestion());
  };

  // ----------------------------------------------------
  // GAME 2: LOGIC WORD CIPHER STATE
  // ----------------------------------------------------
  const [cipherPuzzleIndex, setCipherPuzzleIndex] = useState(0);
  const currentCipher = WORD_PUZZLES[cipherPuzzleIndex];
  const [cipherGuesses, setCipherGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [cipherSolved, setCipherSolved] = useState(false);
  const [cipherMessage, setCipherMessage] = useState("");
  const [showCipherHint, setShowCipherHint] = useState(false);

  const handleCipherSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cipherSolved) return;
    const cleanGuess = currentGuess.trim().toUpperCase();

    if (cleanGuess.length !== currentCipher.word.length) {
      setCipherMessage(`Word must be exactly ${currentCipher.word.length} letters long!`);
      return;
    }

    const updated = [...cipherGuesses, cleanGuess];
    setCipherGuesses(updated);
    setCurrentGuess("");
    setCipherMessage("");

    if (cleanGuess === currentCipher.word) {
      setCipherSolved(true);
      setBrainPoints((bp) => bp + 50);
      setCipherMessage(`🎉 Brilliant Deduction! You decoded '${currentCipher.word}'! (+50 Brain Points)`);
    } else if (updated.length >= 6) {
      setCipherMessage(`Game Over! The word was '${currentCipher.word}'.`);
    }
  };

  const resetCipherGame = (nextIndex?: number) => {
    const idx = nextIndex !== undefined ? nextIndex : (cipherPuzzleIndex + 1) % WORD_PUZZLES.length;
    setCipherPuzzleIndex(idx);
    setCipherGuesses([]);
    setCurrentGuess("");
    setCipherSolved(false);
    setCipherMessage("");
    setShowCipherHint(false);
  };

  // ----------------------------------------------------
  // GAME 3: MATRIX MEMORY STATE
  // ----------------------------------------------------
  const [matrixLevel, setMatrixLevel] = useState(1);
  const [tilesToMemorize, setTilesToMemorize] = useState<number[]>(generateRandomPattern(3));
  const [matrixState, setMatrixState] = useState<"IDLE" | "FLASHING" | "PLAYING" | "RESULT">("IDLE");
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [matrixResultSuccess, setMatrixResultSuccess] = useState<boolean | null>(null);

  const startMatrixRound = (levelCount = 3) => {
    const pattern = generateRandomPattern(levelCount);
    setTilesToMemorize(pattern);
    setSelectedTiles([]);
    setMatrixResultSuccess(null);
    setMatrixState("FLASHING");

    // Flash for 2.2 seconds then flip to blank
    setTimeout(() => {
      setMatrixState("PLAYING");
    }, 2200);
  };

  const handleTileClick = (index: number) => {
    if (matrixState !== "PLAYING") return;
    if (selectedTiles.includes(index)) return;

    const newSelected = [...selectedTiles, index];
    setSelectedTiles(newSelected);

    // If user clicked all required count of tiles
    if (newSelected.length === tilesToMemorize.length) {
      const isPerfect = newSelected.every((idx) => tilesToMemorize.includes(idx));
      setMatrixResultSuccess(isPerfect);
      setMatrixState("RESULT");

      if (isPerfect) {
        setBrainPoints((bp) => bp + 40);
        setMatrixLevel((l) => l + 1);
      }
    }
  };

  return (
    <PortalLayout
      portal="student"
      userName={student.fullName}
      userRole={`Student • ${student.className}-${student.section}`}
      userHumanId={student.humanId}
      institutionName="DPS Bengaluru North"
      academicYear="AY-2026-2027"
    >
      {/* Top Banner with Brain Points & Trophy */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 flex items-center gap-1 shadow-sm">
              <Brain className="w-3.5 h-3.5" />
              Cognitive Sparks Arena
            </span>
            <span className="text-xs text-slate-400 font-mono">NEP 2020 Critical Thinking Tools</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            Interactive Mind Games & Brain Gym
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Boost mathematical speed, deductive logic, and visual spatial memory with 3 fun cognitive exercises.
          </p>
        </div>

        {/* Global Brain Score Meter */}
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
          <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-300 uppercase tracking-wider block font-bold">Total Brain Points</span>
            <span className="text-2xl font-black text-amber-400">{brainPoints} XP</span>
          </div>
        </div>
      </div>

      {/* 3 Game Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Game 1 Selector */}
        <button
          onClick={() => setActiveGame("VEDIC_MATH")}
          className={`p-4 rounded-2xl text-left border transition-all ${
            activeGame === "VEDIC_MATH"
              ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-300"
              : "bg-white text-slate-800 border-slate-200 hover:border-amber-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
              activeGame === "VEDIC_MATH" ? "bg-slate-950 text-amber-400" : "bg-amber-100 text-amber-800"
            }`}>
              <Zap className="w-4 h-4" />
            </div>
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
              activeGame === "VEDIC_MATH" ? "bg-slate-950 text-amber-300" : "bg-slate-100 text-slate-600"
            }`}>
              Speed Math
            </span>
          </div>
          <h3 className="font-extrabold text-sm">1. Vedic Math Blitz</h3>
          <p className={`text-xs mt-1 ${activeGame === "VEDIC_MATH" ? "text-slate-900" : "text-slate-500"}`}>
            Rapid mental arithmetic, 30s timer, streak combos & Vedic shortcuts.
          </p>
        </button>

        {/* Game 2 Selector */}
        <button
          onClick={() => setActiveGame("WORD_CIPHER")}
          className={`p-4 rounded-2xl text-left border transition-all ${
            activeGame === "WORD_CIPHER"
              ? "bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-300"
              : "bg-white text-slate-800 border-slate-200 hover:border-blue-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
              activeGame === "WORD_CIPHER" ? "bg-white text-blue-700" : "bg-blue-100 text-blue-800"
            }`}>
              <Sparkles className="w-4 h-4" />
            </div>
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
              activeGame === "WORD_CIPHER" ? "bg-blue-900 text-blue-200" : "bg-slate-100 text-slate-600"
            }`}>
              Deduction
            </span>
          </div>
          <h3 className="font-extrabold text-sm">2. Logic Word Cipher</h3>
          <p className={`text-xs mt-1 ${activeGame === "WORD_CIPHER" ? "text-blue-100" : "text-slate-500"}`}>
            Decode secret academic & scientific words from clues in 6 attempts.
          </p>
        </button>

        {/* Game 3 Selector */}
        <button
          onClick={() => setActiveGame("MATRIX_MEMORY")}
          className={`p-4 rounded-2xl text-left border transition-all ${
            activeGame === "MATRIX_MEMORY"
              ? "bg-purple-600 text-white border-purple-500 shadow-md ring-2 ring-purple-300"
              : "bg-white text-slate-800 border-slate-200 hover:border-purple-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
              activeGame === "MATRIX_MEMORY" ? "bg-white text-purple-700" : "bg-purple-100 text-purple-800"
            }`}>
              <Target className="w-4 h-4" />
            </div>
            <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
              activeGame === "MATRIX_MEMORY" ? "bg-purple-900 text-purple-200" : "bg-slate-100 text-slate-600"
            }`}>
              Spatial Memory
            </span>
          </div>
          <h3 className="font-extrabold text-sm">3. Matrix Memory Recall</h3>
          <p className={`text-xs mt-1 ${activeGame === "MATRIX_MEMORY" ? "text-purple-100" : "text-slate-500"}`}>
            Memorize flashing tile patterns and recall them to build working memory.
          </p>
        </button>
      </div>

      {/* ========================================================== */}
      {/* GAME 1 CANVAS: VEDIC MATH BLITZ                            */}
      {/* ========================================================== */}
      {activeGame === "VEDIC_MATH" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <h2 className="text-lg font-black text-slate-900">Vedic Math Blitz</h2>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-amber-50 text-amber-800 rounded border border-amber-200">
                  30s Sprint
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Solve as many calculations as possible before the timer runs out! Streak combos give multiplier bonuses.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl font-mono">
                <Timer className="w-4 h-4 text-rose-600" />
                <span className="font-bold text-slate-900 text-sm">{mathTimer}s</span>
              </div>

              <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl font-bold text-amber-800 border border-amber-200">
                <Flame className="w-4 h-4 text-amber-600" />
                <span>Streak: x{mathStreak + 1}</span>
              </div>

              <div className="bg-slate-900 text-amber-400 px-3 py-1.5 rounded-xl font-black text-sm">
                Score: {mathScore}
              </div>
            </div>
          </div>

          {!mathActive ? (
            <div className="p-8 text-center max-w-md mx-auto space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto text-2xl font-black border border-amber-200">
                ⚡
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">Ready for Vedic Math Sprint?</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Test your mental arithmetic speed with Vedic tricks, squares, and multiplications. You get 30 seconds to score maximum points.
              </p>
              <button
                onClick={startMathGame}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all flex items-center gap-2 mx-auto"
              >
                <Zap className="w-4 h-4" />
                <span>Start 30-Second Challenge</span>
              </button>
            </div>
          ) : (
            <div className="max-w-md mx-auto space-y-6 text-center">
              {/* Question Math Display */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-inner">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Compute in Mind:</span>
                <div className="text-4xl font-black text-slate-900 tracking-wider font-mono">
                  {mathQuestion.num1} {mathQuestion.op} {mathQuestion.num2} = ?
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={handleMathSubmit} className="flex gap-2">
                <input
                  type="number"
                  autoFocus
                  value={mathUserAnswer}
                  onChange={(e) => setMathUserAnswer(e.target.value)}
                  placeholder="Your answer..."
                  className="flex-1 p-3.5 text-center text-xl font-black rounded-xl border-2 border-slate-300 focus:border-amber-500 focus:outline-none bg-slate-50"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-sm transition-all shadow-sm"
                >
                  Submit
                </button>
              </form>

              {/* Vedic Shortcut Tip */}
              {lastMathTrick && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-slate-800 text-left flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{lastMathTrick}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================== */}
      {/* GAME 2 CANVAS: LOGIC WORD CIPHER                          */}
      {/* ========================================================== */}
      {activeGame === "WORD_CIPHER" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <h2 className="text-lg font-black text-slate-900">Logic Word Cipher</h2>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-50 text-blue-800 rounded border border-blue-200">
                  {currentCipher.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Deduce the secret {currentCipher.word.length}-letter word from the academic clue. Green = correct letter & position, Yellow = in word wrong spot!
              </p>
            </div>

            <button
              onClick={() => resetCipherGame()}
              className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Next Puzzle ({cipherPuzzleIndex + 1}/{WORD_PUZZLES.length})</span>
            </button>
          </div>

          {/* Clue Box */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs">
            <span className="text-[10px] font-bold uppercase text-blue-800 block mb-1 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
              Academic Clue ({currentCipher.word.length} Letters):
            </span>
            <p className="text-slate-800 text-sm font-semibold">{currentCipher.clue}</p>
          </div>

          {/* Dynamic Letter Hint Bar */}
          {(() => {
            const hintInfo = getWordLetterHint(currentCipher.word);
            return (
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3.5 text-xs transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-700 font-bold">
                      💡
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-amber-950">Letter Hint</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
                          {hintInfo.letterCount === 1 ? "1 Letter (Small Word)" : "2 Letters (Big Word)"}
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        {showCipherHint
                          ? hintInfo.detail
                          : `Stuck? Reveal ${hintInfo.letterCount} letter${hintInfo.letterCount > 1 ? "s" : ""} to help solve this puzzle.`}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowCipherHint(!showCipherHint)}
                    className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{showCipherHint ? "Hide Letter Hint" : "Reveal Letter Hint"}</span>
                  </button>
                </div>

                {showCipherHint && (
                  <div className="mt-3 pt-3 border-t border-amber-200/80 flex flex-col items-center gap-1 bg-amber-100/40 rounded-lg p-2.5">
                    <span className="text-[10px] font-extrabold tracking-wider uppercase text-amber-900">
                      Letter Pattern
                    </span>
                    <span className="font-mono text-2xl font-black text-slate-900 tracking-[0.35em]">
                      {hintInfo.preview}
                    </span>
                    <span className="text-xs text-amber-950 font-medium mt-0.5">
                      {hintInfo.detail}
                    </span>
                  </div>
                )}
              </div>
            );
          })()}

          {/* Guess Tiles Board */}
          <div className="flex flex-col items-center gap-1.5 sm:gap-2 max-w-sm mx-auto overflow-x-auto p-1">
            {/* Previous Guesses */}
            {cipherGuesses.map((guess, gIdx) => (
              <div key={gIdx} className="flex gap-1.5 sm:gap-2">
                {guess.split("").map((letter, lIdx) => {
                  let bgColor = "bg-slate-200 text-slate-700 border-slate-300";
                  if (currentCipher.word[lIdx] === letter) {
                    bgColor = "bg-emerald-600 text-white border-emerald-700 shadow-sm";
                  } else if (currentCipher.word.includes(letter)) {
                    bgColor = "bg-amber-400 text-slate-950 border-amber-500 shadow-sm";
                  }

                  return (
                    <div
                      key={lIdx}
                      className={`w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center font-black text-sm sm:text-lg rounded-lg sm:rounded-xl border-2 ${bgColor}`}
                    >
                      {letter}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* Empty Slots Remaining */}
            {Array.from({ length: Math.max(0, 6 - cipherGuesses.length) }).map((_, emptyIdx) => (
              <div key={emptyIdx} className="flex gap-1.5 sm:gap-2">
                {Array.from({ length: currentCipher.word.length }).map((__, colIdx) => (
                  <div
                    key={colIdx}
                    className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center font-black text-sm sm:text-lg rounded-lg sm:rounded-xl border-2 border-dashed border-slate-200 text-slate-300"
                  >
                    •
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* User Input Submission */}
          {!cipherSolved && cipherGuesses.length < 6 && (
            <form onSubmit={handleCipherSubmit} className="max-w-xs mx-auto flex gap-2">
              <input
                type="text"
                maxLength={currentCipher.word.length}
                value={currentGuess}
                onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
                placeholder={`ENTER ${currentCipher.word.length} LETTERS`}
                className="flex-1 p-3 text-center font-mono font-bold tracking-widest text-base rounded-xl border-2 border-slate-300 focus:border-blue-500 focus:outline-none uppercase"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Guess
              </button>
            </form>
          )}

          {/* Feedback & Educational Fact */}
          {cipherMessage && (
            <div className={`p-3 rounded-xl text-center text-xs font-bold max-w-md mx-auto ${
              cipherSolved ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-amber-50 text-amber-800 border border-amber-200"
            }`}>
              {cipherMessage}
            </div>
          )}

          {cipherSolved && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 max-w-md mx-auto text-xs text-emerald-950">
              <span className="font-extrabold block text-sm mb-1">Did You Know?</span>
              <p className="leading-relaxed">{currentCipher.funFact}</p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================== */}
      {/* GAME 3 CANVAS: MATRIX MEMORY RECALL                        */}
      {/* ========================================================== */}
      {activeGame === "MATRIX_MEMORY" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                <h2 className="text-lg font-black text-slate-900">Matrix Memory Recall</h2>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-purple-50 text-purple-800 rounded border border-purple-200">
                  Level {matrixLevel} (Memorize {matrixLevel + 2} Tiles)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                A pattern of tiles will flash for 2.2 seconds. Recall and click the exact tiles to boost spatial memory!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => startMatrixRound(matrixLevel + 2)}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <Target className="w-4 h-4" />
                <span>Flash New Pattern</span>
              </button>
            </div>
          </div>

          {/* Interactive 4x4 Grid Canvas */}
          <div className="max-w-xs mx-auto">
            {matrixState === "FLASHING" && (
              <div className="mb-3 text-center font-bold text-purple-700 text-xs animate-pulse">
                👀 Memorize the illuminated tiles! (Disappearing in 2s...)
              </div>
            )}
            {matrixState === "PLAYING" && (
              <div className="mb-3 text-center font-bold text-slate-700 text-xs">
                👉 Click the {tilesToMemorize.length} tiles you saw! ({selectedTiles.length}/{tilesToMemorize.length} selected)
              </div>
            )}

            <div className="grid grid-cols-4 gap-2.5 p-4 bg-slate-900 rounded-2xl shadow-inner">
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
                const isFlashed = tilesToMemorize.includes(idx) && matrixState === "FLASHING";
                const isSelected = selectedTiles.includes(idx);
                const isCorrect = isSelected && tilesToMemorize.includes(idx);
                const isWrong = isSelected && !tilesToMemorize.includes(idx);

                let tileClass = "bg-slate-800 hover:bg-slate-700 border-slate-700";

                if (isFlashed) {
                  tileClass = "bg-amber-400 border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.6)] animate-pulse";
                } else if (matrixState === "RESULT") {
                  if (tilesToMemorize.includes(idx)) {
                    tileClass = "bg-emerald-500 border-emerald-400 text-white";
                  } else if (isWrong) {
                    tileClass = "bg-rose-600 border-rose-500 text-white";
                  }
                } else if (isSelected) {
                  tileClass = "bg-blue-500 border-blue-400 text-white";
                }

                return (
                  <button
                    key={idx}
                    disabled={matrixState !== "PLAYING"}
                    onClick={() => handleTileClick(idx)}
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl border-2 transition-all flex items-center justify-center font-bold ${tileClass}`}
                  >
                    {isFlashed && <Sparkles className="w-5 h-5 text-slate-950" />}
                    {matrixState === "RESULT" && tilesToMemorize.includes(idx) && <CheckCircle2 className="w-5 h-5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Feedback */}
          {matrixState === "RESULT" && (
            <div className="max-w-xs mx-auto text-center space-y-3">
              {matrixResultSuccess ? (
                <div className="p-3 bg-emerald-50 text-emerald-900 rounded-xl border border-emerald-200 text-xs font-bold">
                  🎉 Flawless Recall! You memorized all {tilesToMemorize.length} tiles! (+40 Brain Points)
                </div>
              ) : (
                <div className="p-3 bg-rose-50 text-rose-900 rounded-xl border border-rose-200 text-xs font-bold">
                  ❌ Missed some tiles. Green shows where the pattern was. Try again!
                </div>
              )}

              <button
                onClick={() => startMatrixRound(matrixLevel + 2)}
                className="w-full py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm"
              >
                Play Next Round (Level {matrixLevel})
              </button>
            </div>
          )}

          {matrixState === "IDLE" && (
            <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-dashed max-w-sm mx-auto">
              <Brain className="w-8 h-8 mx-auto mb-2 text-purple-600" />
              Click <strong>&quot;Flash New Pattern&quot;</strong> above to begin your visual recall challenge.
            </div>
          )}
        </div>
      )}
    </PortalLayout>
  );
}
