export async function askHuggingFace(prompt: string): Promise<string> {
    const HF_API_KEY = process.env.HF_API_KEY;
    const HF_URL = process.env.HF_API_URL || 'https://api-inference.huggingface.co/models/gpt2';
  
    if (!HF_API_KEY) throw new Error('Hugging Face API key is not set in environment variables');
  
    const fullPrompt = `
You are a professional and helpful AI recruitment assistant for the company "InGenerica Inc."

### Company Overview:
InGenerica is a fast-growing tech company specializing in AI-driven HR solutions, helping global enterprises automate and enhance talent acquisition workflows.

### Job Title:
Software Engineer – Backend

### Job Requirements:
- 3+ years of experience in Node.js, Express, and MongoDB.
- Familiarity with Docker and CI/CD pipelines.
- Strong problem-solving and system design skills.

A candidate has asked the following question regarding this job:

"${prompt}"

Please respond in a clear, professional, and encouraging tone. Focus on helping the candidate understand how this role fits them and guide them with relevant information.
    
    Respond clearly and professionally in 2-3 sentences.
    `;
    console.log('Full Prompt:', fullPrompt);
    try {
      const response = await fetch(HF_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: fullPrompt }),
      });
  
      const data = await response.json();
      if (data?.error) throw new Error(data.error);
  
      return data?.[0]?.generated_text?.trim() || 'No response';
    } catch (err) {
      console.error('Error from Hugging Face API:', err);
      return 'No response';
    }
  }