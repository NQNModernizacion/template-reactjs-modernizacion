import React, { useState } from "react"

interface SubirArchivoProps {
    label?: string
    accept?: string 
    onFileSelect: (file: File | null) => void 
}

const SubirArchivo: React.FC<SubirArchivoProps> = ({
    label = "Subir archivo",
    accept = ".png, .jpg, .jpeg, .pdf",
    onFileSelect,
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const agregarArchivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null
        setSelectedFile(file)
        onFileSelect(file)
    }

    const removerArchivo = () => {
        setSelectedFile(null)
        onFileSelect(null)
    }

    return (
        <div className='flex flex-col gap-4'>
            <label className='font-semibold'>{label}</label>
            <input
                type='file'
                accept={accept}
                onChange={agregarArchivo}
                className='border border-gray-300 p-2 rounded-md'
            />
            {selectedFile && (
                <div className='flex justify-between items-center mt-3'>
                    <p className='text-gray-700'>{selectedFile.name}</p>
                    <button
                        type='button'
                        className='bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-400'
                        onClick={removerArchivo}
                    >
                        Quitar archivo
                    </button>
                </div>
            )}
        </div>
    )
}

export default SubirArchivo
