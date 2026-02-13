import { ChevronDown, CpuIcon, ImageIcon, PenToolIcon, SparkleIcon, SquareIcon } from "lucide-react";

import type React from "react";
import { thumbnailStyles} from "../assets/assets";

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
        vibrant: <SparkleIcon className="size-6 rounded-sm bg-gradient-to-tr from-pink-500 to-yellow-500" />,
        minimal: <SquareIcon className="size-6 rounded-sm bg-gray-500" />,
        cinematic: <ImageIcon className="size-6 rounded-sm bg-gradient-to-tr from-blue-500 to-purple-500" />,
        cartoon: <PenToolIcon className="size-6 rounded-sm bg-gradient-to-tr from-green-500 to-blue-500" />,
        retro: <CpuIcon className="size-6 rounded-sm bg-gradient-to-tr from-orange-500 to-red-500" />,
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
                <div className="absolute top-full left-0 z-50 mt-1 w-full rounded-md border border-white/12 bg-black/20 backdrop-blur-3xl shadow-lg">
                    {thumbnailStyles.map((style) => (
                        <button
                            key={style}
                            type="button"
                            onClick={() => {
                                onChange(style);
                                setIsOpen(false);
                            }}
                            className={`flex w-full items-start gap-3 px-4 py-3 text-left transition hover:bg-black/30 ${value === style ? "bg-black/40" : ""
                                }`}
                        >
                            <div className="mt-0.5">
                                {styleIcons[style]}
                            </div>

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
