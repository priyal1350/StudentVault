🎓 Student Management System — StudentVault

StudentVault is a full-stack Student Record Management System built with Spring Boot, React (Functional Components), and MySQL.

It provides complete CRUD operations through RESTful APIs with a responsive UI and secure database integration.

🚀 Features

➕ Add new student records

📋 View all students in a structured table

✏️ Update existing student details

❌ Delete student records

🔎 Search and filter functionality

🌐 RESTful API integration

💾 MySQL database connectivity

🧪 API testing using Postman

📱 Responsive UI using Bootstrap

🛠️ Tech Stack
Frontend

React (Functional Components)

Axios

Bootstrap

Backend

Spring Boot

RESTful APIs

Postman for testing

Database

MySQL

🏗️ Project Architecture
React Frontend  --->  Spring Boot REST API  --->  MySQL Database
        |                     |
      Axios             JPA / Hibernate


React UI sends requests using Axios

Spring Boot handles API logic

JPA/Hibernate maps Java objects to MySQL tables

📂 Folder Structure
/frontend        --> React Application

/src/main/java
    /controller  --> REST Controllers
    /service     --> Business Logic
    /repository  --> JPA Repositories
    /model       --> Entity Classes

⚙️ How to Run the Project
🔹 Backend (Spring Boot)

Open in IntelliJ / STS

Configure application.properties with MySQL credentials

Run the Spring Boot application

🔹 Frontend (React)
cd frontend
npm install
npm start

🧪 API Testing

All APIs were tested using Postman to ensure proper request/response handling and validation.


---

This will now look **clean, professional, and well-spaced** on GitHub.
