/**
 * Имеет интерфейс пользователя
 * @class AltrpUser
 */

import AltrpModel from "./AltrpModel";

class AltrpUser extends AltrpModel{
  /**
   * Проверяет является ли пользователь гостем
   * @return {boolean}
   */
  isGuest(){
    return this.getProperty('is_guest', false)
  }
  /**
   * Проверяет является ли авторизованным пользователем
   * @return {boolean}
   */
  isAuth(){
    return this.getProperty('created_at', false)
  }

  /**
   * Проверяет наличие permission у пользователя
   * @param {[]} permissions
   * $return {boolean}
   */
  hasPermissions(permissions = []){
    if(! _.isArray(permissions)){
      permissions = [permissions];
    }
    let ownPermissions = this.getProperty('permissions', []);
    return _.find(ownPermissions, ownPermission => {
      return _.find(permissions, role => {
        return parseInt(role) === parseInt(ownPermission.id);
      });
    });
  }
  /**
   * Проверяет наличие роли у пользователя
   * @param {[]} roles
   * $return {boolean}
   */
  hasRoles(roles = []){
    if(! _.isArray(roles)){
      roles = [roles];
    }
    let ownRoles = this.getProperty('roles', []);
    return _.find(ownRoles, ownRole => {
      return _.find(roles, role => {
        return parseInt(role) === parseInt(ownRole.id);
      });
    });
  }

  /**
   * Проверяет доступ пользователя по необходимым роля и разрешениям
   * @param {[]} permissions
   * @param {[]} roles
   * $return {boolean}
   *
   */
  checkUserAllowed(permissions = [], roles = []){
    if(! this.isAuth()){
      return false;
    }
    roles = _.isArray(roles) ? roles : [];
    permissions = _.isArray(permissions) ? permissions : [];
    if(! (permissions.length || roles.length)){
      return true;
    }
    if(this.hasPermissions(permissions)){
      return true;
    }
    if(this.hasRoles(roles)){
      return true;
    }
    return false;
  }
}

export default AltrpUser