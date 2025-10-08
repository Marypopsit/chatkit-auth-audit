export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  try {
    const { currentClientSecret } = req.body || {};

    const r = await fetch("https://api.openai.com/v1/chatkit/sessions/refresh", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ client_secret: currentClientSecret })
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json(data);

    return res.status(200).json({ client_secret: data.client_secret });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "refresh_failed" });
  }
}
