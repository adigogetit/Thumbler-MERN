import { colorSchemes } from "../assets/assets"

const ColorSchemeSelector = ({ value, onchange }: {
    value: string,
    onchange: (color: string) => void
}) => {

    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-zinc-300">Color Scheme </label>

            <div className="grid grid-cols-6 gap-3">
                {colorSchemes.map((scheme) => (
                    <button
                        key={scheme.id}
                        onClick={() => onchange(scheme.id)}
                        className={`w-full h-10 rounded-lg border-2 ${value === scheme.id ? 'border-pink-500' : 'border-transparent'} focus:outline-none`}
                        title={scheme.name}
                    >
                        <div className="flex h-10 rounded-lg overflow-hidden">
                            {scheme.color.map((color, index)=> (
                                <div key={index} style={{ backgroundColor: color }} className="flex-1" />
                            )}
                        </div>

                    </button>
                ))}
            </div>
                <p className="text-sm text-zinc-400">Selected: {colorSchemes.find((s) => s.id === value)?.name || 'None'}</p>
        </div>
    ) 
}

export default ColorSchemeSelector
