import { v4 as uuid } from "uuid";

// Simulate a database model...
export default class Location {
  // Returns an array containing every Location that matches ALL the given filters
  static find(filters) {
    return locations.filter((location) =>
      Object.entries(filters).reduce(
        (isMatch, [key, value]) => isMatch && location[key] == value,
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
      locations.push(this);
      return;
    }

    Object.assign(locations.find((x) => x.id == this.id) || {}, this);
  }
}

const locations = [
  // Seed the collection with one sample Location.
  new Location({
    id: uuid(),
    reservationUUID: "760bb4b0-a240-11ed-b01f-c72fb11fad92",
    webhooks: {
      "checkout.created": "http://localhost:5000/v1/checkouts",
    },
    name: "HoloLounge Asakusa",
    currency: "JPY",
    experiences: [
      {
        id: uuid(),
        name: "VR Gaming",
        prices: [{ id: uuid(), duration: 60, price: 1800 }],
      },
    ],
  }),
];
