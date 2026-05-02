import React, { useState, memo } from 'react';
import { Upload, X, FileText, CheckCircle } from 'lucide-react';

const DocumentUploader = ({ label, description }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(URL.createObjectURL(selected));
  };

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-end">
        <div>
          <h5 className="font-black uppercase text-xs text-neon-cyan">{label}</h5>
          <p className="text-[10px] font-bold opacity-60 uppercase">{description}</p>
        </div>
        {file && <CheckCircle size={16} className="text-neon-yellow mb-1" />}
      </div>

      {!file ? (
        <label 
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); handleFile({ target: { files: e.dataTransfer.files } }); }}
          className={`
            relative cursor-pointer flex flex-col items-center justify-center p-6 
            border-4 border-dashed transition-all duration-200
            ${isDragging ? 'border-neon-yellow bg-white/10' : 'border-hc-white/20 hover:border-hc-white'}
          `}
        >
          <Upload size={24} className="mb-2 opacity-40" />
          <span className="text-[10px] font-black uppercase opacity-40 text-center">
            Drop or Click to Upload
          </span>
          <input type="file" className="hidden" onChange={handleFile} accept="image/*" />
        </label>
      ) : (
        <div className="relative border-4 border-hc-white group overflow-hidden h-32">
          <img src={file} alt="Preview" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
          <div className="absolute inset-0 bg-hc-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={() => setFile(null)}
              className="bg-red-600 text-white p-2 border-2 border-white font-black"
            >
              <X size={20} />
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-neon-yellow text-hc-black text-[8px] font-black uppercase px-2 py-1">
            Ready for submission
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(DocumentUploader);
