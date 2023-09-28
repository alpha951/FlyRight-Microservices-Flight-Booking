# Notification Service

## Description
This service is responsible for sending notifications to users. When a booking is made using the `Booking-Service` the `Notification-Service` will send a notification to the user.

## How to run
1. Clone the repository
2. Run `npm install`
3. Setup the `.env` file as described in the `example.env` file. You will need to setup nodemailer fo that.
3. Run `npm start`
5. Default port is `6000`

## API Endpoints

- POST `/api/v1/tickets`
    - Description: Sends an email notification to the user
    - Body: 
        - `recipientEmail`: The email of the user
        - `subject`: The subject of the email
        - `content`: The message of the email
