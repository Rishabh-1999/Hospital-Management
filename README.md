# Hospital Managment

Management website through which Patients with diseases and room no can be added. Having a dynamic ability to add diseases and rooms.

### To Run
```
npm start or node app.js
```

### To Install Dependencies 
```
npm install
```

It will run under the url http://127.0.0.1:3000/

## Data of Users
 - 1.
    - Username   -   admin
    - Password   -   admin
 - 2.
    - Username   -   user
    - Password   -   user

## Pre-requisites

- Node JS (Tested on v12.14.0)
- MongooseDB
- MongooseDB Compass ( Optional)
- Pre-requisites or Dependencies ( Defined Below )

## Role

- Admin
  - Add User
  - Allocate Room for patients
  - Add Diseases
  - Add Rooms


## Schema

<h4><b>User Schema</b></h4>

| Name        | Type            | Required | Unique | Encrpyted |
| ----------- | --------------- | -------- | ------ | --------- |
| username    | String          | Yes      | Yes    | No        |
| password    | String          | Yes      | No     | Yes       |

<h4><b>Room Schema</b></h4>

| Name        | Type            | Required | Unique |
| ----------- | --------------- | -------- | ------ |
| name        | String          | Yes      | Yes    |
| password    | Boolean         | Yes      | No     |

<h4><b>Patient Schema</b></h4>

| Name           | Type         | Required | Unique |
| -------------- | ------------ | -------- | ------ |
| firstName      | String       | Yes      | Yes    |
| lastName       | String       | Yes      | No     |
| dateOfBirth    | String       | Yes      | No     |
| sex            | Boolean      | Yes      | No     |
| hospitalNumber | String       | Yes      | Yes    |
| diseases       | Array        | No       | No     |
| score          | Number       | Yes      | No     |
| room           | String       | Yes      | No     |
| lastUpdate     | Number       | Yes      | No     |


<h4><b>Disease Schema</b></h4>

| Name        | Type            | Required | Unique |
| ----------- | --------------- | -------- | ------ |
| name        | String          | Yes      | Yes    |
| score       | Number          | Yes      | No     |

## Dependencies

- Express

```
npm install express
```

- express-handlebars

```
npm install express-handlebars
```

- Path

```
npm install path
```

- Serve Favicon

```
npm install serve-favicon
```

- Connect Mongo

```
npm install connect-mongo
```

- Express-Session

```
npm install express-session
```

- Express-validator

```
npm install express-validator
```

- Connect Flash

```
npm install connect-flash
```

- Cookie Parser

```
npm install cookie-parser
```

- Multer

```
npm install multer
```

- Morgan

```
npm install morgan
```

- Mongoose

```
npm install mongoose
```

- Body Parser

```
npm install body-parser
```

- Dotenv

```
npm install dotenv
```

- Bcrptyjs

```
npm install bcrptyjs
```

- Is Valid Date

```
npm install is-valid-date
```

- http

```
npm install http
```

- Passport

```
npm install passport
```

- Passport Local

```
npm install passport-local
```

## Directory

```bash
|___ Root
|   |--- app.js
|   |
|   |--- Procfile ( Heroku File )
|   |
|   |--- .env ( Enviroment File )
|   |
|   |--- config
|   |    |--- db.js
|   |    |--- passport.js
|   |
|   |--- Dump (Mongoose Dump) (Dump)
|   |
|   |--- Models
|   |    |--- diseases.js
|   |    |--- patient.js
|   |    |--- rooms.js
|   |    |--- user.js
|   |
|   |--- Public
|   |    |--- favicon.ico
|   |    |--- css (Static)
|   |    |--- imgages (Static)
|   |    |--- fonts (Static)
|   |    |--- js (Static)
|   |    |--- script
|   |    |    |--- addpatient.js
|   |    |    |--- dashboard.js
|   |    |    |--- patientPage.js
|   |    |    |--- systemSettings.js
|   |
|   |--- Routes
|   |    |--- dashboard.js
|   |    |--- diseases.js
|   |    |--- login.js
|   |    |--- patients.js
|   |    |--- rooms.js
|   |    |--- settings.js
|   |    |--- users.js
|   |
|   |--- viwes
|   |    |--- layout
|   |    |   |--- layout.handlebars
|   |    |
|   |    |--- addpatient.handlebars
|   |    |--- dashboard.handlebars
|   |    |--- login.handlebars
|   |    |--- patientPage.handlebars
|   |    |--- systemSettings.handlebars

```
