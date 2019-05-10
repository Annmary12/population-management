[![Build Status](https://travis-ci.org/Annmary12/population-management.svg?branch=development)](https://travis-ci.org/Annmary12/population-management) [![Coverage Status](https://coveralls.io/repos/github/Annmary12/population-management/badge.svg?branch=development)](https://coveralls.io/github/Annmary12/population-management?branch=development)

## POPULATION MANAGEMENT

Population management is an API that enables a user to create, view, edit and delete a location

## Technology Stack Used

* Node Js
* Express Js
* MogonDB
* Mongoose
* Mocha
* Chai

## Feactures

* Users can create a location
* Users can view one location
* Users can view all locations
* Users can update a location
* Users can delete a location

## Project Structure

```
├── src/
    ├── __test__
    |   └── App.spec.js
    |   └── location.spec.js
    ├── bin
    │   └── www.js
    ├── controllers
    │   └── location.js
    ├── middlewares
    |   └── checkLocation.js
    │   └── validateInput.js
    ├── models
    │   └── Location.js
    ├── routes
    │   └── index.js
    ├── utils
    │   └── errorHandler.js
    ├── app.js
```

## Setup

* Clone the project

```sh
> $ git clone https://github.com/Annmary12/population-management.git
```

* Install dependencies by running

```sh
> $ yarn install
```

## Running the app

To get the app up and running (and really see if it worked), run:

```sh
> $ yarn run dev
```

## Running the tests

* To run the tests

```sh
> $ yarn test
```

**NOTE:** Create a `.env` following the `.env.example` configuration

## Link to the documentation

[Docs](https://documenter.getpostman.com/view/3526442/S1Ltzorn#475803ff-9fc9-459d-96a9-37b4262f38cf)

## API Endpoints

<table>
<tr><th>HTTP VERB</th><th>ENDPOINTS</th><th>DESCRIPTION</th></tr>
<tr><td>POST</td><td>/api/v1/location/</td><td>Creates a location</td></tr>
<tr><td>GET</td><td>/api/v1/location/</td><td>Gets all location</td></tr>
<tr><td>GET</td><td>/api/v1/location/:locationId</td><td>Get one location</td></tr>
<tr><td>PUT</td><td>/api/v1/location/:locationId</td><td>Updates a location</td></tr>
<tr><td>DELETE</td><td>/api/v1/location/:locationI</td><td>Deletes a location</td></tr>
</table>
