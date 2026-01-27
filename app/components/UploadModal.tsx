import { useState } from "react";

type Props = {
  onClose: () => void;
  onUpload: (files: File[]) => void;
};

export default function UploadModal({ onClose, onUpload }: Props) {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg w-96 shadow-2xl border border-gray-300">
        
        {/* Forçando text-black diretamente no H2 */}
        <h2 className="text-xl font-bold mb-4 text-black border-b border-gray-300 pb-2">
          Upload Data
        </h2>

        {/* O input file é chato de estilizar. 
           Adicionei 'text-black' e forcei um fundo branco no próprio input 
        */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-black">
            Selecione os arquivos:
          </label>
          <input
            type="file"
            multiple
            accept=".csv,.xls,.xlsx"
            className="block w-full text-sm text-gray-900
              border border-gray-300 rounded cursor-pointer bg-white focus:outline-none"
            onChange={(e) =>
              setFiles(e.target.files ? Array.from(e.target.files) : [])
            }
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          {/* Forçando cores no botão Cancelar */}
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black rounded font-medium transition-colors"
          >
            Cancel
          </button>
          
          {/* Botão de Upload */}
          <button
            onClick={() => onUpload(files)}
            disabled={files.length === 0}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Upload ({files.length})
          </button>
        </div>
      </div>
    </div>
  );
}