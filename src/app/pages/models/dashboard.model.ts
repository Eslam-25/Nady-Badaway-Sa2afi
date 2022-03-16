export class DashboardModel {
    totalOfReaders: number;
    totalOfPassedReaders: number;
    totalOfRemainReaders: number;
    levelReaders: LevelReader[] = [];
}

export class LevelReader {
    levelName: string;
    totalOfReaders: number;
    totalOfPassedReaders: number;
    totalOfRemainReaders: number
}