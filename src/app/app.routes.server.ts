import { RenderMode, ServerRoute, PrerenderFallback } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'pokemon/:id',
    renderMode: RenderMode.Prerender,
    fallback: PrerenderFallback.Server,
    async getPrerenderParams() {
      // Fetch the first 151 pokemons to pre-render their detail pages
      // This will generate folders like /pokemon/bulbasaur, /pokemon/1, etc.
      const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
      const data = await res.json();
      
      const nameParams = data.results.map((p: any) => ({ id: p.name }));
      const idParams = data.results.map((p: any, i: number) => ({ id: `${i + 1}` }));
      
      return [...nameParams, ...idParams];
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
