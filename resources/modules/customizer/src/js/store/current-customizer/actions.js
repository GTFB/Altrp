export const SET_CURRENT_ROBOT = "SET_CURRENT_ROBOT";
export const SET_CHART_IN_CURRENT_ROBOT = "SET_CHART_IN_CURRENT_ROBOT";

export function setCurrentCustomizer(data) {
  return {
    type: SET_CURRENT_ROBOT,
    data
  };
}
export function setChartInCurrentCustomizer(data) {
  return {
    type: SET_CHART_IN_CURRENT_ROBOT,
    data
  };
}
