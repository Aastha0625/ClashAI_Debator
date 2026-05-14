const Groq = require('groq-sdk');
require('dotenv').config();

const groq = new Groq({ apiKey: process.env.GROK_API_KEY });

const getSystemPrompt = (role, mode, topic, depth, arenaMode) => {
  const isPro = role === 'pro';
  const roleName = isPro ? 'Advocate (Pro)' : 'Challenger (Con)';
  const stance = isPro ? 'IN FAVOR of' : 'AGAINST';
  
  let personality = '';
  if (mode === 'NORMAL' || mode === 'Normal') {
    personality = 'You are analytical, clear, and logical. State your points respectfully and concisely.';
  } else if (mode === 'SAVAGE' || mode === 'Savage') {
    personality = 'You are ruthless, sharp, and slightly arrogant. You dismantle arguments with zero mercy and lateral thinking. Use biting remarks and strong paradoxes.';
  } else {
    personality = 'You are deeply intellectual. You synthesize vast datasets, referencing historical philosophy, ethics, and formal logic. Speak with academic authority and sophisticated vocabulary.';
  }

  return `You are an AI debater acting as the ${roleName}. You are debating ${stance} the topic: "${topic}".
Your personality: ${personality}
Arena Context: This is a ${arenaMode} environment. ${arenaMode === 'ADVERSARIAL' ? 'Try to dismantle the opponent completely.' : 'Try to find common ground while maintaining your stance.'}
Logical Depth: Level ${depth}/10. ${depth > 7 ? 'Use complex, multi-layered reasoning.' : 'Use clear, direct points.'}
Rules:
1. You must always maintain your stance.
2. Keep your response under 100 words per turn.
3. Directly address and dismantle the opponent's argument.
4. If starting, provide a strong opening axiom.`;
};

const generateResponse = async (params) => {
  const { topic, role, mode, opponentLastMessage, depth, arenaMode } = params;
  const systemInstruction = getSystemPrompt(role, mode, topic, depth, arenaMode);
  
  let messages = [{ role: "system", content: systemInstruction }];
  
  if (opponentLastMessage) {
    messages.push({ 
      role: "user", 
      content: `Your opponent just said: "${opponentLastMessage}"\n\nFormulate a counter-argument and advance your own position.` 
    });
  } else {
    messages.push({ role: "user", content: `Please provide your opening argument.` });
  }

  const completion = await groq.chat.completions.create({
    messages: messages,
    model: "llama-3.3-70b-versatile",
    temperature: mode === 'SAVAGE' ? 0.9 : 0.7,
    max_tokens: 256,
  });

  return completion.choices[0]?.message?.content || "";
};

const judgeDebate = async (topic, proArgs, conArgs) => {
  const transcript = proArgs.map((arg, i) => {
    return `Advocate: ${arg}\nChallenger: ${conArgs[i] || 'No response'}`;
  }).join('\n\n');

  const prompt = `You are a Grand Jury Judge in a high-stakes AI Debate Arena. 
Topic: "${topic}"

Full Transcript:
${transcript}

Return verdict STRICTLY as JSON:
{
  "winner": "pro" or "con",
  "proScore": 60-100,
  "conScore": 60-100,
  "logicHealth": 0-5,
  "factDepth": 1-10,
  "impactScore": "X%",
  "reasoning": "One sentence explanation."
}`;

  const completion = await groq.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "llama-3.3-70b-versatile",
    response_format: { type: "json_object" }
  });

  return JSON.parse(completion.choices[0]?.message?.content || "{}");
};

module.exports = { generateResponse, judgeDebate };
