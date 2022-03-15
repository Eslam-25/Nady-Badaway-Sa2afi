import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { UserRoleEnum } from '../core/enums/user-roles.enum';
import { BehaviorService } from '../core/services/behavior.service';
import { LocalStorageService } from '../core/services/local-storage.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-layout>
      <router-outlet></router-outlet>
      <nb-menu [items]="menu"></nb-menu>
    </ngx-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu: NbMenuItem[] = [];
  constructor(
    private localStorageService: LocalStorageService,
    private behaviorService: BehaviorService
  ) {
    this.behaviorService.isDataAdded.subscribe(value => {
      if (value) {
        this.buildMenu();
      }
    });
  }

  ngOnInit(): void {
    this.buildMenu();
  }

  buildMenu() {
    if (this.localStorageService.getUserRole() == UserRoleEnum[UserRoleEnum.Ruler]) {
      this.prepareLinksForRuler();
    }
    else if (this.localStorageService.getUserRole() == UserRoleEnum[UserRoleEnum.Employee]) {
      this.prepareLinksForEmployee();
    }
    else if (this.localStorageService.getUserRole() == UserRoleEnum[UserRoleEnum.Admin]) {
      this.prepareLinksForAdmin()
    }else if (this.localStorageService.getUserRole() == UserRoleEnum[UserRoleEnum.Reader]) {
      this.prepareLinksForReader()
    }else{
      this.prepareUnLoggedMenu();
    }
  }

  prepareUnLoggedMenu(){
    this.menu = [
      {
        title: 'تسجيل المتسابقين',
        icon: 'person-add-outline',
        link: '/pages/register-reader',
      },
      {
        title: 'دخول',
        icon: 'log-in-outline',
        link: '/pages/login',
      }
    ];
  }

  prepareLinksForRuler() {
    this.menu = [
      {
        title: "تقييم متسابق",
        icon: "edit-2-outline",
        link: "/pages/ruler-evalution",
      },
      {
        title: "تغيير الرقم السري",
        icon: "lock-outline",
        link: "/pages/change-password",
      },
    ];
  }

  prepareLinksForReader() {
    this.menu = [
      {
        title: "تقييمي",
        icon: "edit-2-outline",
        link: "/pages/my-evalution",
      }
    ];
  }

  prepareLinksForEmployee() {
    this.menu = [
      {
        title: 'تسجيل المتسابقين',
        icon: 'person-add-outline',
        link: '/pages/register-reader',
      },
      {
        title: 'ادارة المتسابقين',
        icon: 'people-outline',
        link: '/pages/readers',
      },
      {
        title: "تغيير الرقم السري",
        icon: "lock-outline",
        link: "/pages/change-password",
      },
    ];
  }

  prepareLinksForAdmin() {
    this.menu = [
      {
        title: 'تسجيل المتسابقين',
        icon: 'person-add-outline',
        link: '/pages/register-reader',
      },
      {
        title: 'ادارة المتسابقين',
        icon: 'people-outline',
        link: '/pages/readers',
      },
      {
        title: 'ادارة الشيوخ',
        icon: 'people-outline',
        link: '/pages/rulers',
      },
      {
        title: 'ادارة المستويات',
        icon: 'layout-outline',
        link: '/pages/levels',
      },
      {
        title: 'ادارة المستخدمين',
        icon: 'people-outline',
        link: '/pages/users',
      },
      {
        title: 'تغيير الرقم السري',
        icon: 'lock-outline',
        link: '/pages/change-password',
      },
    ];
  }
}
