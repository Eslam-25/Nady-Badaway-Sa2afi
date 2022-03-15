import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReaderModel } from '../../models/reader.model';
import { ToastService } from '../../../shared/toast.service';
import { LevelService } from '../../../services/level.service';
import { LevelModel } from '../../../models/level.model';
import { ReaderSevice } from '../../../services/reader.service';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-register-reader',
  templateUrl: './register-reader.component.html',
  styleUrls: ['./register-reader.component.scss']
})
export class RegisterReaderComponent implements OnInit {

  readerModel: ReaderModel;
  readerForm: FormGroup;
  birthDate: Date;
  displayBODErr: boolean = false;
  isLoading: boolean = true;
  dataSet: LevelModel[] = [];
  currentYeat = new Date(Date.now()).getFullYear();
  userCode: string = "00-00";
  password: string = "00-00";

  constructor(
    private toastService: ToastService,
    private levelService: LevelService,
    private readerSevice: ReaderSevice,
    private dialogService: NbDialogService,
    ) { }

  async ngOnInit() {
    this.prepareFormGroup();
    await this.prepareLevels();
  }

  async prepareLevels() {
    this.dataSet = await this.levelService.getAll();
    this.isLoading = false;
  }

  prepareFormGroup() {
    this.readerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      sheikhName: new FormControl('', [Validators.required]),
      levelId: new FormControl('', [Validators.required]),
    });
  }

  get registerFormControl() {
    return this.readerForm.controls;
  }

  onChangeBOD($event){
    this.displayBODErr = false;
  }

  closeDialog(ref){
    this.birthDate = null;
    this.readerForm.reset();
    ref.close();
  }

  async onSubmit(dialog: TemplateRef<any>) {        
    this.readerForm.markAllAsTouched();
    if(!this.birthDate){
      this.displayBODErr = true;
    }

    if (this.readerForm.valid) {
      this.isLoading = true;
      this.readerModel = this.readerForm.value as ReaderModel;
      this.readerModel.phoneNumber = this.readerModel.phoneNumber.toString();
      this.readerModel.level = this.dataSet.find(r => r.id == this.readerModel.levelId).name;
      this.readerModel.birthDate = this.birthDate;
      this.readerModel.code = "";
      this.readerModel.password = "";
      console.log(this.readerModel)
      let reader = await this.readerSevice.registerReader(this.readerModel);
      if(reader){
        this.dialogService.open(
          dialog,
          {
            closeOnBackdropClick: false,
          });
        this.userCode = reader.code;
        this.password = reader.password;
      }else this.toastService.showError("لقد حدث خطأ يرجى المحاولة لاحقا");
      this.isLoading = false;
    }

  }
}
