import React, { useState } from "react";

interface SubirArchivoProps {
  label?: string;
  accept?: string;
  onFileSelect: (file: File | null) => void;
  onSave: (file: File | null) => void;
  closeButton: true,
}

const SubirArchivo: React.FC<SubirArchivoProps> = ({
  label = "Subir archivo",
  accept = ".png, .jpg, .jpeg, .pdf",
  onFileSelect,
  onSave,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const agregarArchivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    onFileSelect(file);

    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else if (file.type === "application/pdf") {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    } else {
      setPreviewUrl(null);
    }
  };

  const removerArchivo = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onFileSelect(null);
  };

  const guardarArchivo = () => {
    if (selectedFile) {
      onSave(selectedFile);
      removerArchivo();
     
    }
};

  return (
    <div className="mb-4">
      <label className="form-label fw-bold">{label}</label>
      <input
        type="file"
        accept={accept}
        onChange={agregarArchivo}
        className="form-control"
      />
      {selectedFile && (
        <div className="mt-3">
          {previewUrl && (
            <div className="mb-3">
              {selectedFile.type.startsWith("image/") ? (
                <img
                  src={previewUrl}
                  alt="Vista previa"
                  className="img-thumbnail"
                  style={{ maxWidth: "200px" }}
                />
              ) : selectedFile.type === "application/pdf" ? (
                <a
                  href={previewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-link"
                >
                  Ver PDF
                </a>
              ) : null}
            </div>
          )}
          <div className="d-flex align-items-center justify-content-between">
            <span className="text-muted">{selectedFile.name}</span>
            <button
              type="button"
              className="btn btn-danger btn-sm me-2"
              onClick={removerArchivo}
            >
              Quitar archivo
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={guardarArchivo}
              disabled={!selectedFile}
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubirArchivo;
