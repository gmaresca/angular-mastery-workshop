import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedModule } from '../shared.module';

import { TagListComponent } from './tag-list.component';

@Component({
  template: `
    <my-org-tag-list [tags]="tags" (add)="addTag($event)" (remove)="removeTag($event)">
    </my-org-tag-list>
  `,
})
export class TestHostComponent {
  tags: string[] = [];
  addTag(tag: string) {
    this.tags = [...this.tags, tag];
  }
  removeTag(tag: string) {
    this.tags = this.tags.filter(t => t !== tag);
  }
}

describe('TagListComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  const getAddTagInput = () => fixture.debugElement.query(By.css('input'));
  const getAddTagButton = () => fixture.debugElement.query(By.css('button[mat-mini-fab]'));
  const getRemoveTagButton = tagIndex =>
    fixture.debugElement.queryAll(By.css('my-org-tag-list > div button'))[tagIndex];
  const getTags = () => fixture.debugElement.queryAll(By.css('my-org-tag-list > div'));
  const getTag = tagIndex =>
    fixture.debugElement
      .queryAll(By.css('my-org-tag-list > div > span'))
      [tagIndex].nativeElement.textContent.trim();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [NoopAnimationsModule, SharedModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    spyOn(component, 'addTag').and.callThrough();
    spyOn(component, 'removeTag').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders tags', () => {
    component.tags = ['a', 'b', 'c'];
    fixture.detectChanges();

    expect(getTags().length).toBe(3);
  });

  it('does NOT add tag when no imput was provided', () => {
    expect(getTags().length).toBe(0);

    getAddTagButton().nativeElement.click();
    fixture.detectChanges();

    expect(getTags().length).toBe(0);
    expect(component.addTag).toHaveBeenCalledTimes(0);
  });

  it('adds a tag', () => {
    expect(getTags().length).toBe(0);

    getAddTagInput().nativeElement.value = 'some-tag';
    getAddTagInput().nativeElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    getAddTagButton().nativeElement.click();
    fixture.detectChanges();

    expect(getTags().length).toBe(1);
    expect(component.addTag).toHaveBeenCalledTimes(1);
    expect(component.addTag).toHaveBeenCalledWith('some-tag');
  });

  it('adds a tag with ENTER', () => {
    expect(getTags().length).toBe(0);

    getAddTagInput().nativeElement.value = 'some-tag';
    getAddTagInput().nativeElement.dispatchEvent(new Event('keyup'));
    fixture.detectChanges();

    getAddTagInput().triggerEventHandler('keydown.enter', {});
    fixture.detectChanges();

    expect(getTags().length).toBe(1);
    expect(component.addTag).toHaveBeenCalledTimes(1);
    expect(component.addTag).toHaveBeenCalledWith('some-tag');
  });

  it('removes tag', () => {
    component.tags = ['a', 'b', 'c'];
    fixture.detectChanges();

    expect(getTags().length).toBe(3);

    getRemoveTagButton(1).nativeElement.click();
    fixture.detectChanges();

    expect(getTags().length).toBe(2);
    expect(getTag(0)).toBe('a');
    expect(getTag(1)).toBe('c');
  });
});
