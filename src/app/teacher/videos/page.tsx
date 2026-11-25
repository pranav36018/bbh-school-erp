"use client";

import React, { useState, useEffect } from "react";
import PortalLayout from "@/components/layout/PortalLayout";
import {
  Play,
  Video,
  Plus,
  Search,
  BookOpen,
  Sparkles,
  ExternalLink,
  Clock,
  User,
  CheckCircle2,
  X,
  Layers,
  GraduationCap,
  Youtube,
  Trash2,
  Tv,
  Loader2,
  Check,
} from "lucide-react";
import {
  INITIAL_CLASSES,
  INITIAL_SUBJECTS,
  INITIAL_VIDEOS,
  VideoLesson,
  SubjectCategory,
} from "@/lib/video-learning-data";
import { useBoard } from "@/lib/board-context";

export default function TeacherVideosPage() {
  const { board, getBoardName, getSchoolName } = useBoard();
  const isState = board === "state";

  const [classes] = useState<string[]>(INITIAL_CLASSES);
  const [selectedClass, setSelectedClass] = useState<string>("Standard 10");
  const [subjects, setSubjects] = useState<SubjectCategory[]>(INITIAL_SUBJECTS);
  const [selectedSubject, setSelectedSubject] = useState<string>("ALL");
  const [videos, setVideos] = useState<VideoLesson[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Modals
  const [activeVideo, setActiveVideo] = useState<VideoLesson | null>(null);
  const [showAddSubjectModal, setShowAddSubjectModal] = useState(false);
  const [showAddVideoModal, setShowAddVideoModal] = useState(false);

  // Notification Banner
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Form states: New Subject
  const [newSubClass, setNewSubClass] = useState("Standard 10");
  const [newSubName, setNewSubName] = useState("");

  // Form states: New Video
  const [newVidClass, setNewVidClass] = useState("Standard 10");
  const [newVidSubject, setNewVidSubject] = useState("");
  const [newVidTitle, setNewVidTitle] = useState("");
  const [newVidUrl, setNewVidUrl] = useState("");
  const [newVidInstructor, setNewVidInstructor] = useState("Faculty");
  const [newVidTopic, setNewVidTopic] = useState("");
  const [newVidExamNotes, setNewVidExamNotes] = useState("");

  // Auto-detected original YouTube duration & status
  const [autoDuration, setAutoDuration] = useState<string | null>(null);
  const [isDetectingDuration, setIsDetectingDuration] = useState(false);

  // Load custom videos/subjects from localStorage
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

    const handleStorageChange = () => {
      loadVideosFromStorage();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const extractYoutubeId = (urlOrId: string): string => {
    const trimmed = (urlOrId || "").trim();
    if (/^[\w-]{11}$/.test(trimmed)) return trimmed;
    const match =
      trimmed.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
      ) || trimmed.match(/[\w-]{11}/);
    return match ? (match[1] || match[0]) : "dQw4w9WgXcQ";
  };

  // Debounced Auto-Detection of original YouTube duration when URL changes
  useEffect(() => {
    const trimmed = newVidUrl.trim();
    if (!trimmed) {
      setAutoDuration(null);
      setIsDetectingDuration(false);
      return;
    }

    const timer = setTimeout(async () => {
      const ytId = extractYoutubeId(trimmed);
      if (ytId && ytId.length === 11) {
        setIsDetectingDuration(true);
        try {
          const res = await fetch(`/api/videos/info?url=${encodeURIComponent(trimmed)}`);
          if (res.ok) {
            const data = await res.json();
            if (data.success && data.duration && data.duration !== "Video") {
              setAutoDuration(data.duration);
              // Auto-fill title if teacher hasn't entered one
              if (!newVidTitle && data.title) {
                setNewVidTitle(data.title);
              }
            } else {
              setAutoDuration("Video");
            }
          } else {
            setAutoDuration("Video");
          }
        } catch {
          setAutoDuration("Video");
        } finally {
          setIsDetectingDuration(false);
        }
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [newVidUrl, newVidTitle]);

  const classSubjects = subjects.filter((s) => s.classLevel === selectedClass);

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

  // Handle Add Subject (Faculty Only)
  const handleAddSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;

    const newSub: SubjectCategory = {
      id: `sub-custom-${Date.now()}`,
      name: newSubName.trim(),
      classLevel: newSubClass,
      iconName: "BookOpen",
    };

    const updated = [...subjects, newSub];
    setSubjects(updated);

    try {
      const customOnly = updated.filter((s) => s.id.startsWith("sub-custom-"));
      localStorage.setItem("svvk_custom_subjects", JSON.stringify(customOnly));
    } catch {
      // ignore
    }

    setNewSubName("");
    setShowAddSubjectModal(false);
    showToast(`Subject "${newSub.name}" added successfully for ${newSubClass}!`);
  };

  // Handle Add Video (Faculty Only)
  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVidTitle.trim() || !newVidUrl.trim()) return;

    const ytId = extractYoutubeId(newVidUrl);
    
    // Use auto-detected duration directly or fallback
    let finalDuration = autoDuration || "Video";

    // If duration not resolved yet, do a quick sync lookup
    if (finalDuration === "Video" || !autoDuration) {
      try {
        const res = await fetch(`/api/videos/info?url=${encodeURIComponent(newVidUrl)}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.duration) {
            finalDuration = data.duration;
          }
        }
      } catch {
        // ignore
      }
    }

    const newVideo: VideoLesson = {
      id: `vid-custom-${Date.now()}`,
      classLevel: newVidClass,
      subject: newVidSubject || (classSubjects[0]?.name ?? "General"),
      title: newVidTitle.trim(),
      youtubeId: ytId,
      duration: finalDuration,
      instructor: newVidInstructor.trim() || "Faculty",
      topic: newVidTopic.trim() || "Core Lesson & Exam Revision",
      examNotes: newVidExamNotes.trim() || "Prepare diagrams and formulas from this lesson.",
      isCustom: true,
    };

    const updatedVideos = [newVideo, ...videos];
    setVideos(updatedVideos);

    try {
      localStorage.setItem("svvk_custom_videos", JSON.stringify(updatedVideos));
    } catch {
      // ignore
    }

    setNewVidTitle("");
    setNewVidUrl("");
    setAutoDuration(null);
    setNewVidTopic("");
    setNewVidExamNotes("");
    setShowAddVideoModal(false);
    showToast(`Video lesson "${newVideo.title}" published with duration ${finalDuration}!`);
  };

  // Handle Delete Video (Faculty Exclusive)
  const handleDeleteVideo = (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }
    const updated = videos.filter((v) => v.id !== id);
    setVideos(updated);
    try {
      localStorage.setItem("svvk_custom_videos", JSON.stringify(updated));
    } catch {
      // ignore
    }
    showToast(`Video "${title}" deleted.`);
  };

  return (
    <PortalLayout
      portal="teacher"
      userName={isState ? "Sri Ramesh Patil" : "Ms. Ananya Sharma"}
      userRole={isState ? "Senior Faculty • State Board" : "PGT Faculty • CBSE"}
      userHumanId={isState ? "TCH-SVVK-STA-000001" : "TCH-INS000001-000015"}
      institutionName={`${getSchoolName()} (${getBoardName()})`}
      academicYear="AY-2026-2027"
    >
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-emerald-500/50 flex items-center gap-2.5 text-xs animate-in slide-in-from-top">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl border border-emerald-900/40 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-sm">
              <Youtube className="w-4 h-4 text-red-600 fill-current" />
              Faculty Video Hub Manager
            </span>
            <span className="text-xs text-emerald-300 font-mono">Teacher Upload & Delete Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Class-Wise Video Lesson Hub & Syllabus Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Upload educational YouTube links (original video duration is auto-detected directly), create custom subjects, provide exam revision tips, and manage or delete video lectures for your students.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setNewSubClass(selectedClass);
              setShowAddSubjectModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Add New Subject</span>
          </button>
          <button
            onClick={() => {
              setNewVidClass(selectedClass);
              setNewVidSubject(classSubjects[0]?.name || "Mathematics");
              setAutoDuration(null);
              setShowAddVideoModal(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white font-bold text-xs shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Upload YouTube Lesson</span>
          </button>
        </div>
      </div>

      {/* Class Level Selector Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2 border-b pb-2">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <GraduationCap className="w-4 h-4 text-emerald-600" /> Filter by Class:
          </span>
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search video, topic..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {classes.map((cls) => {
            const isSelected = selectedClass === cls;
            return (
              <button
                key={cls}
                onClick={() => {
                  setSelectedClass(cls);
                  setSelectedSubject("ALL");
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  isSelected
                    ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cls}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Filter Pills */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setSelectedSubject("ALL")}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
            selectedSubject === "ALL"
              ? "bg-slate-900 text-white"
              : "bg-white text-slate-600 border border-slate-200"
          }`}
        >
          All Subjects ({videos.filter((v) => v.classLevel === selectedClass).length})
        </button>
        {classSubjects.map((sub) => {
          const isSelected = selectedSubject === sub.name;
          const count = videos.filter(
            (v) => v.classLevel === selectedClass && v.subject === sub.name
          ).length;
          return (
            <button
              key={sub.id}
              onClick={() => setSelectedSubject(sub.name)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isSelected
                  ? "bg-emerald-700 text-white font-bold"
                  : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              <span>{sub.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? "bg-emerald-900 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Videos List */}
      {filteredVideos.length === 0 ? (
        <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-xl mx-auto shadow-sm my-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
            <Tv className="w-8 h-8 text-emerald-600" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            No Video Lessons Uploaded Yet
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed mb-4">
            No lessons have been published for <strong>{selectedClass}</strong> {selectedSubject !== "ALL" && `(${selectedSubject})`}. Click below to add the first YouTube lesson!
          </p>
          <button
            onClick={() => {
              setNewVidClass(selectedClass);
              setNewVidSubject(classSubjects[0]?.name || "Mathematics");
              setAutoDuration(null);
              setShowAddVideoModal(true);
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 text-white text-xs font-bold rounded-xl shadow-md inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Upload First Video
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              {/* Thumbnail Container */}
              <div
                onClick={() => setActiveVideo(video)}
                className="relative aspect-video bg-slate-900 cursor-pointer overflow-hidden group"
              >
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform opacity-90"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
                {/* Auto-detected original duration badge */}
                <span className="absolute bottom-2 right-2 bg-slate-900/90 text-white text-[10px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1 shadow-sm">
                  <Clock className="w-3 h-3 text-amber-400" />
                  {video.duration}
                </span>
                <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2.5 py-0.5 rounded">
                  {video.subject}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3
                    onClick={() => setActiveVideo(video)}
                    className="font-bold text-slate-900 text-sm line-clamp-2 cursor-pointer hover:text-emerald-700 transition-colors"
                  >
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{video.topic}</p>
                </div>

                <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs">
                  <span className="text-slate-600 truncate max-w-[150px] flex items-center gap-1 font-medium">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    {video.instructor}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setActiveVideo(video)}
                      className="text-blue-600 font-bold hover:underline"
                    >
                      Preview
                    </button>
                    {/* Faculty-exclusive delete button */}
                    <button
                      onClick={() => handleDeleteVideo(video.id, video.title)}
                      className="text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-lg font-bold flex items-center gap-1 text-[11px] transition-all"
                      title="Delete Video Lesson"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video Modal Preview */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border">
            <div className="p-4 border-b flex items-center justify-between bg-slate-900 text-white">
              <div className="flex items-center gap-2 truncate">
                <span className="px-2 py-0.5 rounded-md bg-red-600 text-[10px] font-bold">
                  {activeVideo.duration}
                </span>
                <span className="font-bold text-xs truncate">{activeVideo.title}</span>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                title={activeVideo.title}
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>
            <div className="p-4 space-y-2 text-xs bg-slate-50">
              <div className="font-bold text-slate-800">Topic: {activeVideo.topic}</div>
              <p className="text-slate-600">Exam Notes: {activeVideo.examNotes}</p>
            </div>
          </div>
        </div>
      )}

      {/* Add Subject Modal */}
      {showAddSubjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <h3 className="font-bold text-sm text-slate-900">Add New Subject Category</h3>
              <button onClick={() => setShowAddSubjectModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddSubject} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Target Class:</label>
                <select
                  value={newSubClass}
                  onChange={(e) => setNewSubClass(e.target.value)}
                  className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs font-semibold"
                >
                  {classes.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Subject Name:</label>
                <input
                  type="text"
                  required
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  placeholder="e.g. Physics, Accountancy, Sanskrit"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddSubjectModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm"
                >
                  Save Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Upload Video Modal (DURATION INPUT REMOVED: AUTO-DETECTED DIRECTLY FROM YOUTUBE) */}
      {showAddVideoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b mb-4">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-600 fill-current" />
                <h3 className="font-bold text-sm text-slate-900">Upload YouTube Educational Lesson</h3>
              </div>
              <button onClick={() => setShowAddVideoModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddVideo} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Class:</label>
                  <select
                    value={newVidClass}
                    onChange={(e) => {
                      setNewVidClass(e.target.value);
                      const available = subjects.filter((s) => s.classLevel === e.target.value);
                      setNewVidSubject(available[0]?.name || "");
                    }}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-semibold"
                  >
                    {classes.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject:</label>
                  <select
                    value={newVidSubject}
                    onChange={(e) => setNewVidSubject(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border rounded-xl font-semibold"
                  >
                    {subjects
                      .filter((s) => s.classLevel === newVidClass)
                      .map((s) => (
                        <option key={s.id} value={s.name}>{s.name}</option>
                      ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">YouTube Link or Video ID:</label>
                <input
                  type="text"
                  required
                  value={newVidUrl}
                  onChange={(e) => setNewVidUrl(e.target.value)}
                  placeholder="e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ or dQw4w9WgXcQ"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-mono text-xs focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">
                  Paste the full YouTube URL or the 11-character video ID.
                </span>
              </div>

              {/* Live Auto-Detected Duration Badge (No manual input needed!) */}
              {isDetectingDuration && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-semibold animate-pulse">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                  <span>Fetching original video duration directly from YouTube...</span>
                </div>
              )}
              {autoDuration && !isDetectingDuration && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 text-[11px] font-bold">
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Original YouTube Duration: <span className="font-mono text-emerald-700 text-xs">{autoDuration}</span> (Auto-detected directly)</span>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Lesson Title:</label>
                <input
                  type="text"
                  required
                  value={newVidTitle}
                  onChange={(e) => setNewVidTitle(e.target.value)}
                  placeholder="e.g. Trigonometry Identities - Solved Problems"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Instructor / Faculty Name:</label>
                <input
                  type="text"
                  value={newVidInstructor}
                  onChange={(e) => setNewVidInstructor(e.target.value)}
                  placeholder="e.g. Ms. Ananya Sharma"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Key Topics Covered:</label>
                <input
                  type="text"
                  value={newVidTopic}
                  onChange={(e) => setNewVidTopic(e.target.value)}
                  placeholder="e.g. Formulas, proofs, previous year question paper solutions"
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Exam Revision Notes / Tips:</label>
                <textarea
                  rows={2}
                  value={newVidExamNotes}
                  onChange={(e) => setNewVidExamNotes(e.target.value)}
                  placeholder="e.g. Practice questions 3 and 7. Mandatory 4-mark question in Annual Board Exam."
                  className="w-full p-2.5 bg-slate-50 border rounded-xl font-medium focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setShowAddVideoModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-md flex items-center gap-1.5"
                >
                  <Youtube className="w-4 h-4 fill-current" />
                  <span>Publish Lesson</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PortalLayout>
  );
}
