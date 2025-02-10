import { useState, useRef } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

const SubirImagenes = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]); 
  const [showModal, setShowModal] = useState(false); 
  const [imageToRemove, setImageToRemove] = useState<number | null>(null); 
  const fileInputRef = useRef<HTMLInputElement>(null); 


  const handleImageChange = (e: any) => {
    const files: File[] = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.type.startsWith('image/'));
    setImageFiles((prev) => [...prev, ...validFiles]);
  };


  const handleAddMoreImages = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };


  const handleRemoveImage = () => {
    setImageFiles((prev) => prev.filter((_, index) => index !== imageToRemove));
    setImageToRemove(null);
    setShowModal(false);
  };

  const getImagePreview = (file: any) => {
    const imageUrl = URL.createObjectURL(file);
    return imageUrl;
  };

  return (
    <div>
      
      <Button variant="secondary" onClick={handleAddMoreImages}>
        + Imágenes
      </Button>

      <input
        type="file"
        accept="image/*"
        multiple
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageChange}
      />

      <div className="mt-2">
        {imageFiles.map((file, index) => (
          <div key={index} className="me-2 position-relative" style={{ display: 'inline-block' }}>
            <img
              src={getImagePreview(file)}
              alt={`Preview ${index}`}
              style={{
                maxWidth: '100px',
                maxHeight: '100px',
                margin: '5px',
                border: '1px solid #ccc',
                borderRadius: '5px',
              }}
            />
            <Button
              variant="danger"
              size="sm"
              style={{ position: 'absolute', top: '0', right: '0' }}
              onClick={() => {
                setImageToRemove(index);
                setShowModal(true);
              }}
            >
              X
            </Button>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta imagen?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleRemoveImage}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default SubirImagenes;
