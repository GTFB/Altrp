export const BAR = "CHART/BAR";
export const PIE = "CHART/PIE";
export const DONUT = "CHART/DONUT";
export const AREA = "CHART/AREA";
export const LINE = "CHART/LINE";
export const TABLE = "CHART/TABLE";

export const widgetTypes = [
  { name: "Столбцы", value: BAR },
  { name: "Круговая диаграмма", value: PIE },
  { name: "Кольцевая диаграмма", value: DONUT },
  { name: "Линии", value: LINE },
  { name: "Графики", value: AREA },
  { name: "Таблица", value: TABLE },
];

export const getTypeName = (value) => widgetTypes.find((w) => w.value === value).name;
