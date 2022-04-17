import { Component } from '@angular/core';
import { ngxCsv } from 'ngx-csv/ngx-csv';
import { Router } from '@angular/router';
import { Mymodel } from './Time';
import { TimeTrackService } from './services/time-track.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Track-Work-App';

  constructor(private router: Router) {}
  ngOnInit() {}
}
