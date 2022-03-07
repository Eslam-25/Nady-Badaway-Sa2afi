import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { UserService } from '../services/user.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  loginForm: FormGroup;
  loading: boolean = false;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    ) { }

  ngOnInit(): void {
    this.prepareFormGroup();
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  prepareFormGroup() {
    this.loginForm = new FormGroup({
      newPassword: new FormControl('', [Validators.required]),
    });
  }

  showNewPassword = false;

  toggleShowNewPassword = () => this.showNewPassword = !this.showNewPassword;

  async onSubmit() {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid){
      this.loading = true;
      let isAdded = await this.userService.changePassword(this.localStorageService.getUserId(), this.loginFormControl["newPassword"].value);
      if (isAdded) {
        this.toastService.showSuccess("لقد تم تغيير الرقم السري بنجاح");
        this.loginForm.reset();
      }else this.toastService.showError("لقد حدث خطأ يرجى المحاولة لاحقا");

      this.loading = false;
    }
  }


}
