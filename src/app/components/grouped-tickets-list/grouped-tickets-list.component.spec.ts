import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupedTicketsListComponent } from './grouped-tickets-list.component';

describe('GroupedTicketsListComponent', () => {
  let component: GroupedTicketsListComponent;
  let fixture: ComponentFixture<GroupedTicketsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupedTicketsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupedTicketsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
