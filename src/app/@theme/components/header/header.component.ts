import { Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { NbDialogService, NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { LayoutService } from '../../../@core/utils';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { BehaviorService } from '../../../core/services/behavior.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  userName: any;
  currentTheme = 'default';

  userMenu: any;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private router: Router,
    public behaviorService: BehaviorService,
    private dialogService: NbDialogService,
    private themeService: NbThemeService,
    public localStorageService: LocalStorageService,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService) {
  }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;

    this.userName = this.localStorageService.getUserName();
    this.userMenu = [ { title: 'خروج' }];
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);

    this.logout();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }


  @ViewChild('dialogMsg') dialogMsg;

  logout() {
    this.menuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'userMenu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if(title == 'خروج'){
          this.dialogService.open(
            this.dialogMsg,
            {
              closeOnBackdropClick: false,
            });
        }
      });
  }

  onCancel(dialog) {
    dialog.close();
  }
  onConfirm(type, dialog) {
    this.localStorageService.clear();
    this.behaviorService.isLoggedIn.next(false);
    location.pathname = "pages/register-reader";

    dialog.close();
  }
}
