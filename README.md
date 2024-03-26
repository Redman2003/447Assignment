# Project Setup Instructions

## Backend

- To run the backend, Flask and flask_mysqldb need to be installed.
- If not already installed, run the following commands:
  - "pip install flask" or "pip install flask_mysqldb"
- Backend can be ran through VScode

## Frontend

- The frontend relies on npm to start the app.
- If npm is not already installed on your machine, you can install it by following the instructions for your operating system.
- Once npm is installed, run the following command in the frontend directory:
- In order to run the app go to the src file within enrollment_react and run "npm start"

## Database

- MySQL configurator will be needed to start the database locally.
- MySQL Workbench will also be required as the database file contains a script to recreate the database under 'enrollment_db_copy.sql'.
- It is advisable to use MySQL CLI to check the updates of the tables.
- Configuration changes will be needed in base.py for the password used to access the database. Make sure it matches the password used to start the database on MySQL configurator.
