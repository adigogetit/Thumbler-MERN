import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { dummyThumbnails, type IThumbnail } from "../assets/assets";
import SoftBackdrop from "../components/SoftBackdrop";
import AspectRatioSelector from "../components/AspectRatioSelector";
import { colorSchemes, type AspectRatio, type ThumbnailStyle } from "../assets/assets";
import StyleSelector from "../components/StyleSelector";
import ColorSchemeSelector from "../components/ColorSchemeSelector";
import PreviewPanel from "../components/PreviewPanel";

const Generate = () => {

  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const [thumbnail, setThumbnail] = useState<IThumbnail | null>(null);
  const [loading, setLoading] = useState(false);

  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [colorSchemeId, setColorSchemeId] = useState<string>(colorSchemes[0].id);
  const [style, setStyle] = useState<ThumbnailStyle>('vibrant');
   
  const [styleDropdownOpen, setStyleDropdownOpen] = useState(false);

  const handeleGenerate = async()=>{

  }

  const fetchThumbnail = async()=>{
    if(id){
      const thumbnail : any = dummyThumbnails.find((thumbnail)=>thumbnail._id === id);
      setThumbnail(thumbnail)
      setAdditionalDetails(thumbnail.user_prompt)
      setTitle(thumbnail.title)
      setColorSchemeId(thumbnail.color_scheme)
      setAspectRatio(thumbnail.aspect_ratio)
      setStyle(thumbnail.style)
      setLoading(false)
    }
  }

  useEffect(()=>{
    if(id){
      fetchThumbnail();
    }
  },[id])

  return (
    <> 
      <SoftBackdrop />
      
      <div className="pt-24 min-h-screen">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-28 lg:pb-8 ">
          <div className="grid lg:grid-cols-[400px_1fr] gap-8">

            {/* LEFT PANEL */}
            <div className={`space-y-6 ${id && 'pointer-events-none'}`}>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/12 shadow-xl space-y-6">

                <div>
                  <h2 className="text-xl font-bold text-zinc-100 mb-1">
                    Create Your Thumbnail
                  </h2>
                  <p className="text-sm text-zinc-400">
                    Describe your vision and let AI bring it to life
                  </p>
                </div>

                <div className="space-y-4">
                  {/* {Title input} */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-zinc-300 mb-1">
                      Title or Topic
                      <span className="text-xs text-zinc-400 ml-1">({title.length}/100)</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      value={title}
                      maxLength={100}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="E.g. Gaming Montage - Epic Moments"
                      className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/12 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" />
                  </div>

                  {/* {AspectRatioSelector} */}
                  <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />

                  {/* {StyleSelector} */}
                  <StyleSelector value={style} onChange={setStyle} isOpen={styleDropdownOpen} setIsOpen={setStyleDropdownOpen} />
                   
                  {/* {ColorSchemeSelector} */}
                  <ColorSchemeSelector value={colorSchemeId} onChange={setColorSchemeId} />

                  {/* {Details} */}
                  <div className="space-y-2">
                    <label htmlFor="details" className="block text-sm font-medium text-zinc-300">
                      Additional Details
                      <span className="text-xs text-zinc-400 ml-1">(optional)</span>
                    </label>
                    <textarea
                      id="details"
                      value={additionalDetails}
                      onChange={(e) => setAdditionalDetails(e.target.value)}
                      placeholder="E.g. Bold red and yellow colors, dynamic action shots...."
                      className="w-full px-4 py-3 rounded-xl bg-white/8 border border-white/12 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none h-24" />
                  </div>


                  {/* {button} */}
                  {!id && (
                    <button onClick={handeleGenerate} className="text-[15px] w-full py-3.5 rounded-xl font-medium bg-linear-to-b from-pink-500 to-pink-600 hover:from-pink-700 disabled:cursor-not-allowed transition-colors">
                      {loading ? 'Generating...' : 'Generate Thumbnail'}
                    </button>
                  )}
                </div>

              </div>
            </div>


            {/* RIGHT PANEL */}

            {/* {Preview Panel} */}
            <div>
              <div className="p-6 rounded-2xl bg-white/8 border border-white/10 shadow-xl">
                <h2 className="text-lg font-semibold text-zinc-50 mb-4">Preview</h2>
                <PreviewPanel thumbnail={thumbnail} isLoading={loading} aspectRatio={aspectRatio}/>
              </div>
            </div>

          </div>
        </main>

      </div>

    </>
  )
}

export default Generate
