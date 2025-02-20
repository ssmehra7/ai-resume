import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from ".";

const genAI = new GoogleGenerativeAI(config.geminiKey as string);

export const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `Extract key details from the provided resume text and return a structured JSON string output. Ensure accuracy, completeness in extraction, and valid JSON syntax.

  **Input:** A plain text resume.

  **Output:** Return a single-line JSON string that can be parsed directly using JSON.parse(). Do not include any explanations, comments, or additional text.
  
  **JSON Structure:**
  {
    "name": "Full Name",
    "email": "Email",
    "education": {
      "degree": "Highest Degree",
      "branch": "Field of Study",
      "institution": "University/College Name",
      "year": "Year of Graduation"
    },
    "experience": {
      "job_title": "Job Title",
      "company": "Company Name",
      "start_date": "Start Date",
      "end_date": "End Date or 'Present'"
    },
    "skills": ["Skill1", "Skill2", "..."],
    "summary": "Brief candidate profile summary"
  }

  **Rules:**
  1. Return only the JSON string, without any surrounding text or code blocks.
  2. Omit fields if the information is not available in the resume.
  3. Ensure proper JSON syntax, including escaped quotes for string values.
  4. Generate a concise and relevant summary based on extracted details.
  5. Use double quotes for all keys and string values as per JSON standard.
  6. Escape any special characters within string values properly.
  7. Ensure the output is a single line without any line breaks or extra spaces.
  `
});
