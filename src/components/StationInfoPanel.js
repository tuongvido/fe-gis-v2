import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { mapTower } from "../utils/Utils.js";
import { editTower, deleteTower } from "../api/towerService";
import { showSuccess, showError } from "../components/AlertPopup";
import { getClassColor } from "../utils/Utils.js";

const StationInfoPanel = ({ station, onClose, onUpdate, onDelete }) => {
  const [formData, setFormData] = useState({ ...station });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    setFormData(station);
  }, [station]);

  if (!station) return null;

  const handleDelete = async () => {
    await deleteTower(station)
      .then((res) => {
        onDelete(station.id);
        showSuccess("Thành công");
      })
      .catch((err) => {
        console.error(err);
        showError("Có lỗi xảy ra");
      });
  };

  const getSignalColorClass = (signal) => {
    if (signal >= 80) return "text-green-600";
    if (signal >= 50) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 w-[220px] z-[1000]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-lg">{station.name}</h3>
        <div className="flex items-center space-x-2 ml-2">
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Trạng thái:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getClassColor(station.status)}`}>
            {station.status}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tín hiệu:</span>
          <span className={`font-medium ${getSignalColorClass(station.averageSignal)}`}>{station.averageSignal}%</span>
        </div>

        <div className="flex justify-between">
          <span>Loại:</span>
          <span className="font-medium">{station.radio}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">{station.nameDistrict}</span>
        </div>

        <div className="flex justify-between items-center">
          <span>Tọa độ:</span>
          <span className="font-medium text-right">
            [{station.lat}, {station.lon}]
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tầm phủ:</span>
          <span className="font-medium">{station.range} m</span>
        </div>
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          onClick={() => onUpdate()}
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
                  handleDelete();
                  setShowDeleteConfirm(false);
                  onClose();
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
