export async function interpretUserAnswer(answers) {
  const prompt = `
You are a strict JSON converter.

Convert the user answers into fixed praline preference tags.

VERY IMPORTANT:
- If a user answer already exactly matches an allowed value, include it.
- Do not ignore direct matches.
- Return raw JSON only.
- Do not use markdown.
- Do not use code fences.
- Do not explain anything.

Allowed chocolate types:
["dark", "milk", "white"]

Allowed flavor tags:
[
  "vanilla", "caramel", "coffee", "hazelnut", "crunchy",
  "creamy", "sweet", "intense", "fruity", "almond",
  "salted-caramel", "speculoos", "cookie", "strawberry",
  "raspberry", "cherry", "nougat", "marzipan"
]

Output format:
{
  "chocolateType": [],
  "flavors": []
}

User answers:
${JSON.stringify(answers)}
`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-OpenRouter-Title": "Neuhaus Sommelier",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    },
  );

  const data = await response.json();
  console.log(data);

  const content = data.choices[0].message.content;

  const cleanContent = content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleanContent);
}

function formatPralinesForPrompt(pralines) {
  return pralines.map((praline) => ({
    name: praline.name,
    chocolateType: praline.chocolateType,
    filling: praline.filling,
    tags: praline.tags,
    flavorProfile: praline.flavorProfile,
    pairings: praline.pairings,
  }));
}

export async function generateBoxExplanation(tasteTags, pralines) {
  const prompt = `
You are a concise chocolate concierge.

Write one short paragraph in clear English that explains why this praline box matches the user's taste and what it could be combined with.

Rules:
- Use only the provided taste tags and praline details.
- Mention the taste match first, then suggest a pairing idea.
- Keep it warm, specific, and easy to read.
- Return plain text only.
- Do not use markdown.
- Do not use bullets.
- Do not mention that you are an AI.

Final taste tags:
${JSON.stringify(tasteTags)}

Chosen pralines:
${JSON.stringify(formatPralinesForPrompt(pralines))}
`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-OpenRouter-Title": "Neuhaus Sommelier",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
    },
  );

  const data = await response.json();
  const content = data.choices[0].message.content;

  return content
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}
