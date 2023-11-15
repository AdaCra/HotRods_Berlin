# Hotrod App

---

## Goals
To provide a working web app for a car tour company to manage their fleet using a database of events

---

## Dependencies
As a working application the app required very few dependencies and waas executed mainly using 
    - mongoose
    - nextJS
    - react
    - react-dom
    - swr
    - styled-components

---

## Functionallity

### Monitoring Fuel Reserves
A simple user input that allows users to log the volume of fuel remaining on the garage premises.

### Monitoring Vehicles
Users can only update the value every 12 hours, and can only increase the value of full cannisters after they have updated the number of cannister remaining, in ordeer to keep proper records of fuel usage.
Cars can be registered using numberplate number, and can be assigned:
  - damage
  - accident logs
  - services

### Work in Progress
Having been side-tracked onto other portfolio work I am still to build:
  - user profiles
    - Driver
    - Mechanic
    - Manager
    - Admin
  - Parts Database where mechanics can upload parts / part numbers / supplier
  - Supplier Database
  - Image Storing
  - etc.
