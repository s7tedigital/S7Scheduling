
import { GoogleGenAI, Type } from "@google/genai";
import { Scene } from '../types';

if (!process.env.API_KEY) {
  // In a real app, this would be a fatal error.
  // For this demo, we'll alert the user.
  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export interface ScheduleSuggestion {
    day: number;
    date: string;
    scenes: {
        sceneNumber: string;
        location: string;
        estimatedTime: string;
    }[];
    notes: string;
}

const scheduleSchema = {
    type: Type.OBJECT,
    properties: {
        schedule: {
            type: Type.ARRAY,
            description: "The generated shooting schedule, organized by day.",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.STRING, description: "The day number of the shoot (e.g., 'Day 1')." },
                    date: { type: Type.STRING, description: "The suggested calendar date for this shooting day in YYYY-MM-DD format." },
                    scenes: {
                        type: Type.ARRAY,
                        description: "An array of scenes to be shot on this day.",
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                sceneNumber: { type: Type.STRING },
                                location: { type: Type.STRING },
                                estimatedTime: { type: Type.STRING, description: "Estimated time for the shoot, e.g., 'Morning (4 hours)' or 'Full Day (8 hours)'." }
                            },
                        },
                    },
                    notes: { type: Type.STRING, description: "Rationale for this day's schedule, like grouping by location." }
                },
            },
        },
    },
};


export const generateScheduleSuggestion = async (scenes: Scene[], projectContext: string): Promise<{schedule: ScheduleSuggestion[]}> => {
  const scenesToSchedule = scenes.filter(s => s.scheduledDate === null);
  if (scenesToSchedule.length === 0) {
      return { schedule: [] };
  }

  const prompt = `
    You are an expert Assistant Director for film production. Your task is to create an efficient 
    shooting schedule for a project.

    Project Context: ${projectContext}

    Here are the scenes that need to be scheduled. Pay close attention to their locations to group them efficiently.
    Each day should be a standard 8-hour shooting day.

    Scenes to schedule:
    ${scenesToSchedule.map(s => `- Scene ${s.sceneNumber}: Location: ${s.location}, Duration: ${s.durationMinutes} minutes, Description: ${s.description}`).join('\n')}

    Please generate a logical shooting schedule based on this data. Group scenes by location to minimize company moves. 
    Start the schedule from tomorrow's date: ${new Date(Date.now() + 86400000).toISOString().split('T')[0]}.
    Provide the output as a JSON object that adheres to the provided schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: scheduleSchema,
      },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Error generating schedule from Gemini API:", error);
    throw new Error("Failed to generate AI schedule suggestion.");
  }
};
