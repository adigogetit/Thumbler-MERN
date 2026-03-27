import { Request, Response } from 'express';
import Thumbnail from '../models/Thumbnail.js';
import path from 'node:path';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';

import fetch from 'node-fetch';

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


// controller for generating a thumbnail based on user input, we will use the google genai api to generate the image and save it to our database, we will also save the image to cloudinary for hosting the images
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



        // create the prompt for the ai model based on the user input
        let prompt = `Create a ${stylePrompts[style as keyof typeof stylePrompts]} for: "${title}"`;
        if (color_scheme) {
            prompt += ` Use a ${colorSchemeDescriptions[color_scheme as keyof typeof colorSchemeDescriptions]} color scheme.`;
        }
        if (user_prompt) {
            prompt += ` Additional details: ${user_prompt}.`;
        }
        prompt += ` The thumbnail should be ${aspect_ratio}, visually stunning, and designed to maximize click-through rate. Make it bold, professional, and impossible to ignore.`;



        // hugging face api called
        const hfResponse = await fetch(
            "https://router.huggingface.co/nscale/v1/images/generations",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    model: "black-forest-labs/FLUX.1-schnell",
                    prompt: prompt,
                }),
            }
        );

        const data: any = await hfResponse.json();
        if (!hfResponse.ok) {
            console.error("HF FULL ERROR:", data);
            throw new Error(
                typeof data.error === "string"
                    ? data.error
                    : JSON.stringify(data.error)
            );
        }

        const base64Image = data.data[0].b64_json;
        if (!base64Image) {
            console.error("HF RESPONSE:", data);
            throw new Error("No image returned from API");
        }
        const finalBuffer = Buffer.from(base64Image, "base64");




        // make filename and path to save the image
        const filename = `final-output-${Date.now()}.png`;
        const filePath = path.join('images', filename);

        // Create the images directory if it doesn't exist
        fs.mkdirSync('images', { recursive: true })

        // Write the final image to the file
        fs.writeFileSync(filePath, finalBuffer!);



        // adding cloudinary for uploading and hosting the images instead of saving them locally
        const uploadResult = await cloudinary.uploader.upload(filePath, { resource_type: 'image' });

        thumbnail.image_url = uploadResult.url;
        thumbnail.isGenerating = false;
        await thumbnail.save();

        res.json({ message: 'Thumbnail generated successfully', thumbnail });

        // remove img from file disk
        fs.unlinkSync(filePath);

    } catch (error: any) {
        console.error('Error generating thumbnail:', error);
        res.status(500).json({ message: 'Failed to generate thumbnail', error: error.message });

    }
}

//  controller for deleting a thumbnail
export const deleteThumbnail = async (req: Request, res: Response) => {

    try {
        const { id } = req.params;
        const { userId } = req.session;

        await Thumbnail.findByIdAndDelete({ _id: id, userId });

        res.json({ message: 'Thumbnail deleted successfully' });

    } catch (error: any) {
        console.error('Error generating thumbnail:', error);
        res.status(500).json({ message: 'Failed to generate thumbnail', error: error.message });
    }
}
