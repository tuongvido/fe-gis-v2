import React, { useState, useEffect, useRef } from 'react';
import { Search, Users, MapPin, Calendar, Settings, Phone, Activity, Trash2, Edit, Plus, Bell, User, X, Menu } from 'lucide-react';

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

        {/* Navigation Tabs */}
        <div className="flex border-b">
          {['Member', 'Task', 'Data'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-4 text-sm font-medium ${activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {tab}
            </button>
          ))}
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Lịch công việc
            </h3>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-4 gap-4">
            {scheduleData.map((item) => (
              <div key={item.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-medium text-blue-600">{item.time}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.type === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                    item.type === 'inspection' ? 'bg-blue-100 text-blue-800' :
                      item.type === 'upgrade' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                    }`}>
                    {item.type}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{item.task}</h4>
                <p className="text-sm text-gray-600">{item.station}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-80 bg-white shadow-lg border-l">
        {/* Station Details */}
        {selectedStation && (
          <div className="p-4 border-b">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                {selectedStation.technician.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-lg">{selectedStation.technician}</h3>
                <p className="text-sm text-gray-600">{selectedStation.type} - OPERATOR</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{selectedStation.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{selectedStation.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{selectedStation.name}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Liên hệ
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                Giao việc
              </button>
            </div>
          </div>
        )}

        {/* Performance */}
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-2">Hiệu suất tổng thể</h3>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 font-bold">92</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">92%</div>
              <div className="text-sm text-gray-600">Tốt</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Tháng này</span>
              <span className="text-blue-600">92%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tháng trước</span>
              <span className="text-gray-600">88%</span>
            </div>
          </div>
        </div>

        {/* Performance Chart */}
        <div className="p-4 border-b">
          <h3 className="font-semibold mb-4">Xu hướng hiệu suất</h3>
          <div className="h-32 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg flex items-end justify-between p-4">
            {performanceData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="w-6 bg-blue-500 rounded-t"
                  style={{ height: `${item.value}%` }}
                ></div>
                <span className="text-xs mt-1 text-gray-600">{item.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Calendar */}
        <div className="p-4">
          <h3 className="font-semibold mb-4">Lịch làm việc - Tháng {month + 1}</h3>
          <div className="grid grid-cols-7 gap-1 text-center">
            {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day) => (
              <div key={day} className="text-xs font-medium text-gray-600 p-2">
                {day}
              </div>
            ))}
            {generateCalendar().map((day, index) => (
              <div
                key={index}
                className={`text-xs p-2 rounded ${day === today
                  ? 'bg-blue-600 text-white'
                  : day
                    ? 'hover:bg-gray-100 cursor-pointer'
                    : ''
                  }`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobiFoneManagement;