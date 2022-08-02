/**
 * Get the portion of a string before the first occurrence of a given value.
 */
export default function before(subject: string, search: string) {
  return search === '' ? subject : subject.split(search)[0];
}
