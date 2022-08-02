/**
 * Return the remainder of a string after the first occurrence of a given value.
 */
export default function after(subject: string, search: string) {
  const _subject = subject.split(search);
  return search == '' ? subject : _subject[_subject.length - 1];
}
