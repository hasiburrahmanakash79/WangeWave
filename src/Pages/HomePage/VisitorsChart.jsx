import { useState } from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const monthlyData = {
  'January 2025': [
    { day: 1, visits: 120000000, date: 'January 1, 2025' },
    { day: 2, visits: 125000000, date: 'January 2, 2025' },
    { day: 3, visits: 130000000, date: 'January 3, 2025' },
    { day: 4, visits: 135000000, date: 'January 4, 2025' },
    { day: 5, visits: 140000000, date: 'January 5, 2025' },
    { day: 6, visits: 138000000, date: 'January 6, 2025' },
    { day: 7, visits: 142000000, date: 'January 7, 2025' },
    { day: 8, visits: 145000000, date: 'January 8, 2025' },
    { day: 9, visits: 150000000, date: 'January 9, 2025' },
    { day: 10, visits: 155000000, date: 'January 10, 2025' },
    { day: 11, visits: 160000000, date: 'January 11, 2025' },
    { day: 12, visits: 165000000, date: 'January 12, 2025' },
    { day: 13, visits: 170000000, date: 'January 13, 2025' },
    { day: 14, visits: 175000000, date: 'January 14, 2025' },
    { day: 15, visits: 180000000, date: 'January 15, 2025' },
    { day: 16, visits: 185000000, date: 'January 16, 2025' },
    { day: 17, visits: 190000000, date: 'January 17, 2025' },
    { day: 18, visits: 195000000, date: 'January 18, 2025' },
    { day: 19, visits: 200000000, date: 'January 19, 2025' },
    { day: 20, visits: 205000000, date: 'January 20, 2025' },
    { day: 21, visits: 210000000, date: 'January 21, 2025' },
    { day: 22, visits: 208000000, date: 'January 22, 2025' },
    { day: 23, visits: 205000000, date: 'January 23, 2025' },
    { day: 24, visits: 200000000, date: 'January 24, 2025' },
    { day: 25, visits: 195000000, date: 'January 25, 2025' },
    { day: 26, visits: 190000000, date: 'January 26, 2025' },
    { day: 27, visits: 185000000, date: 'January 27, 2025' },
    { day: 28, visits: 180000000, date: 'January 28, 2025' },
    { day: 29, visits: 175000000, date: 'January 29, 2025' },
    { day: 30, visits: 170000000, date: 'January 30, 2025' },
    { day: 31, visits: 165000000, date: 'January 31, 2025' },
  ],
  'February 2025': [
    { day: 1, visits: 135000000, date: 'February 1, 2025' },
    { day: 2, visits: 140000000, date: 'February 2, 2025' },
    { day: 3, visits: 145000000, date: 'February 3, 2025' },
    { day: 4, visits: 150000000, date: 'February 4, 2025' },
    { day: 5, visits: 155000000, date: 'February 5, 2025' },
    { day: 6, visits: 153000000, date: 'February 6, 2025' },
    { day: 7, visits: 157000000, date: 'February 7, 2025' },
    { day: 8, visits: 160000000, date: 'February 8, 2025' },
    { day: 9, visits: 165000000, date: 'February 9, 2025' },
    { day: 10, visits: 170000000, date: 'February 10, 2025' },
    { day: 11, visits: 175000000, date: 'February 11, 2025' },
    { day: 12, visits: 180000000, date: 'February 12, 2025' },
    { day: 13, visits: 185000000, date: 'February 13, 2025' },
    { day: 14, visits: 195000000, date: 'February 14, 2025' },
    { day: 15, visits: 200000000, date: 'February 15, 2025' },
    { day: 16, visits: 205000000, date: 'February 16, 2025' },
    { day: 17, visits: 210000000, date: 'February 17, 2025' },
    { day: 18, visits: 215000000, date: 'February 18, 2025' },
    { day: 19, visits: 220000000, date: 'February 19, 2025' },
    { day: 20, visits: 225000000, date: 'February 20, 2025' },
    { day: 21, visits: 230000000, date: 'February 21, 2025' },
    { day: 22, visits: 228000000, date: 'February 22, 2025' },
    { day: 23, visits: 225000000, date: 'February 23, 2025' },
    { day: 24, visits: 220000000, date: 'February 24, 2025' },
    { day: 25, visits: 215000000, date: 'February 25, 2025' },
    { day: 26, visits: 210000000, date: 'February 26, 2025' },
    { day: 27, visits: 205000000, date: 'February 27, 2025' },
    { day: 28, visits: 200000000, date: 'February 28, 2025' },
  ],
  'March 2025': [
    { day: 1, visits: 150000000, date: 'March 1, 2025' },
    { day: 2, visits: 155000000, date: 'March 2, 2025' },
    { day: 3, visits: 160000000, date: 'March 3, 2025' },
    { day: 4, visits: 165000000, date: 'March 4, 2025' },
    { day: 5, visits: 170000000, date: 'March 5, 2025' },
    { day: 6, visits: 168000000, date: 'March 6, 2025' },
    { day: 7, visits: 172000000, date: 'March 7, 2025' },
    { day: 8, visits: 175000000, date: 'March 8, 2025' },
    { day: 9, visits: 180000000, date: 'March 9, 2025' },
    { day: 10, visits: 185000000, date: 'March 10, 2025' },
    { day: 11, visits: 190000000, date: 'March 11, 2025' },
    { day: 12, visits: 195000000, date: 'March 12, 2025' },
    { day: 13, visits: 200000000, date: 'March 13, 2025' },
    { day: 14, visits: 210000000, date: 'March 14, 2025' },
    { day: 15, visits: 220342123, date: 'March 15, 2025' },
    { day: 16, visits: 225000000, date: 'March 16, 2025' },
    { day: 17, visits: 230000000, date: 'March 17, 2025' },
    { day: 18, visits: 235000000, date: 'March 18, 2025' },
    { day: 19, visits: 240000000, date: 'March 19, 2025' },
    { day: 20, visits: 245000000, date: 'March 20, 2025' },
    { day: 21, visits: 250000000, date: 'March 21, 2025' },
    { day: 22, visits: 248000000, date: 'March 22, 2025' },
    { day: 23, visits: 245000000, date: 'March 23, 2025' },
    { day: 24, visits: 240000000, date: 'March 24, 2025' },
    { day: 25, visits: 235000000, date: 'March 25, 2025' },
    { day: 26, visits: 220000000, date: 'March 26, 2025' },
    { day: 27, visits: 210000000, date: 'March 27, 2025' },
    { day: 28, visits: 200000000, date: 'March 28, 2025' },
    { day: 29, visits: 190000000, date: 'March 29, 2025' },
    { day: 30, visits: 185000000, date: 'March 30, 2025' },
    { day: 31, visits: 180000000, date: 'March 31, 2025' },
  ],
  'April 2025': [
    { day: 1, visits: 175000000, date: 'April 1, 2025' },
    { day: 2, visits: 180000000, date: 'April 2, 2025' },
    { day: 3, visits: 185000000, date: 'April 3, 2025' },
    { day: 4, visits: 190000000, date: 'April 4, 2025' },
    { day: 5, visits: 195000000, date: 'April 5, 2025' },
    { day: 6, visits: 193000000, date: 'April 6, 2025' },
    { day: 7, visits: 197000000, date: 'April 7, 2025' },
    { day: 8, visits: 200000000, date: 'April 8, 2025' },
    { day: 9, visits: 205000000, date: 'April 9, 2025' },
    { day: 10, visits: 210000000, date: 'April 10, 2025' },
    { day: 11, visits: 215000000, date: 'April 11, 2025' },
    { day: 12, visits: 220000000, date: 'April 12, 2025' },
    { day: 13, visits: 225000000, date: 'April 13, 2025' },
    { day: 14, visits: 230000000, date: 'April 14, 2025' },
    { day: 15, visits: 235000000, date: 'April 15, 2025' },
    { day: 16, visits: 240000000, date: 'April 16, 2025' },
    { day: 17, visits: 245000000, date: 'April 17, 2025' },
    { day: 18, visits: 250000000, date: 'April 18, 2025' },
    { day: 19, visits: 255000000, date: 'April 19, 2025' },
    { day: 20, visits: 260000000, date: 'April 20, 2025' },
    { day: 21, visits: 265000000, date: 'April 21, 2025' },
    { day: 22, visits: 263000000, date: 'April 22, 2025' },
    { day: 23, visits: 260000000, date: 'April 23, 2025' },
    { day: 24, visits: 255000000, date: 'April 24, 2025' },
    { day: 25, visits: 250000000, date: 'April 25, 2025' },
    { day: 26, visits: 245000000, date: 'April 26, 2025' },
    { day: 27, visits: 240000000, date: 'April 27, 2025' },
    { day: 28, visits: 235000000, date: 'April 28, 2025' },
    { day: 29, visits: 230000000, date: 'April 29, 2025' },
    { day: 30, visits: 225000000, date: 'April 30, 2025' },
  ],
  'May 2025': [
    { day: 1, visits: 200000000, date: 'May 1, 2025' },
    { day: 2, visits: 205000000, date: 'May 2, 2025' },
    { day: 3, visits: 210000000, date: 'May 3, 2025' },
    { day: 4, visits: 215000000, date: 'May 4, 2025' },
    { day: 5, visits: 220000000, date: 'May 5, 2025' },
    { day: 6, visits: 218000000, date: 'May 6, 2025' },
    { day: 7, visits: 222000000, date: 'May 7, 2025' },
    { day: 8, visits: 225000000, date: 'May 8, 2025' },
    { day: 9, visits: 230000000, date: 'May 9, 2025' },
    { day: 10, visits: 235000000, date: 'May 10, 2025' },
    { day: 11, visits: 240000000, date: 'May 11, 2025' },
    { day: 12, visits: 245000000, date: 'May 12, 2025' },
    { day: 13, visits: 250000000, date: 'May 13, 2025' },
    { day: 14, visits: 255000000, date: 'May 14, 2025' },
    { day: 15, visits: 260000000, date: 'May 15, 2025' },
    { day: 16, visits: 265000000, date: 'May 16, 2025' },
    { day: 17, visits: 270000000, date: 'May 17, 2025' },
    { day: 18, visits: 275000000, date: 'May 18, 2025' },
    { day: 19, visits: 280000000, date: 'May 19, 2025' },
    { day: 20, visits: 285000000, date: 'May 20, 2025' },
    { day: 21, visits: 290000000, date: 'May 21, 2025' },
    { day: 22, visits: 288000000, date: 'May 22, 2025' },
    { day: 23, visits: 285000000, date: 'May 23, 2025' },
    { day: 24, visits: 280000000, date: 'May 24, 2025' },
    { day: 25, visits: 275000000, date: 'May 25, 2025' },
    { day: 26, visits: 270000000, date: 'May 26, 2025' },
    { day: 27, visits: 265000000, date: 'May 27, 2025' },
    { day: 28, visits: 260000000, date: 'May 28, 2025' },
    { day: 29, visits: 255000000, date: 'May 29, 2025' },
    { day: 30, visits: 250000000, date: 'May 30, 2025' },
    { day: 31, visits: 245000000, date: 'May 31, 2025' },
  ],
  'June 2025': [
    { day: 1, visits: 220000000, date: 'June 1, 2025' },
    { day: 2, visits: 225000000, date: 'June 2, 2025' },
    { day: 3, visits: 230000000, date: 'June 3, 2025' },
    { day: 4, visits: 235000000, date: 'June 4, 2025' },
    { day: 5, visits: 240000000, date: 'June 5, 2025' },
    { day: 6, visits: 238000000, date: 'June 6, 2025' },
    { day: 7, visits: 242000000, date: 'June 7, 2025' },
    { day: 8, visits: 245000000, date: 'June 8, 2025' },
    { day: 9, visits: 250000000, date: 'June 9, 2025' },
    { day: 10, visits: 255000000, date: 'June 10, 2025' },
    { day: 11, visits: 260000000, date: 'June 11, 2025' },
    { day: 12, visits: 265000000, date: 'June 12, 2025' },
    { day: 13, visits: 270000000, date: 'June 13, 2025' },
    { day: 14, visits: 275000000, date: 'June 14, 2025' },
    { day: 15, visits: 280000000, date: 'June 15, 2025' },
    { day: 16, visits: 285000000, date: 'June 16, 2025' },
    { day: 17, visits: 290000000, date: 'June 17, 2025' },
    { day: 18, visits: 295000000, date: 'June 18, 2025' },
    { day: 19, visits: 300000000, date: 'June 19, 2025' },
    { day: 20, visits: 305000000, date: 'June 20, 2025' },
    { day: 21, visits: 310000000, date: 'June 21, 2025' },
    { day: 22, visits: 308000000, date: 'June 22, 2025' },
    { day: 23, visits: 305000000, date: 'June 23, 2025' },
    { day: 24, visits: 300000000, date: 'June 24, 2025' },
    { day: 25, visits: 295000000, date: 'June 25, 2025' },
    { day: 26, visits: 290000000, date: 'June 26, 2025' },
    { day: 27, visits: 285000000, date: 'June 27, 2025' },
    { day: 28, visits: 280000000, date: 'June 28, 2025' },
    { day: 29, visits: 275000000, date: 'June 29, 2025' },
    { day: 30, visits: 270000000, date: 'June 30, 2025' },
  ]
};

