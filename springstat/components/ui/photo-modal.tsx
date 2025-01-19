import React from 'react';

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const PhotoModal: React.FC<PhotoModalProps> = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
      <div className="relative bg-white rounded-lg p-4 shadow-lg max-w-4xl">
        <button 
          className="absolute top-0 right-0 text-gray-600 hover:text-gray-900" 
          onClick={onClose}
        >
          ❌ Закрыть
        </button>
        {imageUrl ? (
          <img src={imageUrl} alt="Фото пружины" className="w-full max-h-[70vh] object-contain mx-auto" />
        ) : (
          <p className="text-center text-gray-500">Фото не найдено</p>
        )}
      </div>
    </div>
  );
};

export default PhotoModal;
