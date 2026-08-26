import { create } from "zustand";
import { createClient } from "../../utils/supabase/client";

export interface User {
  id: string;
  name: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
  streakHistory: boolean[]; // 7 elements representing last 7 days (true = done, false = not done)
  targetCompanies: string[];
  targetRole: string;
  targetLevel: string;
  studyYear: string; // "1", "2", "3", "4"
  onboarded: boolean;
  avatarUrl?: string;
}

export interface Reply {
  id: string;
  content: string;
  author: string;
  authorInitials: string;
  createdAt: string;
  upvotes: number;
  isSolution?: boolean;
  isExpert?: boolean;
  avatarUrl?: string;
}

export interface Doubt {
  id: string;
  title: string;
  content: string;
  codeBlock?: string;
  tags: string[];
  upvotes: number;
  upvotedBy: string[];
  solved: boolean;
  author: string;
  authorInitials: string;
  avatarUrl?: string;
  createdAt: string;
  category: string;
  replies: Reply[];
}

export interface TaskItem {
  id: string;
  taskName: string;
  points: number;
  completed: boolean;
}

export interface Prerequisite {
  title: string;
  summary: string;  // one-line formula/rule
  slug: string;     // unique concept identifier
}

export type DifficultyLevel = "Easy" | "Medium" | "Difficult" | "Hard";

export interface Question {
  id: string;
  topic: string;
  text: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption: "A" | "B" | "C" | "D";
  explanation: string;
  // Enhanced fields
  difficulty?: DifficultyLevel;
  difficulty_level?: 1 | 2 | 3 | 4;  // 1=Easy, 2=Medium, 3=Difficult, 4=Hard
  company_tag?: string[];
  prerequisites?: Prerequisite[];
  simple_explanation?: string;
  formulas?: string[];
  tips?: string;
}

export interface MockTest {
  id: string;
  title: string;
  company: string;
  durationMinutes: number;
  totalQuestions: number;
  difficulty: "Easy" | "Medium" | "Hard";
  xpAward: number;
  completed?: boolean;
  highScore?: number;
}

export interface MockTestAttempt {
  testId: string;
  testTitle: string;
  scorePercent: number;
  correctAnswers: number;
  totalQuestions: number;
  xpGained: number;
  date: string;
}

interface AppState {
  user: User | null;
  doubts: Doubt[];
  tasks: TaskItem[];
  practiceProgress: Record<string, number>; // topic -> percentage
  mockTests: MockTest[];
  attempts: MockTestAttempt[];
  questions: Question[];
  
  // Actions
  login: (email: string, name?: string) => void;
  logout: () => void;
  saveOnboarding: (companies: string[], role: string, level: string, studyYear?: string) => void;
  toggleTask: (taskId: string) => void;
  addDoubt: (title: string, content: string, tags: string[]) => void;
  addReply: (doubtId: string, content: string) => void;
  upvoteDoubt: (doubtId: string) => void;
  updateXP: (amount: number) => void;
  updateProgress: (topic: string, newPercentage: number) => void;
  addAttempt: (attempt: MockTestAttempt) => void;
  fetchInitialData: () => Promise<void>;
}

// Initial Seed Data
const defaultTasks: TaskItem[] = [
  { id: "task-1", taskName: "Master Linked Lists", points: 50, completed: false },
  { id: "task-2", taskName: "Mock Interview Prep", points: 75, completed: false },
  { id: "task-3", taskName: "Review Arrays", points: 30, completed: true },
];

