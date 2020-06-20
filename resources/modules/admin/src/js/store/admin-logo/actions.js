export const SET_LOGO = 'SET_LOGO';

export function setAdminLogo(logoData){
  return {
    logoData,
    type: SET_LOGO,
  }
}

