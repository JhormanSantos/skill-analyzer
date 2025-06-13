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

// We need to register the components we are going to use
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
  const options = {
    indexAxis: 'y' as const, // This makes the bar chart horizontal
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false, // We don't need a legend for a single dataset
      },
      title: {
        display: true,
        text: 'Skill Coverage Percentage',
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
        max: 100, // Percentage goes from 0 to 100
        ticks: {
          callback: function(value: any) {
            return value + '%'
          }
        }
      }
    }
  };

  const data = {
    // The labels for the Y-axis (the skill names)
    labels: skillData.map(item => item.skill),
    datasets: [
      {
        label: 'Coverage',
        // The data for the X-axis (the percentages)
        data: skillData.map(item => item.percentage),
        borderColor: 'rgb(79, 70, 229)',
        backgroundColor: 'rgba(79, 70, 229, 0.5)',
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

export default SkillChart;