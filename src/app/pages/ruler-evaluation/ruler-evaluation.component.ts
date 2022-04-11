import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../core/services/local-storage.service';
import { ReaderDegreeModel } from '../reader-module/models/reader-degree.model';
import { ReaderModel } from '../reader-module/models/reader.model';
import { ReaderSevice } from '../services/reader.service';
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
  readerCode: string;
  evaluationValue: number;
  evaluationNote: string;
  age: number;
  readerModel: ReaderModel;
  userIsReader: boolean = false;
  evaluationTextPLaceHolder: string = "اكتب هنا ...";
  levelOfDegree = "فى انتظار التقييم !!";

  constructor(
    private readerService: ReaderSevice,
    private toastService: ToastService,
    private localStorageService: LocalStorageService,
    private activatedRoute: ActivatedRoute,
  ) { }

  async ngOnInit() {
    const code = this.localStorageService.getItem("code");
    if (code) {
      this.userIsReader = true;
      this.evaluationTextPLaceHolder = "";
      await this.getByCode(code);
    }
  }

  onChangeReaderCode($event) {
    this.displayReaderIdErr = false;
  }

  onChangeEvalution($event) {
    this.displayEvalutionErr = false;
  }

  newReader() {
    this.readerCode = null;
    this.hasaReader = false;
  }

  async getByCode(code: string) {
    this.loading = true;
    let reader = await this.readerService.getByCode(code);
    this.preapreReader(reader);
    this.loading = false;
  }

  async onGetReaderById() {
    if (!this.readerCode) {
      this.displayReaderIdErr = true;
      return;
    }
    this.loading = true;
    let reader = await this.readerService.getReaderEvelautionByRulerId(this.readerCode, this.localStorageService.getUserId());
    this.preapreReader(reader);
    this.loading = false;
  }

  preapreReader(reader) {
    if (reader) {
      this.readerModel = reader as ReaderModel;
      this.evaluationNote = reader.note;
      this.evaluationValue = reader.degree == 0 ? null : reader.degree;
      this.age = new Date().getFullYear() - new Date(this.readerModel?.birthDate).getFullYear();
      this.hasaReader = true;

      if(reader.degree > 0 && reader.degree < 50)
        this.levelOfDegree = "ضعيف";
      else if(reader.degree >= 50 && reader.degree < 65)
        this.levelOfDegree = "متوسط";
      else if(reader.degree >= 65 && reader.degree < 75)
        this.levelOfDegree = "جيد";
      else if(reader.degree >= 75 && reader.degree < 90)
        this.levelOfDegree = "جيد جدا";
      else if(reader.degree >= 90 && reader.degree < 100)
        this.levelOfDegree = "ممتاز";

    } else {
      this.toastService.showError("عفوا هذا المتسابق غير موجود")
      this.readerCode = null;
    }
  }

  async onSaveEvalution() {
    if (!this.evaluationValue) {
      this.displayEvalutionErr = true;
      return;
    }

    this.loading = true;
    let readerDegree = {
      degree: this.evaluationValue,
      rulerId: this.localStorageService.getUserId(),
      readerId: this.readerModel.id,
      note: this.evaluationNote
    } as ReaderDegreeModel;
    let isUpdated = await this.readerService.evaluateReader(readerDegree);
    if (isUpdated) {
      this.toastService.showSuccess("لقد تم حفظ تقييم المتسابق بنجاح");
      await this.onGetReaderById();
    } else {
      this.toastService.showError("لقد حدث خطأ يرجى المحاولة لاحقا");
    }
    this.loading = false;

  }
}
