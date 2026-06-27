import { Location } from '@angular/common';
import { routes } from './app.routes';
import { provideRouter, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';

import AboutPageComponent from './pages/about/about-page.component';
import PricingPageComponent from './pages/pricing/pricing-page.component';
import PokemonsPageComponent from './pages/pokemons/pokemons-page.component';

describe('App Routes', () => {
  let router: Router;
  let location: Location;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes)],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('should be defined', () => {
    expect(routes).toBeDefined();
    expect(routes.length).toBe(6);
  });

  it('should contain all defined routes', () => {
    expect(routes.length).toBe(6);
  });

  it('should render AboutPageComponent when path is /about', async () => {
    const aboutRoute = routes.find((route) => route.path === 'about')!;
    expect(aboutRoute).toBeDefined();

    const component = (await aboutRoute.loadComponent!()) as any;
    expect(component.default).toBe(AboutPageComponent);
  });

  it('should navigate to "/pokemons" when default path is set', async () => {
    await router.navigate(['/']);
    expect(location.path()).toBe('/pokemons');
  });

  it('should render PricingPageComponent when path is /pricing', async () => {
    const route = routes.find((route) => route.path === 'pricing')!;
    expect(route).toBeDefined();

    const component = (await route.loadComponent!()) as any;
    expect(component.default).toBe(PricingPageComponent);
  });

  it('should navigate to "/pokemons" and render PokemonsPageComponent', async () => {
    await router.navigate(['/pokemons']);
    expect(location.path()).toBe('/pokemons');
  });

  it('should render PokemonsPageComponent when path is /pokemons', async () => {
    const route = routes.find((route) => route.path === 'pokemons')!;
    expect(route).toBeDefined();

    const component = (await route.loadComponent!()) as any;
    expect(component.default).toBe(PokemonsPageComponent);
  });

  it('should redirect to /pokemons when path is unknown', async () => {
    await router.navigate(['/123asdjkhasd']);
    expect(location.path()).toBe('/pokemons');
  });
});
