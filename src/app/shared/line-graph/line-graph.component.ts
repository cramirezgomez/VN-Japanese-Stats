import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { FBEntry } from 'src/app/models/entry.model';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit, OnChanges {

  @Input() entries: FBEntry[] = []
  dates: string[] = ['2021-06-18', '2021-06-21', '2021-06-22'];
  chars: number[] = [10095, 10949, 10546];

  combo:any = [[1,1]]
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.entries.map(data => {
      // this.dates.push(data.date);
      // this.chars.push(data.chars)
    })
    // console.log(this.chars);
    // console.log(this.dates)
  }

  ngOnInit(): void {

  }

  chartOption = {
    dataset: [
      {
        source: this.combo
      },
      {
        transform: {
          type: 'ecStat:regression'
          // 'linear' by default.
          // config: { method: 'linear', formulaOn: 'end'}
        }
      }
    ],
    title: {
      text: 'Linear Regression',
      subtext: 'By ecStat.regression',
      sublink: 'https://github.com/ecomfe/echarts-stat',
      left: 'center'
    },
    legend: {
      bottom: 5
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    xAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    yAxis: {
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    series: [
      {
        name: 'scatter',
        type: 'scatter'
      },
      {
        name: 'line',
        type: 'line',
        datasetIndex: 1,
        symbolSize: 0.1,
        symbol: 'circle',
        label: { show: true, fontSize: 16 },
        labelLayout: { dx: -20 },
        encode: { label: 2, tooltip: 1 }
      }
    ]
  };

}
