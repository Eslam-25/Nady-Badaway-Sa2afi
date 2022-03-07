import { Component, EventEmitter, OnInit, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'ngx-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  dialogRef: EventEmitter<TemplateRef<any>> = new EventEmitter<TemplateRef<any>>();

  constructor() { }

  ngOnInit(): void {
  }

  @Output() getDialogRef(){
    // this.dialogRef.emit(dialogMsg)
  }


}
