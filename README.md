# Springboard VR Custom Checkout Demo

This is a simple demo of a "Custom" payment checkout solution for Springboard using Express. It involves Springboard's Express app (`springboard-vr`), and the operator's Express app (`springboard-vr-operator`).

This checkout flow involves these steps:

1. Springboard's app creates a booking record marked "not completed"
2. Springboard securely sends the checkout data to the operator's app
3. Springboard redirects the user to the checkout page of the operator's app
4. The operator's app tells Springboard when the checkout is completed
5. Springboard marks the booking record as "completed"

# Installation

PREREQUISITE: [Install Node.js](https://nodejs.org/en "Node.js downloads page")

1. Clone this repository

2. In `springboard-vr/server`...

   ```shell
   npm i
   ```

3. In `springboard-vr-operator/server`...

   ```shell
   npm i
   ```

# Setup

If necessary, change the ports and URLs in the `.env` files...

- `springboard-vr/client/.env`
- `springboard-vr/server/.env`
- `springboard-vr-operator/client/.env`
- `springboard-vr-operator/server/.env`

# Usage

1. In `springboard-vr/server`...

   ```shell
   npm run start
   ```

2. In `springboard-vr-operator/server`...

   ```shell
   npm run start
   ```

3. In your browser, open [http://localhost:4000/reserve/760bb4b0-a240-11ed-b01f-c72fb11fad92](http://localhost:4000/reserve/760bb4b0-a240-11ed-b01f-c72fb11fad92 "Springboard's booking app") (Springboard's booking app)

4. Visit [http://localhost:4000/v1/bookings](http://localhost:4000/v1/bookings "Springboard's bookings list") (Springboard's bookings list) at any time. After completing the checkout flow, it should reflect the new booking.

NOTE: The demo stores all data in memory, so restarting the apps will clear the data.
