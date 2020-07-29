const CONSTANTS = {
  TEMPLATE_UPDATED: 'TEMPLATE_UPDATED',
  TEMPLATE_NEED_UPDATE: 'TEMPLATE_NEED_UPDATE',
  TEMPLATE_SAVING: 'TEMPLATE_SAVING',
  DEFAULT_BREAKPOINT: 'DEFAULT_BREAKPOINT',
  SCREENS: [
    { icon: 'desktop', name: "Desktop", id: 1, width: '1440px', css: '@media screen and (max-width: 1440px)' },
    { icon: 'wide_screen', name: "Wide-Screen", id: 2, width: '100%', css: '' },
    { icon: 'laptop', name: "Laptop", id: 3, width: '1024px', css: '@media screen and (max-width: 1024px)' },
    { icon: 'tablet', name: "Tablet", id: 4, width: '768px', css: '@media screen and (max-width: 768px)' },
    { icon: 'big_phone', name: "Big-Phone", id: 5, width: '450px', css: '@media screen and (max-width: 450px)' },
    { icon: 'small_phone', name: "Small-Phone", id: 6, width: '320px', css: '@media screen and (max-width: 320px)' },
  ]
};
export default CONSTANTS;