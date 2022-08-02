import { validate } from 'uuid';

export default function validGuid(string) {
  return validate(string);
}
