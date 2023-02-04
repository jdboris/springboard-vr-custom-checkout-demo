import { v4 as uuid } from "uuid";

// Simulate a database model...
export default class Booking {
  // Returns an array containing every Booking that matches ALL the given filters
  static find(filters) {
    return bookings.filter((booking) =>
      Object.entries(filters).reduce(
        (isMatch, [key, value]) => isMatch && booking[key] == value,
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
      bookings.push(this);
      return;
    }

    Object.assign(bookings.find((x) => x.id == this.id) || {}, this);
  }

  getTotalCost() {
    // Simulate calculating the total cost...
    return 1800;
  }
}

const bookings = [];
