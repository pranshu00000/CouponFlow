Round-Robin Coupon Distribution with Admin Panel

Overview

This project is a web application that distributes coupons to guest users in a round-robin manner while preventing multiple claims using IP tracking and cookies. The application also includes an admin panel for managing coupons.

Features

User Side (Guest Users)

Users can claim a coupon without logging in.

Coupons are assigned sequentially (round-robin) from a preloaded list.

Users cannot claim multiple coupons within a cooldown period.

Feedback messages inform users of successful claims or restrictions.

Abuse Prevention

IP Tracking: Prevents multiple claims from the same IP within a cooldown period.

Cookie-Based Tracking: Restricts claims within the same browser session.

Admin Panel

Secure admin login using JWT authentication.

View Coupons: See all available and claimed coupons.

Add/Update Coupons: Upload new coupons or modify existing ones.

User Claim History: Track coupon claims with IP and session details.

Toggle Coupon Availability: Enable or disable specific coupons.

Tech Stack

Frontend

React (Vite/Next.js)

Tailwind CSS for styling

React Router for navigation

Axios for API requests

Backend

Node.js with Express.js (REST API)

MongoDB (or PostgreSQL) for storing coupons and claims

JWT authentication for admin access
