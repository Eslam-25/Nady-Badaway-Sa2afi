import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { BehaviorService } from '../../core/services/behavior.service';
import { LevelModel } from '../models/level.model';
import { LevelService } from '../services/level.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'ngx-levels',
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.scss']
})
export class LevelsComponent implements OnInit {
  columns = {
    name: {
      title: 'المستوي',
      type: 'string',
    },
    degree: {
      title: 'درجة التقييم',
      type: 'string',
    }
  };

  dataSet: LevelModel[] = [];
  levelFormGroup: FormGroup;
  loading: boolean = true;
  isActionLoading: boolean = false;

  constructor(
    private dialogService: NbDialogService,
    private levelService: LevelService,
    private toastService: ToastService, 
    private behaviorService: BehaviorService
  ) { }

  async ngOnInit() {
    this.prepareFormGroup();
    await this.prepareLevels();
  }

  async prepareLevels() {
    this.dataSet = await this.levelService.getAll();
    this.loading = false;
  }

  prepareFormGroup() {
    this.levelFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      degree: new FormControl('', [Validators.required]),
    });
  }

  openAddDialogClick(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }

  get levelFormControl() { return this.levelFormGroup.controls; }

  async onDeleteConfirm($event) {
    this.loading = true;
    let isDeleted = await this.levelService.delete($event.event.data as LevelModel);
    if (isDeleted) {
      this.toastService.showSuccess("لقد تم حذف المستوي بنجاح");
      // to apply changes in table
      $event.event.confirm.resolve();
    }else {
      this.toastService.showError("لقد حدث خطأ يرجى المحاولة لاحقا");
      $event.event.confirm.reject();
    }
    this.loading = false;
    $event.dialog.close();
  }
  
  async onEditConfirm($event) {
    this.loading = true;
    let isUpdated = await this.levelService.Update($event.event.newData as LevelModel);
    if (isUpdated) {
      this.toastService.showSuccess("لقد تم تعديل المستوي بنجاح");
      // to apply changes in table
      $event.event.confirm.resolve();
    }else {
      this.toastService.showError("لقد حدث خطأ يرجى المحاولة لاحقا");
      $event.event.confirm.reject();
    }
    this.loading = false;
    $event.dialog.close();
  }

  async onSubmitAdding(dialog) {
    this.levelFormGroup.markAllAsTouched();
    if (this.levelFormGroup.valid) {
      this.isActionLoading = true;
      let isAdded = await this.levelService.add(this.levelFormGroup.value as LevelModel);
      if (isAdded) {
        await this.prepareLevels();
        this.behaviorService.isDataAdded.next(true);
        this.toastService.showSuccess("لقد تم اضافة المستوي بنجاح");
        this.levelFormGroup.reset();
      }else this.toastService.showError("لقد حدث خطأ يرجى المحاولة لاحقا");
      this.isActionLoading = false;
      dialog.close();
    }
  }

}
