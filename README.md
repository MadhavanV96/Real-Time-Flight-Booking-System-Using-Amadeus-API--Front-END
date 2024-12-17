# Flight Booking and Reservation System
It is deployed using Netlify
[Front End Deployment URL](https://bookyourticketguvi.netlify.app/)

## Overview
This project is a comprehensive Flight Booking and Reservation System designed to allow users to search for flights, compare prices, manage bookings, handle payments, receive booking confirmations, and get real-time flight updates. It integrates with airline databases, provides a user account system, and includes payment processing functionalities.



## Important Routes

1. **'/'** is the default route
2. **'/Ticket-Booking-Page'** is the Route that will be used show the details of the Journey
3. **'/Traveler-Registration'** is the Route that will be used to enroll the travelers
4. **'/details'** is the Route that will be used to display the details of the Ticket that were created by the User.
5. **'/Tickets'** is the Route that will be used to display all the tickets that were created by the User.
6. **'/ticket-details'** is the Route that will be used to display the details of the Particular Ticket using its ticket id.
7. **'/userRegistration'** is the Route that will be used to register the user. 


### Features
## 1. Flight Search and Booking
Search Flights: Users can search for flights based on departure and arrival locations, travel dates, and the number of passengers.
Price Comparison: Compare prices across different airlines and booking classes.
Flight Reservation: Users can select flights, choose seat preferences, and make a reservation.



![Home Screen Search](./Images/Home%20Screen%20Search.png)




## 2. Booking Management
View and Manage Bookings: Users can view their current bookings, check booking details, change or cancel reservations, and view booking history.
Booking Confirmation: Users can download or print their booking confirmations and itineraries.




## 3. Payment Processing
Secure Payments: Integration with secure payment gateways (RazorPay) to handle transactions for flight bookings.
Payment Methods: Support for various payment methods, including credit/debit cards, digital wallets, and bank transfers.
Instant Confirmation: Immediate confirmation of successful transactions.

![Payment Integration](./Images/Payment%20Integrationi.png)


## 4. Booking Confirmations and Notifications
Confirmation Emails/SMS: Send booking confirmations with flight details, booking reference, and payment receipt.
Automated Notifications: Notify users about flight status changes, upcoming flights, and reminders.

![Email  Confirmation](./Images/Email%20SS.png)


## 5. Real-Time Flight Updates [Amadeus API]
Flight Status: Integrates with airline APIs to provide real-time updates on departure and arrival times, delays, and cancellations.
Notifications: Users can receive updates or view current flight status on the system.
## 6. Airline Database Integration
Flight Schedules: Integrates with airline databases (e.g., Amadeus API, Skyscanner API) to access flight schedules, pricing information, and seat availability.
Real-Time Data: Ensure the system can handle real-time updates from airlines to provide accurate and up-to-date information.
## 7. User Accounts and Profiles
User Authentication: Users can create and manage accounts, and securely log in to access their booking history and personal information.
Profile Management: Users can save preferences, view booking history, and update personal information.
![Account   Creation ](./Images/Registration%20of%20User.png)

## 8. User Interface
Intuitive Design: A user-friendly interface designed using TailwindCSS for searching flights, booking, and managing reservations.
Clear Navigation: Includes search filters, and a streamlined booking process to enhance the user experience.
## 9. Reports and Analytics
Booking Trends: Generate reports on booking trends, sales performance, and user activity.
Metrics Insights: Insights into popular routes, average booking values, and cancellation rates.
Tech Stack
### Frontend:
**React.js** for building user interfaces
**TailwindCSS** for styling
### Backend:
**Node.js** with **Express.js** for handling API requests
**MongoDB** for database management
## Payment Gateways:
**Razorpay** Payment    Gateway
## Airline APIs:
**Amadeus API**
Authentication:
JWT Authentication for user login and session management



For more information kindly refer the Backend Code and Documentation

[Backend Code](https://github.com/MadhavanV96/Real-Time-Flight-Booking-System-Using-Amadeus-API--Server-Side.git)
It is deployed using render.com
[Backend Deployement URL](https://real-time-flight-booking-system-using.onrender.com)
API Documentation using the Postman
[Postman Documentation](https://documenter.getpostman.com/view/38692959/2sAYHzHiPZ)