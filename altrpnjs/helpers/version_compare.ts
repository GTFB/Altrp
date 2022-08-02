import { compare } from 'compare-versions';
export default function version_compare(version1, version2, operator?) {
  return compare(version1, version2, operator);
}
