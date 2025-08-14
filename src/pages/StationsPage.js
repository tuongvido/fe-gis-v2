// pages/StationsPage.js
import { useState, useEffect } from "react";
import EditStationModal from "../components/EditStationModal";
import DeleteStationModal from "../components/DeleteStationModal";
import ImportModal from "../components/ImportModal.js";
import { searchTowers } from "../api/towerService";
import { getClassColor } from "../utils/Utils.js";
import { deleteTower } from "../api/towerService";
import { showSuccess, showError } from "../components/AlertPopup";

const StationsPage = () => {
  const initialSearchDto = {
    status: -1,
    districtId: -1,
    radioType: null,
    pageDto: {
      pageNumber: 0,
      pageSize: 100,
    },
  };

  const [searchDto, setSearchDto] = useState(initialSearchDto);
  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [importPreview, setImportPreview] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    searchTowers(searchDto)
      .then((data) => {
        setStations(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching towers:", err);
        setLoading(false);
      });
  }, [searchDto]);

  const handleEdit = (station) => {
    setSelectedStation({ ...station });
    setShowEditModal(true);
  };

  const handleDelete = (station) => {
    setSelectedStation(station);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    await deleteTower(selectedStation)
      .then((res) => {
        showSuccess("Thành công");
        setStations((prev) => prev.filter((s) => s.id !== selectedStation.id));
      })
      .catch((err) => {
        console.error(err);
        showError("Có lỗi xảy ra");
      });
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
              <th className="px-4 py-2 text-left">Trạng thái</th>
              <th className="px-4 py-2 text-left">Tín hiệu</th>
              <th className="px-4 py-2 text-left">Loại</th>
              <th className="px-4 py-2 text-left">Quận</th>
              <th className="px-4 py-2 text-left">Tầm phủ (m)</th>
              <th className="px-4 py-2 text-left">Tọa độ</th>
              <th className="px-4 py-2 text-left">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station) => (
              <tr key={station.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{station.name}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-white text-sm ${getClassColor(station.status)}`}>
                    {station.status}
                  </span>
                </td>
                <td className="px-4 py-2">{station.averageSignal}</td>
                <td className="px-4 py-2">{station.radio}</td>
                <td className="px-4 py-2">{station.nameDistrict}</td>
                <td className="px-4 py-2">{station.range}</td>
                <td className="px-4 py-2">
                  [{station.lat}, {station.lon}]
                </td>
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
      {showEditModal && (
        <EditStationModal
          onClose={() => setShowEditModal(false)}
          station={selectedStation}
          onUpdate={(updated) => {
            setSelectedStation(updated);
            setStations((prev) => prev.map((station) => (station.id === updated.id ? updated : station)));
          }}
        />
      )}

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
