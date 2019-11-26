import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { SharedModule } from '../../../shared/shared.module';

import { Customer } from '../model/customers';
import { CustomerEditorComponent } from './customer-editor.component';
import { CustomersBackendService } from '../services/customers-backend.service';

const MOCK_CUSTOMER: Customer = {
  id: 0,
  name: 'John',
  surname: 'Snow',
  birthday: '1995-07-02T00:00:00.000Z',
  isVip: false,
  address: {
    location: 'Castle Black',
    land: 'The North',
    continent: 'Westeros',
  },
  tags: ['bastard'],
};

describe('CustomerEditorComponent', () => {
  let component: CustomerEditorComponent;
  let fixture: ComponentFixture<CustomerEditorComponent>;
  let mockCustomerBackendService: Partial<CustomersBackendService>;

  const getNameInput = () => fixture.debugElement.query(By.css('[formControlName="name"]'));
  const getResetButton = () => fixture.debugElement.query(By.css('.actions [mat-flat-button]'));
  const getSubmitButton = () => fixture.debugElement.query(By.css('.actions [mat-raised-button]'));
  const getAddTagInput = () => fixture.debugElement.query(By.css('my-org-tag-list input'));
  const getAddTagButton = () => fixture.debugElement.query(By.css('button[mat-mini-fab]'));
  const getRemoveTagButton = tagIndex =>
    fixture.debugElement.queryAll(By.css('my-org-tag-list > div button'))[tagIndex];

  beforeEach(async(() => {
    mockCustomerBackendService = {
      get(id: number): Observable<Customer> {
        return of({ ...MOCK_CUSTOMER });
      },
      update(customer: Customer): Observable<Customer> {
        return of();
      },
    };
    spyOn(mockCustomerBackendService, 'get').and.callThrough();
    spyOn(mockCustomerBackendService, 'update').and.callThrough();
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, SharedModule],
      providers: [
        { provide: CustomersBackendService, useValue: mockCustomerBackendService },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({
              get: () => '0',
            }),
          },
        },
      ],
      declarations: [CustomerEditorComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the form', () => {
    expect(getNameInput().nativeElement.value).toBe('John');
  });

  it('resets the form', () => {
    getNameInput().nativeElement.value = 'changed';
    getNameInput().triggerEventHandler('input', { target: getNameInput().nativeElement });
    fixture.detectChanges();

    expect(getNameInput().nativeElement.value).toBe('changed');

    getResetButton().nativeElement.click();
    fixture.detectChanges();

    expect(getNameInput().nativeElement.value).toBe('John');
  });

  it('does NOT submit form when invalid', () => {
    getNameInput().nativeElement.value = '';
    getNameInput().triggerEventHandler('input', { target: getNameInput().nativeElement });
    fixture.detectChanges();

    getSubmitButton().nativeElement.click();
    fixture.detectChanges();

    expect(mockCustomerBackendService.update).toHaveBeenCalledTimes(0);
  });

  it('submits form when valid', () => {
    getNameInput().nativeElement.value = 'Johnny';
    getNameInput().triggerEventHandler('input', { target: getNameInput().nativeElement });
    fixture.detectChanges();

    getSubmitButton().nativeElement.click();
    fixture.detectChanges();

    expect(mockCustomerBackendService.update).toHaveBeenCalledTimes(1);
    expect(mockCustomerBackendService.update).toHaveBeenCalledWith({
      ...MOCK_CUSTOMER,
      name: 'Johnny',
    });
  });

  it('adds tag', () => {
    getAddTagInput().nativeElement.value = 'some-tag';
    getAddTagInput().triggerEventHandler('keyup', { target: getAddTagInput().nativeElement });
    fixture.detectChanges();

    getAddTagButton().nativeElement.click();
    fixture.detectChanges();

    expect(component.customerForm.getRawValue().tags).toEqual(['bastard', 'some-tag']);
  });

  it('removes tag', () => {
    getRemoveTagButton(0).nativeElement.click();
    fixture.detectChanges();

    expect(component.customerForm.getRawValue().tags).toEqual([]);
  });
});
