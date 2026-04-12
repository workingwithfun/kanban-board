export const fakeParseJD = (jd: string) => {
  return {
    company: jd.includes("Google") ? "Google" : "Unknown Company",
    role: jd.includes("Frontend") ? "Frontend Developer" : "Software Engineer",
    status: "Applied",
    dateApplied: new Date().toISOString().split("T")[0],
    skills: ["React", "TypeScript"],
  };
};

export const fakeResumeSuggestions = () => {
  return [
    "Built scalable frontend applications using React.",
    "Optimized performance by reducing load time by 30%.",
    "Collaborated with backend teams for API integration.",
  ];
};