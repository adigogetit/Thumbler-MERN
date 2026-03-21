import { Request, Response } from 'express';
import Thumbnail from '../models/Thumbnail.js';
import { GenerateContentConfig, HarmBlockThreshold, HarmCategory } from '@google/genai';
import ai from '../configs/ai.js';

const stylePrompts = {
    'Vibrant': 'eye-catching thumbnail, bright bold colors, high contrast, saturated tones, glowing highlights, energetic composition, attention-grabbing design, modern YouTube style',
    'Minimal': 'minimalist thumbnail, clean layout, simple design, muted colors, lots of negative space, soft lighting, modern aesthetic, clear focal point, uncluttered composition',
    'Cinematic': 'cinematic thumbnail, dramatic lighting, rich deep colors, movie-like atmosphere, depth and shadows, high dynamic range, epic composition, film still style',
    'Cartoon': 'cartoon thumbnail, bold outlines, exaggerated features, vibrant colors, playful expressions, animated style, fun and engaging, comic or Pixar-style look',
    'Retro': 'retro thumbnail, vintage design, faded colors, nostalgic vibe, grainy texture, old-school aesthetic, 80s/90s style, analog feel, classic typography'
}

const colorSchemeDescriptions = {
    vibrant: 'vibrant and energetic colors, high saturation, bold contrasts, eye-catching palette',
    sunset: 'warm sunset tones, orange pink and purple hues, soft gradients, cinematic glow',
    forest: 'natural green tones, earthy colors, calm and organic palette, fresh atmosphere',
    neon: 'neon glow effects, electric blues and pinks, cyberpunk lighting, high contrast glow',
    purple: 'purple-dominant color palette, magenta and violet tones, modern and stylish mood',
    monochrome: 'black and white color scheme, high contrast, dramatic lighting, timeless aesthetic',
    ocean: 'cool blue and teal tones, aquatic color palette, fresh and clean atmosphere',
    pastel: 'soft pastel colors, low saturation, gentle tones, calm and friendly aesthetic',
}

export const generateThumbnail = async (req: Request, res: Response) => {
    try {
        const { userId } = req.session;
        const { title, prompt: user_prompt, style, aspect_ratio,
            color_scheme, text_overlay } = req.body;

        const thumbnail = await Thumbnail.create({
            userId,
            title,
            prompt_used: user_prompt,
            user_prompt,
            style,
            aspect_ratio,
            color_scheme,
            text_overlay,
            isGenerating: true
        })

        const model = 'gemini-1.5-flash-image';
        const generationConfig: GenerateContentConfig = {
            maxOutputTokens: 32768,
            temperature: 1,
            topP: 0.95,
            responseModalities: ['IMAGE'],
            imageConfig: {
                aspectRatio: aspect_ratio || '16:9',
                imageSize: '1K'
            },
            safetySettings: [
                { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.OFF },
                { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.OFF },
                { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.OFF },
                { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.OFF },
            ]
        }

        let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for: "${title}"`;
        if (color_scheme) {
            prompt += ` Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme.`;
        }
        if (user_prompt) {
            prompt += ` Additional details: ${user_prompt}.`;
        }
        prompt += ` The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximize click-through rate. Make it bold, professional, and impossible to ignore.`;


        // Generate the image using the ai model
        const response: any = await ai.models.generateContent({
            model,
            contents: [prompt],
            config: generationConfig
        })

        // Check if the response is valid
        if (!response?.candidates?.[0]?.content?.parts) {
            throw new Error('Unexpected response')
        }

        // image will generate in parts, we need to combine them and save to our database
        const parts = response.candidates[0].content.parts;

    } catch (error) {


    }
}