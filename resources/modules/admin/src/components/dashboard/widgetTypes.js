export const BAR = "CHART/BAR";
export const PIE = "CHART/PIE";
export const DONUT = "CHART/DONUT";
export const AREA = "CHART/AREA";
export const LINE = "CHART/LINE";
export const TABLE = "CHART/TABLE";
export const POINT = "CHART/POINT";

export const widgetTypes = [
  { name: "Столбцы", value: BAR },
  { name: "Круговая", value: PIE },
  { name: "Графики", value: LINE },
  { name: "Таблица", value: TABLE },
  { name: "Точечная", value: POINT }
];

export const getTypeName = value =>
  widgetTypes.find(w => w.value === value).name;

export const customStyle = [
  "#FFEC00",
  "#6F6E6E",
  "#F6E36A",
  "#979797",
  "#FEF367",
  "#979678",
  "#CFBF00",
  "#706B46",
  "#A59103",
  "#444444"
];
