"use client";

import React, { useState, useEffect, useMemo } from "react";
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
  Printer,
  Eye,
  Atom,
  Compass,
  Cpu,
} from "lucide-react";
import { DEMO_STUDENTS } from "@/lib/mock-data";
import { useBoard } from "@/lib/board-context";

// ==========================================
// GAME 1: VEDIC MATH BLITZ
// ==========================================
interface MathQuestion {
  num1: number;
  num2: number;
  op: "+" | "-" | "×";
  answer: number;
  trickExplanation: string;
  hint: string;
}

function generateMathQuestion(): MathQuestion {
  const types = [
    "multiply_11",
    "square_5",
    "subtraction_1000",
    "multiply_99",
    "near_100",
    "addition",
    "multiplication",
  ];
  const selectedType = types[Math.floor(Math.random() * types.length)];

  if (selectedType === "multiply_11") {
    const num = Math.floor(12 + Math.random() * 85); // 12 to 96
    const answer = num * 11;
    const d1 = Math.floor(num / 10);
    const d2 = num % 10;
    const sum = d1 + d2;
    return {
      num1: num,
      num2: 11,
      op: "×",
      answer,
      hint: `Vedic ×11 Rule: Split digits ${d1} and ${d2}, then add them (${d1}+${d2}=${sum}) in between!`,
      trickExplanation: `Separate ${d1} and ${d2}. Middle digit is ${d1} + ${d2} = ${sum}. ${num} × 11 = ${answer}`,
    };
  }

  if (selectedType === "square_5") {
    const bases = [15, 25, 35, 45, 55, 65, 75, 85, 95];
    const num = bases[Math.floor(Math.random() * bases.length)];
    const tens = Math.floor(num / 10);
    const answer = num * num;
    return {
      num1: num,
      num2: num,
      op: "×",
      answer,
      hint: `Ekadhikena Purvena Rule: Multiply tens digit ${tens} by (${tens}+1) = ${tens * (tens + 1)}, then suffix 25!`,
      trickExplanation: `Tens digit ${tens} × (${tens} + 1) = ${tens * (tens + 1)}, suffix with 25 → ${answer}`,
    };
  }

  if (selectedType === "subtraction_1000") {
    const sub = Math.floor(125 + Math.random() * 750); // 125 to 874
    const answer = 1000 - sub;
    return {
      num1: 1000,
      num2: sub,
      op: "-",
      answer,
      hint: `Nikhilam Rule: 'All from 9 and last from 10'. Subtract each digit from 9, and the last unit digit from 10!`,
      trickExplanation: `Subtract hundreds from 9, tens from 9, and units from 10: 1000 - ${sub} = ${answer}`,
    };
  }

  if (selectedType === "multiply_99") {
    const num = Math.floor(14 + Math.random() * 75);
    const answer = num * 99;
    return {
      num1: num,
      num2: 99,
      op: "×",
      answer,
      hint: `Subtract 1 from ${num} = ${num - 1}. Next part is 100 - ${num} = ${100 - num}. Join them!`,
      trickExplanation: `Vedic Rule for ×99: (${num} - 1) = ${num - 1}, and complement (100 - ${num}) = ${100 - num}. Answer is ${answer}`,
    };
  }

  if (selectedType === "near_100") {
    const n1 = Math.floor(92 + Math.random() * 7); // 92 to 98
    const n2 = Math.floor(93 + Math.random() * 6); // 93 to 98
    const answer = n1 * n2;
    const diff1 = 100 - n1;
    const diff2 = 100 - n2;
    return {
      num1: n1,
      num2: n2,
      op: "×",
      answer,
      hint: `Deficiency from 100: ${n1} is -${diff1}, ${n2} is -${diff2}. Left = ${n1} - ${diff2} = ${n1 - diff2}, Right = ${diff1} × ${diff2} = ${diff1 * diff2}`,
      trickExplanation: `Base 100 method: Cross subtract deficiency (${n1} - ${diff2} = ${n1 - diff2}) and multiply deficiencies (${diff1} × ${diff2} = ${diff1 * diff2}) → ${answer}`,
    };
  }

  if (selectedType === "addition") {
    const num1 = Math.floor(35 + Math.random() * 60);
    const num2 = Math.floor(25 + Math.random() * 55);
    return {
      num1,
      num2,
      op: "+",
      answer: num1 + num2,
      hint: `Break down ${num2} into ${Math.floor(num2 / 10) * 10} + ${num2 % 10}. Add tens first, then units!`,
      trickExplanation: `Mental Breakdown: (${num1} + ${Math.floor(num2 / 10) * 10}) + ${num2 % 10} = ${num1 + num2}`,
    };
  }

  // Multiplication
  const num1 = Math.floor(7 + Math.random() * 9);
  const num2 = Math.floor(8 + Math.random() * 9);
  return {
    num1,
    num2,
    op: "×",
    answer: num1 * num2,
    hint: `Recall tables or use doubling: (${num1} × ${Math.floor(num2 / 2)}) × 2`,
    trickExplanation: `Mastery Multiplication: ${num1} × ${num2} = ${num1 * num2}`,
  };
}

// ==========================================
// GAME 2: LOGIC WORD CIPHER
// ==========================================
interface WordCipherItem {
  word: string;
  clue: string;
  category: string;
  funFact: string;
}

