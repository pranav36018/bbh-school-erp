export interface VideoLesson {
  id: string;
  classLevel: string; // e.g. "Standard 10", "Standard 8", "LKG", etc.
  subject: string;    // e.g. "Mathematics", "Science", "Kannada"
  title: string;
  youtubeId: string;  // YouTube Video ID (e.g. "dQw4w9WgXcQ" or clean 11-char ID)
  duration: string;   // e.g. "22 mins"
  instructor: string;
  topic: string;
  examNotes: string;
  isCustom?: boolean;
}

export interface SubjectCategory {
  id: string;
  name: string;
  classLevel: string;
  iconName: string;
}

export const INITIAL_CLASSES = [
  "Standard 10",
  "Standard 9",
  "Standard 8",
  "Standard 7",
  "Standard 6",
  "Standard 5",
  "Standard 4",
  "Standard 3",
  "Standard 2",
  "Standard 1",
  "UKG",
  "LKG",
  "Pre-KG",
];

export const INITIAL_SUBJECTS: SubjectCategory[] = [
  // High School Subjects
  { id: "sub-10-math", name: "Mathematics", classLevel: "Standard 10", iconName: "Calculator" },
  { id: "sub-10-sci", name: "Science (Physics & Chem)", classLevel: "Standard 10", iconName: "Atom" },
  { id: "sub-10-kan", name: "First Language Kannada", classLevel: "Standard 10", iconName: "BookOpen" },
  { id: "sub-10-soc", name: "Social Science", classLevel: "Standard 10", iconName: "Globe" },
  { id: "sub-10-eng", name: "English Language", classLevel: "Standard 10", iconName: "PenTool" },

  { id: "sub-9-math", name: "Mathematics", classLevel: "Standard 9", iconName: "Calculator" },
  { id: "sub-9-sci", name: "Science", classLevel: "Standard 9", iconName: "Atom" },
  { id: "sub-9-kan", name: "Kannada", classLevel: "Standard 9", iconName: "BookOpen" },
  { id: "sub-9-soc", name: "Social Science", classLevel: "Standard 9", iconName: "Globe" },

  { id: "sub-8-math", name: "Mathematics", classLevel: "Standard 8", iconName: "Calculator" },
  { id: "sub-8-sci", name: "General Science", classLevel: "Standard 8", iconName: "Atom" },
  { id: "sub-8-kan", name: "Siri Kannada 8", classLevel: "Standard 8", iconName: "BookOpen" },
  { id: "sub-8-soc", name: "Social Science", classLevel: "Standard 8", iconName: "Globe" },

  { id: "sub-7-math", name: "Mathematics", classLevel: "Standard 7", iconName: "Calculator" },
  { id: "sub-7-sci", name: "Science", classLevel: "Standard 7", iconName: "Atom" },
  { id: "sub-7-kan", name: "Kannada", classLevel: "Standard 7", iconName: "BookOpen" },

  { id: "sub-6-math", name: "Mathematics", classLevel: "Standard 6", iconName: "Calculator" },
  { id: "sub-6-sci", name: "General Science", classLevel: "Standard 6", iconName: "Atom" },
  { id: "sub-6-kan", name: "Kannada", classLevel: "Standard 6", iconName: "BookOpen" },

  // Primary
  { id: "sub-5-all", name: "Mathematics & EVS", classLevel: "Standard 5", iconName: "Calculator" },
  { id: "sub-5-kan", name: "Kannada & English", classLevel: "Standard 5", iconName: "BookOpen" },

  { id: "sub-4-all", name: "Primary Mathematics & Science", classLevel: "Standard 4", iconName: "Calculator" },
  { id: "sub-4-kan", name: "Kannada Reader", classLevel: "Standard 4", iconName: "BookOpen" },

  { id: "sub-3-all", name: "Basic Math & English", classLevel: "Standard 3", iconName: "Calculator" },
  { id: "sub-3-kan", name: "Kannada Kali", classLevel: "Standard 3", iconName: "BookOpen" },

  { id: "sub-2-all", name: "Foundational Math & Letters", classLevel: "Standard 2", iconName: "Sparkles" },
  { id: "sub-1-all", name: "Alphabet, Phonics & Numbers", classLevel: "Standard 1", iconName: "Sparkles" },

  // Pre-Primary
  { id: "sub-ukg-all", name: "Kreedo Activity & Phonics", classLevel: "UKG", iconName: "Sparkles" },
  { id: "sub-lkg-all", name: "Rhymes, Stories & Colors", classLevel: "LKG", iconName: "Sparkles" },
  { id: "sub-pkg-all", name: "Montessori Sensory & Play", classLevel: "Pre-KG", iconName: "Sparkles" },
];

// No dummy videos: display strictly what faculty uploads
export const INITIAL_VIDEOS: VideoLesson[] = [];
