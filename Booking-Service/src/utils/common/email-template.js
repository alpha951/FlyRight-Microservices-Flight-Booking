const { formatDateAndTimeWithDayName } = require("../helpers/datetime-helper");

function BookingMailTemplate(
  flightId,
  noOfSeats,
  flightData,
  email = "20uec068@lnmiit.ac.in"
) {
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
          <h3>Dear ${email.split("@")[0]},</h3>
          
          <p>We are pleased to inform you that your flight has been successfully booked. We understand the importance of your travel plans, and we are excited to be a part of your journey.</p>
          <div id = "flightDetails">
          <h2>Booking Details:</h2>
          <p>Flight Number: ${flightId}</p>
          <p>Departure: ${
            flightData.departureAirportId
          } at ${formatDateAndTimeWithDayName(
    flightData.departureTime.toLocaleString()
  )}</p>
          <p>Boarding Gate: ${flightData.boardingGate}</p>
          <p>Arrival: ${
            flightData.arrivalAirportId
          } at ${formatDateAndTimeWithDayName(
    flightData.arrivalTime.toLocaleString()
  )}</p>
          <p>Total Seat(s) Booked: ${noOfSeats}</p>
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
          
          <p>We hope you have a pleasant flight experience with us. Should you have any questions or require further assistance, please do not hesitate to contact our customer support team at <a href="mailto:flyRight.support@gmail.com">flyRight.support@gmail.com</a>.</p>
          
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

function CancelBookingMailTemplate(flightId, noOfSeats, flightData, email) {
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
            <h3>Dear ${email.split("@")[0]},</h3>
            
            <p>We hope this email finds you well. We would like to confirm that your flight reservation has been successfully canceled as per your request. </p>
            <div id = "flightDetails">
            <h2>Booking Details:</h2>
            <p>Flight Number: ${flightId}</p>
            <p>Departure: ${
              flightData.departureAirportId
            } at ${formatDateAndTimeWithDayName(
    flightData.departureTime.toLocaleString()
  )}</p>
            <p>Boarding Gate: ${flightData.boardingGate}</p>
            <p>Arrival: ${
              flightData.arrivalAirportId
            } at ${formatDateAndTimeWithDayName(
    flightData.arrivalTime.toLocaleString()
  )}</p>
            <p>Total Seat(s) Cancelled: ${noOfSeats}</p>
            </div>
            <p>
            We have processed your cancellation request, and we understand that circumstances can change unexpectedly, leading to the need for a flight cancellation. While we regret that you won't be able to travel with us on the scheduled date, we appreciate your cooperation in informing us promptly.

            Regarding your refund, we are pleased to inform you that you are eligible for a refund in accordance with the fare conditions associated with your ticket. Our refund department will initiate the refund process, which may take a few business days to reflect in your account. Please note that the refund amount may be subject to any applicable fees or charges as per the fare rules.

            We understand that having a written confirmation of the flight cancellation is essential for your records. Attached to this email, you will find a confirmation document outlining the cancellation details and refund information. Please review it carefully, and if you have any questions or require further clarification, feel free to contact our customer service team at flyRight.support@gmail.com. They will be more than happy to assist you.

            Once again, we apologize for any inconvenience caused by the cancellation. We value your patronage and hope to serve you in the future under more favorable circumstances. If there is anything else we can assist you with, please do not hesitate to reach out to us.
            We appreciate your understanding and cooperation.
            </p>
            
            <img src="https://www.flyrightinc.com/wp-content/uploads/2017/10/FlyRight-Logo-Tag-blk-fade-01-01.png" alt="FlyRight Airline Logo">
            
            <footer>
                <p>Thank you for choosing our services, and we look forward to serving you back!.</p>
                <p>FlyRight Airline: Where Dreams Take Wing</p>
            </footer>
        </div>
    </body>
    </html>
        `;
}

module.exports = { BookingMailTemplate, CancelBookingMailTemplate };
