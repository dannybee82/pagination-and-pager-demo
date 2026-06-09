import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleColumn } from './toggle-column';
import { beforeEach, describe, expect, it } from "Vitest";

describe('ToggleColumnComponent', () => {
  let component: ToggleColumn;
  let fixture: ComponentFixture<ToggleColumn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleColumn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToggleColumn);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});