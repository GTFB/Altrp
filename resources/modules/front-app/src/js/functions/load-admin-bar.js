/**
 * Загрузка админбара
 */
export default function loadAdminBar() {
  let isAdmin = window.appStore.getState().currentUser.hasRoles(['admin']);
  if(!isAdmin && document.querySelector('.front-app_admin')){
    document.querySelector('.front-app_admin').classList.remove('front-app_admin')
  } else if(isAdmin && ! document.querySelector('.front-app_admin')){
    document.querySelector('.front-app').classList.add('front-app_admin')
  }
  console.error(window.appStore.getState().currentUser.data);

  if(document.querySelector('.front-app_admin')) {
    import (/* webpackChunkName: 'AdminBar' */'../components/AdminBar').then(module => {
      console.log(module);
      const AdminBar = module.default;
      const adminContainer = document.createElement('div');
      document.body.appendChild(adminContainer);
      ReactDOM.render(<AdminBar data={window.current_user || {}} areas={window.page_areas || []} idPage={window.page_id}/>, adminContainer);
    });
  }
}
