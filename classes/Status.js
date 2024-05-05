/* Enum pattern for action status */
export default class Status {
  static active = new Status("active");
  static closed = new Status("closed");
  static staged = new Status("staged");

  constructor(name) {
    this.name = name;
  }
  toString() {
    return `${this.name}`;
  }
}
