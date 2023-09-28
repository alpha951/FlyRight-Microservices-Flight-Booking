# Common Error which I encountered
1. While importing something from other files make sure you are using write syntax `{}` or `moduleName` 
2. Inside catch block if it's not sending error as response and the server is crashing then make sure that error.statusCode is not undefined (very hard find out issue).

# TODOs
1. Store ticket details in database
2. Add cron job to check if ticket is expired or not
3. send reminder email to user before 12 hour of boarding time
4. send a email 1 hour after the arrival time to ask for feedback
5. Add cancel ticket functionality
6. Send email to user after canceling ticket
7. Add edit ticket functionality