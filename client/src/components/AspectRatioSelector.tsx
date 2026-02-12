import { RectangleCircle, RectangleVertical, Square } from 'lucide-react'


const AspectRatioSelector = () => {
    const iconMap = {
            '16:9': <RectangleCircle className='size-6' />,
            '1:1': <Square className='size-6' /> ,
            '9:16': <RectangleVertical className='size-6' />
        }
    
    return (
        < div className = 'space-y-3 dark' >
        <label className="block text-sm font-medium text-zinc-300">Aspect Ratio</label>

        <div className='flex flex-wrap gap-2'>

        </div>
      
    </ >
  )
}

export default AspectRatioSelector
