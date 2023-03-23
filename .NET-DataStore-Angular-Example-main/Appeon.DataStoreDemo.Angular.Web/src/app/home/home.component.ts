import {
  EChartPieOptions,
  EChartPieOptionsGenerator,
} from './chart-options/echart-pie.chart-options';
import { MainBOptions, MainBOptionsGenerator } from './chart-options/main-b.chart-options';
import { Observable } from 'rxjs';
import { ReportsService } from '../services/reports/reports.service';
import { Component, OnInit } from '@angular/core';
import { ReportTotals } from '../models/reportTotals';
import { share } from 'rxjs/operators';
import { faPaw, faUser } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { EChartsOption } from 'echarts';
import { RequestALiveDemoDialogComponent } from '../dialogs/yes-no-dialog/request-a-live-demo-dialog/request-a-live-demo-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  totals: Observable<ReportTotals>;
  mainBOptions: EChartsOption;
  pieChartOptions: EChartsOption;
  fetchingMainB = true;
  fetchingPie = true;
  pieChartInstance;
  mainBInstance;
  mainBError;
  pieError;
  time = 3;

  faUser = faUser;
  faClock = faClock;
  faPaw = faPaw;
  openDialog():void{
    const dialogRef=this.dialog.open(RequestALiveDemoDialogComponent,{
    width: '600px',
    position:{top:'20px'}
    });
  }

  constructor(private reportsService: ReportsService,public dialog:MatDialog) {}

  ngOnInit(): void {

    this.totals = this.reportsService.totals().pipe(share());
    this.mainBError = null;
    this.pieError = null;
    this.fetchingMainB = true;
    this.fetchingPie = true;
    this.reportsService
      .categories(new Date('2013-01-01'))
      .pipe()
      .subscribe(
        (data) => {
          this.pieChartOptions = EChartPieOptionsGenerator.generateWithData(
            data.categorNames,
            data.categoryData
          );
          console.log(data);
          this.fetchingPie = false;
        },
        (err) => {
          console.error(err);
          this.pieError = err;
          this.fetchingPie = false;
        },
        () => {
          this.fetchingPie = false;
        }
      );
    this.reportsService
      .productCategories('2013')
      .pipe()
      .subscribe(
        (data) => {
          this.mainBOptions = MainBOptionsGenerator.generateWithData(
            data
          );
          console.log(data);
          this.fetchingMainB = false;
        },
        (err) => {
          console.error(err);
          this.mainBError = err;
          this.fetchingMainB = false;
        },
        () => {
          this.fetchingMainB = false;
        }
      );

    //弹窗
    var dialog1=this.dialog;
    var interval=setInterval(function(){

      var timesRun = parseInt(sessionStorage.getItem("timesRun"));
      if (isNaN(timesRun)) {
        sessionStorage.setItem("flag", "1")//第一次
        timesRun = 0;
      }
      var storeFlag = parseInt(sessionStorage.getItem("flag"));
      if (storeFlag != 1) return;

      if (timesRun >= 15) {
        sessionStorage.setItem("flag", "2")//执行一次后改变
        sessionStorage.setItem("timesRun", timesRun.toString());
        var dialog:MatDialog;
        const dialogRef=dialog1.open(RequestALiveDemoDialogComponent,{
          width: '600px',
          position:{top:'20px'}
          });
        clearInterval(interval);
        return;
      }
      timesRun += 1;
      sessionStorage.setItem("timesRun", timesRun.toString());
    },1000);
  }

  onChartInit(echarts, type: 'pie' | 'bars') {
    if (type == 'pie') {
      this.pieChartInstance = echarts;
    }
    else if(type == 'bars'){
      this.mainBInstance = echarts;
    }
    //
  }

  isHidden_box1:boolean = false;
  isHidden_box2:boolean = false;
  isHidden_box1_text:string = "Hide";
  isHidden_box2_text:string = "Hide";
  hide_Box1(){
    if(!this.isHidden_box1){
      this.isHidden_box1 = true;
      this.isHidden_box1_text = "Expand";
    }
    else{
      this.isHidden_box1 = false;
      this.isHidden_box1_text = "Hide";
    }
  }

  hide_Box2(){
    if(!this.isHidden_box2){
      this.isHidden_box2 = true;
      this.isHidden_box2_text = "Expand";
    }
    else{
      this.isHidden_box2=false;
      this.isHidden_box2_text = "Hide";
    }

  }

}