const defaultDoubts: Doubt[] = [
  {
    id: "doubt-1",
    title: "Optimizing Dijkstra's Algorithm for dense graphs in C++?",
    content: "I'm currently working on a routing problem where the graph is extremely dense (E ~ V^2). The standard priority_queue approach is timing out. Should I switch to a Fibonacci heap, or is there a simpler array-based optimization I'm missing for this specific constraint?",
    codeBlock: `// Standard binary heap operations are slow for E ~ V^2
priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
pq.push({0, start});
while(!pq.empty()) {
    int u = pq.top().second;
    pq.pop();
    // ...
}`,
    tags: ["cpp", "graphs", "algorithms"],
    upvotes: 42,
    upvotedBy: [],
    solved: true,
    author: "algo_ninja",
    authorInitials: "AN",
    createdAt: "2 hours ago",
    category: "Algorithms",
    replies: [
      {
        id: "rep-1",
        content: "For a dense graph where E ≈ V², standard Dijkstra using a binary heap runs in O(E log V). If you switch to a simple O(V²) scan (array-based search for the minimum vertex), you eliminate the log V factor from heap operations! In dense graphs, array-based Dijkstra is actually faster and easier than Fibonacci heap because of the low constant factor.",
        author: "sys_arch",
        authorInitials: "SA",
        createdAt: "1 hour ago",
        upvotes: 8,
        isSolution: true,
        isExpert: true
      }
    ]
  },
  {
    id: "doubt-2",
    title: "Issue with O(1) removal in custom LRU Cache implementation (Java)",
    content: "I'm trying to implement an LRU cache using a HashMap and a custom Doubly Linked List. The insertion works fine, but I'm hitting a snag when the capacity is reached and I need to evict the least recently used item. It seems my removeNode function isn't properly updating the pointers, leading to a NullPointerException during the eviction phase.\n\nHere is my current node removal logic. Can anyone spot what I'm missing?",
    codeBlock: `private void removeNode(Node node) {
    Node prevNode = node.prev;
    Node nextNode = node.next;

    // I suspect the issue is here when node is tail
    prevNode.next = nextNode;
    nextNode.prev = prevNode;
}`,
    tags: ["java", "lru-cache", "dsa"],
    upvotes: 27,
    upvotedBy: [],
    solved: true,
    author: "AlexChen_99",
    authorInitials: "AC",
    createdAt: "2 hours ago",
    category: "Data Structures",
    replies: [
      {
        id: "rep-snag-1",
        content: "You are exactly right in your suspicion. If you are evicting the tail node, nextNode will be null. Therefore, calling nextNode.prev will throw a NullPointerException.\n\nTo fix this, you need to add null checks, or better yet, use dummy head and tail nodes. Using dummy nodes eliminates edge cases when inserting or removing from the ends of the list.",
        author: "SarahJ_Dev",
        authorInitials: "SD",
        createdAt: "1 hour ago",
        upvotes: 15,
        isSolution: true,
        isExpert: true,
        avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDtwdESAnPI2hosAvOGdWU0GTZLXM5Zyx7b6lBqRJExSH161gCQsO8v0HkTlRtUDuUOIibCIKYIssl2YyaAQTpsmtzQtR6QCgqFgbspWwVLeyEzofufclT6ho-Zy5nWQ_lf7n0FRb45Ziq4Qec2i8UUkqBwZFmeAJuFOW-wTYtukPi-W4uO6_wb9sHPdIyJk6NiJf7ABXyKQMhXxccIY4WImqoDYZF451IaM-r86-7wxWirtrNnEACX"
      }
    ]
  }
];

const defaultMockTests: MockTest[] = [
  { id: "test-google", title: "Google Engineering Speed-Run", company: "Google", durationMinutes: 45, totalQuestions: 15, difficulty: "Hard", xpAward: 250 },
  { id: "test-amazon", title: "Amazon Coding & SDE Core", company: "Amazon", durationMinutes: 60, totalQuestions: 20, difficulty: "Medium", xpAward: 200 },
  { id: "test-tcs", title: "TCS NQT National Qualifier", company: "TCS", durationMinutes: 90, totalQuestions: 40, difficulty: "Easy", xpAward: 150 },
  { id: "test-infosys", title: "Infosys Specialist Programmer Test", company: "Infosys", durationMinutes: 60, totalQuestions: 25, difficulty: "Easy", xpAward: 150 }
];

import { allAptitudeQuestions } from "@/data/aptitudeData";

