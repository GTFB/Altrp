export default function is_object(mixed_var: any): boolean {
  return mixed_var instanceof Object && !(mixed_var instanceof Array);
}
