export const roles = [
  { id: "frontend", name: "Frontend Developer", icon: "code-2" },
  { id: "backend", name: "Backend Developer", icon: "server" },
  { id: "fullstack", name: "Full Stack Developer", icon: "layers-3" },
  { id: "data", name: "Data Scientist", icon: "brain" },
  { id: "uiux", name: "UI/UX Designer", icon: "pen-tool" },
  { id: "devops", name: "DevOps Engineer", icon: "cloud-cog" },
  { id: "mobile", name: "Mobile Developer", icon: "smartphone" },
  { id: "custom", name: "Custom Role", icon: "sparkles" }
];

export const questions = {
  frontend: [
    "Explain the concept of Event Delegation in JavaScript with an example.",
    "What is the difference between controlled and uncontrolled components in React?",
    "How would you improve the performance of a React application?",
    "Explain the CSS box model and how box-sizing affects it.",
    "What happens when you enter a URL in the browser and press Enter?"
  ],
  backend: [
    "What is the difference between authentication and authorization?",
    "Explain RESTful API design principles.",
    "How would you design an API that handles high traffic?",
    "What is database indexing and when would you use it?",
    "Explain the difference between SQL and NoSQL databases."
  ],
  fullstack: [
    "How would you design a full-stack application for an online learning platform?",
    "Explain how authentication should work between a frontend and backend.",
    "How do you handle API errors in a production web application?",
    "What is caching and where can it be used in a web stack?",
    "How would you deploy and monitor a full-stack application?"
  ],
  data: [
    "Explain the difference between supervised and unsupervised learning.",
    "What is overfitting and how can you reduce it?",
    "Explain precision, recall and F1-score.",
    "How would you handle missing values in a dataset?",
    "What is the difference between classification and regression?"
  ],
  uiux: [
    "What is the difference between UX research and usability testing?",
    "How do you decide whether a design needs a usability improvement?",
    "Explain the role of accessibility in product design.",
    "How would you design a mobile-first dashboard?",
    "What makes a good design system?"
  ],
  devops: [
    "What problem does CI/CD solve?",
    "Explain the difference between containers and virtual machines.",
    "What is infrastructure as code?",
    "How would you monitor a production service?",
    "What is the purpose of a reverse proxy?"
  ],
  mobile: [
    "What is the difference between native and cross-platform mobile development?",
    "How would you optimize a mobile app's startup time?",
    "Explain state management in a mobile application.",
    "How do you handle offline functionality?",
    "What factors should you consider when designing mobile navigation?"
  ],
  custom: [
    "Tell me about a technical project you are proud of.",
    "Describe a difficult technical problem you solved.",
    "How do you approach learning an unfamiliar technology?",
    "How do you test your work before releasing it?",
    "Describe how you would explain a technical idea to a non-technical person."
  ]
};

export const defaultHistory = [
  {
    id: "demo-1",
    role: "Frontend Developer",
    roleId: "frontend",
    date: "May 30, 2024",
    time: "10:30 AM",
    score: 82,
    type: "Technical",
    difficulty: "Medium",
    result: {
      overallScore: 82,
      technicalKnowledge: 85,
      problemSolving: 80,
      communication: 78,
      codeQuality: 88,
      confidence: 77,
      strengths: ["Good understanding of JavaScript concepts."],
      improvements: ["Work on code optimization and performance."],
      recommendations: ["Practice more DSA problems", "Improve communication skills", "Work on system design"]
    }
  },
  {
    id: "demo-2",
    role: "Data Scientist",
    roleId: "data",
    date: "May 28, 2024",
    time: "02:15 PM",
    score: 75,
    type: "Mixed",
    difficulty: "Medium"
  },
  {
    id: "demo-3",
    role: "Full Stack Developer",
    roleId: "fullstack",
    date: "May 25, 2024",
    time: "11:00 AM",
    score: 68,
    type: "Technical",
    difficulty: "Hard"
  },
  {
    id: "demo-4",
    role: "Backend Developer",
    roleId: "backend",
    date: "May 22, 2024",
    time: "03:45 PM",
    score: 80,
    type: "Technical",
    difficulty: "Medium"
  },
  {
    id: "demo-5",
    role: "UI/UX Designer",
    roleId: "uiux",
    date: "May 20, 2024",
    time: "01:20 PM",
    score: 72,
    type: "Behavioral",
    difficulty: "Easy"
  }
];

export const readHistory = () => {
  try {
    const stored = JSON.parse(localStorage.getItem("ai_interviewer_history"));
    return Array.isArray(stored) && stored.length ? stored : defaultHistory;
  } catch {
    return defaultHistory;
  }
};

export const saveHistory = (history) => {
  localStorage.setItem("ai_interviewer_history", JSON.stringify(history));
};

export const getCurrentInterview = () => {
  try {
    return JSON.parse(localStorage.getItem("ai_interviewer_current"));
  } catch {
    return null;
  }
};

export const saveCurrentInterview = (data) => {
  localStorage.setItem("ai_interviewer_current", JSON.stringify(data));
};
