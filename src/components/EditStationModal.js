// components/EditStationModal.js
import { useState, useEffect } from "react";
import { mapTower } from "../utils/Utils.js";
import { editTower } from "../api/towerService";
import { showSuccess, showError } from "../components/AlertPopup";

const EditStationModal = ({ onClose, station, onUpdate }) => {
  const [formData, setFormData] = useState({ ...station });

  useEffect(() => {
    setFormData(station);
  }, []);

  if (!station) return null;

  const handleSave = async () => {
    const payload = {
      ...formData,
      range: parseInt(formData.range, 10),
      lat: parseFloat(formData.lat),
      lon: parseFloat(formData.lon),
    };

    await editTower(payload)
      .then((res) => {
        onUpdate(mapTower(res));
        showSuccess("Thành công");
      })
      .catch((err) => {
        console.error(err);
        showError("Có lỗi xảy ra");
      });
  };

  const onChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose} // click nền đen để đóng
    >
      <div
        className="bg-white p-6 w-full max-w-xl rounded shadow relative"
        onClick={(e) => e.stopPropagation()} // chặn click bên trong
      >
        {/* Nút X đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-lg font-bold"
        >
          &times;
        </button>
        <h2 className="text-lg font-semibold mb-4">Chỉnh sửa trạm</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Tên trạm</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Trạng thái</label>
            <select
              value={formData.status}
              onChange={(e) => onChange("status", e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="ONLINE">ONLINE</option>
              <option value="OFFLINE">OFFLINE</option>
            </select>
          </div>
          <div>
            <label className="text-sm">Loại</label>
            <input
              type="text"
              value={formData.radio}
              onChange={(e) => onChange("radio", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Tín hiệu</label>
            <input
              type="number"
              value={formData.averageSignal}
              onChange={(e) => onChange("averageSignal", Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Quận</label>
            <input
              type="text"
              value={formData.nameDistrict}
              onChange={(e) => onChange("nameDistrict", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Tầm phủ (m)</label>
            <input
              type="number"
              value={formData.range}
              onChange={(e) => onChange("range", Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Tọa độ</label>
            <div className="flex gap-4">
              {/* Lat */}
              <div className="flex items-center gap-2 flex-1">
                <label className="text-xs text-gray-600 w-8">Lat</label>
                <input
                  type="text"
                  value={formData.lat || ""}
                  onChange={(e) => onChange("lat", e.target.value)}
                  className="flex-1 border rounded p-2"
                />
              </div>
              {/* Lon */}
              <div className="flex items-center gap-2 flex-1">
                <label className="text-xs text-gray-600 w-8">Lon</label>
                <input
                  type="text"
                  value={formData.lon || ""}
                  onChange={(e) => onChange("lon", e.target.value)}
                  className="flex-1 border rounded p-2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded">
            Hủy
          </button>
          <button onClick={handleSave} className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStationModal;
