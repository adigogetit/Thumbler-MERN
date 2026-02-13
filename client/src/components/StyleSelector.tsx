import { CpuIcon, ImageIcon, PenToolIcon, SparkleIcon, SquareIcon } from "lucide-react";
import type { ThumbnailStyle } from "../assets/assets";



const StyleSelector = ({ value, onChange, isOpen, setIsOPen } :
    { value: ThumbnailStyle;
onChange: (style: ThumbnailStyle) => void };
isOpen: boolean;
setIsOpen: (isOpen: boolean) => void
) => {
 

    const styleDescriptions: Record<ThumbnailStyle, string> = {
        'vibrant': 'Bright colors and high contrast for eye-catching thumbnails',
        'minimal': 'Clean and simple design with muted colors',
        'cinematic': 'Dramatic lighting and rich colors for a movie-like feel',
        'cartoon': 'Bold lines and exaggerated features for a fun, animated look',
        'retro': 'Vintage-inspired design with faded colors and nostalgic elements',
    }

    const StyleIcons: Record<ThumbnailStyle, React.ReactNode> = {
        'vibrant': <SparkleIcon className="size-6 rounded-sm bg-gradient-to-tr from-pink-500 to-yellow-500" />,
        'minimal': <SquareIcon className="size-6 rounded-sm bg-gray-500" />,
        'cinematic': <ImageIcon className="size-6 rounded-sm bg-gradient-to-tr from-blue-500 to-purple-500" />,
        'cartoon': <PenToolIcon className="size-6 rounded-sm bg-gradient-to-tr from-green-500 to-blue-500" />,
        'retro': <CpuIcon className="size-6 rounded-sm bg-gradient-to-tr from-orange-500 to-red-500" />,
    }

    return (
        <div>
            <div className="relative space-y-3 dark">
                <label className="block text-sm font-medium text-zinc-200">
                    Thumbnail Style
                </label>

                <button>
                    <div className="space-y-1">
                        <div>
                            { }
                        </div>
                    </div>
                </button>
            </div>


        </div>
    )
}

export default StyleSelector
