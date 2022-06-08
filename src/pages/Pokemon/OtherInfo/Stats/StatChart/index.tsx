import { Chart, ChartConfiguration, ChartData, ChartItem, registerables } from "chart.js";
import { PokemonStat } from "pokenode-ts";
import { useEffect } from "react";
import "./StatChart.scss"

export default function StatChart({stats} : {stats : PokemonStat[]})
{
  const label = ["HP", "ATK", "DEF", "SP.ATK", "SP.DEF", "SPE"]

  const auxTheme="#EDF2F4"

  Chart.register(...registerables )

  const chartData : ChartData = {
    labels: label,
    datasets: [{
      data: stats.map(s => s.base_stat),
      backgroundColor: auxTheme,
      pointRadius: 2,
      borderColor: auxTheme
    }]
  }

  const chartConfig : ChartConfiguration = {
    type: 'radar',
    data: chartData,
    options: {
      scales: {
        r:{
          max: 255,
          min: 0,
          ticks: {
            display: false
          },
          pointLabels:{
            color: auxTheme
          }
        }
      },
      plugins: {
        legend:{
          display: false,
          labels: {  
            color: auxTheme
          }
        }
      }
    }
  }

  useEffect(() => {
    const canvas = document.getElementById('stats-canvas') as HTMLCanvasElement
    const ctx = canvas.getContext('2d') as ChartItem

    if (Chart.getChart('stats-canvas'))
      Chart.getChart('stats-canvas')?.destroy()

    const stats_chart = new Chart(ctx, chartConfig)
  })

  return(
      <canvas id='stats-canvas'/>
  )
}