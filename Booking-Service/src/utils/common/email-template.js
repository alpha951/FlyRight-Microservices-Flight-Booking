function BookingMailTemplate(flightId, noOfSeats, flightData) {
  return `Dear customer,

    We are pleased to inform you that your flight has been successfully booked. We understand the importance of your travel plans, and we are excited to be a part of your journey.
          
    Booking Details:
    Flight Number: ${flightId}
    Departure: ${
      flightData.departureAirportId
    } at ${flightData.departureTime.toLocaleString()}

    Boarding Gate: ${flightData.boardingGate}

    Arrival: ${
      flightData.arrivalAirportId
    } at ${flightData.arrivalTime.toLocaleString()}
         
    Total Seats Booked: ${noOfSeats}
        
    Please note the following important information:
        
    1. Flight Itinerary:     
     - Departure: ${
       flightData.departureAirportId.City.name
     } on ${flightData.departureTime.toLocaleString()}
     - Arrival: ${
       flightData.arrivalAirportId.City.name
     } on ${flightData.arrivalTime.toLocaleString()}
    
    2. Check-in:    
     - Please arrive at the airport at least 2 Hrs before the scheduled departure time.
     - Carry a valid photo ID for security and check-in purposes.
    
    3. Baggage:
     - Please review the baggage allowance for your flight. Exceeding the permitted limits may incur additional charges.
    
    4. Travel Documents:
     - Ensure that you have all the necessary travel documents, such as a valid passport, visa, or any required identification.
    
    5. Cancellation or Changes:
     - If you need to cancel or make changes to your booking, please contact our customer support team as soon as possible. Applicable fees and conditions may apply.
    
     We hope you have a pleasant flight experience with us. Should you have any questions or require further assistance, please do not hesitate to contact our customer support team at devrevairline.support@gmail.com.
          
    Thank you for choosing our services, and we look forward to serving you.
    
    Best regards,
    FlyRight AirLine`;
}

module.exports = BookingMailTemplate;
