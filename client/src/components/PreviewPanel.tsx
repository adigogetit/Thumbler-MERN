import { div } from "motion/react-client"
import type { AspectRatio, IThumbnail } from "../assets/assets"
import { Loader2Icon } from "lucide-react"

const PreviewPanel = ({thumbnail,isLoading,aspectRatio} :
  {thumbnail:IThumbnail , isLoading:boolean, aspectRatio:AspectRatio}
) => {

  const aspectClasses={
    "16:9":"aspect-video",
    "4:3":"aspect-square",
    "9:16":"aspect-[9/16]"
  }as Record<AspectRatio,string>

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]}`}>

        {/* {loadingState} */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/25">
            <Loader2Icon className="size-8 animate-spin text-zinc-400"/>
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-300">Ai is generating preview...</p>
              <p className="mt-1 text-xs text-zinc-400">This may take a few moments</p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default PreviewPanel
