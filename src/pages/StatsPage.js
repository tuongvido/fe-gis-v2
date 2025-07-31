import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { getStatusColor } from "../utils/Utils";
import { mockBaseStations } from "../constants/constants"

const StatsPage = () => {
  const baseStations = mockBaseStations;

  // Gom nhóm trạm theo phường
  const wardCountMap = {};
  baseStations.forEach((station) => {
    wardCountMap[station.ward] = (wardCountMap[station.ward] || 0) + 1;
  });
  const wardStats = Object.entries(wardCountMap).map(([ward, count]) => ({
    name: ward,
    value: count,
  }));

  // Gom nhóm theo trạng thái
  const statusSummary = ["ONLINE", "OFFLINE", "MAINTENANCE"].map((status) => ({
    name: status,
    value: baseStations.filter((s) => s.status === status).length,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Thống kê</h1>

      {/* Hai biểu đồ nhỏ ở trên */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Biểu đồ tròn */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Tỷ lệ trạng thái trạm</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusSummary}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusSummary.map((entry, index) => (
                  <Cell key={index} fill={getStatusColor(entry.name)} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ thanh ngang */}
        <div className="bg-white p-4 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4">Số lượng theo trạng thái</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={statusSummary}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
            >
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Bar dataKey="value">
                {statusSummary.map((entry, index) => (
                  <Cell key={index} fill={getStatusColor(entry.name)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Biểu đồ lớn phía dưới */}
      <div className="bg-white p-4 rounded-2xl shadow">
        <h2 className="text-xl font-semibold mb-4">Số lượng trạm theo phường</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={wardStats} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
            <XAxis dataKey="name" angle={-45} textAnchor="end" interval={0} height={100} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatsPage;
