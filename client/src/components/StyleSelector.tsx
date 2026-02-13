import { CpuIcon, ImageIcon, PenToolIcon, SparkleIcon, SquareIcon } from "lucide-react";
import type { ThumbnailStyle } from "../assets/assets";



const StyleSelector = ({ value, onChange, isOpen, setIsOPen } :
    { value: ThumbnailStyle;
onChange: (style: ThumbnailStyle) => void };
isOpen: boolean;
setIsOpen: (isOpen: boolean) => void
) => {
 


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
