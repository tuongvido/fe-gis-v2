// components/DeleteStationModal.js
import React from "react";

const DeleteStationModal = ({ open, onClose, onConfirm, station }) => {
  if (!open || !station) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4">Xác nhận xoá</h2>
        <p>Bạn có chắc muốn xoá trạm <strong>{station.name}</strong>?</p>
        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Hủy</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">Xóa</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteStationModal;
