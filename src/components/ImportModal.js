import React from "react";

const ImportModal = ({
  open,
  onClose,
  onUpload,
  onImport,
  fileUploaded,
  importPreview = [],
}) => {
  if (!open) return null;

  const handleUpload = () => {
    onUpload?.();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded shadow p-4 w-[1000px] max-h-[90vh] overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Import Trạm</h2>

        <div className="flex gap-2 mb-4">
          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Upload
          </button>
          <button className="px-4 py-2 border rounded hover:bg-gray-100">
            Tải file mẫu
          </button>
        </div>

        <div className="overflow-auto max-h-[50vh] border rounded">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Tên trạm</th>
                <th className="border px-2 py-1">Kỹ thuật viên</th>
                <th className="border px-2 py-1">Trạng thái</th>
                <th className="border px-2 py-1">Vị trí</th>
                <th className="border px-2 py-1">Tín hiệu</th>
                <th className="border px-2 py-1">Loại</th>
                <th className="border px-2 py-1">SĐT</th>
                <th className="border px-2 py-1">Bán kính</th>
                <th className="border px-2 py-1">Tọa độ</th>
              </tr>
            </thead>
            <tbody>
              {importPreview.length === 0 ? (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-gray-500">
                    Chưa có dữ liệu
                  </td>
                </tr>
              ) : (
                importPreview.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="border px-2 py-1">{row.name}</td>
                    <td className="border px-2 py-1">{row.technician}</td>
                    <td className="border px-2 py-1">{row.status}</td>
                    <td className="border px-2 py-1">{row.location}</td>
                    <td className="border px-2 py-1">{row.signal}</td>
                    <td className="border px-2 py-1">{row.radio}</td>
                    <td className="border px-2 py-1">{row.phone}</td>
                    <td className="border px-2 py-1">{row.range}</td>
                    <td className="border px-2 py-1">
                      {row.coordinates?.join(", ")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-1 border rounded hover:bg-gray-100"
          >
            Hủy
          </button>
          <button
            onClick={onImport}
            disabled={!fileUploaded}
            className={`px-4 py-1 rounded text-white ${
              fileUploaded
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportModal;
