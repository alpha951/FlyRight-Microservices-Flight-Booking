const { formatDateAndTimeWithDayName } = require("../helpers/datetime-helper");

function ReminderMailTemplate(ticket) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
          /* Reset some default styles to ensure consistent rendering */
          body, p {
              margin: 0;
              padding: 0;
          }
  
          body {
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
          }
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #ffffff;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }
  
          h1 {
              color: #333;
          }
  
          h2 {
              color: #555;
          }
  
          .important {
              font-weight: bold;
          }
  
          img {
              max-width: 50%;
              height: 50;
              display: block;
              margin: 20px auto;
          }
  
          footer {
              text-align: center;
              color: #777;
              margin-top: 20px;
          }
          #flightDetails {
            font-family: Arial, sans-serif;
            font-weight: bold;
            border: 2px solid #007BFF; /* Use a blue color for the border */
            padding: 10px; /* Add some padding for spacing */
            margin: 20px 0; /* Add margin to separate it from other content */
            background-color: #F4F4F4; /* Use a light gray background color */
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
            border-radius: 5px; /* Rounded corners for a softer look */
          }
          
          #flightDetails h2 {
            color: #007BFF; /* Blue color for headings */
          }
          
          #flightDetails p {
            margin: 5px 0; /* Adjust the spacing between paragraphs */
          }
          
          #flightDetails ul {
            list-style-type: disc; /* Use bullets for unordered lists */
            margin-left: 20px; /* Indent the list items */
          }
          
          #flightDetails li {
            margin-bottom: 5px; /* Adjust spacing between list items */
          }
                </style>
  </head>
  <body>
      <div class="container">
          <h3>Dear ${ticket.recipientEmail.split("@")[0]},</h3>
          
          <p>We hope this reminder finds you well. We would like to remind you of your upcoming flight today with FlyRight Airlines.
          </p>
          <div id = "flightDetails">
          <h2>Booking Details:</h2>
          <p>Booking Id: ${ticket.bookingId}</p>
          <p>Departure: at ${formatDateAndTimeWithDayName(
            ticket.departureTime.toLocaleString()
          )}</p>
          <p>Boarding Gate: </p>
          <p>Arrival:  at ${formatDateAndTimeWithDayName(
            ticket.arrivalTime.toLocaleString()
          )}</p>
          <p>Total Seat(s) Booked: ${ticket.noOfSeats}</p>
          </div>
          <p class="important">Please note the following important information:</p>
          
          <ul>
              <li>
                  <h2>Check-in:</h2>
                  <ul>
                      <li>Please arrive at the airport at least 2 Hrs before the scheduled departure time.</li>
                      <li>Carry a valid photo ID for security and check-in purposes.</li>
                  </ul>
              </li>
              <li>
                  <h2>Baggage:</h2>
                  <p>Please review the baggage allowance for your flight. Exceeding the permitted limits may incur additional charges.</p>
              </li>
              <li>
                  <h2>Travel Documents:</h2>
                  <p>Ensure that you have all the necessary travel documents, such as a valid passport, visa, or any required identification.</p>
              </li>
              <li>
                  <h2>Cancellation or Changes:</h2>
                  <p>If you need to cancel or make changes to your booking, please contact our customer support team as soon as possible. Applicable fees and conditions may apply.</p>
              </li>
          </ul>
          
          <p>We hope you have a pleasant flight experience with us. Should you have any questions or require further assistance, please do not hesitate to contact our customer support team at <a href="mailto:flyRight.support@gmail.com">support.flyRight@gmail.com</a>.</p>
          
          <img src="https://www.flyrightinc.com/wp-content/uploads/2017/10/FlyRight-Logo-Tag-blk-fade-01-01.png" alt="FlyRight Airline Logo">
          
          <footer>
              <p>Thank you for choosing our services, and we look forward to serving you.</p>
              <p>FlyRight Airline: Where Dreams Take Wing</p>
          </footer>
      </div>
  </body>
  </html>
      `;
}

module.exports = { ReminderMailTemplate };
