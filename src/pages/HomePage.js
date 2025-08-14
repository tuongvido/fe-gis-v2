import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SearchTownForm from "../components/SearchTownForm.js";
import StationInfoPanel from "../components/StationInfoPanel.js";
import Spinner from "../components/Spinner.js";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import greenMarkerIcon from "@vectorial1024/leaflet-color-markers/img/marker-icon-2x-green.png";
import { getStatusColor } from "../utils/Utils.js";
import { searchTowers } from "../api/towerService";

const HomePage = () => {
  const initialSearchDto = {
    status: -1,
    districtId: -1,
    radioType: null,
    pageDto: {
      pageNumber: 0,
      pageSize: 100,
    },
  };

  const [stations, setStations] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [loading, setLoading] = useState(true);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchDto, setSearchDto] = useState(initialSearchDto);

  // Tạo icon màu xanh lá
  const greenIcon = new L.Icon({
    iconUrl: greenMarkerIcon,
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });

  const handleSearch = (dtoFromChild) => {
    setSearchDto(dtoFromChild);
  };

  // useEffect 1: Khởi tạo map
  useEffect(() => {
    if (mapInstanceRef.current) return; // Chỉ khởi tạo 1 lần

    const map = L.map(mapRef.current).setView([10.78, 106.73], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    mapInstanceRef.current = map;
    setSidebarOpen(true);
  }, []);

  // Initialize map
  useEffect(() => {
    mapInstanceRef.current.eachLayer((layer) => {
      if (!(layer instanceof L.TileLayer)) {
        mapInstanceRef.current.removeLayer(layer);
      }
    });
    // Hàm tạo icon màu
    const createMarkerIcon = (status) => {
      const color = getStatusColor(status);
      const size = mapInstanceRef.current.getZoom() / 1.5;
      return L.divIcon({
        html: `<div style="
                background-color: ${color};
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                border: 1px solid white;
              "></div>`,
        className: "custom-marker",
        iconSize: [size, size],
        iconAnchor: [(size + 6) / 2, (size + 6) / 2],
      });
    };

    const circleStyles = [
      { radius: 0.2, color: "rgba(145, 190, 238, 0.5)" },
      { radius: 0.5, color: "rgba(145, 190, 238, 0.5)" },
      { radius: 0.8, color: "rgba(145, 190, 238, 0.5)" },
      { radius: 1, color: "rgba(145, 190, 238, 0.5)" },
    ];

    stations.forEach((station) => {
      // Add markers for all base stations
      // const marker = L.marker(station.coordinates, {
      //   icon: createMarkerIcon(station.status),
      // }).addTo(mapInstanceRef.current);

      const greenMarker = window.L.marker(station.coordinates, {
        icon: greenIcon,
      }).addTo(mapInstanceRef.current);

      // circleStyles.map((c) =>
      //   L.circle(station.coordinates, {
      //     radius: station.range * c.radius,
      //     color: "transparent",
      //     fillColor: c.color,
      //     fillOpacity: 1,
      //     stroke: false,
      //     interactive: false,
      //   }).addTo(mapInstanceRef.current)
      // );

      // marker.on("click", () => {
      //   setSelectedStation(station);
      // });
      greenMarker.on("click", () => {
        setSelectedStation(station);
      });
    });
  }, [stations]);

  // Lấy dữ liệu từ API
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

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-80" : "w-0"
        } bg-white shadow-lg flex flex-col transition-all duration-300 overflow-hidden`}
      >
        {sidebarOpen && <SearchTownForm onSearch={handleSearch} />}
      </div>
      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="relative bg-white shadow p-1 hover:bg-gray-100 transition"
      >
        {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>{" "}
      {/* Main Content */}
      <div className="flex-1 flex flex-col transition-all duration-300">
        {/* Map Area */}
        <div className="flex-1 relative">
          <div ref={mapRef} className="absolute inset-0 w-full h-full" style={{ minHeight: "400px" }} />

          {/* Map Controls */}
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 space-y-2 z-[1000]">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Online</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span>Offline</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span>Maintenance</span>
            </div>
          </div>

          {/* Station Info Panel */}
          <StationInfoPanel
            station={selectedStation}
            onClose={() => setSelectedStation(null)}
            onUpdate={(updated) => {
              // cập nhật panel đang xem
              setSelectedStation(updated);

              // Cập nhật list stations
              setStations((prev) => prev.map((station) => (station.id === updated.id ? updated : station)));
            }}
            onDelete={(deletedId) => {
              setSelectedStation(null);
              setStations((prev) => prev.filter((station) => station.id !== deletedId));
            }}
          />
        </div>
      </div>
      <div className="relative h-screen">
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default HomePage;
