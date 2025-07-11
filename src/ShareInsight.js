import React, { useState, useEffect, useRef } from 'react';
import { Search, Users, MapPin, Calendar, Settings, Phone, Activity, Trash2, Edit, Plus, Bell, User, X, Menu, Sidebar } from 'lucide-react';
import ReportDashboard from './ReportDashboard';
import SidebarMenu from './SideBarMenu';

const MobiFoneManagement = () => {
  const [selectedStation, setSelectedStation] = useState(null);
  const [selectedDate, setSelectedDate] = useState('2025-01-17');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Member');
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef([]);
  const [statusFilter, setStatusFilter] = useState('Active');
  const [districtFilter, setDistrictFilter] = useState('');
  const [networkTypeFilter, setNetworkTypeFilter] = useState('');

  const districtList = [
    "Quận 1",
    "Quận 3",
    "Quận 4",
    "Quận 5",
    "Quận 6",
    "Quận 7",
    "Quận 8",
    "Quận 10",
    "Quận 11",
    "Quận 12",
    "Quận Bình Tân",
    "Quận Bình Thạnh",
    "Quận Gò Vấp",
    "Quận Phú Nhuận",
    "Quận Tân Bình",
    "Quận Tân Phú",
    "Thành phố Thủ Đức",
    "Huyện Bình Chánh",
    "Huyện Cần Giờ",
    "Huyện Củ Chi",
    "Huyện Hóc Môn",
    "Huyện Nhà Bè"
  ];
  const networkTypes = ['2G', '3G', '4G', '5G'];
  const yourScheduleArray = [
    {
      id: 1,
      time: '08:00',
      type: 'maintenance',
      task: 'Bảo trì định kỳ',
      station: 'BTS HN1',
    },
    {
      id: 2,
      time: '10:30',
      type: 'inspection',
      task: 'Kiểm tra tín hiệu',
      station: 'NodeB TPHCM',
    },
    {
      id: 3,
      time: '14:00',
      type: 'upgrade',
      task: 'Nâng cấp phần mềm',
      station: '5G Đà Nẵng',
    },
    {
      id: 4,
      time: '16:30',
      type: 'error',
      task: 'Thay thế thiết bị',
      station: 'BTS Cần Thơ',
    },
  ];
const dataByDistrict = [
  { district: 'Quận 1', total: 18, active: 17, maintenance: 1, error: 0 },
  { district: 'Bình Thạnh', total: 25, active: 23, maintenance: 2, error: 0 },
  { district: 'Thủ Đức', total: 35, active: 30, maintenance: 4, error: 1 },
];

const dataByTech = [
  { label: '2G', value: 12 },
  { label: '3G', value: 28 },
  { label: '4G', value: 50 },
  { label: '5G', value: 30 },
];

const dataByStatus = [
  { label: 'Hoạt động', value: 109 },
  { label: 'Bảo trì', value: 9 },
  { label: 'Lỗi', value: 2 },
];


  // Sample data for base stations
  const baseStations = [
    {
      id: 1,
      name: 'Trạm BTS Hà Nội 1',
      technician: 'Nguyễn Văn An',
      status: 'ONLINE',
      location: 'Quận Ba Đình, Hà Nội',
      signal: 95,
      type: 'BTS',
      phone: '0987654321',
      avatar: '/api/placeholder/40/40',
      coordinates: [21.0285, 105.8542] // Hà Nội
    },
    {
      id: 2,
      name: 'Trạm NodeB TPHCM',
      technician: 'Trần Thị Bình',
      status: 'ONLINE',
      location: 'Quận 1, TP.HCM',
      signal: 88,
      type: 'NodeB',
      phone: '0976543210',
      avatar: '/api/placeholder/40/40',
      coordinates: [10.8231, 106.6297] // TP.HCM
    },
    {
      id: 3,
      name: 'Trạm 5G Đà Nẵng',
      technician: 'Lê Văn Cường',
      status: 'OFFLINE',
      location: 'Quận Hải Châu, Đà Nẵng',
      signal: 0,
      type: '5G',
      phone: '0965432109',
      avatar: '/api/placeholder/40/40',
      coordinates: [16.0544, 108.2022] // Đà Nẵng
    },
    {
      id: 4,
      name: 'Trạm BTS Cần Thơ',
      technician: 'Phạm Thị Dung',
      status: 'ONLINE',
      location: 'Quận Ninh Kiều, Cần Thơ',
      signal: 92,
      type: 'BTS',
      phone: '0954321098',
      avatar: '/api/placeholder/40/40',
      coordinates: [10.0452, 105.7469] // Cần Thơ
    },
    {
      id: 5,
      name: 'Trạm Repeater Huế',
      technician: 'Võ Văn Em',
      status: 'MAINTENANCE',
      location: 'TP Huế, Thừa Thiên Huế',
      signal: 45,
      type: 'Repeater',
      phone: '0943210987',
      avatar: '/api/placeholder/40/40',
      coordinates: [16.4637, 107.5909] // Huế
    }
  ];


  const scheduleData = [
    { id: 1, task: 'Bảo trì định kỳ', time: '08:00', station: 'BTS HN1', type: 'maintenance' },
    { id: 2, task: 'Kiểm tra tín hiệu', time: '10:30', station: 'NodeB TPHCM', type: 'inspection' },
    { id: 3, task: 'Nâng cấp phần mềm', time: '14:00', station: '5G Đà Nẵng', type: 'upgrade' },
    { id: 4, task: 'Thay thế thiết bị', time: '16:30', station: 'BTS Cần Thơ', type: 'repair' }
  ];

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.onload = () => {
      if (window.L && !mapInstanceRef.current) {
        // Initialize map centered on Vietnam
        const map = window.L.map(mapRef.current).setView([16.0, 108.0], 6);

        // Add OpenStreetMap tiles
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Custom marker icons for different statuses
        const getMarkerIcon = (status, type) => {
          let color;
          switch (status) {
            case 'ONLINE': color = '#10b981'; break;
            case 'OFFLINE': color = '#ef4444'; break;
            case 'MAINTENANCE': color = '#f59e0b'; break;
            default: color = '#6b7280';
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
                ${type.charAt(0)}
              </div>
            `,
            className: 'custom-marker',
            iconSize: [26, 26],
            iconAnchor: [13, 13]
          });
        };

        // Add markers for all base stations
        baseStations.forEach(station => {
          const marker = window.L.marker(station.coordinates, {
            icon: getMarkerIcon(station.status, station.type)
          }).addTo(map);

          // Add popup with station info
          const popupContent = `
            <div class="p-3 min-w-[200px]">
              <h3 class="font-bold text-lg mb-2">${station.name}</h3>
              <div class="space-y-1 text-sm">
                <div><strong>Kỹ thuật viên:</strong> ${station.technician}</div>
                <div><strong>Trạng thái:</strong> 
                  <span class="px-2 py-1 rounded text-xs font-medium ${station.status === 'ONLINE' ? 'bg-green-100 text-green-800' :
              station.status === 'OFFLINE' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
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
          marker.on('click', () => {
            setSelectedStation(station);
          });

          markersRef.current.push({ marker, station });
        });

        mapInstanceRef.current = map;
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

  // Handle station selection from sidebar
  useEffect(() => {
    if (selectedStation && mapInstanceRef.current) {
      // Find the marker for selected station
      const stationMarker = markersRef.current.find(m => m.station.id === selectedStation.id);
      if (stationMarker) {
        // Pan to station location
        mapInstanceRef.current.setView(selectedStation.coordinates, 12);
        // Open popup
        stationMarker.marker.openPopup();
      }
    }
  }, [selectedStation]);
  const performanceData = [
    { month: 'T1', value: 85 },
    { month: 'T2', value: 88 },
    { month: 'T3', value: 92 },
    { month: 'T4', value: 87 },
    { month: 'T5', value: 90 },
    { month: 'T6', value: 94 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'ONLINE': return 'bg-green-100 text-green-800';
      case 'OFFLINE': return 'bg-red-100 text-red-800';
      case 'MAINTENANCE': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSignalColor = (signal) => {
    if (signal >= 90) return 'text-green-600';
    if (signal >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredStations = baseStations.filter(station =>
    station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.technician.toLowerCase().includes(searchTerm.toLowerCase()) ||
    station.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="w-80 bg-white shadow-lg flex flex-col">
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


        {/*  */}
        <div className="flex-1 overflow-y-auto">

          <div className="p-4 space-y-4">
            {/* Trạng thái */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trạng thái</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Hoạt động</option>
                <option>Không hoạt động</option>
                <option>Bảo trì</option>
              </select>
            </div>

            {/* Quận */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quận</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Tất cả</option>
                <option>Quận 1</option>
                <option>Quận 3</option>
                <option>Thành phố Thủ Đức</option>

              </select>
            </div>

            {/* Loại trạm */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Loại trạm</label>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Tất cả</option>
                <option>2G</option>
                <option>3G</option>
                <option>4G</option>
                <option>5G</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Map Area */}
        <div className="flex-1 relative">
          <div
            ref={mapRef}
            className="absolute inset-0 w-full h-full"
            style={{ minHeight: '400px' }}
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
                  <span className="font-medium">{selectedStation.technician}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trạng thái:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedStation.status)}`}>
                    {selectedStation.status}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tín hiệu:</span>
                  <span className={`font-medium ${getSignalColor(selectedStation.signal)}`}>
                    {selectedStation.signal}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Loại:</span>
                  <span className="font-medium">{selectedStation.type}</span>
                </div>
                <div className="flex justify-between">
                  <span>Vị trí:</span>
                  <span className="font-medium text-right">{selectedStation.location}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Schedule Section */}
        <div className="bg-white border-t p-4">


          {/* Thống kê trạm */}
          {/* <div className="flex flex-wrap gap-4 mb-4 text-sm">
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
              Hoạt động: {scheduleData.filter(item => item.type === 'active').length}
            </div>
            <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
              Bảo trì: {scheduleData.filter(item => item.type === 'maintenance').length}
            </div>
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">
              Kiểm tra: {scheduleData.filter(item => item.type === 'inspection').length}
            </div>
            <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full font-medium">
              Lỗi/Sự cố: {scheduleData.filter(item => item.type === 'error').length}
            </div>
            <div className="bg-green-200 text-green-900 px-3 py-1 rounded-full font-medium">
              Nâng cấp: {scheduleData.filter(item => item.type === 'upgrade').length}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {scheduleData.map((item) => (
              <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-blue-600">{item.time}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${item.type === 'maintenance'
                        ? 'bg-yellow-100 text-yellow-800'
                        : item.type === 'inspection'
                          ? 'bg-blue-100 text-blue-800'
                          : item.type === 'upgrade'
                            ? 'bg-green-100 text-green-800'
                            : item.type === 'error'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-green-100 text-green-800'
                      }`}
                  >
                    {item.type}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{item.task}</h4>
                <p className="text-sm text-gray-600">{item.station}</p>
              </div>
            ))}
          </div> */}
          <ReportDashboard
            dataByDistrict={dataByDistrict}
            dataByTech={dataByTech}
            dataByStatus={dataByStatus}
          />


        </div>

      </div>


    </div>
  );
};

export default MobiFoneManagement;