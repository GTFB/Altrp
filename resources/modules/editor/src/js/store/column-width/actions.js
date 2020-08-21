export const CONTROLLER_COLWIDTH = 'CONTROLLER_COLWIDTH';

export function changeWidthColumns(width) {
  return {
    type: CONTROLLER_COLWIDTH,
    data: {
      width
    }
  };
}
