import { ShieldConfig } from '@ioc:Adonis/Addons/Shield';

export const csrf: ShieldConfig['csrf'] = {
  enabled: true,
  exceptRoutes: [],
  enableXsrfCookie: true,
  methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
};
