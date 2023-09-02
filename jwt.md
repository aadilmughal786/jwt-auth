# How JWT Works

JSON Web Tokens (JWT) are a compact, self-contained means of securely transmitting information between parties as a JSON object. In the context of this project, JWTs are used for user authentication and authorization. Here's how JWT works:

## JWT Structure

A JWT consists of three parts: Header, Payload, and Signature, which are combined to form a compact, secure token. Each part is Base64-encoded JSON. Here's a breakdown of each part:

1. **Header**: Contains the type of token (JWT) and the signing algorithm being used, typically HMAC SHA256 or RSA.

2. **Payload**: Contains claims, which are statements about an entity (typically, user data). It can also contain custom data.

3. **Signature**: Used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

## JWT Flow

1. **User Authentication**: When a user registers or logs in, the server generates a JWT. The server includes user-specific data (claims) in the Payload, such as the user's ID and roles.

2. **Token Generation**: The server signs the JWT using a secret key, creating the Signature. The resulting JWT is sent to the client.

3. **Client Storage**: The client stores the JWT, typically in Local Storage or a Cookie, for future use.

4. **Authorization**: When the client makes a request to an authenticated route, it includes the JWT in the request headers, typically as an `Authorization` header.

5. **Server Validation**: The server validates the JWT's Signature using the secret key. It also checks the claims in the Payload, verifying the user's identity and roles.

6. **Access Granted**: If the JWT is valid, the server grants access to the requested resource, allowing the client to access protected content or perform specific actions.

Here's a simplified diagram illustrating the JWT flow:

