// API Functions for ExplainIt

// Helper function to make the actual API call
export const makeGeminiAPICall = async (text, apiUrl, apiKey) => {
  const prompt = `Please explain the following text in the simplest possible terms, as if you're talking to a complete beginner. Break down any jargon, technical terms, or complex concepts into plain English that anyone can understand. Use analogies and everyday examples to make complex ideas relatable. Format your response with clear paragraphs and bullet points where appropriate. Highlight key terms with bold formatting.\n\nText to explain: "${text}"`;

  console.log(`Using API URL: ${apiUrl}`);
  console.log(`API Key status: ${apiKey === 'YOUR_GEMINI_API_KEY_HERE' ? 'Using default placeholder' : 'Using custom key'}`);
  
  // Prepare the request payload
  const requestPayload = {
    contents: [{
      parts: [{
        text: prompt
      }]
    }],
    generationConfig: {
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 2048,
    },
    safetySettings: [
      {
        category: "HARM_CATEGORY_HARASSMENT",
        threshold: "BLOCK_ONLY_HIGH"
      },
      {
        category: "HARM_CATEGORY_HATE_SPEECH",
        threshold: "BLOCK_ONLY_HIGH"
      },
      {
        category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
        threshold: "BLOCK_ONLY_HIGH"
      },
      {
        category: "HARM_CATEGORY_DANGEROUS_CONTENT",
        threshold: "BLOCK_ONLY_HIGH"
      }
    ]
  };
  
  console.log('API Request Payload:', JSON.stringify(requestPayload, null, 2));
  
  const response = await fetch(`${apiUrl}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestPayload)
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API Error Response Text:', errorText);
    
    try {
      const errorData = JSON.parse(errorText);
      const errorMessage = errorData.error?.message || `API request failed with status ${response.status}`;
      console.error('API Error Details:', errorData);
      throw new Error(errorMessage);
    } catch (jsonError) {
      console.error('Failed to parse error JSON:', jsonError);
      throw new Error(`API request failed with status ${response.status}: ${errorText.substring(0, 200)}`);
    }
  }

  const data = await response.json();
  console.log(`API Response from ${apiUrl.split('/').pop()}:`, data);
  return data;
};

// Main API function with fallback mechanism
export const callGeminiAPI = async (text, config) => {
  const { GEMINI_API_KEY, GEMINI_API_BASE, GEMINI_MODEL } = config;
  
  // For tracking which model was actually used
  let usedModel = '';
  
  if (GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY_HERE') {
    // Demo mode - return a mock response
    usedModel = 'Demo Mode';
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          modelUsed: usedModel,
          candidates: [{
            content: {
              parts: [{
                text: `**Simple Explanation:**\n\nThe text you provided contains technical language that can be broken down like this:\n\n• **Complex terms** are replaced with everyday words\n• **Technical concepts** are explained using familiar examples\n• **Jargon** is translated into plain English\n\nThink of it like having a friendly expert translate complicated ideas into language anyone can understand. Instead of using fancy technical words, we use simple explanations that make sense to everyone.\n\n*This is a demo response. Add your Gemini API key to get real AI explanations.*`
              }]
            }
          }]
        });
      }, 2000);
    });
  }
  
  // Try with multiple models if needed (fallback mechanism)
  const modelOptions = [
    GEMINI_MODEL,     // Try user's preferred model first
    'gemini-pro',     // Fallback to standard model
    'gemini-1.5-flash' // Another option
  ];
  
  let lastError = null;
  
  // Try each model in sequence until one works
  for (const model of modelOptions) {
    try {
      console.log(`Attempting with model: ${model}`);
      const apiUrl = `${GEMINI_API_BASE}${model}:generateContent`;
      
      const result = await makeGeminiAPICall(text, apiUrl, GEMINI_API_KEY);
      
      // Add the model used to the response
      usedModel = model;
      result.modelUsed = usedModel;
      
      return result;
    } catch (error) {
      console.warn(`Failed with model ${model}:`, error);
      lastError = error;
      // Continue to next model option
    }
  }
  
  // If we get here, all models failed
  throw new Error(`All API models failed. Last error: ${lastError?.message}`);
};
