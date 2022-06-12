import loadAdminBar from "../../functions/load-admin-bar";
import loadEmailRenderer from "../../functions/load-email-renderer";
/**
 * @class HAltrp
 */


class HAltrp {
  constructor() {
    loadAdminBar();
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
  }

  loadComponents(){
    loadAdminBar();
    if(this.actionComponents.find('email')){
      loadEmailRenderer();
    }
  }
}

window.hAltrp =  new HAltrp();

