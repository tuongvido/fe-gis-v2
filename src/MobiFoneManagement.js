import { useState, useEffect, useRef } from "react";
import ReportDashboard from "./ReportDashboard.js";
import SidebarMenu from "./SideBarMenu.js";
import axios from "axios";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { baseStations } from "./constants/constants.js";
import SearchTownForm from "./components/SearchTownForm.js";

const MobiFoneManagement = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedDate, setSelectedDate] = useState("2025-01-17");
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [statusFilter, setStatusFilter] = useState("Active");
  const [districtFilter, setDistrictFilter] = useState("");
  const [networkTypeFilter, setNetworkTypeFilter] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const yourScheduleArray = [
    {
      id: 1,
      time: "08:00",
      type: "maintenance",
      task: "Bảo trì định kỳ",
      station: "BTS HN1",
    },
    {
      id: 2,
      time: "10:30",
      type: "inspection",
      task: "Kiểm tra tín hiệu",
      station: "NodeB TPHCM",
    },
    {
      id: 3,
      time: "14:00",
      type: "upgrade",
      task: "Nâng cấp phần mềm",
      station: "5G Đà Nẵng",
    },
    {
      id: 4,
      time: "16:30",
      type: "error",
      task: "Thay thế thiết bị",
      station: "BTS Cần Thơ",
    },
  ];

  const scheduleData = [
    {
      id: 1,
      task: "Bảo trì định kỳ",
      time: "08:00",
      station: "BTS HN1",
      type: "maintenance",
    },
    {
      id: 2,
      task: "Kiểm tra tín hiệu",
      time: "10:30",
      station: "NodeB TPHCM",
      type: "inspection",
    },
    {
      id: 3,
      task: "Nâng cấp phần mềm",
      time: "14:00",
      station: "5G Đà Nẵng",
      type: "upgrade",
    },
    {
      id: 4,
      task: "Thay thế thiết bị",
      time: "16:30",
      station: "BTS Cần Thơ",
      type: "repair",
    },
  ];

  // Handle station selection from sidebar
  // useEffect(() => {
  //   if (selectedStation && mapInstanceRef.current) {
  //     // Find the marker for selected station
  //     const stationMarker = markersRef.current.find(m => m.station.id === selectedStation.id);
  //     if (stationMarker) {
  //       // Pan to station location
  //       mapInstanceRef.current.setView(selectedStation.coordinates, 12);
  //       // Open popup
  //       stationMarker.marker.openPopup();
  //     }
  //   }
  //   axios.get('http://localhost:8080/api/towers')
  //     .then(response => {
  //       console.log(response.data)
  //       setBaseStations(response.data)
  //     })
  //     .catch(error => console.error(error));

  // }, []);

  // Initialize map
  /*  
  useEffect(() => {
    if (selectedStation && mapInstanceRef.current) {
      // Find the marker for selected station
      const stationMarker = markersRef.current.find(
        (m) => m.station.id === selectedStation.id
      );
      if (stationMarker) {
        // Pan to station location
        mapInstanceRef.current.setView(selectedStation.coordinates, 12);
        // Open popup
        stationMarker.marker.openPopup();
      }
    }
    // axios
    //   .get("http://localhost:8080/api/towers")
    //   .then((response) => {
    // const baseStations = response.data;

    // Load Leaflet JS
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.onload = () => {
      if (window.L && !mapInstanceRef.current) {
        // Initialize map centered on Vietnam
        const map = window.L.map(mapRef.current).setView([16.0, 108.0], 6);

        // Add OpenStreetMap tiles
        window.L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution: "© OpenStreetMap contributors",
          }
        ).addTo(map);

        // Custom marker icons for different statuses
        const getMarkerIcon = (status, type) => {
          let color;
          switch (status) {
            case "ONLINE":
              color = "#10b981";
              break;
            case "OFFLINE":
              color = "#ef4444";
              break;
            case "MAINTENANCE":
              color = "#f59e0b";
              break;
            default:
              color = "#6b7280";
          }

          return window.L.divIcon({
            html: `
              <div style="
                background-color: ${color};
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 3px solid white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                font-weight: bold;
                color: white;
              ">

              </div>
            `,
            className: "custom-marker",
            iconSize: [26, 26],
            iconAnchor: [13, 13],
          });
        };

        // Add markers for all base stations
        baseStations.forEach((station) => {
          const marker = window.L.marker(station.coordinates, {
            icon: getMarkerIcon(station.status, station.type),
          }).addTo(map);

          // Add popup with station info
          const popupContent = `
            <div class="p-3 min-w-[200px]">
              <h3 class="font-bold text-lg mb-2">${station.name}</h3>
              <div class="space-y-1 text-sm">
                <div><strong>Kỹ thuật viên:</strong> ${station.technician}</div>
                <div><strong>Trạng thái:</strong> 
                  <span class="px-2 py-1 rounded text-xs font-medium ${
                    station.status === "ONLINE"
                      ? "bg-green-100 text-green-800"
                      : station.status === "OFFLINE"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800"
                  }">${station.status}</span>
                </div>
                <div><strong>Tín hiệu:</strong> ${station.signal}%</div>
                <div><strong>Loại:</strong> ${station.type}</div>
                <div><strong>Vị trí:</strong> ${station.location}</div>
              </div>
            </div>
          `;

          marker.bindPopup(popupContent);

          // Handle marker click
          marker.on("click", () => {
            setSelectedStation(station);
          });

          markersRef.current.push({ marker, station });
        });

        mapInstanceRef.current = map;
      }
      setSidebarOpen(true)
    };
    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
    };
    // })
    // .catch((error) => console.error(error));
    if (!mapRef.current) return;
  }, []);*/



  const getMarkerIcon = () => {
    return window.L.divIcon({
      html: `
      <div style="
        width: 24px;
        height: 24px;
        background: #059669; /* xanh lá */
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        position: relative;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ">
        <div style="
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
          position: absolute;
          top: 7px;
          left: 7px;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
      className: '',
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      popupAnchor: [0, -24],
    });
  };


const rangeLevels = [
  { radius: 1.0, color: 'rgba(0, 255, 0, 0.4)' },
  { radius: 0.7, color: 'rgba(0, 255, 0, 0.3)' },
  { radius: 0.4, color: 'rgba(0, 255, 0, 0.2)' },
];

  useEffect(() => {
    if (!mapRef.current) return;

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";

    script.onload = async () => {
      if (!window.L || mapInstanceRef.current) return;

      const map = window.L.map(mapRef.current).setView([16.0, 108.0], 6);
      window.L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "© OpenStreetMap contributors",
        }
      ).addTo(map);
      mapInstanceRef.current = map;

      try {
        const response = await axios.get("http://localhost:8080/api/towers");

        const baseStations = response.data.map((item) => ({
          id: item.id,
          name: item.name || `Cell ${item.cell}`,
          mcc: item.mcc,
          mnc: item.mnc,
          area: item.area,
          cell: item.cell,
          net: item.net,
          range: item.range,
          samples: item.samples,
          status: item.status || 'ONLINE', // fallback nếu không có
          signal: item.averageSignal ?? 'N/A',
          type: item.radio || 'Unknown',
          coordinates: [item.lat, item.lon],
          location: `Lat: ${item.lat}, Lon: ${item.lon}`,
          technician: item.technician || 'Chưa rõ',
          phone: item.phone || '',
          avatar: '/api/placeholder/40/40',
        }));

        baseStations.forEach((station) => {
          const marker = window.L.marker(station.coordinates, {
            icon: getMarkerIcon(station.status, station.type),
          }).addTo(map);

          const popupContent = `
          <div style="min-width:220px">
            <h3 style="font-weight:bold; margin-bottom:6px;">Trạm phát sóng #${station.id}</h3>
            <div style="font-size:13px; line-height:1.6">
              <div><strong>Radio:</strong> ${station.radio || 'Không rõ'}</div>
              <div><strong>MCC-MNC:</strong> ${station.mcc}-${station.mnc}</div>
              <div><strong>Net:</strong> ${station.net}</div>
              <div><strong>Area:</strong> ${station.area}</div>
              <div><strong>Cell ID:</strong> ${station.cell}</div>
              <div><strong>Unit:</strong> ${station.unit}</div>
              <div><strong>Range phủ sóng:</strong> ${station.range} m</div>
              <div><strong>Toạ độ:</strong> ${station.coordinates}</div>
            </div>
          </div>`;

          marker.bindPopup(popupContent);

          marker.on("click", () => {
            setSelectedStation(station);
          });

          
          markersRef.current.push({ marker, station });

        });

        

        setSidebarOpen(true);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    document.head.appendChild(script);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      markersRef.current = [];
    };
  }, []);





  const performanceData = [
    { month: "T1", value: 85 },
    { month: "T2", value: 88 },
    { month: "T3", value: 92 },
    { month: "T4", value: 87 },
    { month: "T5", value: 90 },
    { month: "T6", value: 94 },
  ];

  const getStatusColor = (status) => {
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

  const getSignalColor = (signal) => {
    if (signal >= 90) return "text-green-600";
    if (signal >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  // const filteredStations = baseStations.filter(station =>
  //   station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   station.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   station.location.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

  const generateCalendar = () => {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-80" : "w-0"
          } bg-white shadow-lg flex flex-col transition-all duration-300 overflow-hidden`}
      >
        {sidebarOpen && <SearchTownForm />}
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
          <div
            ref={mapRef}
            className="absolute inset-0 w-full h-full"
            style={{ minHeight: "400px" }}
          />

          {/* Map Controls */}
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-2 space-y-2 z-[1000]">
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
          {selectedStation && (
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-[1000]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg">{selectedStation.name}</h3>
                <button
                  onClick={() => setSelectedStation(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Kỹ thuật viên:</span>
                  <span className="font-medium">
                    {selectedStation.technician}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Trạng thái:</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      selectedStation.status
                    )}`}
                  >
                    {selectedStation.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tín hiệu:</span>
                  <span
                    className={`font-medium ${getSignalColor(
                      selectedStation.signal
                    )}`}
                  >
                    {selectedStation.signal}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Loại:</span>
                  <span className="font-medium">{selectedStation.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vị trí:</span>
                  <span className="font-medium text-right">
                    {selectedStation.location}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobiFoneManagement;
