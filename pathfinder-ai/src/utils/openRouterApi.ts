import { CONFIG } from '../config';

export interface CustomRecRequest {
  role: string;
  learningGoal: string;
  level: 'beginner' | 'intermediate' | 'expert';
}

export interface RecommendedResource {
  name: string;
  description: string;
  link: string;
}

const SYSTEM_PROMPT = `You are an AI learning advisor for PathfinderAI. Your job is to recommend exactly 3 high-quality, real learning resources based on a user's role, what they want to learn, and their experience level.

Rules:
1. Return EXACTLY 3 resources. No more, no less.
2. Every resource must be REAL and currently accessible — no made-up URLs or hallucinated courses.
3. Prefer free resources. If a paid resource is significantly better, include it but mention it's paid in the description.
4. Match the difficulty to the user's level: beginner = introductory/gentle, intermediate = practical/applied, expert = advanced/cutting-edge.
5. Prioritize well-known, reputable sources: official docs, university courses, established platforms (Coursera, fast.ai, Hugging Face, DeepLearning.AI, official GitHub repos, etc.).
6. Each description should be 1-2 sentences explaining WHY this resource is good for this specific user.
7. Links must be real, working URLs to the actual resource page.

Return your response as a JSON object with this exact structure:
{
  "resources": [
    {
      "name": "Resource Name",
      "description": "Why this is great for the user's specific goal and level.",
      "link": "https://actual-real-url.com/resource"
    },
    {
      "name": "Resource Name",
      "description": "Why this is great for the user's specific goal and level.",
      "link": "https://actual-real-url.com/resource"
    },
    {
      "name": "Resource Name",
      "description": "Why this is great for the user's specific goal and level.",
      "link": "https://actual-real-url.com/resource"
    }
  ]
}

Return ONLY the JSON object. No markdown, no backticks, no preamble.`;

const roleLabels: Record<string, string> = {
  software_dev: 'Software Developer / Engineer',
  tech_pm: 'Tech Product Manager / Tech Manager',
  designer: 'UX/UI/Product Designer',
  content_writer: 'Content Writer / Marketer',
  data_analyst: 'Data Analyst / Data Scientist',
  other: 'Professional (general)',
};

function buildUserPrompt(request: CustomRecRequest): string {
  return `Role: ${roleLabels[request.role] || request.role}
Experience level: ${request.level}
What they want to learn: ${request.learningGoal}

Recommend 3 resources.`;
}

export async function getCustomRecommendations(
  request: CustomRecRequest
): Promise<{ success: true; resources: RecommendedResource[] } | { success: false; error: string }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), CONFIG.API_TIMEOUT_MS);

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${CONFIG.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'PathfinderAI',
      },
      body: JSON.stringify({
        model: CONFIG.OPENROUTER_MODEL,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: buildUserPrompt(request) },
        ],
        temperature: 0.3,
        max_tokens: 1000,
        response_format: { type: 'json_object' },
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return { success: false, error: 'apiError' };
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      return { success: false, error: 'emptyResponse' };
    }

    // Strip markdown fences if present
    const cleaned = content.replace(/```json\n?|```\n?/g, '').trim();
    const parsed = JSON.parse(cleaned);

    if (!parsed.resources || !Array.isArray(parsed.resources) || parsed.resources.length === 0) {
      return { success: false, error: 'emptyResponse' };
    }

    const validResources = parsed.resources
      .filter((r: RecommendedResource) => r.name && r.description && r.link)
      .slice(0, 3);

    if (validResources.length === 0) {
      return { success: false, error: 'emptyResponse' };
    }

    return { success: true, resources: validResources };
  } catch (err: unknown) {
    clearTimeout(timeout);
    if (err instanceof Error && err.name === 'AbortError') {
      return { success: false, error: 'apiTimeout' };
    }
    return { success: false, error: 'apiError' };
  }
}
