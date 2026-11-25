"use client";

import React, { useState, useEffect } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  Play,
  Video,
  Search,
  BookOpen,
  Sparkles,
  ExternalLink,
  Clock,
  User,
  X,
  GraduationCap,
  Youtube,
  Tv,
} from "lucide-react";
import {
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_VIDEOS,
  VideoLesson,
  SubjectCategory,
} from "@/lib/video-learning-data";
import { useBoard } from "@/lib/board-context";

export default function StudentVideoLearningPage() {
  const { board, getBoardName, getSchoolName } = useBoard();
  const isState = board === "state";

  const [classes] = useState<string[]>(INITIAL_CLASSES);
  const [selectedClass, setSelectedClass] = useState<string>("Standard 10");
  const [classCategory, setClassCategory] = useState<string>("ALL");
  const [subjects, setSubjects] = useState<SubjectCategory[]>(INITIAL_SUBJECTS);

  const filterClassesByCategory = (category: string) => {
    if (category === "High School") {
      return ["Standard 10", "Standard 9", "Standard 8"];
    }
    if (category === "Primary") {
      return [
        "Standard 7",
        "Standard 6",
        "Standard 5",
        "Standard 4",
        "Standard 3",
        "Standard 2",
        "Standard 1",
      ];
    }
    if (category === "Pre-Primary") {
      return ["UKG", "LKG", "Pre-KG"];
    }
    return classes;
  };
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");
  const [videos, setVideos] = useState<VideoLesson[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Video Player Modal
  const [activeVideo, setActiveVideo] = useState<VideoLesson | null>(null);

  // Load faculty-uploaded videos and subjects from storage
  const loadVideosFromStorage = () => {
    try {
      const storedVideos = localStorage.getItem("svvk_custom_videos");
      if (storedVideos) {
        const parsed: VideoLesson[] = JSON.parse(storedVideos);
        setVideos(parsed);
      } else {
        setVideos([]);
      }

      const storedSubs = localStorage.getItem("svvk_custom_subjects");
      if (storedSubs) {
        const parsedSubs: SubjectCategory[] = JSON.parse(storedSubs);
        setSubjects([...INITIAL_SUBJECTS, ...parsedSubs]);
      } else {
        setSubjects(INITIAL_SUBJECTS);
      }
    } catch {
      setVideos([]);
    }
  };

  useEffect(() => {
    loadVideosFromStorage();

    // Listen for storage changes from faculty tab
    const handleStorageChange = () => {
      loadVideosFromStorage();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Filter subjects for the selected class
  const classSubjects = subjects.filter((s) => s.classLevel === selectedClass);

  // Filter videos by selected class, subject, and search term
  const filteredVideos = videos.filter((v) => {
    const matchesClass = v.classLevel === selectedClass;
    const matchesSubject = selectedSubject === "ALL" || v.subject === selectedSubject;
    const matchesSearch =
      !searchTerm ||
      v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesClass && matchesSubject && matchesSearch;
  });

  return (
    <PortalLayout
      portal="student"
      userName={isState ? "Kiran Kumar S" : "Aarav Kashyap"}
      userRole={isState ? "Student • Standard 8-EM (KSEAB)" : "Student • Class 10-A (CBSE)"}
      userHumanId={isState ? "STU-SVVK-STA-000008" : "STU-SVVK-CBSE-000001"}
      institutionName={`${getSchoolName()} (${getBoardName()})`}
      academicYear="AY-2026-2027"
    >
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-full bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-sm">
                <Youtube className="w-4 h-4 text-red-600 fill-current" />
                SVVK Video Classroom
              </span>
              <span className="text-xs text-slate-300 font-mono">Exam Preparation & Video Hub</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Curated Educational Video Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
              Watch certified video lessons, solved model papers, animated science experiments, and grammar breakdowns mapped to Karnataka DSERT & CBSE syllabus.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-xs">
            <Video className="w-4 h-4 text-amber-400" />
            <span className="text-slate-200">
              {filteredVideos.length} {filteredVideos.length === 1 ? "Lesson" : "Lessons"} Available
            </span>
          </div>
        </div>
      </div>

      {/* Class Level Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b pb-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <GraduationCap className="w-4 h-4 text-blue-600" /> Select Academic Class:
            </span>
            {/* Quick Category Tabs */}
            <div className="flex items-center gap-1 text-[11px]">
              {["ALL", "High School", "Primary", "Pre-Primary"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setClassCategory(cat)}
                  className={`px-2.5 py-0.5 rounded-md font-bold transition-all ${
                    classCategory === cat
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search topic, title, teacher..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Classes Horizontal Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {filterClassesByCategory(classCategory).map((cls) => {
            const isSelected = selectedClass === cls;
            return (
              <button
                key={cls}
                onClick={() => {
                  setSelectedClass(cls);
                  setSelectedSubject("ALL");
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-sm ring-2 ring-blue-500"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {cls}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          onClick={() => setSelectedSubject("ALL")}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
            selectedSubject === "ALL"
              ? "bg-blue-600 text-white shadow-xs font-black"
              : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          <span>All Subjects ({classSubjects.length})</span>
        </button>

        {classSubjects.map((sub) => {
          const isSelected = selectedSubject === sub.name;
          const subVideoCount = videos.filter(
            (v) => v.classLevel === selectedClass && v.subject === sub.name
          ).length;

          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-xs font-bold"
                  : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{sub.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? "bg-indigo-800 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {subVideoCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Video Cards Grid */}
      {filteredVideos.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto shadow-sm my-6">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
            <Tv className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            No Video Lessons Available Yet
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
            Your teachers will post exam preparation videos and YouTube lessons for{" "}
            <strong>{selectedClass}</strong> {selectedSubject !== "ALL" && `(${selectedSubject})`} here soon. Please check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
            >
              {/* Thumbnail Container (NO DELETE BUTTON FOR STUDENTS) */}
              <div
                onClick={() => setActiveVideo(video)}
                className="relative aspect-video bg-slate-900 cursor-pointer overflow-hidden"
              >
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-2 right-2 bg-slate-900/90 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {video.duration}
                </span>

                {/* Subject Badge */}
                <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md">
                  {video.subject}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => setActiveVideo(video)}
                    className="font-bold text-slate-900 text-sm line-clamp-2 hover:text-blue-600 cursor-pointer transition-colors"
                  >
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{video.topic}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-600 flex items-center gap-1 font-medium truncate max-w-[180px]">
                    <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    {video.instructor}
                  </span>
                  <button
                    onClick={() => setActiveVideo(video)}
                    className="text-blue-600 font-bold hover:text-blue-700 text-xs inline-flex items-center gap-1"
                  >
                    Watch Lesson <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ==================================================== */}
      {/* VIDEO PLAYER MODAL */}
      {/* ==================================================== */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]">
            {/* Modal Header */}
            <div className="p-4 border-b flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2 truncate">
                <span className="px-2 py-0.5 rounded-md bg-red-600 text-[10px] font-bold">
                  {activeVideo.subject}
                </span>
                <h3 className="text-sm font-bold truncate">{activeVideo.title}</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Responsive YouTube Embed */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>

            {/* Video Lesson Notes & Exam Tips */}
            <div className="p-5 overflow-y-auto space-y-4 text-xs bg-slate-50">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-3 border-b border-slate-200">
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Class & Subject</span>
                  <span className="text-slate-800 font-extrabold">{activeVideo.classLevel} • {activeVideo.subject}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Faculty</span>
                  <span className="text-slate-800 font-extrabold">{activeVideo.instructor}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-bold text-[10px] uppercase">Lesson Duration</span>
                  <span className="text-slate-800 font-extrabold">{activeVideo.duration}</span>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm mb-1 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  Key Concepts Covered:
                </h4>
                <p className="text-slate-600 leading-relaxed">{activeVideo.topic}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-950">
                <span className="font-bold block text-xs mb-1 flex items-center gap-1 text-amber-800">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  Important Exam Tips & Formulae:
                </span>
                <p className="leading-relaxed text-[11px]">{activeVideo.examNotes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
