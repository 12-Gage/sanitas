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
  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        label: 'Miles Ran',
        data: data.map(item => item.miles),
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
