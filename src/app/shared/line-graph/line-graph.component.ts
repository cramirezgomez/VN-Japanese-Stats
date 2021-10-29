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
  @Input() gameFilter = '';
  @Input() routeFilter = '';
  sortedEntries: FBEntry[] = [];
  // dates: string[] = [];
  // pace: number[] = [];

  byGame = false;
  byRoute = false;

  yArray: any[] = [];
  legendArray: string[] = [];

  whiteText =  {
    color:'#fff',
    fontFamily: 'sans-serif',
    fontSize: 20
  }

  combo:any = [[1,1]]

  options: any;
  graphTitle: string = '';
  
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
    

    
    

    if(this.gameFilter == '' && this.routeFilter == ''){
      //seaprate by game
      var arr: any = {};
      this.MoveToObject(arr, 0);
      
      //object with games
      let gameTitles = Object.keys(arr);
      let entriesByGames:FBEntry[][] =  Object.values(arr);

      this.SetUpYAxis(gameTitles, entriesByGames);

      //titel and legend
      this.graphTitle = `VN:`;
    }
    else if(this.gameFilter != '' && this.routeFilter == ''){
      //separate by route
      var arr: any = {};
      this.MoveToObject(arr, 1);
      
      //object with games
      let routeTitles = Object.keys(arr);
      let entriesByRoutes:FBEntry[][] =  Object.values(arr);

      this.SetUpYAxis(routeTitles, entriesByRoutes);

      //titel and legend
      this.graphTitle = 'Routes:';
    }
    else{
      let titles = [this.routeFilter];
      let entries = [this.entries]

      this.SetUpYAxis(titles, entries);

      //titel and legend
      this.graphTitle = `Route:`;
      
    }

    this.setUpAllOptions();
  }

  private MoveToObject(arr: any, place: number) {
    this.entries.forEach(entry => {
      let itemName = entry.route.split('/')[place];

      if (arr.hasOwnProperty(itemName)) {
        arr[itemName].push(entry);
      }
      else {
        arr[itemName] = [entry];
      }
    });
  }

  private SetUpYAxis(titles: string[], entries: FBEntry[][]) {
    this.yArray = [];
    for (var i = 0; i < titles.length; ++i) {
      let formattedData = this.formatEntryData(entries[i]);
      this.yArray.push(
        {
          name: titles[i],
          type: 'line',
          data: formattedData,
          animationDelay: (idx: number) => idx * 10,
        });
    }
    this.legendArray = titles;
  }

  private formatEntryData(passedEntries: FBEntry[]) {
    let dateAndPace: any = [];
    //add to char and dats array
    passedEntries.map(data => {
      dateAndPace.push([data.date, this.pacePipe.transform(data.chars, data.mins)]);
    });
    return dateAndPace;
  }

  ngOnInit(): void {
    
  }

  setUpAllOptions(){
    this.options = {
      title: {
        text: this.graphTitle,
        subtext: 'Char/Hour',
        textStyle: this.whiteText
      },
      tooltip: {
        trigger: 'axis',
        textStyle: this.whiteText,
        backgroundColor: '#000',
        borderColor: '#26064A'
      },
      legend: {
        data: this.legendArray,
        textStyle: this.whiteText
      },
      xAxis: {
        type: 'category',
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      },
      series: this.yArray,
      textStyle: this.whiteText,
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx: number) => idx * 5,
      backgroundColor: '#212121'
    };
  }

  

}

