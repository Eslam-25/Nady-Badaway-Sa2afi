import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRoleEnum } from '../../core/enums/user-roles.enum';
import { BehaviorService } from '../../core/services/behavior.service';
import { UserService } from '../services/user.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isActionLoading: boolean = false;
  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private router: Router,
    private behaviorService: BehaviorService
  ) { }

  ngOnInit(): void {
    this.prepareFormGroup();
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  prepareFormGroup() {
    this.loginForm = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  showPassword = false;

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    this.loginForm.markAllAsTouched();

    if(this.loginForm.valid){
      this.isActionLoading = true;
      let loggedUser = await this.userService.login(this.loginFormControl["phoneNumber"].value,this.loginFormControl["password"].value);
      if(loggedUser){
        this.toastService.showSuccess("لقد تم الدخول بنجاح");
        this.behaviorService.isDataAdded.next(true);
        if(loggedUser.role == UserRoleEnum.Admin || loggedUser.role == UserRoleEnum.Employee)
          location.pathname = 'pages/readers';
        else if(loggedUser.role == UserRoleEnum.Ruler)
          location.pathname = 'pages/ruler-evalution';
      }else{
        this.toastService.showError("عفوا يرجى التأكد من رقم الهاتف / الرقم السري");
      }
      this.isActionLoading = false;
    }
  }

}
