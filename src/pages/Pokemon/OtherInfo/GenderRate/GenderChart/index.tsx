import { Chart, ChartItem, ChartConfiguration, ChartData, registerables } from 'chart.js'
import { useEffect, useLayoutEffect } from 'react'
import './GenderChart.scss'

export default function GenderChart({ gender_rate }: { gender_rate: { male: number, female: number } }) {
  const { male, female } = gender_rate

  const theme_color = "#D67F75"

  Chart.register(...registerables)

  const data: ChartData = {
    labels: [''],
    datasets: [{
      label: 'Male',
      data: [male],
      minBarLength: 2,
      maxBarThickness : 16,
      backgroundColor: theme_color
    },
    {
      label: "Female",
      data: [female],
      borderWidth: 2,
      minBarLength: 2,
      maxBarThickness : 16,
      backgroundColor: '#EDF2F4',
      borderColor: theme_color
    }]
  }

  const config: ChartConfiguration = {
    type: 'bar',
    data: data,
    options: {
      indexAxis: 'y',
      scales: {
        y: {
          stacked: true,
          grid: {
            display: false
          },
          display: false
        },
        x: {
          stacked: true,
          grid: {
            display: false
          },
          display: false
        }
      },
      plugins:{
        legend:{
          display: false
        }
      }
    },
  }

  useLayoutEffect(() => {
    const canvas = document.getElementById('gender-canvas') as HTMLCanvasElement
    const ctx = canvas?.getContext('2d') as ChartItem

    if (Chart.getChart('gender-canvas'))
      Chart.getChart('gender-canvas')?.destroy()

    const gender_chart = new Chart(ctx, config)

    gender_chart.update('show')
  })

  return (
    <div style={{height: '24px'}}>
      <canvas id='gender-canvas' />
    </div>
  )
}