import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { baseStations } from "../constants/constants.js";
import SearchTownForm from "../components/SearchTownForm.js";
import StationInfoPanel from "../components/StationInfoPanel.js";
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

  const [selectedStation, setSelectedStation] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchDto, setSearchDto] = useState(initialSearchDto);

  const handleSearch = (dtoFromChild) => {
    setSearchDto(dtoFromChild);
  };

  // Initialize map
  useEffect(() => {
    // if (selectedStation && mapInstanceRef.current) {
    //   // Find the marker for selected station
    //   const stationMarker = markersRef.current.find((m) => m.station.id === selectedStation.id);
    //   if (stationMarker) {
    //     // Pan to station location
    //     mapInstanceRef.current.setView(selectedStation.coordinates, 12);
    //     // Open popup
    //     stationMarker.marker.openPopup();
    //   }
    // }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }
    searchTowers(searchDto)
      .then((data) => {
        const stations = data;
        console.log(stations);
        // Load Leaflet JS
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
        script.onload = () => {
          if (window.L && !mapInstanceRef.current) {
            // Initialize map centered on Ho Chi Minh
            const map = window.L.map(mapRef.current).setView([10.781102809656424, 106.73803249581731], 13);

            // Add OpenStreetMap tiles
            window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
              attribution: "© OpenStreetMap contributors",
            }).addTo(map);

            // Hàm tạo icon marker tuỳ theo trạng thái
            const createMarkerIcon = (status) => {
              const color = getStatusColor(status);
              const size = map.getZoom() / 1.5;
              return window.L.divIcon({
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

            const greenIcon = new L.Icon({
              iconUrl: greenMarkerIcon,
              shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41],
            });

            const generateGradientCircles = (
              center,
              baseColor = "#3f51b5",
              range = 400,
              steps = 6,
              maxOpacity = 0.1
            ) => {
              const circles = [];

              for (let i = 1; i <= steps; i++) {
                circles.push({
                  center,
                  radius: (range / steps) * i,
                  fillColor: baseColor,
                  fillOpacity: maxOpacity * (1 - (i - 1) / steps),
                });
              }

              return circles;
            };

            const circles = [
              { radius: 0.2, color: "rgba(145, 190, 238, 0.5)" },
              { radius: 0.5, color: "rgba(145, 190, 238, 0.5)" },
              { radius: 0.8, color: "rgba(145, 190, 238, 0.5)" },
              { radius: 1, color: "rgba(145, 190, 238, 0.5)" },
            ];

            stations.forEach((station) => {
              // Vẽ marker
              window.L.marker(station.coordinates, {
                icon: createMarkerIcon(station.status),
              }).addTo(map);

              // Vẽ các circle gradient
              circles.forEach((c) => {
                window.L.circle(station.coordinates, {
                  radius: station.range * c.radius,
                  color: "transparent",
                  fillColor: c.color,
                  fillOpacity: 1,
                  stroke: false,
                  interactive: false,
                }).addTo(map);
              });
            });

            // Add markers for all base stations
            stations.forEach((station) => {
              const marker = window.L.marker(station.coordinates, {
                icon: greenIcon,
              }).addTo(map);

              circles.forEach((c) => {
                window.L.circle(station.coordinates, {
                  radius: station.range * c.radius,
                  color: "transparent",
                  fillColor: c.color,
                  fillOpacity: 1,
                  stroke: false,
                  interactive: false,
                }).addTo(map);
              });

              // // Add popup with station info
              // const popupContent = `
              //   <div class="p-3 min-w-[200px]">
              //     <h3 class="font-bold text-lg mb-2">${station.name}</h3>
              //     <div class="space-y-1 text-sm">
              //       <div><strong>Kỹ thuật viên:</strong> ${station.technician}</div>
              //       <div><strong>Trạng thái:</strong>
              //         <span class="px-2 py-1 rounded text-xs font-medium ${
              //           station.status === "ONLINE"
              //             ? "bg-green-100 text-green-800"
              //             : station.status === "OFFLINE"
              //             ? "bg-red-100 text-red-800"
              //             : "bg-yellow-100 text-yellow-800"
              //         }">${station.status}</span>
              //       </div>
              //       <div><strong>Tín hiệu:</strong> ${station.signal}%</div>
              //       <div><strong>Loại:</strong> ${station.type}</div>
              //       <div><strong>Vị trí:</strong> ${station.location}</div>
              //     </div>
              //   </div>
              // `;

              // marker.bindPopup(popupContent);

              // Handle marker click
              marker.on("click", () => {
                setSelectedStation(station);
              });

              markersRef.current.push({ marker, station });
            });

            mapInstanceRef.current = map;
          }
          setSidebarOpen(true);
        };
        document.head.appendChild(script);

        return () => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
          }
          markersRef.current = [];
        };
      })
      .catch((err) => {
        console.error("Error fetching towers:", err);
      });
    if (!mapRef.current) return;
  }, [searchDto]);

  const getSignalColor = (signal) => {
    if (signal >= 90) return "text-green-600";
    if (signal >= 70) return "text-yellow-600";
    return "text-red-600";
  };

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
              setSelectedStation(updated); // cập nhật panel đang xem
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
