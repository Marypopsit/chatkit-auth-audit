import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });
  try {
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const { currentClientSecret } = req.body || {};
    const renewed = await client.chatkit.sessions.refresh({
      client_secret: currentClientSecret
    });
    return res.status(200).json({ client_secret: renewed.client_secret });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "refresh_failed" });
  }
}
