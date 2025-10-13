// lib/server-urls.ts (SERVER-ONLY)
export function getServerBaseUrl(request?: Request): string {
    // If we have an explicit environment variable, use it
    if (process.env.NEXT_PUBLIC_APP_URL) {
      return process.env.NEXT_PUBLIC_APP_URL;
    }
    
    // For Vercel deployments
    if (process.env.VERCEL_URL) {
      return `https://${process.env.VERCEL_URL}`;
    }
    
    // For Vercel preview deployments
    if (process.env.NEXT_PUBLIC_VERCEL_URL) {
      return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
    }
    
    // If we have a request object, use the host header
    if (request) {
      const host = request.headers.get('host');
      const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
      if (host) {
        return `${protocol}://${host}`;
      }
    }
    
    // Fallback for local development
    return "http://localhost:3000";
  }
  
  export function getServerApiUrl(path: string = '', request?: Request): string {
    const baseUrl = getServerBaseUrl(request);
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${baseUrl}${normalizedPath}`;
  }