export const environment = {
    production: false,
    apiUrl: 'http://localhost:3000/api', // Base URL for your backend API
    jwt: {
      allowedDomains: ['localhost:3000'], // Domain for the backend
      disallowedRoutes: ['http://localhost:3000/api/auth'], // Routes that don't require token
    },
  };
  