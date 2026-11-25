"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { BoardSlug } from "./types";

interface BoardContextType {
  board: BoardSlug;
  setBoard: (b: BoardSlug) => void;
  boardName: string;
  shortLabel: string;
  affiliationText: string;
  accentColor: "emerald" | "blue";
  urlPrefix: string;
  otherBoard: BoardSlug;
  otherBoardName: string;
  otherBoardPrefix: string;
  schoolName: string;
  getBoardName: () => string;
  getSchoolName: () => string;
}

const BoardContext = createContext<BoardContextType>({
  board: "cbse",
  setBoard: () => {},
  boardName: "Central Board of Secondary Education (CBSE)",
  shortLabel: "CBSE Board",
  affiliationText: "CBSE Affiliation No. 830680 • Hoskote",
  accentColor: "blue",
  urlPrefix: "/cbse",
  otherBoard: "state",
  otherBoardName: "Karnataka State Board",
  otherBoardPrefix: "/state",
  schoolName: "Sri Vivekananda Vidya Kendra",
  getBoardName: () => "CBSE Board",
  getSchoolName: () => "Sri Vivekananda Vidya Kendra",
});

export function BoardProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [board, setBoardState] = useState<BoardSlug>(() => {
    if (typeof window !== "undefined") {
      if (window.location.pathname.startsWith("/state")) return "state";
      if (window.location.pathname.startsWith("/cbse")) return "cbse";
      const stored = localStorage.getItem("svvk_active_board");
      if (stored === "state" || stored === "cbse") return stored;
    }
    return "cbse";
  });

  useEffect(() => {
    if (pathname?.startsWith("/state")) {
      setBoardState("state");
      localStorage.setItem("svvk_active_board", "state");
      document.cookie = "school_erp_board=state; path=/; max-age=604800";
    } else if (pathname?.startsWith("/cbse")) {
      setBoardState("cbse");
      localStorage.setItem("svvk_active_board", "cbse");
      document.cookie = "school_erp_board=cbse; path=/; max-age=604800";
    }
  }, [pathname]);

  const setBoard = (newBoard: BoardSlug) => {
    setBoardState(newBoard);
    if (typeof window !== "undefined") {
      localStorage.setItem("svvk_active_board", newBoard);
      document.cookie = `school_erp_board=${newBoard}; path=/; max-age=604800`;
    }
  };

  const isState = board === "state";

  const value: BoardContextType = {
    board,
    setBoard,
    boardName: isState
      ? "Karnataka State Board (KSEAB)"
      : "Central Board of Secondary Education (CBSE)",
    shortLabel: isState ? "State Board" : "CBSE Board",
    affiliationText: isState
      ? "Karnataka State Board (KSEAB) • Hoskote"
      : "CBSE Affiliation No. 830680 • Hoskote",
    accentColor: isState ? "emerald" : "blue",
    urlPrefix: isState ? "/state" : "/cbse",
    otherBoard: isState ? "cbse" : "state",
    otherBoardName: isState ? "CBSE Board" : "Karnataka State Board",
    otherBoardPrefix: isState ? "/cbse" : "/state",
    schoolName: "Sri Vivekananda Vidya Kendra",
    getBoardName: () => (isState ? "Karnataka State Board" : "CBSE Board"),
    getSchoolName: () => "Sri Vivekananda Vidya Kendra",
  };

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoard() {
  return useContext(BoardContext);
}
