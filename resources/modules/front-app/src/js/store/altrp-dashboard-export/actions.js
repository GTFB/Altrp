export const DASHBOARD_EXPORT = "DASHBOARD_EXPORT";

export function exportDashboard(payload) {
  return {
    type: DASHBOARD_EXPORT,
    payload
  };
}
