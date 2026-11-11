// Multi-Board Management Engine for India Unified School ERP
import { BoardType } from "@prisma/client";
import { BoardConfigSchema, BoardGradingRule } from "./types";

export const BOARD_TEMPLATES: Record<string, BoardConfigSchema> = {
  CBSE: {
    boardType: "CBSE",
    version: "2026.1",
    gradingRules: [
      { grade: "A1", minPercentage: 91, maxPercentage: 100, gradePoint: 10.0, description: "Top 1/8th of passed candidates - Outstanding" },
      { grade: "A2", minPercentage: 81, maxPercentage: 90, gradePoint: 9.0, description: "Next 1/8th of passed candidates - Excellent" },
      { grade: "B1", minPercentage: 71, maxPercentage: 80, gradePoint: 8.0, description: "Next 1/8th of passed candidates - Very Good" },
      { grade: "B2", minPercentage: 61, maxPercentage: 70, gradePoint: 7.0, description: "Next 1/8th of passed candidates - Good" },
      { grade: "C1", minPercentage: 51, maxPercentage: 60, gradePoint: 6.0, description: "Next 1/8th of passed candidates - Fair" },
      { grade: "C2", minPercentage: 41, maxPercentage: 50, gradePoint: 5.0, description: "Next 1/8th of passed candidates - Average" },
      { grade: "D", minPercentage: 33, maxPercentage: 40, gradePoint: 4.0, description: "Next 1/8th of passed candidates - Pass" },
      { grade: "E", minPercentage: 0, maxPercentage: 32, gradePoint: 0.0, description: "Essential Repeat / Needs Improvement" },
    ],
    assessmentPattern: {
      terms: [
        {
          name: "Annual Assessment Scheme",
          weightage: 100,
          components: [
            { name: "Annual Board / School Exam", maxMarks: 80 },
            { name: "Periodic Tests (Best 2 of 3)", maxMarks: 5 },
            { name: "Multiple Assessment", maxMarks: 5 },
            { name: "Portfolio", maxMarks: 5 },
            { name: "Subject Enrichment / Practical", maxMarks: 5 },
          ],
        },
      ],
    },
    languageScheme: {
      firstLanguage: ["English", "Hindi"],
      secondLanguage: ["Hindi", "Sanskrit", "Kannada", "French", "German", "Urdu"],
      thirdLanguage: ["Sanskrit", "Kannada", "Hindi"],
    },
    coScholasticCriteria: {
      activities: ["Work Education", "Art Education", "Health & Physical Education", "Discipline"],
      gradingScale: ["A", "B", "C", "D", "E"],
    },
  },

  KARNATAKA_STATE_BOARD: {
    boardType: "KARNATAKA_STATE_BOARD",
    version: "2026.1",
    gradingRules: [
      { grade: "A+", minPercentage: 90, maxPercentage: 100, gradePoint: 10.0, description: "Distinction - Outstanding" },
      { grade: "A", minPercentage: 80, maxPercentage: 89.99, gradePoint: 8.5, description: "First Class with Distinction" },
      { grade: "B+", minPercentage: 70, maxPercentage: 79.99, gradePoint: 7.5, description: "First Class" },
      { grade: "B", minPercentage: 60, maxPercentage: 69.99, gradePoint: 6.5, description: "Second Class" },
      { grade: "C+", minPercentage: 50, maxPercentage: 59.99, gradePoint: 5.5, description: "Third Class" },
      { grade: "C", minPercentage: 35, maxPercentage: 49.99, gradePoint: 4.0, description: "Pass" },
      { grade: "D", minPercentage: 0, maxPercentage: 34.99, gradePoint: 0.0, description: "Unsatisfactory / Fail" },
    ],
    assessmentPattern: {
      terms: [
        {
          name: "Continuous and Comprehensive Evaluation (CCE)",
          weightage: 100,
          components: [
            { name: "Formative Assessment 1 (FA-1)", maxMarks: 25 },
            { name: "Formative Assessment 2 (FA-2)", maxMarks: 25 },
            { name: "Summative Assessment 1 (SA-1)", maxMarks: 50 },
            { name: "Formative Assessment 3 (FA-3)", maxMarks: 25 },
            { name: "Formative Assessment 4 (FA-4)", maxMarks: 25 },
            { name: "Summative Assessment 2 (SA-2)", maxMarks: 50 },
          ],
        },
      ],
    },
    languageScheme: {
      firstLanguage: ["Kannada (125 Marks)", "English (125 Marks)", "Sanskrit (125 Marks)"],
      secondLanguage: ["English (100 Marks)", "Kannada (100 Marks)"],
      thirdLanguage: ["Hindi (100 Marks)", "Kannada (100 Marks)"],
    },
    coScholasticCriteria: {
      activities: ["Physical and Health Education", "Value Education", "Work Experience", "Art and Music"],
      gradingScale: ["A", "B", "C"],
    },
  },

  MAHARASHTRA_STATE_BOARD: {
    boardType: "MAHARASHTRA_STATE_BOARD",
    version: "2026.1",
    gradingRules: [
      { grade: "Distinction", minPercentage: 75, maxPercentage: 100, gradePoint: 10.0, description: "First Class with Distinction" },
      { grade: "First Class", minPercentage: 60, maxPercentage: 74.99, gradePoint: 8.0, description: "First Division" },
      { grade: "Second Class", minPercentage: 45, maxPercentage: 59.99, gradePoint: 6.0, description: "Second Division" },
      { grade: "Pass Class", minPercentage: 35, maxPercentage: 44.99, gradePoint: 4.0, description: "Pass Division" },
      { grade: "Failed", minPercentage: 0, maxPercentage: 34.99, gradePoint: 0.0, description: "Needs Improvement" },
    ],
    assessmentPattern: {
      terms: [
        {
          name: "Semester Evaluation",
          weightage: 100,
          components: [
            { name: "First Semester Written Exam", maxMarks: 50 },
            { name: "First Semester Internal / Oral", maxMarks: 20 },
            { name: "Second Semester Written Exam", maxMarks: 50 },
            { name: "Second Semester Practical / Viva", maxMarks: 20 },
          ],
        },
      ],
    },
    languageScheme: {
      firstLanguage: ["Marathi", "English", "Hindi"],
      secondLanguage: ["Hindi", "Marathi", "English"],
      thirdLanguage: ["English", "Sanskrit", "Hindi"],
    },
  },

  TAMIL_NADU_STATE_BOARD: {
    boardType: "TAMIL_NADU_STATE_BOARD",
    version: "2026.1",
    gradingRules: [
      { grade: "A1", minPercentage: 91, maxPercentage: 100, gradePoint: 10.0, description: "Outstanding" },
      { grade: "A2", minPercentage: 81, maxPercentage: 90, gradePoint: 9.0, description: "Excellent" },
      { grade: "B1", minPercentage: 71, maxPercentage: 80, gradePoint: 8.0, description: "Very Good" },
      { grade: "B2", minPercentage: 61, maxPercentage: 70, gradePoint: 7.0, description: "Good" },
      { grade: "C1", minPercentage: 51, maxPercentage: 60, gradePoint: 6.0, description: "Average" },
      { grade: "C2", minPercentage: 35, maxPercentage: 50, gradePoint: 4.0, description: "Pass" },
      { grade: "D", minPercentage: 0, maxPercentage: 34.99, gradePoint: 0.0, description: "Needs Improvement" },
    ],
    assessmentPattern: {
      terms: [
        {
          name: "Trimester Samacheer Kalvi Pattern",
          weightage: 100,
          components: [
            { name: "Term 1 Summative Assessment", maxMarks: 60 },
            { name: "Term 1 Formative Assessment", maxMarks: 40 },
            { name: "Term 2 Summative Assessment", maxMarks: 60 },
            { name: "Term 2 Formative Assessment", maxMarks: 40 },
            { name: "Term 3 Summative Assessment", maxMarks: 60 },
            { name: "Term 3 Formative Assessment", maxMarks: 40 },
          ],
        },
      ],
    },
    languageScheme: {
      firstLanguage: ["Tamil", "English"],
      secondLanguage: ["English", "Hindi"],
      thirdLanguage: ["Hindi", "Telugu", "Malayalam"],
    },
  },

  KERALA_STATE_BOARD: {
    boardType: "KERALA_STATE_BOARD",
    version: "2026.1",
    gradingRules: [
      { grade: "A+", minPercentage: 90, maxPercentage: 100, gradePoint: 9.0, description: "Outstanding" },
      { grade: "A", minPercentage: 80, maxPercentage: 89, gradePoint: 8.0, description: "Excellent" },
      { grade: "B+", minPercentage: 70, maxPercentage: 79, gradePoint: 7.0, description: "Very Good" },
      { grade: "B", minPercentage: 60, maxPercentage: 69, gradePoint: 6.0, description: "Good" },
      { grade: "C+", minPercentage: 50, maxPercentage: 59, gradePoint: 5.0, description: "Above Average" },
      { grade: "C", minPercentage: 40, maxPercentage: 49, gradePoint: 4.0, description: "Average" },
      { grade: "D+", minPercentage: 30, maxPercentage: 39, gradePoint: 3.0, description: "Eligible for Higher Studies" },
      { grade: "D", minPercentage: 20, maxPercentage: 29, gradePoint: 2.0, description: "Needs Improvement" },
      { grade: "E", minPercentage: 0, maxPercentage: 19, gradePoint: 0.0, description: "Needs Improvement" },
    ],
    assessmentPattern: {
      terms: [
        {
          name: "Continuous Evaluation & Terminal Evaluation",
          weightage: 100,
          components: [
            { name: "Continuous Evaluation (CE)", maxMarks: 20 },
            { name: "Terminal Evaluation (TE)", maxMarks: 80 },
          ],
        },
      ],
    },
    languageScheme: {
      firstLanguage: ["Malayalam", "Tamil", "Kannada", "English"],
      secondLanguage: ["English", "Hindi"],
      thirdLanguage: ["Hindi", "Arabic", "Urdu", "Sanskrit"],
    },
  },
};

