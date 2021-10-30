export const SET_CURRENT_CUSTOMIZER = "SET_CURRENT_CUSTOMIZER";
export const SET_CHART_IN_CURRENT_CUSTOMIZER = "SET_CHART_IN_CURRENT_CUSTOMIZER";

export function setCurrentCustomizer(data) {
  return {
    type: SET_CURRENT_CUSTOMIZER,
    data
  };
}
export function setChartInCurrentCustomizer(data) {
  return {
    type: SET_CHART_IN_CURRENT_CUSTOMIZER,
    data
  };
}
