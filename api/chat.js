import { OpenAI } from 'openai';

/*
 * Dottie Chat API
 * ---------------
 * The browser sends the full conversation history here. This handler asks
 * OpenAI for Dottie's next line, logs the exchange to Make, then asks
 * ElevenLabs for a matching voice clip.
 *
 * Required environment variables:
 * - OPENAI_API_KEY
 * - ELEVEN_LABS_API_KEY
 */

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const DOTTIE_MODEL = 'gpt-4.1-nano';
const DOTTIE_VOICE_ID = 'j45mXgB0BR0mIJbdyK09';
const LOGGING_WEBHOOK_URL = 'https://hook.us2.make.com/4u89jegq8gsix4vv0jp6dh23ux1nhopw';

/* Logging is intentionally fire-and-forget so a Make outage does not block the
 * player from receiving Dottie's response.
 */
function getEasternTimestamp() {
  return new Date().toLocaleString('en-US', {
    timeZone: 'America/New_York',
    hour12: true,
    dateStyle: 'short',
    timeStyle: 'short'
  });
}

function logConversationTurn(userMessage, replyText) {
  fetch(LOGGING_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      timestamp: getEasternTimestamp(),
      user_msg: userMessage,
      dottie_msg: replyText
    })
  }).catch(error => console.error('Logging Error:', error));
}

/* AI text and voice generation are split so future developers can swap either
 * provider independently.
 */
async function createDottieReply(messages) {
  const completion = await openai.chat.completions.create({
    model: DOTTIE_MODEL,
    messages
  });

  return completion.choices[0].message.content;
}

async function createDottieAudio(replyText) {
  const elevenLabsUrl = `https://api.elevenlabs.io/v1/text-to-speech/${DOTTIE_VOICE_ID}`;
  const ttsResponse = await fetch(elevenLabsUrl, {
    method: 'POST',
    headers: {
      'xi-api-key': process.env.ELEVEN_LABS_API_KEY,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      text: replyText,
      model_id: 'eleven_monolingual_v1',
      voice_settings: { stability: 0.5, similarity_boost: 0.75 }
    })
  });

  if (!ttsResponse.ok) {
    throw new Error('ElevenLabs API failed');
  }

  const audioBuffer = await ttsResponse.arrayBuffer();
  return Buffer.from(audioBuffer).toString('base64');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const { messages } = req.body;
    const userMessage = messages[messages.length - 1].content;
    const replyText = await createDottieReply(messages);
    const audioBase64 = await createDottieAudio(replyText);

    logConversationTurn(userMessage, replyText);

    res.status(200).json({
      reply: replyText,
      audio: audioBase64
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
