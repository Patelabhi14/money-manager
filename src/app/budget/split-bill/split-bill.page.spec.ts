import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SplitBillPage } from './split-bill.page';

describe('SplitBillPage', () => {
  let component: SplitBillPage;
  let fixture: ComponentFixture<SplitBillPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitBillPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SplitBillPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
