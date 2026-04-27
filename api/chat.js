import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  try {
    const { messages } = req.body;

    // 1. Get Text from OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-nano", // Keep your specific model
      messages: messages,
    });

    const replyText = completion.choices[0].message.content;

    // 2. Get Audio from ElevenLabs
    const voiceId = "j45mXgB0BR0mIJbdyK09";
    const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

    const ttsResponse = await fetch(elevenLabsUrl, {
      method: 'POST',
      headers: {
        'xi-api-key': process.env.ELEVEN_LABS_API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: replyText,
        model_id: "eleven_monolingual_v1",
        voice_settings: { stability: 0.5, similarity_boost: 0.75 }
      })
    });

    if (!ttsResponse.ok) throw new Error("ElevenLabs API failed");

    // Convert audio buffer to Base64
    const audioBuffer = await ttsResponse.arrayBuffer();
    const audioBase64 = Buffer.from(audioBuffer).toString('base64');

    res.status(200).json({ 
      reply: replyText, 
      audio: audioBase64 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}