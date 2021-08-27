export default class Dashboard {
    constructor(el) {
        this.el = $(el); 
        this._el = el;
    }

    componentMounted () {
        
    }

    async fetchData(url, options = {}) {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    }

    async render() {
        const options = {
            method: "GET",
            headers: new Headers({'content-type': 'application/json'}),
            mode: 'cors'
        };
        
        const chartData = await this.fetchData(window.location.pathname, options);
        console.log("chart-data: ", chartData);

        var chart_options = {
            series: [{
            data: [...Object.values(chartData.stats_controller)]
          }],
            chart: {
            type: 'bar',
            height: "500px"
          },
          plotOptions: {
            bar: {
              borderRadius: 4,
              horizontal: true,
            }
          },
          dataLabels: {
            enabled: true
          },
          xaxis: {
            categories: [...Object.keys(chartData.stats_controller)],
          }
        };
  
        
        let ui = `
            <h3>Dashboard</h3>
        `;
        
        var chart = new ApexCharts(document.querySelector("#chart"), chart_options);
        chart.render();
        
        return this;
    }
}  