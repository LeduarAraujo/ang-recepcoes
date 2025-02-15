import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEspacoComponent } from './cadastro-espaco.component';

describe('CadastroEspacoComponent', () => {
  let component: CadastroEspacoComponent;
  let fixture: ComponentFixture<CadastroEspacoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEspacoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroEspacoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
