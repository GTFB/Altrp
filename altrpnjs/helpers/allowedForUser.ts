import User from 'App/Models/User';
import data_get from './data_get';
import Role from 'App/Models/Role';
import Permission from 'App/Models/Permission';
export default function allowedForUser(settings: any, user: User | null | undefined): boolean {
  let result = true;
  const { conditional_display_choose } = settings;
  if (!conditional_display_choose) {
    return result;
  }
  if (conditional_display_choose === 'all') {
    return result;
  }

  if (conditional_display_choose === 'guest') {
    return !user;
  }

  if (conditional_display_choose === 'auth') {
    result = !!user;
  }
  if (!(settings['conditional_roles']?.length || settings['conditional_permissions']?.length)) {
    return result;
  }
  const roles = data_get(settings, 'conditional_roles', []);
  const permissions = data_get(settings, 'conditional_permissions', []);

  if ((roles.length || permissions.length) && !user) {
    return false;
  }

  if (roles) {
    return !!roles.filter((roleName) => {
      // @ts-ignore
      return (
        user.roles
          .map((role: Role) => {
            if (typeof roleName === 'string') {
              return role.name;
            }
            return role.id;
          })
          .indexOf(roleName) !== -1
      );
    })?.length;
  }

  if (permissions) {
    return !!permissions.filter((permissionName) => {
      // @ts-ignore
      return (
        user.permissions
          .map((permission: Permission) => {
            if (typeof permissionName === 'string') {
              return permission.name;
            }
            return permission.id;
          })
          .indexOf(permissionName) !== -1
      );
    })?.length;
  }
  return result;
}