const formatVisits = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(0) + 'M';
  }
  return value.toLocaleString();
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-gray-300 rounded-lg shadow-lg">
        <p className="text-gray-600 text-sm">{data.date}</p>
        <p className="text-gray-900 font-semibold">
          Total visits: {payload[0].value.toLocaleString()}
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
  const [selectedMonth, setSelectedMonth] = useState('March 2025');
  
  const availableMonths = Object.keys(monthlyData);
  const currentData = monthlyData[selectedMonth];
  const previousMonthIndex = availableMonths.indexOf(selectedMonth) - 1;
  const previousMonth = previousMonthIndex >= 0 ? availableMonths[previousMonthIndex] : null;

  return (
    <div className="w-full h-96 bg-white">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium text-gray-900">Total visits</h2>
          <div className="flex items-center space-x-4">
            {previousMonth && (
              <span className="text-sm text-gray-500">Previous Month: {previousMonth}</span>
            )}
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className=" px-3 py-1 rounded text-sm font-medium border border-gray-200 outline-none"
            >
              {availableMonths.map(month => (
                <option key={month} value={month} >{month}</option>
              ))}
            </select>
          </div>
        </div>
        {hoveredPoint && (
          <div className="text-2xl font-bold text-gray-900">
            {hoveredPoint.visits.toLocaleString()}
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
              <stop offset="0%" stopColor="#f97316" stopOpacity={0.8}/>
              <stop offset="50%" stopColor="#fb923c" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="#fed7aa" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ea580c"/>
              <stop offset="25%" stopColor="#f97316"/>
              <stop offset="50%" stopColor="#fb923c"/>
              <stop offset="75%" stopColor="#f97316"/>
              <stop offset="100%" stopColor="#ea580c"/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            tickMargin={10}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#9ca3af' }}
            tickFormatter={formatVisits}
            domain={['dataMin - 10000000', 'dataMax + 10000000']}
          />
          <Tooltip 
            content={<CustomTooltip />}
            cursor={{
              stroke: '#f97316',
              strokeWidth: 0.5,
              strokeDasharray: '3 3'
            }}
          />
          <Area 
            type="monotone" 
            dataKey="visits" 
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