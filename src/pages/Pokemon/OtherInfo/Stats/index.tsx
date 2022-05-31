import { Chart, ChartConfiguration, ChartData, ChartItem } from "chart.js";
import { PokemonStat } from "pokenode-ts";
import { useEffect } from "react";

export default function Stats({stats} : {stats : PokemonStat[]})
{
  const label = ["HP", "ATK", "SP.ATK", "DEF", "SP.DEF", "SPE"]

  const chartData : ChartData = {
    labels: label,
    datasets: [{
      data: stats.map(s => s.base_stat),
      backgroundColor: '#F2F2F2'
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
          angleLines:{
            display: false
          }
        }
      },
      plugins: {
        legend:{
          display: false
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
    <div>
      <canvas id='stats-canvas'/>
    </div>
  )
}