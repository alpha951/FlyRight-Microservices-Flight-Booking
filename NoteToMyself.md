# Common Error which I encountered
1. While importing something from other files make sure you are using write syntax `{}` or `moduleName` 
2. Inside catch block if it's not sending error as response and the server is crashing then make sure that error.statusCode is not undefined (very hard find out issue).

# TODOs
1. Store ticket details in database : DONE

2. Add cron job to check if ticket is expired or not
3. send reminder email to user before 12 hour of boarding time
4. send a email 1 hour after the arrival time to ask for feedback

5. Add cancel ticket functionality  : DONE
6. Send email to user after canceling ticket : DONE

### What are the most important things about a ticket should I store ?
1) bookingId 
2) departureTime
3) arrivalTime
4) noOfSeats
5) ticket-Status

All of these details are already there inside booking model and flight model on Flights DB, then should I duplicate it ? Does it make any sense ? 