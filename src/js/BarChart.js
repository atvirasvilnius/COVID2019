import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Bar,
  mixins: [reactiveProp],
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
		responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              beginAtZero: true
            },
			gridLines: {
                display:false
            }
          }],
		   yAxes: [{
            gridLines: {
                display:false,
				
            }   
        }],
        }
    }
  },
  mounted () {

    this.renderChart(this.chartData, this.options)
  }
}