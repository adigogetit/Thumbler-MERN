import { useEffect, useState } from "react"
import SoftBackdrop from "../components/SoftBackdrop"
import { dummyThumbnails, type IThumbnail } from "../assets/assets"
import { div } from "motion/react-client"


const MyGenerations = () => {

  const [thumbnail,setThumbnail] = useState<IThumbnail[]>([])
  const [loading,setLoading] = useState(false)

  const fetchThumbnails = async()=>{
    setThumbnail(dummyThumbnails as unknown as IThumbnail[])
    setLoading(false);
  }

  const handelDownload = (image_url:string)=>{
    window.open(image_url,'_blank')
  }  

  const handelDelete = async(id:string)=>{
    console.log(id);
  }

  useEffect(()=>{
    fetchThumbnails()
  },[])

  return (
    <>
    <SoftBackdrop/>
    <div className="mt-32 min-h-screen px-6 md:px-16 lg:px-24 xl:ps32"> 
      {/* {Header} */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-200">My Generations</h1>
        <p className="text-sm text-zinc-200 mt-1">View and manage all your thumbnails</p>

      </div>

      {/* {Loading} */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({length:6}).map((_, i)=>(
            <div key={i} className="rounded-2xl bg-white/6 border border-white/10 animate-pluse h-[260px]"/>
          ))}
        </div>
      )}

      {/* {Empty state} */}
      {!loading && thumbnail.length===0 && (
         <div className="text-center py-24">
          <h3 className="text-lg font-semibold text-zinc-200">No Thumbnails yet</h3>
          <p className="text-sm text-zinc-200 mt-2">Generate your first thumbnail to see it here </p>
         </div>
      )}

    </div>
      
    </> 
  )
}

export default MyGenerations
