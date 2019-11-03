import { Component, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'my-org-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
})
export class TagListComponent implements OnInit {
  @Input() tags: string[];
  @Output() add = new Subject<string>();
  @Output() remove = new Subject<string>();

  newTag: string;

  constructor() {}

  ngOnInit() {
    this.newTag = '';
  }

  updateNewTag(event: KeyboardEvent) {
    this.newTag = (event.target as HTMLInputElement).value;
  }

  addTag() {
    if (this.newTag.length) {
      this.add.next(this.newTag);
      this.newTag = '';
    }
  }

  removeTag(tag: string) {
    this.remove.next(tag);
  }
}
