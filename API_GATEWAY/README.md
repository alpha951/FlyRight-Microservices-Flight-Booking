
> Authentication and Authorization

## Authentication
To identify a user, you need to authenticate the user. Authentication is the process of verifying the identity of a user.  WHO ARE YOU ?

## Authorization
Assigning permissions to users and groups is called authorization.  WHAT CAN YOU DO ?


# JWT
JASON WEB TOKEN (JWT) is a standard for creating tokens that assert some number of claims.  JWTs are signed using a cryptographic algorithm to ensure that the claims cannot be altered after the token is issued.


# Forward Proxy
Forward proxy sits between the client and the internet. Client requests a resource from the internet through forward proxy, which acts as a intermediate layer.
## Advantages of Forward Proxy:
1. Filteration of content which is to be sent to the server.
2. Caching
3. Access control 
4. User annonimity (hide ip address of the client)

## Disadvantages of Forward Proxy:
1. Complex to setup
2. If it fails then the whole network is affected.
3. Single point of failure
4. Latency increases

# Reverse Proxy
Reverse proxy sits between the internet and the server. The response from server goes to proxy then to the client. It helps us to hide the original server from direct client access. Nginix is a reverse proxy server.

# Many - Many Association
 1. A user can have many roles.
 2. A role can have many users.
 Example: A user can be customer, admin, employee, etc. There can be multiple admins, customers, employees, etc.

 To implement many to many association, we need to create a `through` or `join` table. This table will have foreign keys of both the tables.