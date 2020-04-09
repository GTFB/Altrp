export const CHANGE_TEMPLATE_STATUS = 'CHANGE_TEMPLATE_STATUS';

export function changeTemplateStatus(status) {
  return {
    type: CHANGE_TEMPLATE_STATUS,
    status
  };
}

