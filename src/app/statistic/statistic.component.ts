import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  public leadByIndustryChart: any;
  public districtChart: any;
  public readingTypeChart: any;
  constructor() { }

  ngOnInit() {
    this.initHousestypes();
    this.generateHouseLegend();

    this.initDistricts();
    this.generateDistrictLegend();

    this.initReadingTime();

  }
  private initHousestypes() {
    const leadByIndustry = document.getElementById('house-type');
    this.leadByIndustryChart = new Chart(leadByIndustry, {
      type: 'pie',
      data: {
        datasets: [{
          data: [5, 10],
          backgroundColor: ['red', 'yellow', 'blue', 'white'],
        }],
        labels: ['Flat', 'House']
      },
      options: {
        animation: {
          duration: 2000,
        },
        legendCallback: function (chart) {
          const text = [];
          text.push('<ul class="' + chart.id + '-legend">');
          let total = 0;
          for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
            total += +chart.data.datasets[0].data[i];
          }
          for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
            // tslint:disable-next-line:max-line-length
            text.push('<li style="color:' + chart.data.datasets[0].backgroundColor[i] + '"><span style="color:' + chart.data.datasets[0].backgroundColor[i] + '">');
            if (chart.data.datasets[0].data[i]) {
              text.push(Math.floor(chart.data.datasets[0].data[i] / total * 100) + '% ');
            }
            text.push('</span>');
            if (chart.data.labels[i]) {
              text.push('<span style="color: #005874;font-weight: bold;font-size: 16px;">' + chart.data.labels[i]);
            }
            text.push('</li>');
          }
          text.push('</ul>');
          return text.join('');
        },
        responsive: true,
        legend: {
          labels: {
            usePointStyle: true,
            fontFamily: 'Quicksand',
            fontSize: 14,
          },
          display: false,
          position: 'bottom',
        },
        tooltips: {
          mode: 'nearest',
          yAlign: 'bottom',
          callbacks: {
            title: function () {
              return '';
            },
            label: function (tooltipItem, data) {
              return data['datasets'][0]['data'][tooltipItem['index']];
            }
          },
          backgroundColor: '#005874',
          titleFontSize: 14,
          titleFontFamily: 'Quicksand',
          titleFontColor: '#FFFFFF',
          bodyFontColor: '#FFFFFF',
          bodyFontSize: 14,
          displayColors: false
        },
      }
    });
  }

  private generateHouseLegend() {
    const legend = document.getElementById('house-type-legend');
    legend.innerHTML = this.leadByIndustryChart.generateLegend();
  }


  private initDistricts() {
    const ctx = document.getElementById('district');
    this.districtChart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: [1, 2, 3],
          backgroundColor: ['green', 'yellow', 'white'],
        }],
        labels: ['Oktyabrskiy', 'Frunzenskiy', 'Centralniy']
      },
      options: {
        animation: {
          duration: 2000,
        },
        legendCallback: function (chart) {
          const text = [];
          text.push('<ul class="' + chart.id + '-legend">');
          let total = 0;
          for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
            total += +chart.data.datasets[0].data[i];
          }
          for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
            // tslint:disable-next-line:max-line-length
            text.push('<li style="color:' + chart.data.datasets[0].backgroundColor[i] + '"><span style="color:' + chart.data.datasets[0].backgroundColor[i] + '">');
            if (chart.data.datasets[0].data[i]) {
              text.push(Math.floor(chart.data.datasets[0].data[i] / total * 100) + '% ');
            }
            text.push('</span>');
            if (chart.data.labels[i]) {
              text.push('<span style="color: #005874;font-weight: bold;font-size: 16px;">' + chart.data.labels[i]);
            }
            text.push('</li>');
          }
          text.push('</ul>');
          return text.join('');
        },
        responsive: true,
        legend: {
          labels: {
            usePointStyle: true,
            fontFamily: 'Quicksand',
            fontSize: 14,
          },
          display: false,
          position: 'bottom',
        },
        tooltips: {
          mode: 'nearest',
          yAlign: 'bottom',
          callbacks: {
            title: function () {
              return '';
            },
            label: function (tooltipItem, data) {
              return data['datasets'][0]['data'][tooltipItem['index']];
            }
          },
          backgroundColor: '#005874',
          titleFontSize: 14,
          titleFontFamily: 'Quicksand',
          titleFontColor: '#FFFFFF',
          bodyFontColor: '#FFFFFF',
          bodyFontSize: 14,
          displayColors: false
        },
      }
    });
  }

  private generateDistrictLegend() {
    const legend = document.getElementById('district-legend');
    legend.innerHTML = this.districtChart.generateLegend();
  }


  private initReadingTime() {
    const ctx = <HTMLCanvasElement>document.getElementById('reading-time');
    this.readingTypeChart = new Chart(ctx, {
      type: 'pie',
      data: {
        datasets: [{
          data: [500],
          backgroundColor: ['green', 'yellow', 'white'],
        }],
        labels: []
      },
      options: {
        animation: {
          duration: 2000,
        },
        legendCallback: function (chart) {
          const text = [];
          text.push('<ul class="' + chart.id + '-legend">');
          let total = 0;
          for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
            total += +chart.data.datasets[0].data[i];
          }
          for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
            // tslint:disable-next-line:max-line-length
            text.push('<li style="color:' + chart.data.datasets[0].backgroundColor[i] + '"><span style="color:' + chart.data.datasets[0].backgroundColor[i] + '">');
            if (chart.data.datasets[0].data[i]) {
              text.push(Math.floor(chart.data.datasets[0].data[i] / total * 100) + '% ');
            }
            text.push('</span>');
            if (chart.data.labels[i]) {
              text.push('<span style="color: #005874;font-weight: bold;font-size: 16px;">' + chart.data.labels[i]);
            }
            text.push('</li>');
          }
          text.push('</ul>');
          return text.join('');
        },
        responsive: true,
        legend: {
          labels: {
            usePointStyle: true,
            fontFamily: 'Quicksand',
            fontSize: 14,
          },
          display: false,
          position: 'bottom',
        },
        tooltips: {
          mode: 'nearest',
          yAlign: 'bottom',
          callbacks: {
            title: function () {
              return '';
            },
            label: function (tooltipItem, data) {
              return data['datasets'][0]['data'][tooltipItem['index']] + ' minutes';
            }
          },
          backgroundColor: '#005874',
          titleFontSize: 14,
          titleFontFamily: 'Quicksand',
          titleFontColor: '#FFFFFF',
          bodyFontColor: '#FFFFFF',
          bodyFontSize: 14,
          displayColors: false
        },
      }
    });
  }

}
