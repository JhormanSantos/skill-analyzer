import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import type { AnalysisData } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface SkillChartProps {
  skillData: AnalysisData['skillGap'];
}

const SkillChart = ({ skillData }: SkillChartProps) => {
  const torreGreen = '#9ACD32';
  const torreGreenDark = '#8CBF26';
  
  const gridColor = 'rgba(255, 255, 255, 0.1)';
  const textColor = '#E2E8F0'; 

  const options = {
    indexAxis: 'y' as const,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
        labels: {
            color: textColor 
        }
      },
      title: {
        display: true,
        text: 'Skill Coverage Percentage',
        color: textColor, 
        font: {
          size: 16,
        }
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      x: {
        min: 0,
        max: 100,
        grid: {
            color: gridColor 
        },
        ticks: {
          color: textColor, 
          callback: function(value: any) {
            return value + '%'
          }
        }
      },
      y: {
        grid: {
            color: gridColor 
        },
        ticks: {
            color: textColor 
        }
      }
    }
  };

  const data = {
    labels: skillData.map(item => item.skill),
    datasets: [
      {
        label: 'Coverage',
        data: skillData.map(item => item.percentage),
        borderColor: torreGreenDark,
        backgroundColor: torreGreen,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default SkillChart;