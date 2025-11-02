# Fidenz - Weather App (Full Stack Assignment)

## Overview

Simple full-stack app that fetches weather data from OpenWeatherMap for a list of city IDs. The app uses Auth0 for authentication and requires MFA.

## Features

- Read city IDs from `backend/src/data/cities.json`
- Fetch weather data from OpenWeatherMap
- 5-minute caching of API responses
- Auth0 login/logout, JWT protection of backend endpoints
- MFA via email and signups disabled (only pre-registered user can log in)

## Tech

- Backend: Node.js, Express, axios, node-cache
- Frontend: React (Vite), Auth0 React SDK
- Auth: Auth0 (OIDC, RS256 JWT)

## Setup

### Backend

1. `cd backend`
2. Copy `.env.example` to `.env` and fill:
3. `npm install`
4. `npm start`

### Frontend

1. `cd frontend`
2. Copy `.env.example` to `.env` and fill:
3. `npm install`
4. `npm run dev`

## Auth0 configuration

- Create SPA application, set callback/logout/allowed URLs to `http://localhost:5173`
- Create an API with identifier `https://fidenz-weather-api`
- Create a user `careers@fidenz.com` with password `Pass#fidenz`
- Disable public signups and enable Email MFA in Auth0 dashboard
