import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css';
import ExtraMarkers from 'leaflet-extra-markers'; // ✅ import đúng


// Màu sắc trạng thái
const statusColors = {
    ONLINE: 'green',
    OFFLINE: 'red',
    MAINTENANCE: 'orange',
};

// Tạo icon theo trạng thái
function getCustomIcon(status, type) {
    let color = 'blue';
    let letter = 'U';

    switch (status) {
        case 'ONLINE':
            color = 'green';
            letter = 'O';
            break;
        case 'OFFLINE':
            color = 'red';
            letter = 'F';
            break;
        case 'MAINTENANCE':
            color = 'orange';
            letter = 'M';
            break;
        default:
            color = 'blue';
            letter = 'U';
    }

    return L.ExtraMarkers.icon({
        icon: 'fa-number',
        number: letter,
        markerColor: color,
        shape: 'circle',
        prefix: 'fa',
    });
}

const circles = [
    { radius: 0.2, color: 'rgba(0, 123, 255, 0.5)' },
    { radius: 0.5, color: 'rgba(24, 190, 223, 0.3)' },
    { radius: 0.8, color: 'rgba(0, 255, 123, 0.15)' },
    { radius: 1, color: 'rgba(60, 255, 0, 0.07)' },
];


// Gom nhóm theo tỉnh
function groupByProvince(stations) {
    const counts = {};
    stations.forEach((station) => {
        const location = station.location || '';
        const province = location.split(',').pop().trim();
        if (province) {
            counts[province] = (counts[province] || 0) + 1;
        }
    });
    return counts;
}

const BaseStationMap = () => {
    const [baseStations, setBaseStations] = useState([]);
    const [filterType, setFilterType] = useState('ALL');

    useEffect(() => {
        fetch('http://localhost:8080/api/towers')
            .then((res) => res.json())
            .then((data) => {
                const stations = data.map((item) => ({
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

                setBaseStations(stations);
            })
            .catch((error) => console.error('Lỗi khi tải dữ liệu:', error));
    }, []);

    const filteredStations = baseStations.filter(
        (station) => filterType === 'ALL' || station.type === filterType
    );

    const provinceCounts = groupByProvince(baseStations);

    return (
        <div style={{ display: 'flex' }}>
            {/* Bản đồ */}
            <div style={{ width: '75%' }}>
                <MapContainer center={[16.0471, 108.2062]} zoom={6}>
                    <TileLayer
                        attribution='&copy; OpenStreetMap contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    {filteredStations.map((station) => (
                        <Marker
                            key={station.id}
                            position={station.coordinates}
                            icon={getCustomIcon(station.status, station.radio)}
                        >
                            {  circles.map((c, idx) => (
                                <Circle
                                    key={idx}
                                    center={station.coordinates}
                                    radius={station.range * c.radius}
                                    pathOptions={{
                                        color: 'red',
                                        fillColor: c.color,
                                        fillOpacity: 1,
                                        stroke: false,
                                    }}
                                />
                            ))}
                            <Popup>
                                <div style={{ lineHeight: '1.6' }}>
                                    <strong>ID:</strong> {station.id} <br />
                                    <strong>Radio:</strong> {station.radio} <br />
                                    <strong>MCC-MNC:</strong> {station.mcc}-{station.mnc} <br />
                                    <strong>Net:</strong> {station.net} <br />
                                    <strong>Area:</strong> {station.area} <br />
                                    <strong>Cell:</strong> {station.cell} <br />
                                    <strong>Range:</strong> {station.range}m <br />
                                    <strong>Samples:</strong> {station.samples} <br />
                                    <strong>Lat:</strong> {station.lat} <br />
                                    <strong>Lon:</strong> {station.lon} <br />
                                    <strong>Avg Signal:</strong> {station.averageSignal} dBm
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* Sidebar */}
            <div style={{ width: '25%', padding: '1rem' }}>
                <h4>Lọc theo loại trạm</h4>
                <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                    <option value="ALL">Tất cả</option>
                    <option value="GSM">GSM</option>
                    <option value="LTE">LTE</option>
                    <option value="WCDMA">WCDMA</option>
                    <option value="NR">5G (NR)</option>
                </select>

                <h4 style={{ marginTop: '1rem' }}>Số lượng theo tỉnh</h4>
                <ul>
                    {/*  
                    {Object.entries(provinceCounts).map(([province, count]) => (
                        <li key={province}>
                            {province}: {count} trạm
                        </li>
                    ))}*/}
                </ul>
            </div>
        </div>
    );
};

export default BaseStationMap;
