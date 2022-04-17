import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TimeTrackerComponent } from './time-tracker/time-tracker.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { TimeTrackService } from './services/time-track.service';

@NgModule({
  declarations: [AppComponent, TimeTrackerComponent, PagenotfoundComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [TimeTrackService],
  bootstrap: [AppComponent],
})
export class AppModule {}
