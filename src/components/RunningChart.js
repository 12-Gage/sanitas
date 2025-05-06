'use client'

import {
  Line
} from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
)

export default function RunningChart({ data }) {
  // Sort the data by start_time in ascending order (oldest to newest)
  const sortedData = [...data].sort((a, b) => new Date(a.start_time) - new Date(b.start_time))

  const chartData = {
    labels: sortedData.map(item => item.start_time.split('T')[0]),
    datasets: [
      {
        label: 'Miles Ran',
        data: sortedData.map(item => item.miles),
        fill: false,
        borderColor: '#4f46e5', // indigo
        backgroundColor: '#6366f1',
        tension: 0.3,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Miles',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  }

  return (
    <div className="w-full h-72">
      <Line data={chartData} options={options} />
    </div>
  )
}
