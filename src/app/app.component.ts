import { Component, OnInit } from '@angular/core';
import { RetryRequestService } from './services/retry-request.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'observables';
  constructor(private retryRequestService: RetryRequestService) {}

  ngOnInit() {
    console.time('connection');
    this.retryRequestService.getInformation().subscribe((response) => {
      console.log('received a value with no errors');
      console.timeEnd('connection');
    });
  }
}
