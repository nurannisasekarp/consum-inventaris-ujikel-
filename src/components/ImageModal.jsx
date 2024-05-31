import React from 'react';

export default function ImageModal({ show, onClose, imageUrl }) {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-full">
                <img src={imageUrl} alt="Proof" className="max-w-full h-auto" />
                <button onClick={onClose} className="mt-4 p-2 bg-blue-500 text-white rounded">Close</button>
            </div>
        </div>
    );
}
