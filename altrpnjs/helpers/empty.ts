import is_array from './is_array';

export default function empty(mixed_var: any): boolean {
  return (
    mixed_var === '' ||
    mixed_var === 0 ||
    mixed_var === '0' ||
    mixed_var === null ||
    mixed_var === false ||
    (is_array(mixed_var) && mixed_var.length === 0)
  );
}
