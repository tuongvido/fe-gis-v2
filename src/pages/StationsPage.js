// pages/StationsPage.js
import React, { useState } from "react";
import { baseStations } from "../constants/constants.js";
import EditStationModal from "../components/EditStationModal";
import DeleteStationModal from "../components/DeleteStationModal";
import ImportModal from "../components/ImportModal.js";

const StationsPage = () => {
  const [stations, setStations] = useState(baseStations);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [importPreview, setImportPreview] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = (station) => {
    setSelectedStation({ ...station });
    setShowEditModal(true);
  };

  const handleDelete = (station) => {
    setSelectedStation(station);
    setShowDeleteModal(true);
  };

  const handleChange = (field, value) => {
    setSelectedStation((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    setStations((prev) => prev.map((s) => (s.id === selectedStation.id ? selectedStation : s)));
    setShowEditModal(false);
  };

  const handleConfirmDelete = () => {
    setStations((prev) => prev.filter((s) => s.id !== selectedStation.id));
    setShowDeleteModal(false);
  };

  const openImportModal = () => {
    setShowImportModal(true);
    setFileUploaded(false);
    setImportPreview([]);
  };

  const handleUpload = () => {
    setFileUploaded(true);
    setImportPreview([
      {
        id: 3,
        name: "Trạm BTS Quận 5 - C",
        technician: "Lê Văn C",
        status: "ONLINE",
        location: "Quận 5, TP.HCM",
        signal: 90,
        type: "BTS",
        phone: "0901000003",
      },
    ]);
  };

  const handleImport = () => {};

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-gray-800 tracking-wide">Danh sách trạm</h1>

        <div className="space-x-2">
          <button onClick={openImportModal} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Import Data
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Export Data</button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border divide-y">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Tên trạm</th>
              <th className="px-4 py-2 text-left">Kỹ thuật viên</th>
              <th className="px-4 py-2 text-left">Trạng thái</th>
              <th className="px-4 py-2 text-left">Vị trí</th>
              <th className="px-4 py-2 text-left">Tín hiệu</th>
              <th className="px-4 py-2 text-left">Loại</th>
              <th className="px-4 py-2 text-left">Số điện thoại</th>
              <th className="px-4 py-2 text-left">Tầm phủ</th>
              <th className="px-4 py-2 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station) => (
              <tr key={station.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{station.name}</td>
                <td className="px-4 py-2">{station.technician}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 rounded text-white text-sm ${
                      station.status === "ONLINE" ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    {station.status}
                  </span>
                </td>
                <td className="px-4 py-2">{station.location}</td>
                <td className="px-4 py-2">{station.signal}</td>
                <td className="px-4 py-2">{station.type}</td>
                <td className="px-4 py-2">{station.phone}</td>
                <td className="px-4 py-2">{station.range} m</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="text-blue-600 hover:underline" onClick={() => handleEdit(station)}>
                    Sửa
                  </button>
                  <button className="text-red-600 hover:underline" onClick={() => handleDelete(station)}>
                    Xoá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Edit Station */}
      <EditStationModal
        open={showEditModal}
        onClose={() => setShowEditModal(false)}
        station={selectedStation}
        onChange={handleChange}
        onSave={handleSave}
      />

      {/* Modal: Confirm Delete */}
      <DeleteStationModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
        station={selectedStation}
      />

      {/* Import Modal */}
      <ImportModal
        open={showImportModal}
        onClose={() => setShowImportModal(false)}
        onUpload={handleUpload}
        onImport={handleImport}
        fileUploaded={fileUploaded}
        importPreview={importPreview}
      />
    </div>
  );
};

export default StationsPage;
