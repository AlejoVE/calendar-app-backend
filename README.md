# Calendar-App Backend

## You can check the app [here](https://calendar-app-mern.netlify.app/)

This is the back-end of Calendar-App, a cooperative calendar application that can be used by teams.

#### Check the [front-end documentation](https://github.com/AlejoVE/Calendar-app-MERN)

## **Database design**

![Database structure](https://user-images.githubusercontent.com/59319966/108626228-67f0ba00-744f-11eb-8729-8e35cba32868.png 'Database structure')

## **Installation**

### **0 | Requirements**

Calendar-App runs on virtually any system where Node.js is supported. This means it runs on Linux, macOS, Windows as well as container solutions such as Docker and Heroku.

#### **Versions**

-  MongoDB 4.4
-  NodeJS 12.8

### **1 | Create and/or configure environement variables**

-  Create a .env file at the root of the backend folder
-  Replace all variables noted with $ below, and save it to the .env file

```
PORT=$port_number
DB_CNN=mongodb://localhost:27017/$db_name
JWT_SECRET_SEED=$long_random_characters
```

### **2 | Installation of packages with npm**

-  `npm i`

### **3 | Run the server**

-  To run in development: `npm run dev`
-  To run in production: `npm start`

## **API endpoints**

---

**URL** https://mern-calendar-test25.herokuapp.com/

#### **Add an user**

**`POST /api/auth/new`**

##### **Request**

A json object for the user to register with **`name`**, **`email`**, and **`password`**.

```
{
  "name": "Alejo",
  "email": "alejo@example.com",
  "password": "really-strong-password",
}
```

##### **Response `201`**

A json object for the registered user with `ok`, `uid`, `name` and `token`.

```
{
  "ok": true,
  "uid": "5f9ed5ce47c42738d03d178d",
  "name": "Alejo",
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1CJlbWFpbCI6ImphY2tAZXc2VybmFtZSI6ImphY2siLhhbXBsZS5jb20iLCJpYXQiOjE1OTg2MTc2MTksImV4cCI6MTYwMTIwOTYxOX0.s85ti_rzBVHJ6Gt1MY7seYfdcjB6sR939p2CexA40gI"
}
```

#### **Log in**

**`POST /api/auth/`**

##### **Request**

A json object for the account to login with **`email`** and **`password`** .

```
{
  "email": "alejo@example.com",
  "password": "password"
}
```

##### \***\*Response `200`\*\***

A json object for the logged in account with `ok`, `name`, `uid` and `token`

```
{
  ok": true,
  "uid": "5f9ed5ce47c42738d03d178d",
  "name": "Alejo",
  "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1CJlbWFpbCI6ImphY2tAZXc2VybmFtZSI6ImphY2siLhhbXBsZS5jb20iLCJpYXQiOjE1OTg2MTc2MTksImV4cCI6MTYwMTIwOTYxOX0.s85ti_rzBVHJ6Gt1MY7seYfdcjB6sR939p2CexA40gI"
}

```

#### **Create an event**

**`POST /api/events/`**

##### **Request**

A json object for the event to create with **`title`**, `notes`, **`start`**, **`end`**, and **`user`**.

```
{
  "title": "My event",
  "notes": "This is a test",
  "start": "2021-02-21T15:30:00.000Z",
  "end": "2021-02-21T17:30:00.000Z",
  "user": "5fa81e697c095b0017bbb587"
}

```

##### **Response `201`**

A json object for the created event with `ok` and `event`.

```
{
  "ok": true,
  "event": {
        "title": "My event from Postman",
        "notes": "This is a test",
        "user": "5fa81e697c095b0017bbb587",
        "start": "2021-02-21T15:30:00.000Z",
        "end": "2021-02-21T17:30:00.000Z",
        "id": "603269d5025968001794c73e"
    }
}

```

#### **Update an event**

**`PUT /api/events/:id`**

##### **Request**

A json object for the event to update with **`title`**, `notes`, **`start`**, **`end`**, and **`user`**.

```
{
  "title": "My event updated",
  "notes": "This is a test",
  "start": "2021-02-21T15:30:00.000Z",
  "end": "2021-02-21T17:30:00.000Z",
  "user": "5fa81e697c095b0017bbb587"
}

```

##### **Response `200`**

A json object for the updated event with `ok` and `event`.

```
{
  "ok": true,
  "event": {
        "title": "My event updated",
        "notes": "This is a test",
        "user": "5fa81e697c095b0017bbb587",
        "start": "2021-02-21T15:30:00.000Z",
        "end": "2021-02-21T17:30:00.000Z",
        "id": "603269d5025968001794c73e"
    }
}

```

#### **Get events**

**`GET /api/events/`**

##### **Response `200`**

A json object with `ok` and an array of `events`.

```
{
    "ok": true,
    "events": [
        {
            "title": "My test",
            "notes": "This is my test",
            "start": "2021-01-17T16:00:00.467Z",
            "end": "2021-01-17T17:00:00.467Z",
            "user": {
                "_id": "5fa81e247c095b0017bbb585",
                "name": "Juan"
            },
            "id": "60045a7d2b21a70017a2dc2e"
        },
        {
            "title": "My event",
            "notes": "This is a test",
            "start": "2021-02-19T17:00:00.111Z",
            "end": "2021-02-19T18:00:00.111Z",
            "user": {
                "_id": "5fa81e697c095b0017bbb587",
                "name": "Angelo"
            },
            "id": "60240f9efa2654001776ee3e"
        }
    ]
}

```

#### **Delete an event**

**`DELETE /api/events/:id`**

##### **Response `200`**

A json object for the deleted event with `ok` and `msg`.

```
{
  "ok": true,
  "msg": "Event deleted"
}
```

## Developer

-  [Luis Alejandro Montilla](https://github.com/AlejoVE)

## License

MIT License
