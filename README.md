# Backend Coding Exercise

The goal of this task is to assess your proficiency in software engineering that is related to the daily work that we do at Paritie LTD. Please follow the instructions below to complete the assessment.

## Tasks

Build a web service using yur preferred programming language that can be deployed to any cloud hosting provider, exposes an API and can be consumed from any client.

This service should

- Be deployed on https://render.com or https://leapcell.io or any cloud hosting provider
- Allow user create an account with basic user information
- Allow a user login
- Allow a user have a wallet
- Allow a user create a transaction PIN
- Allow a user create a donation to a fellow user (beneficiary)
- Allow a user check how many donations he/she has made
- Allow a user view all donation made in a given period of time.
- Allow a user view a single donation made to a fellow user (beneficiary)

### Objectives
- Implement pagination to retrieve pages of the resource.
- Create an API documentation of the server that clearly explains the goals of this project and clarifies the API response that is expected.
- Include proper error handling and validation
- Atomic operations to prevent race conditions
- Concurrent Transaction Handling: Handle race conditions for simultaneous transactions
- Transaction Rollback: Implement ability to reverse transactions
- Ensure the system is not vulnerable to [SQL injection](https://www.owasp.org/index.php/SQL_Injection)

### Load Testing

Load testing to ensure your service can handle a high amount of traffic
