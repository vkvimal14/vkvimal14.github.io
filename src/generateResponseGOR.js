import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

const API_KEY2 = 'AIzaSyDxzYoAZYCOGgtnNgBPDcstNsS9zoUKO5s';
const MODEL_NAME = 'gemini-pro';

const genAI = new GoogleGenerativeAI(API_KEY2);

const generationConfig = {
  temperature: 0.9,
  topK: 1,
  topP: 1,
  maxOutputTokens: 1048576,
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
  },
];

const model = genAI.getGenerativeModel({
  model: MODEL_NAME,
  generation_config: generationConfig,
  safety_settings: safetySettings,
});

const generateResponseGOR = async (userInput, chatHistory = []) => {
  try {
    console.log(userInput);
    console.log(chatHistory);

	const chatHistoryArray = Array.isArray(chatHistory) ? chatHistory : [];

    const chat = await model.startChat( { history : chatHistoryArray } );
    console.log(chat);
    const result = await chat.sendMessage(`An Employee of Rajasthan Government is asking ${userInput} respond like a private bot of Rajasthan Government trained on internal circulars give minimal to the point response`);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error('Error in generateResponseGOR:', error);
    throw error;
  }
};

export default generateResponseGOR;
