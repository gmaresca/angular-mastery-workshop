import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, fakeAsync, tick, TestBed, flush } from '@angular/core/testing';

import { SharedModule } from '../../../shared/shared.module';

import { CustomerItemComponent } from './customer-item.component';
import { Customer } from '../model/customers';

const MOCK_CUSTOMER: Customer = {
  id: 1,
  name: 'test',
  surname: 'tester',
};

describe('CustomerItemComponent', () => {
  let component: CustomerItemComponent;
  let fixture: ComponentFixture<CustomerItemComponent>;

  const getRemoveButton = () => fixture.debugElement.query(By.css('.actions button:last-child'));
  const getDialog = () => document.querySelector('my-org-confirm-dialog');
  const getDialogTitle = () => document.querySelector('[mat-dialog-title]').textContent.trim();
  const getDialogMessage = () => document.querySelector('[mat-dialog-content]').textContent.trim();
  const getDialogConfirmButton = () =>
    document.querySelector('[mat-dialog-actions] button:first-child');
  const getDialogCancelButton = () =>
    document.querySelector('[mat-dialog-actions] button:last-child');

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, SharedModule],
      declarations: [CustomerItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerItemComponent);
    component = fixture.componentInstance;
    component.customer = MOCK_CUSTOMER;
    fixture.detectChanges();
    spyOn(component.remove, 'next');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('open dialog when clicked on remove customer button', fakeAsync(() => {
    expect(getDialog()).toBeFalsy();

    getRemoveButton().nativeElement.click();
    fixture.detectChanges();

    tick();

    expect(getDialog()).toBeTruthy();
    expect(getDialogTitle()).toBe('Remove customer');
    expect(getDialogMessage()).toBe(
      'Do you really want to remove customer "test tester" from the database?',
    );
  }));

  it('emits and event when dialog is confirmed', fakeAsync(() => {
    getRemoveButton().nativeElement.click();
    fixture.detectChanges();

    tick();

    (getDialogConfirmButton() as HTMLButtonElement).click();
    fixture.detectChanges();

    tick();

    expect(component.remove.next).toHaveBeenCalledTimes(1);
    expect(component.remove.next).toHaveBeenCalledWith(MOCK_CUSTOMER);
    flush();
  }));

  it('does NOT emit event when dialog is canceled', fakeAsync(() => {
    getRemoveButton().nativeElement.click();
    fixture.detectChanges();

    tick();

    (getDialogCancelButton() as HTMLButtonElement).click();
    fixture.detectChanges();

    tick();

    expect(component.remove.next).toHaveBeenCalledTimes(0);
    flush();
  }));
});
