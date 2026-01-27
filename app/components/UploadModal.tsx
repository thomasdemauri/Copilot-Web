import { useState } from "react";

type Props = {
  onClose: () => void;
  onUpload: (files: File[]) => void;
};

export default function UploadModal({ onClose, onUpload }: Props) {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-96 shadow-2xl border border-gray-200 overflow-hidden animate-fadeIn">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100/50 px-6 py-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Upload Data Files</h2>
          <p className="text-sm text-gray-500 mt-1">Import CSV, XLS, or XLSX files</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50/30 transition-all cursor-pointer group">
            <input
              type="file"
              multiple
              accept=".csv,.xls,.xlsx"
              id="file-input"
              className="hidden"
              onChange={(e) =>
                setFiles(e.target.files ? Array.from(e.target.files) : [])
              }
            />
            <label htmlFor="file-input" className="block cursor-pointer">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 mb-3 group-hover:bg-purple-200 transition-colors">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900">Click to upload files</p>
              <p className="text-xs text-gray-500 mt-1">or drag and drop</p>
              <p className="text-xs text-gray-400 mt-2">CSV, XLS, XLSX up to 10MB</p>
            </label>
          </div>

          {/* Files List */}
          {files.length > 0 && (
            <div className="space-y-2 animate-fadeIn">
              <label className="block text-sm font-medium text-gray-700">Selected Files:</label>
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                {files.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 16.5a1 1 0 01-1-1V7a4 4 0 118 0v8.5a1 1 0 11-2 0V7a2 2 0 10-4 0v8.5a1 1 0 01-1 1z" clipRule="evenodd" />
                    </svg>
                    <span className="truncate flex-1">{file.name}</span>
                    <span className="text-xs text-gray-400">({(file.size / 1024).toFixed(1)} KB)</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onUpload(files)}
            disabled={files.length === 0}
            className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Upload ({files.length})
          </button>
        </div>
      </div>
    </div>
  );
}