## Server link: https://drutoo.vercel.app

#### user routes

- https://drutoo.vercel.app/api/v1/user/create-user (POST)

```javascript
{
    "name": "Mahfuz",
    "mobile": "01518684785",
    "pin": "1234",
    "email": "mazharul714@gmail.com",
    "nid": "9698566652",
    "role": "agent" // user and agent create
}

```

- https://drutoo.vercel.app/api/v1/login (POST)

```javascript
{
    "mobile":"01518684785",
    "pin":"1234"
}
```

- https://drutoo.vercel.app/api/v1/user/agents?role=agent (GET)

- https://drutoo.vercel.app/api/v1//user/update/65dda97018286f3bfc1e9b65 (PATCH)

```javascript
{
    "status":"active"
}
```

#### transfer money routes

- https://drutoo.vercel.app/api/v1/money/send-money (POST)

```javascript
{
    "senderId":"01981719082",
    "receivedId":"01911111111",
    "amount":"105",
    "pin":"1234"
}
```

#### Cashout routes

- https://drutoo.vercel.app/api/v1/cashout (POST)

```javascript
{
    "senderId":"01981719082",
    "receivedId":"01518684785",
    "amount":"100",
    "pin":"1234"
}
```

#### Cashout routes

- https://drutoo.vercel.app/api/v1/cashin (POST)

```javascript
{
    "senderId":"01518684785",
    "receivedId":"01981719082",
    "amount":"505",
    "pin":"1234"
}
```

```html
Admin accessToken:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMTkxMTM5NjE0MiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwOTAyODQ3OSwiZXhwIjoxNzI2MzA4NDc5fQ.R54P4bvJ27Kjq0SC0-ByP95NOVLvIUy8EonpxJF3ST0
User AccessToken:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMTk4MTcxOTA4MiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzA5MDAxOTk0LCJleHAiOjE3MjYyODE5OTR9.4x42wTI7WLPCKzOmDMkCVcK93Mth7naZ_E5TrGE7Zyw
Agent AccessToken:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIwMTUxODY4NDc4NSIsInJvbGUiOiJhZ2VudCIsImlhdCI6MTcwOTA1NzU2NiwiZXhwIjoxNzI2MzM3NTY2fQ.3zbKvqHzm0RqpXvFDMde3L-hX9IamEoyj856EvRo6ew
```
