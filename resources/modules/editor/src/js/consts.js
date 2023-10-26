const CONSTANTS = {
  TEMPLATE_UPDATED: "TEMPLATE_UPDATED",
  TEMPLATE_PUBLISHED: "TEMPLATE_PUBLISHED",
  TEMPLATE_NEED_UPDATE: "TEMPLATE_NEED_UPDATE",
  TEMPLATE_SAVING: "TEMPLATE_SAVING",
  DEFAULT_BREAKPOINT: "DEFAULT_BREAKPOINT",
  DEFAULT_AREAS: [
    'content',
    'footer',
    'header',
    'popup',
    'email',
    'card',
    'reports',
  ],
  SCREENS: [
    {
      icon: "wide_screen",
      name: "DEFAULT_BREAKPOINT",
      id: 1,
      width: "100%",
      fullMediaQuery: "",
      mediaQuery: ""
    },
    {
      icon: "desktop",
      name: "Desktop",
      id: 3,
      width: "1440px",
      fullMediaQuery:
        "@media screen and (max-width: 1440px) and (min-width: 1025px)",
      mediaQuery: "@media screen and (max-width: 1440px)"
    },
    {
      icon: "laptop",
      name: "Laptop",
      id: 4,
      fullMediaQuery:
        "@media screen and (max-width: 1024px) and (min-width: 769px)",
      width: "1024px",
      mediaQuery: "@media screen and (max-width: 1024px)"
    },
    {
      icon: "tablet",
      name: "Tablet",
      id: 5,
      fullMediaQuery:
        "@media screen and (max-width: 768px) and (min-width: 451px)",
      width: "768px",
      mediaQuery: "@media screen and (max-width: 768px)"
    },
    {
      icon: "big_phone",
      name: "Big-Phone",
      id: 6,
      width: "450px",
      fullMediaQuery:
        "@media screen and (max-width: 450px) and (min-width: 321px)",
      mediaQuery: "@media screen and (max-width: 450px)"
    },
    {
      icon: "small_phone",
      name: "Small-Phone",
      id: 7,
      fullMediaQuery: "@media screen and (max-width: 320px)",
      width: "320px",
      mediaQuery: "@media screen and (max-width: 320px)"
    }
  ],
  SCREENS_ADDITIONAL: [
    {
      icon: "2K+",
      name: "screen_2K+",
      id: 2,
      width: "100%",
      fullMediaQuery: "@media screen and (min-width: 1921px)",
      mediaQuery: "@media screen and (min-width: 1921px)"
    },
  ],
  BUTTONS: [
    { title: "N", value: "" },
    { title: "H", value: ":hover" },
    { title: "A", value: ".active" },
    { title: "F", value: ":focus" },
    { title: "E", value: ".state-error" },
    { title: "D", value: ".state-disabled" },
  ]
};
export default CONSTANTS;
