/**
 * Trả về mã màu dựa trên trạng thái của trạm
 * @param {string} status - Trạng thái (ONLINE, OFFLINE, MAINTENANCE, ...)
 * @returns {string} - Mã màu HEX
 */
export const getStatusColor = (status) => {
  switch (status) {
    case "ONLINE":
      return "#10b981"; // Xanh lục
    case "OFFLINE":
      return "#ef4444"; // Đỏ
    case "MAINTENANCE":
      return "#f59e0b"; // Cam
    default:
      return "#6b7280"; // Xám
  }
};

export const getClassColor = (status) => {
  switch (status) {
    case "ONLINE":
      return "bg-green-500 text-white";
    case "OFFLINE":
      return "bg-red-500 text-white";
    case "MAINTENANCE":
      return "bg-yellow-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};

// Mapping 1 object
export function mapTower(item) {
  return {
    ...item,
    name: item.name || `Cell ${item.cell}`,
    status: item.status || "ONLINE",
    radio: item.radio || "Unknown",
    coordinates: [item.lat, item.lon],
    location: `Lat: ${item.lat}, Lon: ${item.lon}`,
    phone: item.phone || "",
    nameDistrict: item.nameDistrict,
  };
}

// Mapping array
export function mapTowerDatas(array) {
  return array.map(mapTower);
}
