import API_BASE_URL from './api';

export const generateAIResponse = async (topic, role, mode, roundNum, opponentLastMessage, depth, arenaMode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/debate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        topic,
        role,
        mode,
        roundNum,
        opponentLastMessage,
        depth,
        arenaMode
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.text;
  } catch (error) {
    console.warn("Backend unavailable or API Quota exceeded. Activating Offline Logic Synthesis...");
    
    // Simulate high-quality responses based on personality mode
    const isPro = role === 'pro';
    const opponent = isPro ? 'Challenger' : 'Advocate';
    
    if (mode === 'SAVAGE' || mode === 'Savage') {
      return isPro 
        ? `"The ${opponent}'s complete lack of situational awareness is staggering. To assume "${topic}" operates in a vacuum is not just flawed, it's intellectually lazy. Try keeping up."`
        : `"Oh, look. The ${opponent} cited outdated parameters again. I will dismantle this so-called 'axiom' with a single statistical outlier that proves "${topic}" is entirely false. Next."`;
    } 
    
    if (mode === 'PHILOSOPHER' || mode === 'Philosopher') {
      return isPro
        ? `"If we invoke Kant's categorical imperative regarding "${topic}", the ${opponent}'s premise dissolves into subjective relativism. The structural integrity of my thesis remains paramount."`
        : `"The ${opponent} fundamentally misinterprets the utilitarian calculus here. To advocate for "${topic}" without considering the downstream epistemological decay is a grave error."`;
    }
    
    // NORMAL MODE
    return isPro
      ? `As the Advocate, I maintain that my position on "${topic}" is logically sound. The ${opponent}'s previous statement ignores critical data points.`
      : `The Advocate's argument lacks empirical evidence. I counter that opposing "${topic}" yields a higher net positive outcome across all measured metrics.`;
  }
};

export const judgeDebate = async (topic, proArgs, conArgs) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/judge`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, proArgs, conArgs }),
    });
    
    if (!response.ok) throw new Error('Judging failed');
    return await response.json();
  } catch (error) {
    console.error("Judging error:", error);
    // Fallback if judge is unavailable
    return {
      winner: proArgs.length > conArgs.length ? 'pro' : 'con',
      proScore: 85,
      conScore: 78,
      reasoning: "The judge was unable to reach a verdict, but the Advocate maintained a slightly more consistent logical flow."
    };
  }
};
