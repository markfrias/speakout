import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagArticlesComponent } from './tag-articles.component';

describe('TagArticlesComponent', () => {
  let component: TagArticlesComponent;
  let fixture: ComponentFixture<TagArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
