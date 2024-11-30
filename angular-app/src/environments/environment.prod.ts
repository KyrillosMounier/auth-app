export const environment = {
    production: true,
    apiUrl: 'https://your-production-api.com/api',
    jwt: {
      allowedDomains: ['your-production-api.com'], // Production backend domain
      disallowedRoutes: ['https://your-production-api.com/api/auth'],
    },
  };
  