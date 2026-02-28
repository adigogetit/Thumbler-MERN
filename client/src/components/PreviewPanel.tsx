import type { AspectRatio, IThumbnail } from "../assets/assets"
import { DownloadIcon, Loader2Icon } from "lucide-react"

const PreviewPanel = ({thumbnail,isLoading,aspectRatio} :
  {thumbnail:IThumbnail , isLoading:boolean, aspectRatio:AspectRatio}
) => {

  const aspectClasses={
    "16:9":"aspect-video",
    "4:3":"aspect-square",
    "9:16":"aspect-[9/16]"
  }as Record<AspectRatio,string>

  const onDownload = () => {
    if(!thumbnail?.image_url) return;
    window.open(thumbnail.image_url, "_blank")
  }

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]}`}>

        {/* {loading State} */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/25">
            <Loader2Icon className="size-8 animate-spin text-zinc-400"/>
            <div className="text-center">
              <p className="text-sm font-medium text-zinc-300">Ai is generating preview...</p>
              <p className="mt-1 text-xs text-zinc-400">This may take a few moments</p>
            </div>
          </div>
        )}

        {/* {image preview} */}
        {!isLoading && thumbnail?.image_url &&  (
          <div className="group relative h-full w-full">
            <img src={thumbnail?.image_url} alt={thumbnail.title}  className="h-full w-full object-cover"/>

            <div className=" absolute inset-0 flex items-end justify-center bg-black/10 opicity-0 transition-opacity group-hover:opacity-100"> 
              <button onClick={onDownload} type="button" className="mb-6 flex items-center gap-2 rounded-md bg-white/30 px-4 py-2 text-xs font-medium transition ring-2 ring-white/40 backdrop=blur hover:scale-105 active:scale-95">
                <DownloadIcon className="size-4"/>
                Download Thumbnail 
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default PreviewPanel
