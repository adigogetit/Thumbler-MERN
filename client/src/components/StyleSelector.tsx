import { ChevronDown, Clock, Film, Minimize, Smile, Zap } from "lucide-react";

import type React from "react";
import { thumbnailStyles } from "../assets/assets";
import type { ThumbnailStyle } from "../assets/assets";


type Props = {
    value: ThumbnailStyle;
    onChange: (style: ThumbnailStyle) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
};

const StyleSelector = ({ value, onChange, isOpen, setIsOpen }: Props) => {

    const styleDescriptions: Record<ThumbnailStyle, string> = {
        vibrant: "Bright colors and high contrast for eye-catching thumbnails",
        minimal: "Clean and simple design with muted colors",
        cinematic: "Dramatic lighting and rich colors for a movie-like feel",
        cartoon: "Bold lines and exaggerated features for a fun, animated look",
        retro: "Vintage-inspired design with faded colors and nostalgic elements",
    };

    const styleIcons: Record<ThumbnailStyle, React.ReactNode> = {
        vibrant: <Zap className="size-6 p-1.5 rounded-lg bg-gradient-to-br from-fuchsia-600 to-purple-700 shadow-md shadow-fuchsia-900/40 text-white" />,
        minimal: <Minimize className="size-6 p-1.5 rounded-lg bg-zinc-700 shadow-md shadow-black/40 text-white" />,
        cinematic: <Film className="size-6 p-1.5 rounded-lg bg-gradient-to-br from-slate-800 to-black shadow-md shadow-black/50 text-white" />,
        cartoon: <Smile className="size-6 p-1.5 rounded-lg bg-gradient-to-br from-pink-500 to-orange-500 shadow-md shadow-pink-900/40 text-white" />,
        retro: <Clock className="size-6 p-1.5 rounded-lg bg-gradient-to-br from-amber-600 to-yellow-500 shadow-md shadow-amber-900/40 text-white" />,
    };


    return (
        <div className="relative space-y-3 dark">
            <label className="block text-sm font-medium text-zinc-200">
                Thumbnail Style
            </label>

            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center justify-between rounded-md border px-4 py-3 text-left transition bg-white/8 border-white/10 text-zinc-200 hover:bg-white/12"
            >
                <div className="space-y-1">
                    <div className="flex items-center gap-2 font-medium">
                        {styleIcons[value]}
                        <span className="capitalize">{value}</span>
                    </div>
                    <p className="text-xs text-zinc-400">
                        {styleDescriptions[value]}
                    </p>
                </div>

                <ChevronDown
                    className={`h-5 w-5 text-zinc-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            {isOpen && (
                <div className="absolute bottom-full left-0 z-50 mb-1 w-full rounded-md border border-white/12 bg-black/20 backdrop-blur-3xl shadow-lg">
                    {thumbnailStyles
                        .filter((style) => style !== value)
                        .map((style) => (

                            <button
                                key={style}
                                type="button"
                                onClick={() => {
                                    onChange(style);
                                    setIsOpen(false);
                                }}
                                className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-black/30}`}
                            >
                                <div className="mt-0.5">{styleIcons[style]}</div>
                                <div>
                                    <p className="font-medium capitalize">{style}</p>
                                    <p className="text-xs text-zinc-400">
                                        {styleDescriptions[style]}
                                    </p>
                                </div>
                            </button>
                        ))}
                </div>
            )}

        </div>
    );
};

export default StyleSelector;
