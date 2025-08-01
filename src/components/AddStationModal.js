import React, { useState, useEffect } from "react";

const AddStationModal = ({ isOpen, onClose, onSave, coordinates }) => {
  const [formData, setFormData] = useState({
    name: "",
    mcc: "",
    mnc: "",
    cell: "",
    lat: coordinates?.lat || "",
    lon: coordinates?.lng || "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      lat: coordinates?.lat || "",
      lon: coordinates?.lng || "",
    }));
  }, [coordinates]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
    onClose(); // đóng modal sau khi lưu
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md w-[400px] space-y-4">
        <h2 className="text-xl font-semibold mb-2">Thêm trạm mới</h2>
        <input
          type="text"
          name="name"
          placeholder="Tên trạm"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="mcc"
          placeholder="MCC"
          value={formData.mcc}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="mnc"
          placeholder="MNC"
          value={formData.mnc}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="cell"
          placeholder="Cell ID"
          value={formData.cell}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="text"
          name="lat"
          value={formData.lat}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />
        <input
          type="text"
          name="lon"
          value={formData.lon}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Hủy</button>
          <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Lưu</button>
        </div>
      </div>
    </div>
  );
};

export default AddStationModal;
