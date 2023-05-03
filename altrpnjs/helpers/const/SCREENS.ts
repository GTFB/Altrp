
const SCREENS:{
  icon:string,
  name: string,
  id: number,
  width: string,
  fullMediaQuery: string,
  mediaQuery: string

}[] = [
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
    id: 2,
    width: "1440px",
    fullMediaQuery:
      "@media screen and (max-width: 1440px) and (min-width: 1025px)",
    mediaQuery: "@media screen and (max-width: 1440px)"
  },
  {
    icon: "laptop",
    name: "Laptop",
    id: 3,
    fullMediaQuery:
      "@media screen and (max-width: 1024px) and (min-width: 769px)",
    width: "1024px",
    mediaQuery: "@media screen and (max-width: 1024px)"
  },
  {
    icon: "tablet",
    name: "Tablet",
    id: 4,
    fullMediaQuery:
      "@media screen and (max-width: 768px) and (min-width: 451px)",
    width: "768px",
    mediaQuery: "@media screen and (max-width: 768px)"
  },
  {
    icon: "big_phone",
    name: "Big-Phone",
    id: 5,
    width: "450px",
    fullMediaQuery:
      "@media screen and (max-width: 450px) and (min-width: 321px)",
    mediaQuery: "@media screen and (max-width: 450px)"
  },
  {
    icon: "small_phone",
    name: "Small-Phone",
    id: 6,
    fullMediaQuery: "@media screen and (max-width: 320px) and (min-width: 1px)",
    width: "320px",
    mediaQuery: "@media screen and (max-width: 320px)"
  },
  {
    icon: "2K+",
    name: "screen_2K+",
    id: 7,
    width: "100%",
    fullMediaQuery: "@media screen and (min-width: 1921px)",
    mediaQuery: "@media screen and (min-width: 1921px)"
  },
]
export default SCREENS
