// components/EditStationModal.js
import React from "react";

const EditStationModal = ({ open, onClose, station, onChange, onSave }) => {
  if (!open || !station) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 w-full max-w-xl rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Chỉnh sửa trạm</h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm">Tên trạm</label>
            <input
              type="text"
              value={station.name}
              onChange={(e) => onChange("name", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Kỹ thuật viên</label>
            <input
              type="text"
              value={station.technician}
              onChange={(e) => onChange("technician", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Trạng thái</label>
            <select
              value={station.status}
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
              value={station.type}
              onChange={(e) => onChange("type", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Tín hiệu</label>
            <input
              type="number"
              value={station.signal}
              onChange={(e) => onChange("signal", Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Số điện thoại</label>
            <input
              type="text"
              value={station.phone}
              onChange={(e) => onChange("phone", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Vị trí</label>
            <input
              type="text"
              value={station.location}
              onChange={(e) => onChange("location", e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Tầm phủ (m)</label>
            <input
              type="number"
              value={station.range}
              onChange={(e) => onChange("range", Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="text-sm">Tọa độ (lat, lon)</label>
            <input
              type="text"
              value={station.coordinates?.join(", ") || ""}
              onChange={(e) =>
                onChange(
                  "coordinates",
                  e.target.value
                    .split(",")
                    .map((v) => parseFloat(v.trim()))
                )
              }
              className="w-full border p-2 rounded"
              placeholder="10.76, 106.70"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Hủy
          </button>
          <button
            onClick={onSave}
            className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStationModal;
