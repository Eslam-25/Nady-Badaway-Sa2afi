import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterReaderComponent } from './register-reader.component';

describe('RegisterReaderComponent', () => {
  let component: RegisterReaderComponent;
  let fixture: ComponentFixture<RegisterReaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterReaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
