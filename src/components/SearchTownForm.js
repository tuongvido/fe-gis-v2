import { useState } from "react";
import { Search } from "lucide-react";
import { DATA_BY_STATUS, DISTRICTS, STATION_TYPES } from "../constants/options";

function SearchTownForm({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [district, setDistrict] = useState("");
  const [stationType, setStationType] = useState("");

  const handleSearch = () => {
    const dto = {
      status: parseInt(status),
      districtId: parseInt(district),
      radioType: stationType,
      pageDto: {
        pageNumber: 0,
        pageSize: 100,
      },
    };
    console.log(dto)
    onSearch(dto);
  };

  return (
    <>
      {/* Header */}
      <div className="p-4 border-b bg-blue-600 text-white">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-bold text-sm">M</span>
          </div>
          <span className="font-bold">MobiFone Station Manager</span>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Tìm kiếm trạm phát sóng..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Body */}
      <div className="bg-[#f9fafb] flex-1 overflow-y-auto">
        <div className="p-4 space-y-4">
          {/* Trạng thái */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {DATA_BY_STATUS.map((item, idx) => (
                <option key={idx} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Quận */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quận</label>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {DISTRICTS.map((item, idx) => (
                <option key={idx} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Loại trạm */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Loại trạm</label>
            <select
              value={stationType}
              onChange={(e) => setStationType(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STATION_TYPES.map((item, idx) => (
                <option key={idx} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Nút tìm kiếm */}
          <div className="pt-2">
            <button
              onClick={handleSearch}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
            >
              Tìm kiếm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchTownForm;
