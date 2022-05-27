import { Chart, ChartItem, ChartConfiguration, ChartData, registerables } from 'chart.js'
import { useEffect } from 'react'

export default function GenderChart({ gender_rate }: { gender_rate: { male: number, female: number } }) {
  const { male, female } = gender_rate
  Chart.register(...registerables)

  const labels = [
    male > 0 ? `${male}%` : '',
    female > 0 ? `${female}%` : ''
  ]

  const data: ChartData = {
    labels: labels,
    datasets: [{
      data: [male, female]
    }]
  }

  const config: ChartConfiguration = {
    type: 'bar',
    data: data,
    options: {}
  }

  useEffect(() => {
    const canvas = document.getElementById('gender-canvas') as HTMLCanvasElement
    const ctx = canvas?.getContext('2d') as ChartItem

    if (Chart.getChart('gender-canvas'))
      Chart.getChart('gender-canvas')?.destroy()

    const gender_chart = new Chart(ctx, config)
  })

  return (
    <div>
      <canvas id='gender-canvas' />
    </div>
  )
}