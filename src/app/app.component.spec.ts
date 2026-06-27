import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  template: `
    <nav class="test-class">
      <a href="test-link">Test Link</a>
    </nav>
  `,
})
class MockNavbarComponent {}

describe('AppComponent', () => {
  let fixture!: ComponentFixture<AppComponent>;
  let app!: AppComponent;

  beforeEach(async () => {                                            //tecnicas de renderizacion de componentes
    // ! #1
     await TestBed.configureTestingModule({
        imports: [AppComponent],
        providers: [provideRouter([])],
      }).compileComponents();

    // ! #2
    // await TestBed.configureTestingModule({
    //   imports: [AppComponent],
    //   providers: [provideRouter([])],
    // })
    //   .overrideComponent(AppComponent, {
    //     add: {
    //       imports: [MockNavbarComponent],
    //     },
    //     remove: {
    //       imports: [NavbarComponent],
    //     },
    //   })
    //   .compileComponents();

  // ! #3
 //  TestBed.overrideComponent(AppComponent, {
//     set: {
 //      imports: [MockNavbarComponent],
 //      schemas: [CUSTOM_ELEMENTS_SCHEMA],
 //    },
//   });

   fixture = TestBed.createComponent(AppComponent);
   app = fixture.componentInstance;
});

  it('should create the app', () => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.componentInstance;

    // console.log(fixture.nativeElement.innerHTML);

    expect(app).toBeTruthy();
  });

  it('should render the navbar and router-outlet', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('app-navbar')).toBeTruthy();
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });

  it('should match snapshot', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.innerHTML).toMatchSnapshot();
  });
});