/**
 * Calculates grade and grade points according to board rules
 */
export function calculateBoardGrade(
  scored: number,
  maxMarks: number,
  boardType: string,
  customRules?: BoardGradingRule[]
): { grade: string; gradePoint: number; percentage: number; description: string } {
  if (maxMarks <= 0) {
    return { grade: "N/A", gradePoint: 0, percentage: 0, description: "Invalid Marks" };
  }

  const percentage = Math.round((scored / maxMarks) * 100 * 100) / 100;

  const rules: BoardGradingRule[] =
    customRules ||
    BOARD_TEMPLATES[boardType]?.gradingRules ||
    BOARD_TEMPLATES.CBSE.gradingRules;

  for (const rule of rules) {
    if (percentage >= rule.minPercentage && percentage <= rule.maxPercentage) {
      return {
        grade: rule.grade,
        gradePoint: rule.gradePoint,
        percentage,
        description: rule.description,
      };
    }
  }

  return { grade: "E", gradePoint: 0, percentage, description: "Needs Improvement" };
}

/**
 * Multilingual Translation Dictionary for UI & Official School Documents
 */
export const MULTILINGUAL_LABELS: Record<string, Record<string, string>> = {
  English: {
    schoolERP: "India Unified School ERP",
    reportCard: "Academic Progress Report Card",
    studentId: "Student ID",
    admissionNo: "Admission Number",
    academicYear: "Academic Year",
    attendance: "Attendance",
    totalMarks: "Total Marks",
    grade: "Grade",
    result: "Result",
    passed: "Passed",
    promoted: "Promoted to Next Grade",
  },
  Hindi: {
    schoolERP: "भारत एकीकृत स्कूल ईआरपी",
    reportCard: "शैक्षणिक प्रगति रिपोर्ट कार्ड",
    studentId: "छात्र पहचान संख्या",
    admissionNo: "प्रवेश संख्या",
    academicYear: "शैक्षणिक सत्र",
    attendance: "उपस्थिति",
    totalMarks: "कुल अंक",
    grade: "श्रेणी (ग्रेड)",
    result: "परिणाम",
    passed: "उत्तीर्ण",
    promoted: "अगली कक्षा में पदोन्नत",
  },
  Kannada: {
    schoolERP: "ಭಾರತ ಏಕೀಕೃತ ಶಾಲಾ ಇಆರ್ಪಿ",
    reportCard: "ಶೈಕ್ಷಣಿಕ ಪ್ರಗತಿ ವರದಿ ಪತ್ರಿಕೆ",
    studentId: "ವಿದ್ಯಾರ್ಥಿ ಗುರುತಿನ ಸಂಖ್ಯೆ",
    admissionNo: "ದಾಖಲಾತಿ ಸಂಖ್ಯೆ",
    academicYear: "ಶೈಕ್ಷಣಿಕ ವರ್ಷ",
    attendance: "ಹಾಜರಾತಿ",
    totalMarks: "ಒಟ್ಟು ಅಂಕಗಳು",
    grade: "ಶ್ರೇಣಿ",
    result: "ಫಲಿತಾಂಶ",
    passed: "ತೇರ್ಗಡೆ",
    promoted: "ಮುಂದಿನ ತರಗತಿಗೆ ಬಡ್ತಿ",
  },
  Tamil: {
    schoolERP: "இந்திய ஒருங்கிணைந்த பள்ளி ஈஆர்பி",
    reportCard: "கல்வி முன்னேற்ற அறிக்கை அட்டை",
    studentId: "மாணவர் அடையாள எண்",
    admissionNo: "சேர்க்கை எண்",
    academicYear: "கல்வியாண்டு",
    attendance: "வருகை",
    totalMarks: "மொத்த மதிப்பெண்கள்",
    grade: "தரம்",
    result: "முடிவு",
    passed: "தேர்ச்சி",
    promoted: "அடுத்த வகுப்பிற்கு தேர்ச்சி",
  },
  Telugu: {
    schoolERP: "భారత ఏకీకృత పాఠశాల ఈఆర్పీ",
    reportCard: "విద్యా పురోగతి నివేదిక కార్డు",
    studentId: "విద్యార్థి గుర్తింపు సంఖ్య",
    admissionNo: "ప్రవేశ సంఖ్య",
    academicYear: "విద్యా సంవత్సరం",
    attendance: "హాజరు",
    totalMarks: "మొత్తం మార్కులు",
    grade: "గ్రేడ్",
    result: "ఫలితం",
    passed: "ఉత్తీర్ణులు",
    promoted: "తదుపరి తరగతికి ప్రమోట్ చేయబడింది",
  },
  Marathi: {
    schoolERP: "भारत युनिफाइड स्कूल ईआरपी",
    reportCard: "शैक्षणिक प्रगती अहवाल पत्रक",
    studentId: "विद्यार्थी ओळख क्रमांक",
    admissionNo: "प्रवेश क्रमांक",
    academicYear: "शैक्षणिक वर्ष",
    attendance: "हजेरी",
    totalMarks: "एकूण गुण",
    grade: "श्रेणी",
    result: "निकाल",
    passed: "उत्तीर्ण",
    promoted: "पुढील वर्गात बढती",
  },
};
