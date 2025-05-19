import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ProductsService } from '../products/products.service';
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterViewInit {
  @ViewChild('myChart')
  myChartCanvas!: ElementRef;
  myChart: any;
  chartData: any;
  DashboardData: any;

  constructor(private service: ProductsService) {
    this.getSalesRevenue();
  }

  ngAfterViewInit() {
    this.getDashboardCount();
  }

  getDashboardCount() {
    this.service.getDashboardCount().subscribe(
      (data: any) => {
        if (data.message === 'Ok') {
          this.DashboardData = data.result;
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

getSalesRevenue(){
  this.service.getSalesRevenue().subscribe(
    (data: any) => {
      if (data.message === 'Ok') {
        console.log(this.DashboardData);


          const labels = data.result.labels;
          const salesData = data.result.salesData;

          this.chartData = {
            labels: labels,
            datasets: [{
              label: 'Total revenue',
              data: salesData,
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 5
            }]
          };

          this.createChart();
      }
    },
    (error: any) => {
      console.log(error);
    }
  );
}


  createChart() {
    const canvas = this.myChartCanvas.nativeElement;
    const ctx = canvas.getContext('2d');

    this.myChart = new Chart(ctx, {
      type: 'bar',
      data: this.chartData,
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true
          },
          y: {
            stacked: true
          }
        },
        plugins: {
          legend: {
            display: true,
          }
        }
      }
    });
  }
}
