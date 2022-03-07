import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { BehaviorService } from '../../../core/services/behavior.service';

class modifiedData {
  event: any;
  dialog: any;
}

@Component({
  selector: 'data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges {

  @Input() title: string;
  @Input() hideFilter: boolean = true;
  @Input() dataSet: any[];
  @Input() columns: any = {};
  @Output() onDelete: EventEmitter<modifiedData> = new EventEmitter<modifiedData>();
  @Output() onEdit: EventEmitter<modifiedData> = new EventEmitter<modifiedData>();

  source: LocalDataSource = new LocalDataSource();
  settings;

  constructor(private dialogService: NbDialogService, private behaviorService: BehaviorService) {
    this.behaviorService.isDataAdded.subscribe(value => {
      if (value) {
        this.dataSet = this.dataSet ? this.dataSet : [];
        this.source.load(this.dataSet);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSet = this.dataSet ? this.dataSet : [];
    this.source.load(this.dataSet);
  }

  ngOnInit(): void {
    this.settings = {
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      actions: {
        columnTitle: "",
        add: false,
        position: "right"
      },
      hideSubHeader: this.hideFilter,
      noDataMessage: "لا توجد بيانات حاليا",
      // pager: {
      //   display: true
      // },
      columns: this.columns,
    };

  }
  event;
  onDeleteConfirm(event, dialogMsg: TemplateRef<any>): void {
    this.event = event;
    this.dialogService.open(
      dialogMsg,
      {
        context: {
          title: "حذف",
          body: 'سوف يتم حفظ الحذف , هل تريد الاستمرار ؟',
          type: 'delete'
        },
        closeOnBackdropClick: false,
      });
  }

  onEditConfirm(event, dialogMsg: TemplateRef<any>): void {
    this.event = event;
    this.dialogService.open(
      dialogMsg,
      {
        context: {
          title: "تعديل",
          body: 'سوف يتم حفظ التعديل , هل تريد الاستمرار ؟',
          type: 'edit'
        },
        closeOnBackdropClick: false,
      });
  }

  onCancel(dialog) {
    dialog.close();
    this.event.confirm.reject();
  }
  onConfirm(type, dialog) {
    if (type == "delete") {
      this.onDelete.emit({ dialog: dialog, event: this.event } as modifiedData);
    } else {
      this.onEdit.emit({ dialog: dialog, event: this.event } as modifiedData);
    }
  }
}
