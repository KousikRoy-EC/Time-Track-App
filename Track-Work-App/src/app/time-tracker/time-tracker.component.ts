import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TimeTrackService } from '../services/time-track.service';
import { Mymodel } from '../Time';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-time-tracker',
  templateUrl: './time-tracker.component.html',
  styleUrls: ['./time-tracker.component.css'],
})
export class TimeTrackerComponent implements OnInit {
  constructor(
    private timeservice: TimeTrackService,
    private route: ActivatedRoute,
    http: HttpClient
  ) {}

  newdata = new Mymodel();
  data: Mymodel[] = [];
  hours: any = 0;
  min: any = 0;
  sec: any = 0;
  running = false;
  startTimer: any;
  Start_Time: any;
  End_Time: any;
  date: any;
  description: any;
  Title: any;
  public id!: string;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getDataById();
  }

  // getAlldata() {
  //   this.timeservice.getAlldata().subscribe(
  //     (res) => (this.data = res),
  //     (err) => console.log(err)
  //   );
  // }

  getDataById() {
    this.timeservice.getDataById(this.id).subscribe(
      (res) => (this.data = [res]),
      (err) => console.log(err)
    );
  }

  onStartTimer() {
    var hr = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();

    this.Start_Time = hr + ':' + min + ':' + sec;

    if (!this.running) {
      this.running = true;
      this.startTimer = setInterval(() => {
        this.sec = this.sec + 1;

        if (this.sec == 60) {
          this.min = this.min + 1;
          this.sec = 0;
        }
        if (this.min == 60) {
          this.hours = this.hours + 1;
          this.min = 0;
          this.sec = 0;
        }

        if (this.sec < 10 || this.sec == 0) {
          this.sec = 0 + this.sec;
        }
        if (this.min < 10 || this.min == 0) {
          this.min = 0 + this.min;
        }
        if (this.hours < 10 || this.hours == 0) {
          this.hours = 0 + this.hours;
        }
      }, 1000);
    }
  }

  savetimer() {
    this.timeservice.saveTimer(this.newdata).subscribe(
      (res) => console.log('Saved Data sucessfull'),
      (err) => console.log(err)
    );
  }

  stop(title: string): void {
    var hr = new Date().getHours();
    var min = new Date().getMinutes();
    var sec = new Date().getSeconds();
    this.End_Time = hr + ':' + min + ':' + sec;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    this.date = mm + '/' + dd + '/' + yyyy;

    (this.newdata.UserId = this.id),
      (this.newdata.Title = title),
      (this.newdata.Start_Time = this.Start_Time),
      (this.newdata.End_Time = this.End_Time),
      (this.newdata.Date = this.date),
      (this.newdata.Description = this.description),
      (this.newdata.Modified_Date = 'NA'),
      this.savetimer();

    clearInterval(this.startTimer);
    this.running = false;
  }

  addDesc(desc: string) {
    this.description = desc;
  }

  download(): void {
    this.ngOnInit();
    var options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalseparator: '.',
      showLabels: true,
      showTitle: true,
      title: 'CSV GENERATE',
      useBom: true,
      headers: [
        'UserId',
        'Title',
        'Start_Time',
        'End_Time',
        'Date',
        'Description',
        'Modified_Date',
      ],
    };

    new ngxCsv(this.data, 'Time-Tracker', options);
  }
}
