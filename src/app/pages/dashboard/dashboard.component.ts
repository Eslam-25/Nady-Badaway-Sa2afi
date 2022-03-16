import { Component, OnInit } from '@angular/core';
import { DashboardModel, LevelReader } from '../models/dashboard.model';
import { ReaderSevice } from '../services/reader.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  columns = {
    levelName: {
      title: 'المستوي',
      type: 'string',
    },
    totalOfReaders: {
      title: 'الاجمالى',
      type: 'number',
    },
    totalOfPassedReaders: {
      title: 'المجتازين',
      type: 'number',
    },
    totalOfRemainReaders: {
      title: 'الباقيين',
      type: 'number',
    }
  };

  dashboardModel: DashboardModel;
  dataSet: LevelReader[] = [];
  loading: boolean = true;

  constructor(private readerService: ReaderSevice) { }

  async ngOnInit() {
    await this.prepareDashboard();
  }


  async prepareDashboard() {
    this.dashboardModel = await this.readerService.getDashboard();
    this.dataSet = this.dashboardModel.levelReaders;
    this.loading = false;
  }

}
