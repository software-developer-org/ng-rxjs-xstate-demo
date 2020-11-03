import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StatusService } from '../status.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss'],
})
export class StatusBarComponent implements OnInit {
  statusMessages: Observable<string>;

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    this.statusMessages = this.statusService.getMessages().pipe(
      map((messages) => {
        this.scrollToBottom();
        return messages;
      })
    );
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      const textarea = document.getElementById('status-bar');
      textarea.scrollTop = textarea.scrollHeight;
    }, 500);
  }
}
