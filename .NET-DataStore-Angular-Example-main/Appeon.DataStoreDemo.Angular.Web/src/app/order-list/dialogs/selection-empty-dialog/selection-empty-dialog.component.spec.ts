import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectionEmptyDialogComponent } from './selection-empty-dialog.component';

describe('SelectionEmptyDialogComponent', () => {
  let component: SelectionEmptyDialogComponent;
  let fixture: ComponentFixture<SelectionEmptyDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectionEmptyDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectionEmptyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
