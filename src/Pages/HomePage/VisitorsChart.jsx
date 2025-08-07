import { useState } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import useDashboardData from "../../hooks/useDashboardData";

const formatVisits = (value) => {
  if (value >= 100) {
    return (value / 100).toFixed(0);
  }
  return value.toLocaleString();
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
        <p className="text-gray-600 text-sm">{data?.date}</p>
        <p className="text-gray-900 font-semibold">
          Total Service: {payload[0].value.toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const CustomDot = ({ cx, cy, active }) => {
  if (active) {
    return (
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="#f97316"
        stroke="#fff"
        strokeWidth={2}
      />
    );
  }
  return null;
};

export default function VisitsChart() {
  const [hoveredPoint, setHoveredPoint] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("August 2025");
  const { homeData, loading } = useDashboardData();

  if (loading) {
    return (
      <div className="w-full h-96 bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const monthly = homeData?.data?.monthlyData;

  console.log(monthly);

  const availableMonths = Object.keys(monthly);
  const currentData = monthly[selectedMonth];
  const previousMonthIndex = availableMonths.indexOf(selectedMonth) - 1;
  const previousMonth =
    previousMonthIndex >= 0 ? availableMonths[previousMonthIndex] : null;

  return (
    <div className="w-full h-96 bg-white">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium text-gray-900">Total Service</h2>
          <div className="flex items-center space-x-4">
            {previousMonth && (
              <span className="text-sm text-gray-500">
                Previous Month: {previousMonth}
              </span>
            )}
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className=" px-3 py-1 rounded text-sm font-medium border border-gray-200 outline-none"
            >
              {availableMonths.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
        {hoveredPoint && (
          <div className="text-2xl font-bold text-gray-900">
            {hoveredPoint?.totalService?.toLocaleString()}
          </div>
        )}
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={currentData}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          onMouseMove={(e) => {
            if (e && e.activePayload && e.activePayload[0]) {
              setHoveredPoint(e.activePayload[0].payload);
            }
          }}
          onMouseLeave={() => setHoveredPoint(null)}
        >
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f97316" stopOpacity={0.8} />
              <stop offset="50%" stopColor="#fb923c" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#fed7aa" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="25%" stopColor="#f97316" />
              <stop offset="50%" stopColor="#fb923c" />
              <stop offset="75%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ea580c" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9ca3af" }}
            tickFormatter={formatVisits}
            domain={["dataMin 0", ""]}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "#f97316",
              strokeWidth: 0.5,
              strokeDasharray: "3 3",
            }}
          />
          <Area
            type="monotone"
            dataKey="totalService"
            stroke="url(#lineGradient)"
            strokeWidth={2}
            fill="url(#colorGradient)"
            dot={false}
            activeDot={<CustomDot />}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
