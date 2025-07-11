import React from 'react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#34d399', '#60a5fa', '#facc15', '#f87171'];

const ReportDashboard = ({ dataByDistrict = [], dataByTech = [], dataByStatus = [] }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex gap-6 p-4 w-max">

        {/* 1. Theo Quận */}
        <div className="w-[500px] bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">📍 Theo Quận</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dataByDistrict}>
              <XAxis dataKey="district" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#34d399" name="Tổng số trạm" />
              <Bar dataKey="active" fill="#60a5fa" name="Hoạt động" />
              <Bar dataKey="maintenance" fill="#facc15" name="Bảo trì" />
              <Bar dataKey="error" fill="#f87171" name="Lỗi" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Theo Công nghệ */}
        <div className="w-[350px] bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">📶 Theo Công nghệ</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataByTech}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {dataByTech.map((entry, index) => (
                  <Cell key={`tech-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Theo Tình trạng */}
        <div className="w-[350px] bg-white p-4 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold mb-2">🚦 Theo Tình trạng</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={dataByStatus}
                dataKey="value"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {dataByStatus.map((entry, index) => (
                  <Cell key={`status-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default ReportDashboard;
