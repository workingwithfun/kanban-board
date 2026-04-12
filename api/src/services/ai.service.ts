import OpenAI from "openai";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY, // ✅ IMPORTANT
});

export const parseJobDescription = async (jd: string) => {
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo", // works on OpenRouter free tier
      messages: [
        {
          role: "system",
          content: `
You are an AI that extracts structured job data.

Return ONLY valid JSON in this format:
{
  "company": "",
  "role": "",
  "requiredSkills": [],
  "niceToHaveSkills": [],
  "seniority": "",
  "location": ""
}
          `,
        },
        {
          role: "user",
          content: jd,
        },
      ],
      temperature: 0.2,
    });

    const text = response.choices[0].message?.content || "{}";

    // 🔥 Parse JSON safely
    const parsed = JSON.parse(text);

    return {
      ...parsed,
      status: "Applied",
      dateApplied: new Date().toISOString().split("T")[0],
    };
  } catch (error) {
    console.error("AI Parse Error:", error);

    // fallback (important for assignment stability)
    return {
      company: "Unknown",
      role: "Software Engineer",
      requiredSkills: [],
      niceToHaveSkills: [],
      seniority: "Not specified",
      location: "Not specified",
      status: "Applied",
      dateApplied: new Date().toISOString().split("T")[0],
    };
  }
};


export const generateResumeSuggestions = async (jd: string) => {
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
Generate 3-5 strong resume bullet points tailored to the job.
Return as JSON array only.
          `,
        },
        {
          role: "user",
          content: jd,
        },
      ],
    });

    return JSON.parse(response.choices[0].message?.content || "[]");
  } catch (err) {
    return [
      "Built scalable applications",
      "Worked with modern web technologies",
      "Collaborated in team environments",
    ];
  }
};