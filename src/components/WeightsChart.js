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

function intervalToSeconds(intervalStr) {
    if (!intervalStr) return 0;
  
    const [hms] = intervalStr.split('.'); // remove milliseconds
    const [hours, minutes, seconds] = hms.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
  }

export default function WeightsChart({ data }) {


  const chartData = {
    labels: data.map(item => item.start_time.split("T")[0]),
    datasets: [
      {
        label: 'Duration of Weights Training',
        data: data.map(item => intervalToSeconds(item.duration) / 60),
        fill: false,
        borderColor: '#4f46e5',
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
          text: 'Time in Minutes',
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
