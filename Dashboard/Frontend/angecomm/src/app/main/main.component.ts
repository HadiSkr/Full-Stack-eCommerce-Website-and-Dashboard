import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular-highcharts';
import { Chart } from 'angular-highcharts';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, ChartModule,NavbarComponent,SidebarComponent ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {


  lineChart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Dummy Orders Data'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Dummy Orders',
        data: [10, 2, 3, 6, 9, 17, 20, 10, 5, 2, 16]
      } as any
    ]
  });

  
  pieChart = new Chart({
    chart: {
      type: 'pie',
      plotShadow: false,
      spacingBottom: 0,
      spacingTop: 0,
      spacingLeft: 0,
      spacingRight: 0,
    },
  
    credits: {
      enabled: false,
    },
  
    plotOptions: {
      pie: {
        innerSize: '99%',
        borderWidth: 10,
        borderColor: '',
        slicedOffset: 10,
        dataLabels: {
          connectorWidth: 0,
          distance: 20, 
        },
      },
    },
  
    title: {
    align: 'center',
    verticalAlign: 'top',
    floating: true,
      text: 'Orders',
    },
  
    legend: {
      enabled: false,
    },
  
    series: [
      {
        type: 'pie',
        data: [
          { name: 'Completed Orders', y: 1, color: '#FF0000' },     
          { name: 'Postponed Orders', y: 2, color: '#00FF00' },      
          { name: 'Cancelled Orders', y: 3, color: '#0000FF' },   
          { name: 'Pending Orders', y: 4, color: '#FFD700' },        
          { name: 'Returned Orders', y: 5, color: '#9932CC' },       
        ],
      },
    ],
  });

  
}
