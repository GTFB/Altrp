/**
 * Check and use semver version num format
 *
 * @param version
 * @return string
 */
import empty from './empty';
import preg_match from './preg_match';

export default function checkAndUseSemVer(version) {
  let semver = '0.0.0';
  if (!empty(version)) {
    let numPattern = '([0-9]+)';
    if (preg_match('#^' + numPattern + '.' + numPattern + '.' + numPattern + '$#', version)) {
      semver = version;
    } else {
      if (preg_match('#^' + numPattern + '.' + numPattern + '$#', version)) {
        semver = version + '.0';
      } else {
        if (preg_match('#^' + numPattern + '$#', version)) {
          semver = version + '.0.0';
        } else {
          semver = '0.0.0';
        }
      }
    }
  }

  return semver;
}
