import { GoogleGenAI } from "@google/genai";

async function updateHeroImage(imageBuffer: Buffer) {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  
  const prompt = `
    Please edit this image to remove all the existing text. 
    In its place, add the following text in a similar futuristic, clean, and elegant font. 
    The main headline should be: "The Centralized Hub for Solar Capital & Custom Financing."
    The smaller subheadline below it should be: "We connect credible companies, homeowners, and developers with licensed capital brokers and tailored financial structures to scale renewable energy projects."
    Maintain the futuristic building, solar panels, and glowing hexagonal patterns exactly as they are.
    The text should be positioned in the upper right quadrant, similar to where the original text was.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image',
    contents: {
      parts: [
        {
          inlineData: {
            data: imageBuffer.toString('base64'),
            mimeType: 'image/png',
          },
        },
        {
          text: prompt,
        },
      ],
    },
  });

  let base64Image = '';
  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      base64Image = part.inlineData.data;
      break;
    }
  }
  
  return base64Image;
}
