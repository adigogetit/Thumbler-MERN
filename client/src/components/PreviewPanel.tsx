import type { AspectRatio, IThumbnail } from "../assets/assets"

const PreviewPanel = ({thumbnail,isLoading,aspectRatio} :
  {thumbnail:IThumbnail , isLoading:boolean, aspectRatio:AspectRatio}
) => {

  const aspectClasses={
    "16:9":"aspect-video",
    "4:3":"aspect-square",
    "1:1":"aspect-square"
  }
  
  return (
    <div>
      
    </div>
  )
}

export default PreviewPanel
