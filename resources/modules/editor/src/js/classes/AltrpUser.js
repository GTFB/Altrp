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
   * @param {array} permissions
   * @param {boolean} strict
   * $return {boolean}
   */
  hasPermissions(permissions = [], strict = true){
    if(! _.isArray(permissions)){
      permissions = [permissions];
    }
    if(!permissions.length && ! strict){
      return true
    }
    let ownPermissions = this.getProperty('permissions', []);
    let result =  _.find(ownPermissions, ownPermission => {
      return _.find(permissions, permission => {
        if(parseInt(permission)){
          return parseInt(permission) === parseInt(ownPermission.id);
        }
        if(_.isString(permission)){
          return permission === ownPermission.name;
        }
      });
    });

    return result
  }
  /**
   * Проверяет наличие роли у пользователя
   * @param {array} roles
   * @param {boolean} strict
   * $return {boolean}
   */
  hasRoles(roles = [], strict = true){
    if(! _.isArray(roles)){
      roles = [roles];
    }
    if(!roles.length && ! strict){
      return true
    }
    let ownRoles = this.getProperty('roles', []);
    return _.find(ownRoles, ownRole => {
      return _.find(roles, role => {
        if(parseInt(role)){
          return parseInt(role) === parseInt(ownRole.id);
        }
        if(_.isString(role)){
          return role === ownRole.name;
        }
      });
    });
  }

  /**
   * Проверяет доступ пользователя по необходимым роля и разрешениям
   * @param {array} permissions
   * @param {array} roles
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
