# Common Error which I encountered
1. While importing something from other files make sure you are using write syntax `{}` or `moduleName` 
2. Inside catch block if it's not sending error as response and the server is crashing then make sure that error.statusCode is not undefined (very hard find out issue).
