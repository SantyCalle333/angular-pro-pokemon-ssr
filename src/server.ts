import { AngularAppEngine, createRequestHandler } from '@angular/ssr';
import { getAllowedHosts, getContext, getTrustProxyHeaders } from '@netlify/angular-runtime/app-engine.js';

const angularAppEngine = new AngularAppEngine({
  allowedHosts: [...getAllowedHosts(), 'localhost', '192.168.0.200', '192.168.183.1', '192.168.138.1'],
  trustProxyHeaders: getTrustProxyHeaders(),
});

export async function netlifyAppEngineHandler(request: Request): Promise<Response> {
  const context = getContext();

  // Example API endpoints can be defined here.
  // Uncomment and define endpoints as necessary.
  // const pathname = new URL(request.url).pathname
  // if (pathname === '/api/hello') {
  //   return Response.json({ message: 'Hello from the API' });
  // }

  const result = await angularAppEngine.handle(request, context);
  // Si Angular no maneja la ruta dinámicamente (por ejemplo, porque es una ruta pre-renderizada estática),
  // result será null. En ese caso, le decimos a Netlify que busque el archivo estático usando context.next().
  return result || (context && context.next ? context.next() : new Response('Not found', { status: 404 }));
}

/**
 * The request handler used by the Angular CLI (dev-server and during build).
 */
export const reqHandler = createRequestHandler(netlifyAppEngineHandler);
