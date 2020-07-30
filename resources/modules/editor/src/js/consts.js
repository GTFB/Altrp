const CONSTANTS = {
  TEMPLATE_UPDATED: 'TEMPLATE_UPDATED',
  TEMPLATE_NEED_UPDATE: 'TEMPLATE_NEED_UPDATE',
  TEMPLATE_SAVING: 'TEMPLATE_SAVING',
  DEFAULT_BREAKPOINT: 'DEFAULT_BREAKPOINT',
  SCREENS: [

    {
      icon: 'wide_screen',
      name: 'DEFAULT_BREAKPOINT',
      id: 1,
      width: '100%',
      mediaQuery: ''
    },
    {
      icon: 'desktop',
      name: "Desktop",
      id: 2,
      width: '1440px',
      mediaQuery: '@media screen and (max-width: 1440px)'
    },
    {
      icon: 'laptop',
      name: "Laptop",
      id: 3,
      width: '1024px',
      mediaQuery: '@media screen and (max-width: 1024px)'
    },
    {
      icon: 'tablet',
      name: "Tablet",
      id: 4,
      width: '768px',
      mediaQuery: '@media screen and (max-width: 768px)'
    },
    {
      icon: 'big_phone',
      name: "Big-Phone",
      id: 5,
      width: '450px',
      mediaQuery: '@media screen and (max-width: 450px)'
    },
    {
      icon: 'small_phone',
      name: "Small-Phone",
      id: 6,
      width: '320px',
      mediaQuery: '@media screen and (max-width: 320px)'
    },
  ]
};
export default CONSTANTS;