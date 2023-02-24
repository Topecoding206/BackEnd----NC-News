# BackEnd NC News Project

# Background

This project is a Node.js Express application using a RESTful API to serve data from a PSQL database.

A hosted version of this project can be found using this link => https://first-backend-project-nsxj.onrender.com/api

# Getting Started

# Prerequisites

This project requires npm(v6.13.12 or newer), PostgreSQL (v10.10 or newer), and git (v2.17.1 or newer) to run. Install if necessary.

# Installing

1. Fork this repo and clone it onto your local machine.

2. create .env.development and .env.test file to the root directory

3. in each .env file above add database name 'PGDATABASE= <database_name_to_be_added>'
   `note: the database_name_to_be_added can be found inside root directory db/setup.sql`

4. run npm install to install the project dependencies.

# Setup/Initialise the database:

npm run seed-dbs

# Seed the development database

npm run seed

# start the server locally:

npm start

# The server is now listening for requests on port 9090.

http://localhost:9090/api

# you can interact with Restful Api using Insomnia or any other tools available.

# Routes

A list of available endpoints with descriptions can be seen in the endpoints.json file. Alternatively, once the server is listening this file can be seen by making a GET request to '/api'
