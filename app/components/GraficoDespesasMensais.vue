<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import type { Conta } from '~/composables/useContas'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps<{ contas: Conta[], mostrarValores?: boolean }>()

const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

const totaisPorMes = computed(() => {
  const despesas = Array(12).fill(0)
  const receitas = Array(12).fill(0)

  props.contas.forEach(c => {
    const mes = Number(c.vencimento.split('-')[1]) - 1
    if (c.tipo === 'pagar') {
      despesas[mes] += Number(c.valor)
    } else {
      receitas[mes] += Number(c.valor)
    }
  })

  return { despesas, receitas }
})

const chartData = computed(() => ({
  labels: meses,
  datasets: [
    {
      label: 'Receitas',
      data: totaisPorMes.value.receitas,
      backgroundColor: 'rgba(34, 197, 94, 0.7)',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 1,
      borderRadius: 4
    },
    {
      label: 'Despesas',
      data: totaisPorMes.value.despesas,
      backgroundColor: 'rgba(239, 68, 68, 0.7)',
      borderColor: 'rgba(239, 68, 68, 1)',
      borderWidth: 1,
      borderRadius: 4
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: true, position: 'top' as const },
    tooltip: {
      callbacks: {
        label: (context: any) => {
          return props.mostrarValores
            ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.raw)
            : 'R$ ••••'
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: any) => {
          return props.mostrarValores
            ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
            : '•••'
        }
      }
    }
  }
}
</script>

<template>
  <div class="h-64">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
