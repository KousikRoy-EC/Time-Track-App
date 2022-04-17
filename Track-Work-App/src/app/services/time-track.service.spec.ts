import 'zone.js';
import 'zone.js/dist/async-test.js';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';

import { TestBed } from '@angular/core/testing';
import { TimeTrackService } from './time-track.service';
import { inject } from '@angular/core/testing';
import { Mymodel } from '../Time';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('TimeTrackService', () => {
  TestBed.initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting()
  );

  let httpTestingController: HttpTestingController;
  let service: TimeTrackService;
  let baseUrl = '';
  let modell: Mymodel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpTestingController = TestBed.get(HttpTestingController);

    service = TestBed.inject(TimeTrackService);

    modell = {
      UserId: '01',
      Title: 'This is frontend testing',
      Start_Time: '8:38',
      End_Time: '10:00',
      Date: '12/04/2022',
      Description: 'NA',
      Modified_Date: 'NA',
    };
  });

  beforeEach(inject([TimeTrackService], (services: TimeTrackService) => {
    service = services;
  }));

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return id data', () => {
    let result: Mymodel[] = [];
    service.getDataById(modell.UserId).subscribe((res: any) => {
      result = res;
      expect(res.length).toBe(1);
      expect(result[0]).toEqual(modell);
    });
    const req = httpTestingController.expectOne(service.generate);
    expect(req.request.method).toBe('GET');
    req.flush([modell]);
  });

  it('should add a new data', () => {
    service.saveTimer(modell).subscribe((res) => {
      expect(res).toEqual(modell);
    });

    const req = httpTestingController.expectOne(service.baseUrl);
    expect(req.request.method).toBe('POST');
    req.flush(modell);
  });
});
