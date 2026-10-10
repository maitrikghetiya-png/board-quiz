import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

function geminiQuestionsPlugin(): Plugin {
  return {
    name: 'gemini-questions-api',
    configureServer(server) {
      server.middlewares.use('/api/generate-questions', async (req, res) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', async () => {
          try {
            const apiKey = process.env.GEMINI_API_KEY;
            if (!apiKey) {
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                error: 'GEMINI_API_KEY not configured. Falling back to verified question bank.',
                questions: []
              }));
              return;
            }

            const parsed = JSON.parse(body || '{}');
            const { subjectId, chapterId, difficulty = 'moderate', count = 5 } = parsed;

            const { GoogleGenAI } = await import('@google/genai');
            const ai = new GoogleGenAI();

            const prompt = `You are a senior CBSE Class XII Board Examination item creator for Academic Session 2026-27.
Generate exactly ${Math.min(count, 10)} high-quality single-choice MCQ practice questions for CBSE Class 12.
Subject: ${subjectId || 'Physics'}.
Target Chapter ID: ${chapterId || 'all'}.
Target Difficulty: ${difficulty}.

Requirements:
- Adhere strictly to the official CBSE Class 12 (2026-27) rationalized syllabus.
- Include authentic numerical calculations with physical units, formulas, chemical reaction mechanisms, or calculus/algebra proofs.
- Provide 4 distinct options (no duplicate text).
- Verified correctOptionIndex (0, 1, 2, or 3).
- Detailed step-by-step solution showing each mathematical or conceptual step clearly.
- A concise 'conceptTakeaway' summarizing the core board principle tested.

Respond ONLY with a valid JSON object matching this schema:
{
  "questions": [
    {
      "id": "gen_q1",
      "questionText": "Question statement...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctOptionIndex": 0,
      "explanation": "Clear explanation...",
      "stepByStepSolution": ["Step 1...", "Step 2...", "Conclusion..."],
      "conceptTakeaway": "Key exam insight...",
      "difficulty": "${difficulty}"
    }
  ]
}`;

            const response = await ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents: prompt,
              config: {
                responseMimeType: 'application/json',
              }
            });

            const text = response.text || '{}';
            const json = JSON.parse(text);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(json));
          } catch (err: any) {
            console.error('Error generating questions via Gemini API:', err);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({
              error: err?.message || 'Gemini API call failed',
              questions: []
            }));
          }
        });
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiQuestionsPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

