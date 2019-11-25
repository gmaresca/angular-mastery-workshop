import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TestScheduler } from 'rxjs/testing';

import { SharedModule } from '../../shared/shared.module';

import { Customer } from './model/customers';
import { CustomersComponent } from './customers.component';
import { CustomerItemComponent } from './customer-item/customer-item.component';
import { CustomersBackendService } from './services/customers-backend.service';

const MOCK_CUSTOMER: Customer = {
  id: 0,
  name: 'John',
  surname: 'Snow',
};

fdescribe('CustomersComponent', () => {
  let testScheduler: TestScheduler;
  let component: CustomersComponent;
  let fixture: ComponentFixture<CustomersComponent>;
  let mockCustomerBackendService: Partial<CustomersBackendService>;

  const getResetButton = () => fixture.debugElement.query(By.css('form button'));

  beforeEach(async(() => {
    testScheduler = new TestScheduler((actual, expected) => expect(actual).toEqual(expected));
    mockCustomerBackendService = {
      findCustomers(query: string): Observable<Customer[]> {
        return of([]);
      },
      remove(id: number): Observable<void> {
        return of();
      },
    };
    spyOn(mockCustomerBackendService, 'findCustomers')
      .withArgs('')
      .and.callThrough()
      .withArgs('john')
      .and.returnValue(of([MOCK_CUSTOMER]));
    spyOn(mockCustomerBackendService, 'remove').and.callThrough();
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule, SharedModule],
      declarations: [CustomersComponent, CustomerItemComponent],
      providers: [
        {
          provide: CustomersBackendService,
          useValue: mockCustomerBackendService,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { queryParams: { query: 'john' } },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads users with query from url', () => {
    testScheduler.run(({ expectObservable }) => {
      fixture.detectChanges();

      expectObservable(component.customers).toBe('300ms a', { a: [MOCK_CUSTOMER] });
    });

    expect(mockCustomerBackendService.findCustomers).toHaveBeenCalledTimes(1);
    expect(mockCustomerBackendService.findCustomers).toHaveBeenCalledWith('john');
  });

  it('resets the search query on reset click', () => {
    testScheduler.run(({ expectObservable }) => {
      fixture.detectChanges();

      getResetButton().nativeElement.click();
      fixture.detectChanges();

      expectObservable(component.customers).toBe('300ms a', { a: [] });
    });

    expect(mockCustomerBackendService.findCustomers).toHaveBeenCalledTimes(1);
    expect(mockCustomerBackendService.findCustomers).toHaveBeenCalledWith('');
  });

  it('does NOT debounce requests which happened outside of debounce interval', () => {
    testScheduler.run(({ expectObservable }) => {
      let resetCalled = false;
      fixture.detectChanges();

      const stream = component.customers.pipe(
        tap(() => {
          if (!resetCalled) {
            getResetButton().nativeElement.click();
            fixture.detectChanges();
            resetCalled = true;
          }
        }),
      );

      expectObservable(stream).toBe('300ms a 299ms b', { a: [MOCK_CUSTOMER], b: [] });
    });

    expect(mockCustomerBackendService.findCustomers).toHaveBeenCalledTimes(2);
    expect(mockCustomerBackendService.findCustomers).toHaveBeenCalledWith('john');
    expect(mockCustomerBackendService.findCustomers).toHaveBeenCalledWith('');
  });
});
