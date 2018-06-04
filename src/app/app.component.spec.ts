import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthApiServiceMockSuccess } from '../testing/service-mockups';
import { AuthApiService } from './services/auth-api.service';
import { LoggerService } from './services/logger.service';
import { CookieService } from 'ngx-cookie';


let cookieServiceStub: Partial<CookieService>;
cookieServiceStub = { get : (key:string) => {return null;},
  put : (key:string,value:string) => {}
};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports:[RouterTestingModule, FormsModule],
      providers:    [ 
        {provide: AuthApiService, useValue: new AuthApiServiceMockSuccess() },
        {provide: LoggerService, useValue: new LoggerService() },
        {provide: CookieService, useValue: cookieServiceStub },
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Node Auth Form');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a.navbar-brand').textContent).toContain('Node Auth Form');
  }));
});
