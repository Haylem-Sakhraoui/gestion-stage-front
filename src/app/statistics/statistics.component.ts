import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'; // Import Chart
import { userService } from '../services/user.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  chart: Chart<"bar", any, unknown> = {} as Chart<"bar", any, unknown>;

  constructor(private statisticsService: userService) { }

  ngOnInit(): void {
    this.createChart();
  }

  createChart() {
    this.statisticsService.getUserStatistics().subscribe(data => {
      // Check if data is not empty and has the expected structure
      if (Array.isArray(data) && data.length > 0) {
        // Flatten the nested array
        const flattenedData = data.flat();
        
        // Extract unique dates and their corresponding reclamation counts
        const dateMap = new Map<string, number>();
        flattenedData.forEach((item: any) => {
          const date = item.dateCreation;
          const count = item.reclamationCount;
          if (dateMap.has(date)) {
            dateMap.set(date, dateMap.get(date)! + count);
          } else {
            dateMap.set(date, count);
          }
        });
  
        // Extract unique dates and reclamation counts from the map
        const dates = Array.from(dateMap.keys());
        const reclamationCounts = Array.from(dateMap.values());
  
        // Log the extracted data for verification
        console.log("dates", dates);
        console.log("reclamationCounts", reclamationCounts);
      
        this.chart = new Chart("MyChart", {
          type: 'bar',
          data: {
            labels: dates, 
            datasets: [{
              label: "Reclamation Number",
              data: reclamationCounts,
              backgroundColor: 'blue'
            }]
          },
          options: {
            aspectRatio: 2
          }
        });
      } else {
        console.error("Invalid data format:", data);
      }
    });
  }
  
    }