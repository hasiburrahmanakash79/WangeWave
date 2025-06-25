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

import {
  RiBookOpenLine,
} from "react-icons/ri";

const subjects = [
  {
    name: "Reading",
    icon: <RiBookOpenLine />,
    color: "blue",
    gradient: "from-blue-400 to-blue-200",
    chartColor: "#3B82F6",
    gradientColor: "#93C5FD",
    data: [
      { date: "Feb 02", value: 2 },
      { date: "Feb 09", value: 1 },
      { date: "Feb 16", value: 2 },
      { date: "Feb 23", value: 4 },
      { date: "Feb 30", value: 2.5 },
      { date: "Mar 06", value: 3.5 },
      { date: "Mar 13", value: 2 },
    ],
  },
];

export default function VisitorsChart() {
  const [selected, setSelected] = useState(subjects[0]);

  return (
    <div className="p-6 rounded-2xl border border-base-300">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Subject growth</h2>
        <p className="text-gray-500">
          “Here’s your personalized dashboard to manage users, track progress,
          and oversee platform performance.”
        </p>
      </div>
      {/* Subject Cards */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 mb-6">
        {subjects.map((subject, idx) => (
          <div
            key={idx}
            onClick={() => setSelected(subject)}
            className={`cursor-pointer p-4 rounded-xl border md:flex items-center justify-between transition
            ${
              selected.name === subject.name
                ? `border-${subject.color}-500 bg-${subject.color}-50`
                : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <div
                className={`p-2 text-${subject.color}-600 bg-${subject.color}-100 rounded-full text-lg`}
              >
                {subject.icon}
              </div>
              <div>
                <h3 className="font-semibold text-sm">{subject.name}</h3>
                <p className="text-xs text-gray-500 hidden md:block">
                  You have to take 2 more tests to achieve your goal
                </p>
              </div>
            </div>
            <div
              className={` bg-gradient-to-br ${subject.gradient} text-white font-semibold p-4 rounded-xl flex items-center gap-1`}
            >
              20%
              <svg
                width="30"
                height="15"
                viewBox="0 0 40 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 20L10 10L20 15L30 5L40 10"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Subject Detail + Chart */}
      <div className="">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`text-${selected.color}-600 bg-${selected.color}-100 p-2 rounded-full`}
            >
              {selected.icon}
            </div>
            <div>
              <h3 className="font-medium">{selected.name}</h3>
              <p className="text-sm text-gray-500">
                You have to take 2 more tests to achieve your goal
              </p>
            </div>
          </div>
          <div className="text-sm text-gray-400">Monthly ▼</div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={selected.data}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="10%"
                  stopColor={selected.chartColor}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={selected.chartColor}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 5]} ticks={[0, 1, 2, 3, 4]} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke={selected.chartColor}
              fill="url(#colorUv)"
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
