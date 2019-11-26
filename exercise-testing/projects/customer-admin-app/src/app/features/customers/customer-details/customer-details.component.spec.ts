import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, asyncScheduler } from 'rxjs';
import { delay } from 'rxjs/operators';

import { SharedModule } from '../../../shared/shared.module';

import { CustomerDetailsComponent } from './customer-details.component';
import { CustomersBackendService } from '../services/customers-backend.service';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../model/customers';

const MOCK_CUSTOMER = {
  id: 0,
  name: 'John',
  surname: 'Snow',
  address: {
    location: 'Castle Black',
    land: 'The North',
    continent: 'Westeros',
  },
  tags: ['bastard'],
};

describe('CustomerDetailsComponent', () => {
  let component: CustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsComponent>;
  let mockCustomerBackendService: Partial<CustomersBackendService>;

  const getAddTagInput = () => fixture.debugElement.query(By.css('input'));
  const getAddTagButton = () => fixture.debugElement.query(By.css('button[mat-mini-fab]'));
  const getRemoveTagButton = tagIndex =>
    fixture.debugElement.queryAll(By.css('my-org-tag-list > div button'))[tagIndex];
  const getSpinner = () => fixture.debugElement.query(By.css('mat-spinner '));
  const getName = () =>
    fixture.debugElement.query(By.css('h1 span')).nativeElement.textContent.trim();

  beforeEach(async(() => {
    mockCustomerBackendService = {
      get(id: number): Observable<Customer> {
        return of({ ...MOCK_CUSTOMER }).pipe(delay(50, asyncScheduler));
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
      declarations: [CustomerDetailsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders spinner while loading', done => {
    expect(getSpinner()).toBeTruthy();

    setTimeout(() => {
      fixture.detectChanges();
      expect(getSpinner()).toBeFalsy();

      done();
    }, 100);
  });

  it('renders retrieved customer', done => {
    setTimeout(() => {
      fixture.detectChanges();
      expect(getName()).toBe('John Snow');

      expect(mockCustomerBackendService.get).toHaveBeenCalledTimes(1);
      expect(mockCustomerBackendService.get).toHaveBeenCalledWith(0);

      done();
    }, 100);
  });

  it('makes a backend request when adding tag', done => {
    setTimeout(() => {
      fixture.detectChanges();

      getAddTagInput().nativeElement.value = 'some-tag';
      getAddTagInput().nativeElement.dispatchEvent(new Event('keyup'));
      fixture.detectChanges();

      getAddTagButton().nativeElement.click();
      fixture.detectChanges();

      expect(mockCustomerBackendService.update).toHaveBeenCalledTimes(1);
      expect(mockCustomerBackendService.update).toHaveBeenCalledWith({
        ...MOCK_CUSTOMER,
        tags: ['bastard', 'some-tag'],
      });

      done();
    }, 100);
  });

  it('makes a backend request when removing tag', done => {
    setTimeout(() => {
      fixture.detectChanges();

      getRemoveTagButton(0).nativeElement.click();
      fixture.detectChanges();

      expect(mockCustomerBackendService.update).toHaveBeenCalledTimes(1);
      expect(mockCustomerBackendService.update).toHaveBeenCalledWith({
        ...MOCK_CUSTOMER,
        tags: [],
      });

      done();
    }, 100);
  });
});
