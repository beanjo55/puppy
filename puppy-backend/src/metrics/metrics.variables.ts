import * as client from 'prom-client';

export default function init() {
  return {
    clientRequested: new client.Counter({
      name: 'client_requested',
      help: 'Number of times a client has been requested',
      labelNames: ['clientId'] as const,
    }),

    clientLoggedIn: new client.Counter({
      name: 'client_logged_in',
      help: 'Number of times a client has been logged in',
      labelNames: ['clientId'] as const,
    }),

    clientCreated: new client.Counter({
      name: 'client_created',
      help: 'Number of times a client has been created',
      labelNames: ['clientId'] as const,
    }),

    instancesLoaded: new client.Gauge({
      name: 'instances_loaded',
      help: 'Number of instances loaded',
    }),
  };
}
