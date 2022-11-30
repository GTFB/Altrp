import {ShieldConfig} from "@ioc:Adonis/Addons/Shield";

export  const  csrf: ShieldConfig['csrf'] = {

  enabled: true,
  exceptRoutes: (ctx) => {

    return ctx.request.url().includes('/api/') || ctx.request.url().includes('/wsaltrp')
  },

  enableXsrfCookie: true,
  methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
}


