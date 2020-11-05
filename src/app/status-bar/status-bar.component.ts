import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
})
export class StatusBarComponent implements OnInit {
  // NOTE: subscribe is done in template using async pipe
  statusMessages: Observable<string>;

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    // get messages for displaying in status bar template
    this.statusMessages = this.statusService.getMessages().pipe(
      // tap: a pipe operator that 'peaks' for incoming data
      // this is useful e.g. for side effects
      tap(() => {
        // auto scroll textarea to bottom
        this.scrollToBottom();
      }),
    );
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const textarea = document.getElementById('status-bar');
      textarea.scrollTop = textarea.scrollHeight;
    }, 50);
  }
}
