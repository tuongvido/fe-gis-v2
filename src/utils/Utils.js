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
      return "bg-green-100 text-green-800";
    case "OFFLINE":
      return "bg-red-100 text-red-800";
    case "MAINTENANCE":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
