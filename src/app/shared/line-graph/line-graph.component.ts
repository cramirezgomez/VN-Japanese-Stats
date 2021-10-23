import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { EChartsOption } from 'echarts';
import { FBEntry } from 'src/app/models/entry.model';
import { PacePipe } from '../pipes/pace.pipe';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit, OnChanges {

  @Input() entries: FBEntry[] = [];
  sortedEntries: FBEntry[] = [];
  dates: string[] = [];
  chars: number[] = [];

  byGame = false;
  byRoute = false;



  combo:any = [[1,1]]

  options: any;
  
  constructor(private pacePipe: PacePipe) { }

  ngOnChanges(changes: SimpleChanges): void {
    //sort entries
    this.sortedEntries = this.entries.sort((a, b) => {
      if(a.date > b.date){
        return 1
      }
      if(a.date == b.date){
        return 0
      }
      return -1
    })

    //empty data arrays
    this.chars = [];
    this.dates = [];


    this.sortedEntries.map(data => {
      this.dates.push(data.date);
      this.chars.push(this.pacePipe.transform(data.chars,data.mins))
    })
    
    this.setUpOptions();
    // console.log(this.chars);
    // console.log(this.dates)
  }

  ngOnInit(): void {
    this.setUpOptions();
  }

  setUpOptions(){
    this.options = {
      tooltip: {},
      xAxis: {
        data: this.dates,
        silent: false,
        splitLine: {
          show: false,
        },
      },
      yAxis: {},
      series: [
        {
          name: 'All Entries',
          type: 'bar',
          data: this.chars,
          animationDelay: (idx: number) => idx * 10,
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
    };
  }

  

}

