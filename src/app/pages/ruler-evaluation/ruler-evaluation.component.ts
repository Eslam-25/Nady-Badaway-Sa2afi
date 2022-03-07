import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ReaderDegreeModel } from '../reader-module/models/reader-degree.model';
import { ReaderModel } from '../reader-module/models/reader.model';
import { ReaderSevice } from '../reader-module/services/reader.service';
import { ToastService } from '../shared/toast.service';

@Component({
  selector: 'ngx-ruler-evaluation',
  templateUrl: './ruler-evaluation.component.html',
  styleUrls: ['./ruler-evaluation.component.scss']
})
export class RulerEvaluationComponent implements OnInit {

  hasaReader: boolean = false;
  loading: boolean = false;
  displayReaderIdErr: boolean = false;
  displayEvalutionErr: boolean = false;
  readerId: number;
  evaluationValue: number;
  age: number;
  readerModel: ReaderModel;

  constructor(
    private readerService: ReaderSevice,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    ) { }

  ngOnInit(): void {
  }

  onChangeReaderId($event) {
    this.displayReaderIdErr = false;
  }

  onChangeEvalution($event) {
    this.displayEvalutionErr = false;
  }

  newReader() {
    this.readerId = null;
    this.hasaReader = false;
  }

  async onGetReaderById() {
    if (!this.readerId) {
      this.displayReaderIdErr = true;
      return;
    }
    this.loading = true;
    let reader = await this.readerService.getReaderEvelautionByRulerId(this.readerId, this.localStorageService.getUserId());
    if (reader) {
      this.readerModel = reader as ReaderModel;
      this.age = new Date().getFullYear() - new Date(this.readerModel?.birthDate).getFullYear();
      this.hasaReader = true;
    }else{
      this.toastService.showError("عفوا هذا المتسابق غير موجود")
      this.readerId = null;
    }
    this.loading = false;
  }

  async onSaveEvalution() {
    if (!this.evaluationValue) {
      this.displayEvalutionErr = true;
       return;
    } 

    this.loading = true;
    let readerDegree = {degree: this.evaluationValue, rulerId: this.localStorageService.getUserId(), readerId: this.readerModel.id } as ReaderDegreeModel;
    let isUpdated = await this.readerService.evaluateReader(readerDegree);
    if (isUpdated) {
      this.toastService.showSuccess("لقد تم حفظ تقييم المتسابق بنجاح");
      await this.onGetReaderById();
      this.evaluationValue = null;
    }else{
      this.toastService.showError("لقد حدث خطأ يرجى المحاولة لاحقا");
    }
    this.loading = false;

  }
}
