import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../../shared.module';

import { ConfirmDialogComponent } from './confirm-dialog.component';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let mockMatDialogRef;

  const getTitleText = () =>
    fixture.debugElement.query(By.css('h1')).nativeElement.textContent.trim();

  const getMessageText = () =>
    fixture.debugElement.query(By.css('p')).nativeElement.textContent.trim();

  const clickCancelButton = () =>
    fixture.debugElement.query(By.css('[mat-button]')).nativeElement.click();

  const clickConfirmButton = () =>
    fixture.debugElement.query(By.css('[mat-raised-button]')).nativeElement.click();

  beforeEach(async(() => {
    mockMatDialogRef = { close: () => {} };
    spyOn(mockMatDialogRef, 'close');

    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [
        { provide: MatDialogRef, useValue: mockMatDialogRef },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            title: 'some title',
            message: 'some message',
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog on cancel click', () => {
    clickCancelButton();
    fixture.detectChanges();

    expect(mockMatDialogRef.close).toHaveBeenCalledTimes(1);
    expect(mockMatDialogRef.close).toHaveBeenCalledWith();
  });

  it('should close dialog on confirm click', () => {
    clickConfirmButton();
    fixture.detectChanges();

    expect(mockMatDialogRef.close).toHaveBeenCalledTimes(1);
    expect(mockMatDialogRef.close).toHaveBeenCalledWith(true);
  });

  it('should display passed in title and message', () => {
    expect(getTitleText()).toBe('some title');
    expect(getMessageText()).toBe('some message');
  });
});
