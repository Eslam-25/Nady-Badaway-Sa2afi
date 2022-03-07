import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { UserRoleEnum } from '../../core/enums/user-roles.enum';
import { BehaviorService } from '../../core/services/behavior.service';
import { UserModel } from '../models/user.model';
import { UserService } from '../services/user.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  columns = {
    name: {
      title: 'اسم المستخدم',
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
  filteredData: UserModel[] = [];
  roleFilter: number = 0;
  userFormGroup: FormGroup;
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
    this.onChangeRoleFilter(UserRoleEnum.Admin);
    this.loading = false;
  }

  onChangeRoleFilter($event){
    if($event == UserRoleEnum.Admin){
      this.filteredData = this.dataSet.filter(r => r.role == UserRoleEnum.Admin);
    }else if($event == UserRoleEnum.Employee){
      this.filteredData = this.dataSet.filter(r => r.role == UserRoleEnum.Employee);
    }
    this.behaviorService.isDataAdded.next(true);
  }

  toggleShowPassword = () => this.showPassword = !this.showPassword;
  prepareFormGroup() {
    this.userFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
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
      this.toastService.showSuccess("لقد تم حذف المستخدم بنجاح");
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
      this.toastService.showSuccess("لقد تم تعديل  بيانات المستخدم بنجاح");
      // to apply changes in table
      $event.event.confirm.resolve();
    } else {
      this.toastService.showError("لقد حدث خطأ يرجى المحاولة لاحقا");
      $event.event.confirm.reject();
    }
    this.loading = false;
    $event.dialog.close();
  }

  get userFormControl() {
    return this.userFormGroup.controls;
  }


  async onSubmitAdding(dialog) {
    this.userFormGroup.markAllAsTouched();
    if (this.userFormGroup.valid) {
      this.isActionLoading = true;
      var user = this.userFormGroup.value as UserModel;
      user.role = this.userFormControl['role'].value == 0 ? UserRoleEnum.Admin : UserRoleEnum.Employee;
      let isAdded = await this.userService.add(user);
      if (isAdded) {
        await this.prepareUsers();
        this.behaviorService.isDataAdded.next(true);
        this.toastService.showSuccess("لقد تم اضافة المستخدم بنجاح");
        this.userFormGroup.reset();
      } else this.toastService.showError("لقد حدث خطأ يرجى المحاولة لاحقا");
      this.isActionLoading = false;
      dialog.close();
    }
  }
}
