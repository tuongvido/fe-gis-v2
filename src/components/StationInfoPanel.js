import React, { useState, useEffect } from "react";
import { X, Edit2, Trash2 } from "lucide-react";

const StationInfoPanel = ({ station, onClose }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(station);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setFormData(station);
    setIsEditing(false);
  }, [station]);

  if (!station) return null;

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Saved station:", formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(station);
    setIsEditing(false);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "ONLINE":
        return "bg-green-100 text-green-800";
      case "OFFLINE":
        return "bg-red-100 text-red-800";
      case "MAINTENANCE":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSignalColorClass = (signal) => {
    if (signal >= 80) return "text-green-600";
    if (signal >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-[1000]">
      <div className="flex items-center justify-between mb-3">
        {isEditing ? (
          <input
            className="font-bold text-lg border px-2 py-1 rounded w-full"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        ) : (
          <h3 className="font-bold text-lg">{station.name}</h3>
        )}
        <div className="flex items-center space-x-2 ml-2">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        
        {/* <div className="flex justify-between">
          <span>Kỹ thuật viên:</span>
          {isEditing ? (
            <input
              className="border px-2 rounded w-1/2"
              value={formData.technician}
              onChange={(e) => handleChange("technician", e.target.value)}
            />
          ) : (
            <span className="font-medium">{station.technician}</span>
          )}
        </div> */}

        <div className="flex justify-between">
          <span>Trạng thái:</span>
          {isEditing ? (
            <select
              className="border px-2 rounded w-1/2"
              value={formData.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="ONLINE">ONLINE</option>
              <option value="OFFLINE">OFFLINE</option>
              <option value="MAINTENANCE">MAINTENANCE</option>
            </select>
          ) : (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusClass(station.status)}`}>
              {station.status}
            </span>
          )}
        </div>

        <div className="flex justify-between">
          <span>Tín hiệu:</span>
          {isEditing ? (
            <input
              type="number"
              className="border px-2 rounded w-1/2"
              value={formData.signal}
              onChange={(e) => handleChange("signal", e.target.value)}
            />
          ) : (
            <span className={`font-medium ${getSignalColorClass(station.signal)}`}>{station.signal}%</span>
          )}
        </div>

        <div className="flex justify-between">
          <span>Loại:</span>
          {isEditing ? (
            <input
              className="border px-2 rounded w-1/2"
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
            />
          ) : (
            <span className="font-medium">{station.type}</span>
          )}
        </div>
          <div className="flex justify-between">
          <span>Quận:</span>
          {isEditing ? (
            <input
              className="border px-2 rounded w-1/2"
              value={formData.type}
              onChange={(e) => handleChange("type", e.target.value)}
            />
          ) : (
            <span className="font-medium">{station.nameDistrict}</span>
          )}
        </div>

        <div className="flex justify-between">
          <span>Vị trí:</span>
          {isEditing ? (
            <input
              className="border px-2 rounded w-1/2"
              value={formData.location}
              onChange={(e) => handleChange("location", e.target.value)}
            />
          ) : (
            <span className="font-medium text-right">{station.location}</span>
          )}
        </div>
        <div className="flex justify-between">
          <span>Range:</span>
          {isEditing ? (
            <input
              type="number"
              className="border px-2 rounded w-1/2"
              value={formData.range}
              onChange={(e) => handleChange("range", e.target.value)}
            />
          ) : (
            <span className="font-medium">{station.range} m</span>
          )}
        </div>
      </div>

      {!isEditing && (
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      )}

      {isEditing && (
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={handleCancel} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm">
            Hủy
          </button>
          <button onClick={handleSave} className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 text-sm">
            Lưu
          </button>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2000]">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h3 className="text-lg font-semibold mb-4">Xác nhận xóa</h3>
            <p className="mb-6 text-sm text-gray-700">Bạn có chắc chắn muốn xóa trạm này?</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-sm rounded border border-gray-300 hover:bg-gray-100"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  console.log("Xóa trạm:", station.id);
                  setShowDeleteConfirm(false);
                  onClose(); // đóng panel nếu cần
                }}
                className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StationInfoPanel;
