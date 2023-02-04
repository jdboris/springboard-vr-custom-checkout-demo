import { v4 as uuid } from "uuid";

// Simulate a database model...
export default class Checkout {
  // Returns an array containing every Checkout that matches ALL the given filters
  static find(filters) {
    return checkouts.filter((checkout) =>
      Object.entries(filters).reduce(
        (isMatch, [key, value]) => isMatch && checkout[key] == value,
        true
      )
    );
  }

  constructor(data) {
    Object.assign(this, data);
  }

  save() {
    if (!this.id) {
      this.id = uuid();
      checkouts.push(this);
      return;
    }

    Object.assign(checkouts.find((x) => x.id == this.id) || {}, this);
  }
}

const checkouts = [];