const WORD_PUZZLES: WordCipherItem[] = [
  {
    word: "PRISM",
    clue: "Transparent optical glass block that disperses white light into seven spectrum colors (VIBGYOR).",
    category: "Physics (Class 10)",
    funFact: "Sir Isaac Newton proved using a double prism that prism itself does not color light, but refracts existing wavelengths!",
  },
  {
    word: "OXYGEN",
    clue: "Crucial element produced during Photosynthesis, vital for human cellular respiration.",
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
  {
    word: "GRAVITY",
    clue: "Universal attractive force proportional to masses and inversely proportional to square of distance.",
    category: "Physics",
    funFact: "Even though it holds galaxies together, gravity is the weakest of the four fundamental forces of physics!",
  },
  {
    word: "CIRCUIT",
    clue: "Continuous closed conductive path through which an electric current flows.",
    category: "Physics (Class 8-10)",
    funFact: "The word comes from Latin 'circuitus', meaning a going around in a loop!",
  },
  {
    word: "DENSITY",
    clue: "Mass per unit volume of a substance, symbolized by Greek letter rho (ρ).",
    category: "Physics & Chemistry",
    funFact: "Saturn is the only planet in our solar system whose density is lower than water (it would float in a giant bathtub)!",
  },
  {
    word: "KINETIC",
    clue: "Form of energy possessed by an object due to its motion (Ek = 1/2 m v²).",
    category: "Physics (Class 9)",
    funFact: "The term originates from the Greek word 'kinesis', meaning motion or movement!",
  },
  {
    word: "HABITAT",
    clue: "Natural environment or ecological area where an organism lives, feeds, and reproduces.",
    category: "Environmental Science",
    funFact: "Coral reefs occupy less than 1% of the ocean floor but provide habitat for 25% of all marine life!",
  },
  {
    word: "MONSOON",
    clue: "Seasonal prevailing wind system in South Asia bringing transformative rainy seasons.",
    category: "Geography & Climatology",
    funFact: "Originates from the Arabic word 'mausim', meaning season, recognized by ancient Indian and Arab sailors!",
  },
  {
    word: "ISOTOPE",
    clue: "Atoms of the same element having identical atomic numbers but different mass numbers due to neutrons.",
    category: "Chemistry",
    funFact: "Carbon-14 isotope is radioactive and is used by archaeologists to date ancient organic artifacts up to 50,000 years old!",
  },
  {
    word: "FRICTION",
    clue: "Force resisting the relative motion of solid surfaces, fluid layers, and material elements sliding against each other.",
    category: "Physics (Class 8)",
    funFact: "Without friction, humans would not be able to walk, cars could not brake, and nails would slip out of walls!",
  },
  {
    word: "VOLTAGE",
    clue: "Electric potential difference between two points, driving electron flow through a conductor.",
    category: "Physics",
    funFact: "Named in honor of Italian physicist Alessandro Volta, who invented the first chemical battery (voltaic pile) in 1799!",
  },
  {
    word: "MITOSIS",
    clue: "Cell division resulting in two daughter cells each having the same number of chromosomes as parent nucleus.",
    category: "Biology (Class 9-10)",
    funFact: "Humans produce roughly 3.8 million new cells every second through mitotic divisions!",
  },
  {
    word: "REFRACT",
    clue: "Bending of light waves when passing obliquely from one optical medium to another of different density.",
    category: "Optics (Physics)",
    funFact: "Mirages in hot deserts are optical illusions created by light refraction through varying air temperature layers!",
  },
  {
    word: "CHLORO",
    clue: "Prefix derived from Greek for pale green, seen in plant pigments responsible for light absorption.",
    category: "Botany & Science",
    funFact: "Chlorophyll contains a central Magnesium atom, structurally very similar to iron in human hemoglobin!",
  },
  {
    word: "VECTOR",
    clue: "Physical quantity possessing both magnitude and direction, like velocity or force.",
    category: "Mathematics & Physics",
    funFact: "In medicine, vector also refers to an organism (like mosquito) that transmits pathogens between hosts!",
  },
];

function getWordLetterHint(word: string) {
  const len = word.length;
  if (len <= 5) {
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

// ==========================================
// GAME 4: SCIENCE QUEST (CRITICAL DEDUCTION)
// ==========================================
interface ScienceQuestItem {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  category: string;
  hint: string;
  explanation: string;
}

const SCIENCE_QUEST_BANK: ScienceQuestItem[] = [
  {
    id: 1,
    question: "Why does the sky appear deep blue on a clear sunny day?",
    options: [
      "Ocean water reflects blue light upward into the atmosphere",
      "Short wavelength blue light scatters much more easily by gas molecules (Rayleigh scattering)",
      "Ozone gas in the stratosphere absorbs red light and emits blue",
      "Dust particles in space create a blue tint before sunlight reaches Earth",
    ],
    correctIndex: 1,
    category: "Optics & Physics",
    hint: "Think about wavelength: Rayleigh scattering is inversely proportional to the 4th power of wavelength (λ⁴). Shorter wavelengths scatter far more!",
    explanation: "According to Rayleigh Scattering, light with shorter wavelengths (blue and violet) scatters ~10 times more than red light. Human eyes are more sensitive to blue, so we perceive a blue sky.",
  },
  {
    id: 2,
    question: "Which organelle in plant cells is known as the 'Cellular Powerhouse' where ATP is synthesized?",
    options: ["Ribosome", "Mitochondria", "Golgi Body", "Endoplasmic Reticulum"],
    correctIndex: 1,
    category: "Cell Biology",
    hint: "It contains its own DNA and double membrane, producing ATP through cellular respiration in both plants and animals.",
    explanation: "Mitochondria generate most of the chemical energy needed to power the cell's biochemical reactions, stored in adenosine triphosphate (ATP).",
  },
  {
    id: 3,
    question: "When iron rusts in moist air, does the total mass of the iron object increase, decrease, or remain constant?",
    options: [
      "Decreases because iron flakes away",
      "Increases because oxygen and water molecules chemically bond to the iron",
      "Remains strictly identical due to law of conservation of mass in open air",
      "Decreases due to sublimation of iron oxide into atmospheric vapors",
    ],
    correctIndex: 1,
    category: "Chemical Reactions",
    hint: "Rust is hydrated iron(III) oxide: 4Fe + 3O₂ + xH₂O → 2Fe₂O₃·xH₂O. Consider the atoms added to the solid!",
    explanation: "Rusting is an oxidation synthesis reaction. Atmospheric oxygen and moisture bond chemically to iron, so the total mass of the rusted product is greater than the original pure iron.",
  },
  {
    id: 4,
    question: "What happens to the resistance of a pure metal conductor when its temperature increases?",
    options: [
      "Resistance increases due to increased atomic vibrations colliding with electrons",
      "Resistance decreases because electrons move faster",
      "Resistance drops to zero creating superconductivity",
      "Resistance remains unchanged as resistivity is a permanent constant",
    ],
    correctIndex: 0,
    category: "Electricity",
    hint: "Higher thermal energy causes metal ion lattices to vibrate vigorously, impeding the smooth drift velocity of conduction electrons.",
    explanation: "In metallic conductors, as temperature rises, metal ions vibrate more energetically, leading to frequent collisions with free electrons, which increases electrical resistance.",
  },
  {
    id: 5,
    question: "Which blood group is universally known as the 'Universal Donor' for red blood cell transfusions?",
    options: ["AB Positive (AB+)", "O Negative (O-)", "A Positive (A+)", "B Negative (B-)"],
    correctIndex: 1,
    category: "Human Physiology",
    hint: "This type lacks A, B, and Rh antigens on its red blood cell membrane, preventing recipient antibody attacks.",
    explanation: "O Negative red blood cells carry no A, B, or Rh surface antigens, meaning recipients of any blood type can receive them without antibody rejection.",
  },
  {
    id: 6,
    question: "A coin and a feather are dropped simultaneously inside a tall vacuum chamber. What happens?",
    options: [
      "The coin hits the bottom first because it is heavier",
      "Both reach the bottom at the exact same instant",
      "The feather floats upward due to lack of atmospheric pressure",
      "The coin hovers because gravity ceases to exist in a vacuum",
    ],
    correctIndex: 1,
    category: "Gravitation & Mechanics",
    hint: "In a true vacuum, air resistance is zero. The gravitational acceleration (g = 9.8 m/s²) is independent of an object's mass!",
    explanation: "As Galileo demonstrated, all objects accelerate at the same rate under gravity regardless of mass when aerodynamic drag/air resistance is absent.",
  },
  {
    id: 7,
    question: "What is the pH of pure distilled water at standard temperature (25°C)?",
    options: ["pH = 0", "pH = 7", "pH = 14", "pH = 5.6"],
    correctIndex: 1,
    category: "Acids, Bases & Salts",
    hint: "Pure water has equal concentrations of hydrogen ions [H+] and hydroxide ions [OH-], making it perfectly neutral.",
    explanation: "At 25°C, [H+] = [OH-] = 10⁻⁷ mol/L, giving a neutral pH of -log₁₀(10⁻⁷) = 7.0.",
  },
  {
    id: 8,
    question: "Which layer of the Earth's atmosphere contains the vital Ozone Layer that filters harmful UV radiation?",
    options: ["Troposphere", "Stratosphere", "Mesosphere", "Thermosphere"],
    correctIndex: 1,
    category: "Atmospheric Science",
    hint: "This calm, dry layer lies directly above the troposphere and is also where commercial jet airliners frequently cruise.",
    explanation: "The stratosphere (10 km to 50 km altitude) contains the ozone layer (O₃) which absorbs over 97% of biologically harmful ultraviolet (UV-B and UV-C) rays from the Sun.",
  },
  {
    id: 9,
    question: "What is the primary function of stomata located on the underside of plant leaves?",
    options: [
      "Absorbing water and mineral nutrients directly from air",
      "Regulating gas exchange (CO₂ uptake, O₂ release) and transpiration",
      "Producing floral pollen grains for insect pollination",
      "Anchoring the leaf against high wind pressures",
    ],
    correctIndex: 1,
    category: "Plant Physiology",
    hint: "Microscopic pores flanked by guard cells that open and close based on turgor pressure.",
    explanation: "Stomata allow carbon dioxide into the leaf for photosynthesis, release oxygen byproduct, and manage water vapor loss through transpiration.",
  },
  {
    id: 10,
    question: "According to Newton's Third Law of Motion, when a rocket launches into space:",
    options: [
      "The rocket pushes against atmospheric air to lift itself",
      "The rocket accelerates forward as an equal and opposite reaction to exhaust gases expelled backward",
      "Gravity pulls downward with less force as velocity increases",
      "Chemical fuel decreases mass so rocket becomes weightless",
    ],
    correctIndex: 1,
    category: "Laws of Motion",
    hint: "'For every action, there is an equal and opposite reaction.' Rockets function even in the pure vacuum of outer space!",
    explanation: "Rockets don't need air to push against; they propel forward because high-speed exhaust gas particles expelled downward exert an equal and opposite reaction force pushing the rocket upward.",
  },
];

// ==========================================
// GAME 5: PATTERN & SEQUENCE MASTER
// ==========================================
interface SequenceItem {
  id: number;
  sequence: string;
  options: number[];
  answer: number;
  patternType: string;
  hint: string;
  ruleExplanation: string;
}

const SEQUENCE_PUZZLE_BANK: SequenceItem[] = [
  {
    id: 1,
    sequence: "2, 5, 10, 17, 26, ?",
    options: [35, 37, 39, 41],
    answer: 37,
    patternType: "Squares + 1",
    hint: "Examine n² + 1: 1²+1=2, 2²+1=5, 3²+1=10, 4²+1=17, 5²+1=26. What is 6² + 1?",
    ruleExplanation: "Pattern formula: n² + 1 for n = 1, 2, 3, 4, 5, 6. Thus 6² + 1 = 36 + 1 = 37.",
  },
  {
    id: 2,
    sequence: "3, 6, 12, 24, 48, ?",
    options: [72, 84, 96, 108],
    answer: 96,
    patternType: "Geometric Doubling (×2)",
    hint: "Each term is multiplied by 2: 3×2=6, 6×2=12, 12×2=24, 24×2=48. Next is 48 × 2!",
    ruleExplanation: "Geometric progression with common ratio r = 2. 48 × 2 = 96.",
  },
  {
    id: 3,
    sequence: "1, 1, 2, 3, 5, 8, 13, ?",
    options: [18, 20, 21, 24],
    answer: 21,
    patternType: "Fibonacci Sequence",
    hint: "Add the two preceding numbers: 1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13. Next is 8 + 13!",
    ruleExplanation: "Classic Fibonacci Series: F(n) = F(n-1) + F(n-2). Next term is 8 + 13 = 21.",
  },
  {
    id: 4,
    sequence: "4, 9, 16, 25, 36, ?",
    options: [45, 47, 49, 52],
    answer: 49,
    patternType: "Perfect Squares",
    hint: "Consecutive integers squared: 2²=4, 3²=9, 4²=16, 5²=25, 6²=36. What is 7²?",
    ruleExplanation: "Square of consecutive numbers 2, 3, 4, 5, 6, 7. 7² = 49.",
  },
  {
    id: 5,
    sequence: "2, 3, 5, 7, 11, 13, ?",
    options: [15, 17, 19, 21],
    answer: 17,
    patternType: "Prime Numbers",
    hint: "These numbers have strictly two factors: 1 and themselves. What is the next prime after 13?",
    ruleExplanation: "Ordered series of Prime numbers: 2, 3, 5, 7, 11, 13, 17. (15 is composite 3×5).",
  },
  {
    id: 6,
    sequence: "100, 95, 85, 70, 50, ?",
    options: [20, 25, 30, 35],
    answer: 25,
    patternType: "Accelerating Subtraction",
    hint: "Check consecutive differences: -5, -10, -15, -20. What should be subtracted next?",
    ruleExplanation: "The subtraction increases by 5 at each step: 100-5=95, 95-10=85, 85-15=70, 70-20=50, 50-25 = 25.",
  },
  {
    id: 7,
    sequence: "2, 6, 18, 54, ?",
    options: [108, 144, 162, 180],
    answer: 162,
    patternType: "Geometric Tripling (×3)",
    hint: "Each number is multiplied by 3: 2×3=6, 6×3=18, 18×3=54. Multiply 54 by 3!",
    ruleExplanation: "Geometric series with ratio r = 3: 54 × 3 = 162.",
  },
  {
    id: 8,
    sequence: "1, 8, 27, 64, 125, ?",
    options: [196, 216, 256, 343],
    answer: 216,
    patternType: "Perfect Cubes (n³)",
    hint: "Cubing consecutive numbers: 1³=1, 2³=8, 3³=27, 4³=64, 5³=125. What is 6³?",
    ruleExplanation: "Cube sequence: 1³, 2³, 3³, 4³, 5³, 6³. 6 × 6 × 6 = 216.",
  },
  {
    id: 9,
    sequence: "3, 5, 9, 17, 33, ?",
    options: [49, 57, 65, 72],
    answer: 65,
    patternType: "Powers of 2 Addition (+2ⁿ)",
    hint: "Look at the differences: +2, +4, +8, +16. The next difference is +32! (33 + 32)",
    ruleExplanation: "Add 2, 4, 8, 16, 32. 33 + 32 = 65. (Also: 2ⁿ + 1).",
  },
  {
    id: 10,
    sequence: "7, 10, 8, 11, 9, 12, ?",
    options: [10, 11, 13, 14],
    answer: 10,
    patternType: "Alternating Series (+3, -2)",
    hint: "Observe the two interleaved patterns: 7, 8, 9, ? OR alternate adding 3 then subtracting 2!",
    ruleExplanation: "Alternating operation: +3, -2, +3, -2, +3, -2. 12 - 2 = 10.",
  },
];

type ActiveGameType =
  | "VEDIC_MATH"
  | "WORD_CIPHER"
  | "MATRIX_MEMORY"
  | "SCIENCE_QUEST"
  | "SEQUENCE_MASTER";

export default function StudentGamesPage() {
  const { board, getBoardName, getSchoolName } = useBoard();
  const isState = board === "state";
  const student = isState
    ? DEMO_STUDENTS.find((s) => s.board === "state") || DEMO_STUDENTS[0]
    : DEMO_STUDENTS[0];

  const [activeGame, setActiveGame] = useState<ActiveGameType>("VEDIC_MATH");

  // Global Brain Points
  const [brainPoints, setBrainPoints] = useState(420);

  // Certificate Modal State
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateData, setCertificateData] = useState<{
    gameName: string;
    skillTitle: string;
    score: number;
    accuracy: number;
    date: string;
    certId: string;
  } | null>(null);

  const openCertificate = (
    gameName: string,
    skillTitle: string,
    score: number,
    accuracy: number
  ) => {
    const randomCertNum = Math.floor(100000 + Math.random() * 900000);
    const today = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    setCertificateData({
      gameName,
      skillTitle,
      score,
      accuracy,
      date: today,
      certId: `SVVK-COG-2026-${randomCertNum}`,
    });
    setShowCertificate(true);
  };

  // ----------------------------------------------------
  // GAME 1: VEDIC MATH BLITZ STATE
  // ----------------------------------------------------
  const [mathQuestion, setMathQuestion] = useState<MathQuestion>(
    generateMathQuestion()
  );
  const [mathUserAnswer, setMathUserAnswer] = useState("");
  const [mathScore, setMathScore] = useState(0);
  const [mathStreak, setMathStreak] = useState(0);
  const [mathTimer, setMathTimer] = useState(30);
  const [mathActive, setMathActive] = useState(false);
  const [lastMathTrick, setLastMathTrick] = useState<string | null>(null);
  const [showMathHint, setShowMathHint] = useState(false);
  const [mathTotalAnswered, setMathTotalAnswered] = useState(0);
  const [mathCorrectCount, setMathCorrectCount] = useState(0);

  useEffect(() => {
    if (!mathActive) return;
    if (mathTimer <= 0) {
      setMathActive(false);
      // Trigger certificate if player scored points
      if (mathScore > 30) {
        const accuracy = Math.round(
          (mathCorrectCount / Math.max(1, mathTotalAnswered)) * 100
        );
        openCertificate(
          "Vedic Math Blitz",
          "Mental Arithmetic & Speed Calculation Mastery",
          mathScore,
          accuracy
        );
      }
      return;
    }
    const interval = setInterval(() => {
      setMathTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [mathActive, mathTimer, mathScore, mathCorrectCount, mathTotalAnswered]);

  const startMathGame = () => {
    setMathActive(true);
    setMathScore(0);
    setMathStreak(0);
    setMathTimer(30);
    setMathUserAnswer("");
    setLastMathTrick(null);
    setShowMathHint(false);
    setMathTotalAnswered(0);
    setMathCorrectCount(0);
    setMathQuestion(generateMathQuestion());
  };

  const handleMathSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mathActive || !mathUserAnswer) return;

    setMathTotalAnswered((t) => t + 1);
    const val = parseInt(mathUserAnswer.trim(), 10);
    if (val === mathQuestion.answer) {
      const addedPoints = 10 * (mathStreak + 1);
      setMathScore((s) => s + addedPoints);
      setMathStreak((st) => st + 1);
      setMathCorrectCount((c) => c + 1);
      setBrainPoints((bp) => bp + addedPoints);
      setLastMathTrick(`✅ Correct! ${mathQuestion.trickExplanation}`);
    } else {
      setMathStreak(0);
      setLastMathTrick(
        `❌ Incorrect (Answer was ${mathQuestion.answer}). ${mathQuestion.trickExplanation}`
      );
    }

    setMathUserAnswer("");
    setShowMathHint(false);
    setMathQuestion(generateMathQuestion());
  };

  // ----------------------------------------------------
  // GAME 2: LOGIC WORD CIPHER STATE
  // ----------------------------------------------------
  const [cipherPuzzleIndex, setCipherPuzzleIndex] = useState(0);
  const currentCipher = WORD_PUZZLES[cipherPuzzleIndex % WORD_PUZZLES.length];
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
      setCipherMessage(
        `Word must be exactly ${currentCipher.word.length} letters long!`
      );
      return;
    }

    const updated = [...cipherGuesses, cleanGuess];
    setCipherGuesses(updated);
    setCurrentGuess("");
    setCipherMessage("");

    if (cleanGuess === currentCipher.word) {
      setCipherSolved(true);
      setBrainPoints((bp) => bp + 50);
      setCipherMessage(
        `🎉 Brilliant Deduction! You decoded '${currentCipher.word}'! (+50 Brain Points)`
      );
    } else if (updated.length >= 6) {
      setCipherMessage(`Game Over! The secret word was '${currentCipher.word}'.`);
    }
  };

  const resetCipherGame = (nextIndex?: number) => {
    const idx =
      nextIndex !== undefined
        ? nextIndex
        : (cipherPuzzleIndex + 1) % WORD_PUZZLES.length;
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
  const [tilesToMemorize, setTilesToMemorize] = useState<number[]>(
    generateRandomPattern(3)
  );
  const [matrixState, setMatrixState] = useState<
    "IDLE" | "FLASHING" | "PLAYING" | "RESULT"
  >("IDLE");
  const [selectedTiles, setSelectedTiles] = useState<number[]>([]);
  const [matrixResultSuccess, setMatrixResultSuccess] = useState<
    boolean | null
  >(null);
  const [matrixPeeksUsed, setMatrixPeeksUsed] = useState(0);
  const [isPeeking, setIsPeeking] = useState(false);

  const startMatrixRound = (levelCount = 3) => {
    const pattern = generateRandomPattern(levelCount);
    setTilesToMemorize(pattern);
    setSelectedTiles([]);
    setMatrixResultSuccess(null);
    setMatrixPeeksUsed(0);
    setIsPeeking(false);
    setMatrixState("FLASHING");

    setTimeout(() => {
      setMatrixState("PLAYING");
    }, 2200);
  };

  const handlePeekHint = () => {
    if (matrixState !== "PLAYING" || matrixPeeksUsed >= 1 || isPeeking) return;
    setMatrixPeeksUsed((p) => p + 1);
    setIsPeeking(true);
    setTimeout(() => {
      setIsPeeking(false);
    }, 1200);
  };

  const handleTileClick = (index: number) => {
    if (matrixState !== "PLAYING" || isPeeking) return;
    if (selectedTiles.includes(index)) return;

    const newSelected = [...selectedTiles, index];
    setSelectedTiles(newSelected);

    if (newSelected.length === tilesToMemorize.length) {
      const isPerfect = newSelected.every((idx) =>
        tilesToMemorize.includes(idx)
      );
      setMatrixResultSuccess(isPerfect);
      setMatrixState("RESULT");

      if (isPerfect) {
        setBrainPoints((bp) => bp + 40);
        setMatrixLevel((l) => l + 1);
      }
    }
  };

  // ----------------------------------------------------
  // GAME 4: SCIENCE QUEST STATE
  // ----------------------------------------------------
  const [questIndex, setQuestIndex] = useState(0);
  const currentQuest = SCIENCE_QUEST_BANK[questIndex % SCIENCE_QUEST_BANK.length];
  const [selectedQuestOption, setSelectedQuestOption] = useState<number | null>(
    null
  );
  const [questSubmitted, setQuestSubmitted] = useState(false);
  const [showQuestHint, setShowQuestHint] = useState(false);
  const [questScore, setQuestScore] = useState(0);
  const [questCorrectCount, setQuestCorrectCount] = useState(0);
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);

  const handleQuestSelect = (idx: number) => {
    if (questSubmitted) return;
    setSelectedQuestOption(idx);
  };

  const handleQuestSubmit = () => {
    if (selectedQuestOption === null || questSubmitted) return;
    setQuestSubmitted(true);
    if (selectedQuestOption === currentQuest.correctIndex) {
      setQuestScore((s) => s + 25);
      setQuestCorrectCount((c) => c + 1);
      setBrainPoints((bp) => bp + 25);
    }
  };

  const handleQuestFiftyFifty = () => {
    if (showQuestHint || questSubmitted) return;
    setShowQuestHint(true);
    // Eliminate 1 or 2 incorrect options
    const wrongIndices = currentQuest.options
      .map((_, i) => i)
      .filter((i) => i !== currentQuest.correctIndex);
    const toEliminate = wrongIndices.slice(0, 2);
    setEliminatedOptions(toEliminate);
  };

  const nextQuestQuestion = () => {
    setQuestIndex((q) => q + 1);
    setSelectedQuestOption(null);
    setQuestSubmitted(false);
    setShowQuestHint(false);
    setEliminatedOptions([]);
  };

  // ----------------------------------------------------
  // GAME 5: SEQUENCE MASTER STATE
  // ----------------------------------------------------
  const [seqIndex, setSeqIndex] = useState(0);
  const currentSeq = SEQUENCE_PUZZLE_BANK[seqIndex % SEQUENCE_PUZZLE_BANK.length];
  const [selectedSeqOption, setSelectedSeqOption] = useState<number | null>(
    null
  );
  const [seqSubmitted, setSeqSubmitted] = useState(false);
  const [showSeqHint, setShowSeqHint] = useState(false);
  const [seqScore, setSeqScore] = useState(0);
  const [seqCorrectCount, setSeqCorrectCount] = useState(0);

  const handleSeqSelect = (val: number) => {
    if (seqSubmitted) return;
    setSelectedSeqOption(val);
  };

  const handleSeqSubmit = () => {
    if (selectedSeqOption === null || seqSubmitted) return;
    setSeqSubmitted(true);
    if (selectedSeqOption === currentSeq.answer) {
      setSeqScore((s) => s + 30);
      setSeqCorrectCount((c) => c + 1);
      setBrainPoints((bp) => bp + 30);
    }
  };

  const nextSeqQuestion = () => {
    setSeqIndex((s) => s + 1);
    setSelectedSeqOption(null);
    setSeqSubmitted(false);
    setShowSeqHint(false);
  };

  return (
    <PortalLayout
      portal="student"
      userName={student.fullName}
      userRole={`Student • ${student.className}-${student.section} (${getBoardName()})`}
      userHumanId={student.humanId}
      institutionName={`${getSchoolName()} (${getBoardName()})`}
      academicYear="AY-2026-2027"
    >
      {/* Top Banner with Brain Points & Trophy */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 flex items-center gap-1 shadow-sm">
              <Brain className="w-3.5 h-3.5" />
              Cognitive Arena • 5 Mind Games
            </span>
            <span className="text-xs text-slate-400 font-mono">
              NEP 2020 Critical Thinking & Problem Solving
            </span>
          </div>
          <h1 className="text-2xl font-black tracking-tight">
            Interactive Mind Games & Cognitive Gym
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Sharpen mental calculation, deductive vocabulary, working spatial memory, scientific deduction, and mathematical sequence pattern recognition.
          </p>
        </div>

        {/* Global Brain Score Meter & Certificate Trigger */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10">
            <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-300 uppercase tracking-wider block font-bold">
                Total Brain Points
              </span>
              <span className="text-2xl font-black text-amber-400">
                {brainPoints} XP
              </span>
            </div>
          </div>

          <button
            onClick={() =>
              openCertificate(
                "Cognitive Skills Overall",
                "Holistic Problem Solving & Analytical Reasoning",
                brainPoints,
                94
              )
            }
            className="hidden md:flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs shadow-md transition-all"
          >
            <Award className="w-4 h-4" />
            <span>Skill Certificate</span>
          </button>
        </div>
      </div>

      {/* 5 Distinct Mind Game Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {/* Game 1 Selector */}
        <button
          onClick={() => setActiveGame("VEDIC_MATH")}
          className={`p-3.5 rounded-2xl text-left border transition-all ${
            activeGame === "VEDIC_MATH"
              ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md ring-2 ring-amber-300"
              : "bg-white text-slate-800 border-slate-200 hover:border-amber-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold ${
                activeGame === "VEDIC_MATH"
                  ? "bg-slate-950 text-amber-400"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
            </div>
            <span
              className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                activeGame === "VEDIC_MATH"
                  ? "bg-slate-950 text-amber-300"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Speed
            </span>
          </div>
          <h3 className="font-extrabold text-xs">1. Vedic Math Blitz</h3>
          <p
            className={`text-[11px] mt-0.5 line-clamp-2 ${
              activeGame === "VEDIC_MATH" ? "text-slate-900" : "text-slate-500"
            }`}
          >
            30s sprint with Vedic shortcuts & hints.
          </p>
        </button>

        {/* Game 2 Selector */}
        <button
          onClick={() => setActiveGame("WORD_CIPHER")}
          className={`p-3.5 rounded-2xl text-left border transition-all ${
            activeGame === "WORD_CIPHER"
              ? "bg-blue-600 text-white border-blue-500 shadow-md ring-2 ring-blue-300"
              : "bg-white text-slate-800 border-slate-200 hover:border-blue-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold ${
                activeGame === "WORD_CIPHER"
                  ? "bg-white text-blue-700"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <span
              className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                activeGame === "WORD_CIPHER"
                  ? "bg-blue-900 text-blue-200"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Deduction
            </span>
          </div>
          <h3 className="font-extrabold text-xs">2. Logic Word Cipher</h3>
          <p
            className={`text-[11px] mt-0.5 line-clamp-2 ${
              activeGame === "WORD_CIPHER" ? "text-blue-100" : "text-slate-500"
            }`}
          >
            Decode 35+ science terms with clues & letter hints.
          </p>
        </button>

        {/* Game 3 Selector */}
        <button
          onClick={() => setActiveGame("MATRIX_MEMORY")}
          className={`p-3.5 rounded-2xl text-left border transition-all ${
            activeGame === "MATRIX_MEMORY"
              ? "bg-purple-600 text-white border-purple-500 shadow-md ring-2 ring-purple-300"
              : "bg-white text-slate-800 border-slate-200 hover:border-purple-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold ${
                activeGame === "MATRIX_MEMORY"
                  ? "bg-white text-purple-700"
                  : "bg-purple-100 text-purple-800"
              }`}
            >
              <Target className="w-3.5 h-3.5" />
            </div>
            <span
              className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                activeGame === "MATRIX_MEMORY"
                  ? "bg-purple-900 text-purple-200"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Recall
            </span>
          </div>
          <h3 className="font-extrabold text-xs">3. Matrix Memory</h3>
          <p
            className={`text-[11px] mt-0.5 line-clamp-2 ${
              activeGame === "MATRIX_MEMORY"
                ? "text-purple-100"
                : "text-slate-500"
            }`}
          >
            Spatial flash recall with 1-peek lifeline.
          </p>
        </button>

        {/* Game 4 Selector (NEW) */}
        <button
          onClick={() => setActiveGame("SCIENCE_QUEST")}
          className={`p-3.5 rounded-2xl text-left border transition-all ${
            activeGame === "SCIENCE_QUEST"
              ? "bg-emerald-600 text-white border-emerald-500 shadow-md ring-2 ring-emerald-300"
              : "bg-white text-slate-800 border-slate-200 hover:border-emerald-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold ${
                activeGame === "SCIENCE_QUEST"
                  ? "bg-white text-emerald-700"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
            </div>
            <span
              className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                activeGame === "SCIENCE_QUEST"
                  ? "bg-emerald-900 text-emerald-200"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Science
            </span>
          </div>
          <h3 className="font-extrabold text-xs">4. Science Quest</h3>
          <p
            className={`text-[11px] mt-0.5 line-clamp-2 ${
              activeGame === "SCIENCE_QUEST"
                ? "text-emerald-100"
                : "text-slate-500"
            }`}
          >
            Critical concepts with 50:50 & principles hints.
          </p>
        </button>

        {/* Game 5 Selector (NEW) */}
        <button
          onClick={() => setActiveGame("SEQUENCE_MASTER")}
          className={`p-3.5 rounded-2xl text-left border transition-all col-span-2 sm:col-span-1 ${
            activeGame === "SEQUENCE_MASTER"
              ? "bg-rose-600 text-white border-rose-500 shadow-md ring-2 ring-rose-300"
              : "bg-white text-slate-800 border-slate-200 hover:border-rose-300"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold ${
                activeGame === "SEQUENCE_MASTER"
                  ? "bg-white text-rose-700"
                  : "bg-rose-100 text-rose-800"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <span
              className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full ${
                activeGame === "SEQUENCE_MASTER"
                  ? "bg-rose-900 text-rose-200"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              Patterns
            </span>
          </div>
          <h3 className="font-extrabold text-xs">5. Sequence Master</h3>
          <p
            className={`text-[11px] mt-0.5 line-clamp-2 ${
              activeGame === "SEQUENCE_MASTER"
                ? "text-rose-100"
                : "text-slate-500"
            }`}
          >
            Number & logic patterns with formula hints.
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
                <h2 className="text-lg font-black text-slate-900">
                  Game 1: Vedic Math Blitz
                </h2>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-amber-50 text-amber-800 rounded border border-amber-200">
                  30s Sprint
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Solve rapid calculations using ancient Indian Vedic sutras. Streak combos unlock score multipliers!
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5 bg-slate-100 px-3 py-1.5 rounded-xl font-mono">
                <Timer className="w-4 h-4 text-rose-600" />
                <span className="font-bold text-slate-900 text-sm">
                  {mathTimer}s
                </span>
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
              <h3 className="text-xl font-extrabold text-slate-900">
                Ready for Vedic Math Sprint?
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Test your mental arithmetic speed with Vedic tricks, squares ending in 5, ×11, base 1000 subtraction, and near-100 multiplications.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <button
                  onClick={startMathGame}
                  className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  <span>Start 30-Second Challenge</span>
                </button>
                {mathScore > 0 && (
                  <button
                    onClick={() =>
                      openCertificate(
                        "Vedic Math Blitz",
                        "Mental Arithmetic & Speed Calculation Mastery",
                        mathScore,
                        Math.round(
                          (mathCorrectCount / Math.max(1, mathTotalAnswered)) * 100
                        )
                      )
                    }
                    className="px-4 py-3 bg-slate-900 hover:bg-slate-800 text-amber-400 font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <Award className="w-4 h-4" />
                    <span>Claim Certificate</span>
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="max-w-md mx-auto space-y-5 text-center">
              {/* Question Math Display */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 shadow-inner">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">
                  Compute in Mind:
                </span>
                <div className="text-4xl font-black text-slate-900 tracking-wider font-mono">
                  {mathQuestion.num1} {mathQuestion.op} {mathQuestion.num2} = ?
                </div>
              </div>

              {/* Hint Box for Vedic Math */}
              <div className="text-left">
                {!showMathHint ? (
                  <button
                    type="button"
                    onClick={() => setShowMathHint(true)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-lg border border-amber-200 transition-all"
                  >
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>💡 Need a Vedic Hint?</span>
                  </button>
                ) : (
                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-amber-900 mb-0.5">
                        Vedic Shortcut Clue:
                      </strong>
                      <span>{mathQuestion.hint}</span>
                    </div>
                  </div>
                )}
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
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 text-left flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
                <h2 className="text-lg font-black text-slate-900">
                  Game 2: Logic Word Cipher
                </h2>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-blue-50 text-blue-800 rounded border border-blue-200">
                  {currentCipher.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Deduce the secret {currentCipher.word.length}-letter word from the academic clue. Green = correct letter & position, Yellow = in word wrong spot!
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => resetCipherGame()}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>
                  Next Puzzle ({((cipherPuzzleIndex % WORD_PUZZLES.length) + 1)}/
                  {WORD_PUZZLES.length})
                </span>
              </button>
              {cipherSolved && (
                <button
                  onClick={() =>
                    openCertificate(
                      "Logic Word Cipher",
                      "Deductive Linguistic & Scientific Vocabulary Mastery",
                      85,
                      100
                    )
                  }
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Claim Certificate</span>
                </button>
              )}
            </div>
          </div>

          {/* Clue Box */}
          <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200 text-xs">
            <span className="text-[10px] font-bold uppercase text-blue-800 block mb-1 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5 text-blue-600" />
              Academic Clue ({currentCipher.word.length} Letters):
            </span>
            <p className="text-slate-800 text-sm font-semibold">
              {currentCipher.clue}
            </p>
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
                        <span className="font-extrabold text-amber-950">
                          Letter Hint
                        </span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-200 text-amber-900">
                          {hintInfo.letterCount === 1
                            ? "1 Letter (Small Word)"
                            : "2 Letters (Big Word)"}
                        </span>
                      </div>
                      <p className="text-[11px] text-amber-800 mt-0.5">
                        {showCipherHint
                          ? hintInfo.detail
                          : `Stuck? Reveal ${hintInfo.letterCount} letter${
                              hintInfo.letterCount > 1 ? "s" : ""
                            } to help solve this puzzle.`}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowCipherHint(!showCipherHint)}
                    className="self-start sm:self-auto px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {showCipherHint ? "Hide Letter Hint" : "Reveal Letter Hint"}
                    </span>
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
            {cipherGuesses.map((guess, gIdx) => (
              <div key={gIdx} className="flex gap-1.5 sm:gap-2">
                {guess.split("").map((letter, lIdx) => {
                  let bgColor = "bg-slate-200 text-slate-700 border-slate-300";
                  if (currentCipher.word[lIdx] === letter) {
                    bgColor =
                      "bg-emerald-600 text-white border-emerald-700 shadow-sm";
                  } else if (currentCipher.word.includes(letter)) {
                    bgColor =
                      "bg-amber-400 text-slate-950 border-amber-500 shadow-sm";
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

            {Array.from({ length: Math.max(0, 6 - cipherGuesses.length) }).map(
              (_, emptyIdx) => (
                <div key={emptyIdx} className="flex gap-1.5 sm:gap-2">
                  {Array.from({ length: currentCipher.word.length }).map(
                    (__, colIdx) => (
                      <div
                        key={colIdx}
                        className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center font-black text-sm sm:text-lg rounded-lg sm:rounded-xl border-2 border-dashed border-slate-200 text-slate-300"
                      >
                        •
                      </div>
                    )
                  )}
                </div>
              )
            )}
          </div>

          {/* User Input Submission */}
          {!cipherSolved && cipherGuesses.length < 6 && (
            <form
              onSubmit={handleCipherSubmit}
              className="max-w-xs mx-auto flex gap-2"
            >
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
            <div
              className={`p-3 rounded-xl text-center text-xs font-bold max-w-md mx-auto ${
                cipherSolved
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-amber-50 text-amber-800 border border-amber-200"
              }`}
            >
              {cipherMessage}
            </div>
          )}

          {cipherSolved && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 max-w-md mx-auto text-xs text-emerald-950">
              <span className="font-extrabold block text-sm mb-1">
                Did You Know?
              </span>
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
                <h2 className="text-lg font-black text-slate-900">
                  Game 3: Matrix Memory Recall
                </h2>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-purple-50 text-purple-800 rounded border border-purple-200">
                  Level {matrixLevel} (Memorize {Math.min(8, matrixLevel + 2)}{" "}
                  Tiles)
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Tiles will flash for 2.2 seconds. Recall and click the exact tiles to expand working memory capacity!
              </p>
            </div>

            <div className="flex items-center gap-2">
              {matrixState === "PLAYING" && (
                <button
                  onClick={handlePeekHint}
                  disabled={matrixPeeksUsed >= 1}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                    matrixPeeksUsed >= 1
                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                      : "bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>
                    {matrixPeeksUsed >= 1 ? "Peek Used" : "💡 1-Sec Peek Hint"}
                  </span>
                </button>
              )}

              <button
                onClick={() =>
                  startMatrixRound(Math.min(8, matrixLevel + 2))
                }
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5"
              >
                <Target className="w-4 h-4" />
                <span>Flash New Pattern</span>
              </button>

              {matrixLevel > 2 && (
                <button
                  onClick={() =>
                    openCertificate(
                      "Matrix Memory Recall",
                      "Visual-Spatial Working Memory & Cognitive Focus",
                      matrixLevel * 30,
                      95
                    )
                  }
                  className="px-3.5 py-2 bg-purple-900 hover:bg-purple-950 text-purple-200 font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Claim Certificate</span>
                </button>
              )}
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
                {isPeeking ? (
                  <span className="text-amber-600 animate-pulse font-extrabold">
                    👁️ PEEK ACTIVATED! Take a quick look!
                  </span>
                ) : (
                  <span>
                    👉 Click the {tilesToMemorize.length} tiles you saw! (
                    {selectedTiles.length}/{tilesToMemorize.length} selected)
                  </span>
                )}
              </div>
            )}

            <div className="grid grid-cols-4 gap-2.5 p-4 bg-slate-900 rounded-2xl shadow-inner">
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, idx) => {
                const isFlashed =
                  (tilesToMemorize.includes(idx) &&
                    matrixState === "FLASHING") ||
                  (isPeeking && tilesToMemorize.includes(idx));
                const isSelected = selectedTiles.includes(idx);
                const isCorrect = isSelected && tilesToMemorize.includes(idx);
                const isWrong = isSelected && !tilesToMemorize.includes(idx);

                let tileClass = "bg-slate-800 hover:bg-slate-700 border-slate-700";

                if (isFlashed) {
                  tileClass =
                    "bg-amber-400 border-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.6)] animate-pulse";
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
                    disabled={matrixState !== "PLAYING" || isPeeking}
                    onClick={() => handleTileClick(idx)}
                    className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl border-2 transition-all flex items-center justify-center font-bold ${tileClass}`}
                  >
                    {isFlashed && (
                      <Sparkles className="w-5 h-5 text-slate-950" />
                    )}
                    {matrixState === "RESULT" &&
                      tilesToMemorize.includes(idx) && (
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      )}
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
                  🎉 Flawless Recall! You memorized all {tilesToMemorize.length}{" "}
                  tiles! (+40 Brain Points)
                </div>
              ) : (
                <div className="p-3 bg-rose-50 text-rose-900 rounded-xl border border-rose-200 text-xs font-bold">
                  ❌ Missed some tiles. Green shows the correct pattern. Try again!
                </div>
              )}

              <button
                onClick={() =>
                  startMatrixRound(Math.min(8, matrixLevel + 2))
                }
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

      {/* ========================================================== */}
      {/* GAME 4 CANVAS: SCIENCE QUEST (CRITICAL DEDUCTION)          */}
      {/* ========================================================== */}
      {activeGame === "SCIENCE_QUEST" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                <h2 className="text-lg font-black text-slate-900">
                  Game 4: Science Quest & Critical Deduction
                </h2>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded border border-emerald-200">
                  {currentQuest.category}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Apply scientific inquiry, deduction, and syllabus principles to solve thought-provoking questions.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="bg-slate-900 text-emerald-400 px-3 py-1.5 rounded-xl font-black text-sm">
                Score: {questScore}
              </div>
              <button
                onClick={nextQuestQuestion}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
              >
                <span>
                  Next Question ({(questIndex % SCIENCE_QUEST_BANK.length) + 1}/
                  {SCIENCE_QUEST_BANK.length})
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {questCorrectCount >= 3 && (
                <button
                  onClick={() =>
                    openCertificate(
                      "Science Quest & Critical Deduction",
                      "Scientific Inquiry & Conceptual Deduction Mastery",
                      questScore,
                      Math.round(
                        (questCorrectCount / Math.max(1, questIndex + 1)) * 100
                      )
                    )
                  }
                  className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Claim Certificate</span>
                </button>
              )}
            </div>
          </div>

          <div className="max-w-2xl mx-auto space-y-5">
            {/* Question Text Box */}
            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-200 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800">
                  Question #{((questIndex % SCIENCE_QUEST_BANK.length) + 1)}
                </span>
                <span className="text-xs text-slate-500">
                  Concept: {currentQuest.category}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {currentQuest.question}
              </h3>
            </div>

            {/* Hint & 50:50 Lifeline Button */}
            <div>
              {!showQuestHint ? (
                <button
                  type="button"
                  onClick={handleQuestFiftyFifty}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3.5 py-2 rounded-xl border border-amber-300 transition-all shadow-sm"
                >
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>💡 Need a Clue? (Reveal Principle & 50:50)</span>
                </button>
              ) : (
                <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-amber-900 font-extrabold mb-0.5">
                      Scientific Deduction Clue:
                    </strong>
                    <span>{currentQuest.hint}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 4 Multiple Choice Options */}
            <div className="grid grid-cols-1 gap-2.5">
              {currentQuest.options.map((opt, idx) => {
                const isSelected = selectedQuestOption === idx;
                const isEliminated = eliminatedOptions.includes(idx);
                let btnStyle =
                  "bg-white border-slate-200 text-slate-800 hover:border-emerald-400";

                if (isEliminated) {
                  btnStyle =
                    "bg-slate-100 border-slate-200 text-slate-400 line-through opacity-50 cursor-not-allowed";
                } else if (questSubmitted) {
                  if (idx === currentQuest.correctIndex) {
                    btnStyle =
                      "bg-emerald-600 text-white border-emerald-700 shadow-md";
                  } else if (isSelected && idx !== currentQuest.correctIndex) {
                    btnStyle =
                      "bg-rose-600 text-white border-rose-700 shadow-sm";
                  } else {
                    btnStyle = "bg-slate-50 border-slate-200 text-slate-400";
                  }
                } else if (isSelected) {
                  btnStyle =
                    "bg-emerald-50 border-emerald-600 text-emerald-950 ring-2 ring-emerald-400";
                }

                return (
                  <button
                    key={idx}
                    disabled={isEliminated || questSubmitted}
                    onClick={() => handleQuestSelect(idx)}
                    className={`p-4 rounded-xl border-2 text-left font-medium text-xs sm:text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {questSubmitted && idx === currentQuest.correctIndex && (
                      <CheckCircle2 className="w-5 h-5 text-white shrink-0" />
                    )}
                    {questSubmitted &&
                      isSelected &&
                      idx !== currentQuest.correctIndex && (
                        <AlertCircle className="w-5 h-5 text-white shrink-0" />
                      )}
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            {!questSubmitted ? (
              <button
                disabled={selectedQuestOption === null}
                onClick={handleQuestSubmit}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Check My Answer</span>
                <Check className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-xl text-xs sm:text-sm font-bold text-center ${
                    selectedQuestOption === currentQuest.correctIndex
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                      : "bg-rose-50 text-rose-900 border border-rose-200"
                  }`}
                >
                  {selectedQuestOption === currentQuest.correctIndex
                    ? "🎉 Correct Deduction! +25 Brain Points"
                    : "❌ Not quite! Review the scientific explanation below."}
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed">
                  <strong className="block text-slate-900 font-extrabold mb-1">
                    Scientific Explanation:
                  </strong>
                  <p>{currentQuest.explanation}</p>
                </div>

                <button
                  onClick={nextQuestQuestion}
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Continue to Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* GAME 5 CANVAS: PATTERN & SEQUENCE MASTER                   */}
      {/* ========================================================== */}
      {activeGame === "SEQUENCE_MASTER" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-600"></span>
                <h2 className="text-lg font-black text-slate-900">
                  Game 5: Pattern & Sequence Master
                </h2>
                <span className="text-xs font-mono font-bold px-2 py-0.5 bg-rose-50 text-rose-800 rounded border border-rose-200">
                  {currentSeq.patternType}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Identify the hidden mathematical rule connecting the terms and find the missing value.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <div className="bg-slate-900 text-rose-400 px-3 py-1.5 rounded-xl font-black text-sm">
                Score: {seqScore}
              </div>
              <button
                onClick={nextSeqQuestion}
                className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all"
              >
                <span>
                  Next Pattern ({(seqIndex % SEQUENCE_PUZZLE_BANK.length) + 1}/
                  {SEQUENCE_PUZZLE_BANK.length})
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {seqCorrectCount >= 3 && (
                <button
                  onClick={() =>
                    openCertificate(
                      "Pattern & Sequence Master",
                      "Mathematical Logic & Sequence Recognition Mastery",
                      seqScore,
                      Math.round(
                        (seqCorrectCount / Math.max(1, seqIndex + 1)) * 100
                      )
                    )
                  }
                  className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Claim Certificate</span>
                </button>
              )}
            </div>
          </div>

          <div className="max-w-xl mx-auto space-y-6 text-center">
            {/* Sequence Display Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50 via-slate-50 to-rose-50/30 border border-rose-200 shadow-inner">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-rose-700 block mb-3">
                Decipher the Sequence:
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-wider font-mono">
                {currentSeq.sequence}
              </div>
            </div>

            {/* Formula Hint Button */}
            <div className="text-left">
              {!showSeqHint ? (
                <button
                  type="button"
                  onClick={() => setShowSeqHint(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-800 hover:text-rose-900 bg-rose-50 hover:bg-rose-100 px-3.5 py-2 rounded-xl border border-rose-200 transition-all"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-rose-600" />
                  <span>💡 Need a Formula Hint?</span>
                </button>
              ) : (
                <div className="p-3.5 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-950 flex items-start gap-2.5">
                  <Lightbulb className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-rose-900 font-extrabold mb-0.5">
                      Pattern Rule Hint:
                    </strong>
                    <span>{currentSeq.hint}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 4 Choices */}
            <div className="grid grid-cols-2 gap-3">
              {currentSeq.options.map((opt, idx) => {
                const isSelected = selectedSeqOption === opt;
                let btnStyle =
                  "bg-white border-slate-200 text-slate-800 hover:border-rose-400";

                if (seqSubmitted) {
                  if (opt === currentSeq.answer) {
                    btnStyle =
                      "bg-emerald-600 text-white border-emerald-700 shadow-md";
                  } else if (isSelected && opt !== currentSeq.answer) {
                    btnStyle =
                      "bg-rose-600 text-white border-rose-700 shadow-sm";
                  } else {
                    btnStyle = "bg-slate-50 border-slate-200 text-slate-400";
                  }
                } else if (isSelected) {
                  btnStyle =
                    "bg-rose-50 border-rose-600 text-rose-950 ring-2 ring-rose-400";
                }

                return (
                  <button
                    key={idx}
                    disabled={seqSubmitted}
                    onClick={() => handleSeqSelect(opt)}
                    className={`p-4 rounded-xl border-2 text-center font-black text-xl font-mono transition-all ${btnStyle}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            {!seqSubmitted ? (
              <button
                disabled={selectedSeqOption === null}
                onClick={handleSeqSubmit}
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Verify Pattern Answer</span>
                <Check className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-4">
                <div
                  className={`p-4 rounded-xl text-xs sm:text-sm font-bold text-center ${
                    selectedSeqOption === currentSeq.answer
                      ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                      : "bg-rose-50 text-rose-900 border border-rose-200"
                  }`}
                >
                  {selectedSeqOption === currentSeq.answer
                    ? "🎉 Outstanding! You mastered this pattern! (+30 Brain Points)"
                    : `❌ Incorrect. The answer was ${currentSeq.answer}.`}
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed text-left">
                  <strong className="block text-slate-900 font-extrabold mb-1">
                    Mathematical Rule:
                  </strong>
                  <p>{currentSeq.ruleExplanation}</p>
                </div>

                <button
                  onClick={nextSeqQuestion}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2"
                >
                  <span>Next Sequence Challenge</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================== */}
      {/* DOWNLOADABLE COGNITIVE SKILL CERTIFICATE MODAL             */}
      {/* ========================================================== */}
      {showCertificate && certificateData && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border-4 border-amber-300 p-6 sm:p-8 space-y-6 my-auto print:border-none print:shadow-none print:p-0">
            {/* Action Bar (Hidden when printing) */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 print:hidden">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <span className="font-extrabold text-sm text-slate-900">
                  Official Cognitive Skill Certificate
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print / Download PDF</span>
                </button>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Printable Certificate Canvas */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-amber-50/40 via-white to-amber-50/40 rounded-2xl border-2 border-amber-400/80 text-center space-y-5 relative overflow-hidden print:m-0 print:border-4 print:border-amber-500">
              {/* Corner Ornaments */}
              <div className="absolute top-2 left-2 text-amber-400 text-xl font-serif">
                ❖
              </div>
              <div className="absolute top-2 right-2 text-amber-400 text-xl font-serif">
                ❖
              </div>
              <div className="absolute bottom-2 left-2 text-amber-400 text-xl font-serif">
                ❖
              </div>
              <div className="absolute bottom-2 right-2 text-amber-400 text-xl font-serif">
                ❖
              </div>

              {/* Institution Header */}
              <div className="space-y-1">
                <span className="text-[11px] font-extrabold tracking-widest text-amber-800 uppercase block">
                  Swamy Vivekananda Vidya Kendra Trust
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  SRI VIVEKANANDA VIDYA KENDRA
                </h2>
                <p className="text-[11px] text-slate-600 font-medium">
                  Hoskote, Bengaluru Rural – 562114 • {getBoardName()}
                </p>
                <div className="text-xs text-amber-700 font-serif italic font-bold pt-1">
                  ॥ विद्या ददाति विनयम् ॥
                </div>
              </div>

              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto"></div>

              {/* Certificate Title */}
              <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">
                  Certificate of Cognitive Achievement
                </span>
                <h3 className="text-lg sm:text-xl font-extrabold text-amber-600 font-serif">
                  {certificateData.skillTitle}
                </h3>
              </div>

              {/* Recipient */}
              <div className="space-y-1">
                <p className="text-xs text-slate-500">
                  This certifies that student
                </p>
                <div className="text-xl sm:text-2xl font-black text-slate-900 font-serif underline decoration-amber-400 underline-offset-8">
                  {student.fullName}
                </div>
                <p className="text-xs text-slate-600 pt-2">
                  of Class{" "}
                  <strong>
                    {student.className}-{student.section}
                  </strong>{" "}
                  (ID: <strong>{student.humanId}</strong>) has successfully
                  demonstrated exemplary analytical prowess in
                </p>
                <p className="text-sm font-extrabold text-slate-800">
                  {certificateData.gameName}
                </p>
              </div>

              {/* Performance Score Badges */}
              <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto pt-2">
                <div className="p-2 bg-white rounded-xl border border-amber-200">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">
                    Score
                  </span>
                  <span className="text-sm font-black text-slate-900">
                    {certificateData.score} Pts
                  </span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-amber-200">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">
                    Accuracy
                  </span>
                  <span className="text-sm font-black text-emerald-600">
                    {certificateData.accuracy}%
                  </span>
                </div>
                <div className="p-2 bg-white rounded-xl border border-amber-200">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block">
                    Status
                  </span>
                  <span className="text-sm font-black text-amber-600">
                    Certified
                  </span>
                </div>
              </div>

              {/* Signatures & Verification ID */}
              <div className="pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 items-end gap-4 text-xs text-slate-600">
                <div className="text-left">
                  <span className="text-[10px] text-slate-400 block font-mono">
                    Date of Issue:
                  </span>
                  <span className="font-bold text-slate-800 text-[11px]">
                    {certificateData.date}
                  </span>
                  <span className="text-[9px] text-slate-400 block font-mono mt-0.5">
                    {certificateData.certId}
                  </span>
                </div>

                <div className="text-center hidden sm:block">
                  <div className="w-12 h-12 rounded-full border-2 border-amber-400 text-amber-600 mx-auto flex items-center justify-center font-black text-[10px] tracking-tighter">
                    SEAL
                  </div>
                </div>

                <div className="text-right">
                  <div className="w-24 border-b border-slate-400 ml-auto mb-1"></div>
                  <span className="font-bold text-slate-900 block text-[11px]">
                    Principal / Coordinator
                  </span>
                  <span className="text-[10px] text-slate-400">
                    Sri Vivekananda Vidya Kendra
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
