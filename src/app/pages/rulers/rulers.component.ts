import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { UserRoleEnum } from '../../core/enums/user-roles.enum';
import { BehaviorService } from '../../core/services/behavior.service';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'ngx-rulers',
  templateUrl: './rulers.component.html',
  styleUrls: ['./rulers.component.scss']
})
export class RulersComponent implements OnInit {
  columns = {
    name: {
      title: 'اسم الشيخ',
      type: 'string',
    },
    phoneNumber: {
      title: 'رقم الهاتف',
      type: 'string',
    },
    password: {
      title: 'الرقم السري',
      type: 'string',
    }
  };

  dataSet: UserModel[] = [];
  rulerFormGroup: FormGroup;
  showPassword: boolean = false;
  loading: boolean = true;
  isActionLoading: boolean = false;

  constructor(
    private dialogService: NbDialogService,
    private userService: UserService,
    private toastService: ToastService,
    private behaviorService: BehaviorService) { }

  async ngOnInit() {
    this.prepareFormGroup();
    await this.prepareUsers();
  }

  async prepareUsers() {
    this.dataSet = await this.userService.getAll();
    this.dataSet = this.dataSet.filter(r => r.role == UserRoleEnum.Ruler);
    this.loading = false;
  }

  toggleShowPassword = () => this.showPassword = !this.showPassword;
  prepareFormGroup() {
    this.rulerFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  openAddDialogClick(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }

  async onDeleteConfirm($event) {
    this.loading = true;
    let isDeleted = await this.userService.delete($event.event.data as UserModel);
    if (isDeleted) {
      this.toastService.showSuccess("لقد تم حذف الشيخ بنجاح");
      // to apply changes in table
      $event.event.confirm.resolve();
    } else {
      this.toastService.showError("لقد حدث خطأ يرجى المحاولة لاحقا");
      $event.event.confirm.reject();
    }
    this.loading = false;
    $event.dialog.close();
  }

  async onEditConfirm($event) {
    this.loading = true;
    let isUpdated = await this.userService.Update($event.event.newData as UserModel);
    if (isUpdated) {
      this.toastService.showSuccess("لقد تم تعديل  بيانات الشيخ بنجاح");
      // to apply changes in table
      $event.event.confirm.resolve();
    } else {
      this.toastService.showError("لقد حدث خطأ يرجى المحاولة لاحقا");
      $event.event.confirm.reject();
    }
    this.loading = false;
    $event.dialog.close();
  }

  get rulerFormControl() {
    return this.rulerFormGroup.controls;
  }


  async onSubmitAdding(dialog) {
    this.rulerFormGroup.markAllAsTouched();
    if (this.rulerFormGroup.valid) {
      this.isActionLoading = true;
      var user = this.rulerFormGroup.value as UserModel;
      user.role = UserRoleEnum.Ruler;
      let isAdded = await this.userService.add(user);
      if (isAdded) {
        await this.prepareUsers();
        this.behaviorService.isDataAdded.next(true);
        this.toastService.showSuccess("لقد تم اضافة المستخدم بنجاح");
        this.rulerFormGroup.reset();
      } else this.toastService.showError("لقد حدث خطأ يرجى المحاولة لاحقا");
      this.isActionLoading = false;
      dialog.close();
    }
  }
}
