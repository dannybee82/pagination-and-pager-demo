import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleColumnComponent } from './toggle-column.component';
import { beforeEach, describe, expect, it } from "Vitest";

describe('ToggleColumnComponent', () => {
  let component: ToggleColumnComponent;
  let fixture: ComponentFixture<ToggleColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleColumnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});