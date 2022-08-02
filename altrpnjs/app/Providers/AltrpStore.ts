import * as _ from 'lodash';

export default class AltrpStore {
  data: Object = {};

  clearAltrpStore(property: string | null): void {
    if (!property) {
      this.data = {};
      return;
    }
    if (this.data.hasOwnProperty(property)) {
      _.unset(this.data, property);
    }
  }
  setProperty(property: string, value: any) {
    _.set(this.data, property, value);
  }
}
