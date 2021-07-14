import loadAdminBar from "../../functions/load-admin-bar";
import loadEmailRenderer from "../../functions/load-email-renderer";
/**
 * @class HAltrp
 */


class HAltrp {
  constructor() {
    loadAdminBar();
    window.addEventListener('click', this.onUserAction);
    window.addEventListener('scroll', this.onUserAction);
    window.addEventListener('mouseenter', this.onUserAction);
    window.addEventListener('mousemove', this.onUserAction);
    window.addEventListener('touchmove', this.onUserAction);
    window.addEventListener('touchstart', this.onUserAction);
    window.addEventListener('touchend', this.onUserAction);
    this.actionComponents = _.get(__altrp_settings__, 'action_components', [])
  }

  onUserAction = async (e)=>{

    window.removeEventListener('click', this.onUserAction);
    window.removeEventListener('scroll', this.onUserAction);
    window.removeEventListener('mouseenter', this.onUserAction);
    window.removeEventListener('mousemove', this.onUserAction);
    window.removeEventListener('touchmove', this.onUserAction);
    window.removeEventListener('touchstart', this.onUserAction);
    window.removeEventListener('touchend', this.onUserAction);
    if(this.actionComponents.find((action => action === 'toggle_popup'))){
      let loadPopups = (await import('../../functions/load-popups')).default;
      loadPopups();
    }
  }

  loadComponents(){
    loadAdminBar();
    if(this.actionComponents.find('email')){
      loadEmailRenderer();
    }
  }
}

window.hAltrp =  new HAltrp();

