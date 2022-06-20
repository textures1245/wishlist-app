import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmService } from './confirm.service';

@Component({
  selector: 'app-confirm-window',
  templateUrl: './confirm-window.component.html',
  styleUrls: ['./confirm-window.component.css']
})
export class ConfirmWindowComponent implements OnInit {
  @Input() takeAction: string = '';
  @Output() takeActionChange = new EventEmitter<string>();
  constructor(
    private confirmService: ConfirmService
  ) { }

  ngOnInit(): void {  }

  onCloseWindow = () => {
    this.takeAction = '';
    this.takeActionChange.emit(this.takeAction);
  }

  onConfirmAction = () => {
    this.confirmService.confirmAction$.next(true);
    this.onCloseWindow();
  }
}
