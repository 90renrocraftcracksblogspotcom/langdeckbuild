export async function generateDeck(settings, params) {
  const { apiKey, baseUrl, modelName } = settings;
  const { targetLanguage, nativeLanguage, nicheTopic, numCards } = params;

  if (!apiKey) {
    throw new Error("API Key is missing. Please configure settings.");
  }

  const systemPrompt = `You are an expert language teacher and curriculum designer. 
Generate a flashcard deck for learning ${targetLanguage} (native language: ${nativeLanguage}).
The deck must focus on the specific niche topic: "${nicheTopic}".
You must generate exactly ${numCards} cards.
You must output ONLY a valid JSON object containing a single key "cards" which is an array of objects.
Do not include any markdown formatting or extra text.
Each object in the array must follow this exact schema:
{
  "target_word": "string",
  "pronunciation": "string",
  "native_translation": "string",
  "context_sentence_target": "string",
  "context_sentence_native": "string"
}
`;

  const response = await fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: modelName,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Generate the ${numCards} flashcards on "${nicheTopic}". Output as JSON.` }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`API Error (${response.status}): ${errorData}`);
  }

  const data = await response.json();
  const content = data.choices[0].message.content;
  try {
    const parsed = JSON.parse(content);
    return parsed.cards || parsed; 
  } catch (err) {
    throw new Error("Failed to parse LLM response as JSON: " + content);
  }
}
