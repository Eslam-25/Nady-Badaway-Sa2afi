import { Component, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LevelService } from '../../../services/level.service';
import { ToastService } from '../../../shared/toast.service';
import { ReaderModel } from '../../models/reader.model';
import { ReaderSevice } from '../../../services/reader.service';

@Component({
  selector: 'ngx-readers',
  templateUrl: './readers.component.html',
  styleUrls: ['./readers.component.scss']
})
export class ReadersComponent implements OnInit {
  columns: any = {};

  dataSet: ReaderModel[] = [];
  filterData: ReaderModel[] = [];
  levels = [];
  selectedLevel = 0;
  showPassword: boolean = false;
  isLoading: boolean = true;

  constructor(
    private dialogService: NbDialogService,
    private levelService: LevelService,
    private readerSevice: ReaderSevice,
    private toastService: ToastService,
  ) { }

  async ngOnInit() {
    this.displayAllReaderInformation();

    // this.columns.degree = {
    //   title: 'التقييم',
    //   type: 'string',
    // };
    // this.columns.rulerName = {
    //   title: 'اسم الشيخ',
    //   type: 'string',
    // }
    await this.prepareLevels();
    await this.prepareReaders();
  }

  displayAllReaderInformation(){
    this.columns = {
      code: {
        title: 'كود المتسابق',
        type: 'number',
      },
      name: {
        title: 'اسم المتسابق',
        type: 'string',
      },
      phoneNumber: {
        title: 'رقم الهاتف',
        type: 'string',
      },
      password: {
        title: 'الرقم السري',
        type: 'string',
      },
      address: {
        title: 'العنوان',
        type: 'string',
      },
      age: {
        title: 'العمر',
        type: 'string',
        editable: false,
      },
      sheikhName: {
        title: 'اسم المحفظ',
        type: 'string',
      }
    };
  }

  async prepareLevels() {
    this.levels = await this.levelService.getAll();
    this.selectedLevel = this.levels[0]?.id;
  }

  onChangeLevelilter($event){
    this.filterData = this.dataSet.filter(r => r.levelId == $event);
  }
  
  async prepareReaders() {
    this.isLoading = true;
    this.dataSet = await this.readerSevice.getAll()
    this.dataSet.forEach(reader => {
      reader.age = new Date().getFullYear() - new Date(reader?.birthDate).getFullYear()
    });
    this.onChangeLevelilter(this.selectedLevel);
    this.isLoading = false;
  }

  toggleShowPassword = () => this.showPassword = !this.showPassword;

  openAddDialogClick(dialog: TemplateRef<any>) {
    this.dialogService.open(
      dialog,
      {
        closeOnBackdropClick: false,
      });
  }

  async onDeleteConfirm($event) {
    this.isLoading = true;
    let isDeleted = await this.readerSevice.delete($event.event.data as ReaderModel);
    if (isDeleted) {
      this.toastService.showSuccess("لقد تم حذف المتسابق بنجاح");
      // to apply changes in table
      $event.event.confirm.resolve();
    } else {
      this.toastService.showError("لقد حدث خطأ يرجى المحاولة لاحقا");
      $event.event.confirm.reject();
    }
    this.isLoading = false;
    $event.dialog.close();
  }

  async onEditConfirm($event) {
    this.isLoading = true;
    let isUpdated = await this.readerSevice.Update($event.event.newData as ReaderModel);
    if (isUpdated) {
      this.toastService.showSuccess("لقد تم تعديل  بيانات المتسابق بنجاح");
      // to apply changes in table
      $event.event.confirm.resolve();
    } else {
      this.toastService.showError("لقد حدث خطأ يرجى المحاولة لاحقا");
      $event.event.confirm.reject();
    }
    this.isLoading = false;
    $event.dialog.close();
  }
}