export const useStore = create<AppState>((set, get) => {
  // Load initial state from local storage if available (SSR safe check)
  let savedState: any = null;
  if (typeof window !== "undefined") {
    const local = localStorage.getItem("prepmate_store");
    if (local) {
      try {
        savedState = JSON.parse(local);
      } catch (e) {
        console.error("Error reading prepmate_store", e);
      }
    }
  }

  // Set default initial user
  const initialUser: User = savedState?.user || {
    id: "rahul-123",
    name: "Rahul",
    email: "rahul@college.edu",
    xp: 1850,
    level: 12,
    streak: 12,
    streakHistory: [true, true, true, true, true, false, false],
    targetCompanies: ["Google"],
    targetRole: "Software Engineer",
    targetLevel: "Intermediate",
    studyYear: "3",
    onboarded: true,
  };

  return {
    user: savedState ? savedState.user : initialUser,
    doubts: savedState?.doubts || defaultDoubts,
    tasks: savedState?.tasks || defaultTasks,
    practiceProgress: savedState?.practiceProgress || { recursion: 42, trees: 65, linkedLists: 0, arrays: 100 },
    mockTests: savedState?.mockTests || defaultMockTests,
    attempts: savedState?.attempts || [
      {
        testId: "test-tcs",
        testTitle: "TCS NQT National Qualifier",
        scorePercent: 84,
        correctAnswers: 34,
        totalQuestions: 40,
        xpGained: 150,
        date: "2026-08-25"
      }
    ],
    questions: allAptitudeQuestions,

    login: (email, name) => {
      // This is now handled by Server Actions in /auth/actions.ts
      // But we can keep it for legacy UI fallback
      console.log('Login handled by Supabase Auth now')
    },

    logout: async () => {
      const supabase = createClient();
      if (supabase) await supabase.auth.signOut();
      set({ user: null });
      if (typeof window !== "undefined") {
        localStorage.removeItem("prepmate_store");
        window.location.href = '/auth';
      }
    },

    saveOnboarding: (companies, role, level, studyYear) => {
      const currentUser = get().user;
      if (!currentUser) return;
      const updatedUser: User = {
        ...currentUser,
        targetCompanies: companies,
        targetRole: role,
        targetLevel: level,
        studyYear: studyYear || currentUser.studyYear || "3",
        onboarded: true,
        xp: currentUser.xp + 50, // bonus for completing onboarding!
      };
      set({ user: updatedUser });
      get().updateXP(0); // Trigger saving logic
    },

    toggleTask: (taskId) => {
      const updatedTasks = get().tasks.map((task) => {
        if (task.id === taskId) {
          const completed = !task.completed;
          if (completed) {
            // Reward XP!
            get().updateXP(task.points);
          } else {
            // Deduct XP!
            get().updateXP(-task.points);
          }
          return { ...task, completed };
        }
        return task;
      });
      set({ tasks: updatedTasks });
      get().updateXP(0); // trigger local storage sync
    },

    addDoubt: (title, content, tags) => {
      const currentUser = get().user;
      if (!currentUser) return;
      const newDoubt: Doubt = {
        id: "doubt-" + Math.random().toString(36).substring(2, 9),
        title,
        content,
        tags: tags.map(t => t.trim().toLowerCase().replace("#", "")),
        upvotes: 0,
        upvotedBy: [],
        solved: false,
        author: currentUser.name,
        authorInitials: currentUser.name.split(" ").map(w => w[0]).join("").toUpperCase().substring(0, 2),
        createdAt: "Just now",
        category: "Algorithms",
        replies: []
      };
      set({ doubts: [newDoubt, ...get().doubts] });
      get().updateXP(20); // reward XP for engagement
    },

    addReply: (doubtId, content) => {
      const currentUser = get().user;
      if (!currentUser) return;
      
      const newReply: Reply = {
        id: "rep-" + Math.random().toString(36).substring(2, 9),
        content,
        author: currentUser.name,
        authorInitials: currentUser.name.split(" ").map(w => w[0]).join("").toUpperCase().substring(0, 2),
        createdAt: "Just now",
        upvotes: 0
      };

      const updatedDoubts = get().doubts.map((doubt) => {
        if (doubt.id === doubtId) {
          return {
            ...doubt,
            replies: [...doubt.replies, newReply]
          };
        }
        return doubt;
      });

      set({ doubts: updatedDoubts });
      get().updateXP(15); // reward XP for answering doubts
    },

    upvoteDoubt: (doubtId) => {
      const currentUser = get().user;
      if (!currentUser) return;

      const updatedDoubts = get().doubts.map((doubt) => {
        if (doubt.id === doubtId) {
          const upvoted = doubt.upvotedBy.includes(currentUser.id);
          const upvotedBy = upvoted 
            ? doubt.upvotedBy.filter(id => id !== currentUser.id)
            : [...doubt.upvotedBy, currentUser.id];
          const upvotes = upvoted ? doubt.upvotes - 1 : doubt.upvotes + 1;

          return { ...doubt, upvotes, upvotedBy };
        }
        return doubt;
      });

      set({ doubts: updatedDoubts });
      get().updateXP(0);
    },

    updateXP: (amount) => {
      const currentUser = get().user;
      if (!currentUser) return;

      let newXp = currentUser.xp + amount;
      if (newXp < 0) newXp = 0;
      
      // Calculate level based on XP (e.g. 200 XP per level)
      const newLevel = Math.max(1, Math.floor(newXp / 200) + 1);

      const updatedUser = {
        ...currentUser,
        xp: newXp,
        level: newLevel
      };

      set({ user: updatedUser });

      // Async Sync to Supabase
      const supabase = createClient();
      if (supabase) {
        supabase.from('profiles').update({
          xp: newXp,
          level: newLevel
        }).eq('id', currentUser.id).then();
      }

      // Save complete store to local storage
      if (typeof window !== "undefined") {
        const fullState = {
          user: updatedUser,
          doubts: get().doubts,
          tasks: get().tasks,
          practiceProgress: get().practiceProgress,
          mockTests: get().mockTests,
          attempts: get().attempts
        };
        localStorage.setItem("prepmate_store", JSON.stringify(fullState));
      }
    },

    updateProgress: (topic, newPercentage) => {
      const key = topic.toLowerCase().replace(/\s+/g, "");
      const currentProgress = get().practiceProgress;
      const updatedProgress = {
        ...currentProgress,
        [key]: Math.min(100, Math.max(0, newPercentage))
      };
      set({ practiceProgress: updatedProgress });
      get().updateXP(0);
      
      // Async Sync to Supabase
      const supabase = createClient();
      const user = get().user;
      if (supabase && user) {
        supabase.from('practice_progress').upsert({
          user_id: user.id,
          topic_id: key,
          completion_percentage: updatedProgress[key]
        }, { onConflict: 'user_id, topic_id' }).then();
      }
    },

    addAttempt: (attempt) => {
      const updatedAttempts = [attempt, ...get().attempts];
      set({ attempts: updatedAttempts });
      
      const updatedMockTests = get().mockTests.map((test) => {
        if (test.id === attempt.testId) {
          return {
            ...test,
            completed: true,
            highScore: Math.max(test.highScore || 0, attempt.scorePercent)
          };
        }
        return test;
      });
      set({ mockTests: updatedMockTests });
      
      get().updateXP(attempt.xpGained);
      
      // Async Sync to Supabase
      const supabase = createClient();
      const user = get().user;
      if (supabase && user) {
        supabase.from('mock_attempts').insert({
          user_id: user.id,
          test_id: attempt.testId,
          test_title: attempt.testTitle,
          score_percent: attempt.scorePercent,
          correct_answers: attempt.correctAnswers,
          total_questions: attempt.totalQuestions,
          xp_gained: attempt.xpGained
        }).then();
      }
    },
    
    fetchInitialData: async () => {
      const supabase = createClient();
      if (!supabase) return;

      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        // Fetch Profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', authUser.id)
          .single();
          
        if (profile) {
          set({
            user: {
              id: profile.id,
              name: profile.name,
              email: profile.email,
              xp: profile.xp,
              level: profile.level,
              streak: profile.streak,
              streakHistory: profile.streak_history,
              targetCompanies: profile.target_companies,
              targetRole: profile.target_role || '',
              targetLevel: profile.target_level,
              studyYear: profile.study_year,
              onboarded: profile.onboarded,
              avatarUrl: profile.avatar_url,
            }
          });
        }
        
        // Fetch Practice Progress
        const { data: progress } = await supabase
          .from('practice_progress')
          .select('topic_id, completion_percentage')
          .eq('user_id', authUser.id);
          
        if (progress && progress.length > 0) {
          const progressMap: Record<string, number> = {};
          progress.forEach(p => {
            progressMap[p.topic_id] = p.completion_percentage;
          });
          set({ practiceProgress: progressMap });
        }
      }
    }
  };
});
