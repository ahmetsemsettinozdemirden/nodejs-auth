# Readme
Authentication microservice in Node.js written by [Sems](https://github.com/ahmetsemsettinozdemirden).

# Docker
To build docker image type `docker build -t user/app:tag .` and to run docker container type `docker run -d -p 9000:9000 --env-file ./auth.env user/app:tag`. Please specify a working MongoDB uri before running with the microservice.

# Usage
Some usual routes;
* `"/"` -> name of microservice
* `"/healty"/` -> health status of microservice
* `"/auth/..."` -> authentication api, detailed auth routes are below

## `/auth/signUp` \[POST\]
creates new user

#### request
```
{
    email: "test@email.com",
    password: "somepassword"
}
```

#### successful response
```
{
    result: "success",
    code: 100,
    response: "sometokentext..."
}
```

#### failed response
note: response might be an object.
```
{
    result: "failed",
    code: 101,
    response: "some error text."
}
```

## `/auth/signIn` \[POST\]
checks user and password and generates new token

#### request
```
{
    email: "test@email.com",
    password: "somepassword"
}
```

#### successful response
```
{
    result: "success",
    code: 200,
    response: "sometokentext..."
}
```

#### failed response
note: response might be an object.
```
{
    result: "failed",
    code: 201,
    response: "some error text."
}
```

## `/auth/authenticate` \[POST\]
checks user's token and return decoded user info

#### request
```
{
    token: "sometokentext..."
}
```

#### successful response
```
{
    result: "success",
    code: 300,
    response: {
        email: "test@email.com"
    }
}
```

#### failed response
note: response might be an object.
```
{
    result: "failed",
    code: 301,
    response: "some error text."
}
```

# Testing
```
npm test
```

# Required Environment Variables
* PORT: application port
* MONGODB: mongo db connection string
* LOGGING: logging
* SALT_ROUNDS: password encryption salt rounds
* SECRET_KEY: password encryption secret key

# Error Codes
### signUp
* 100: success
* 101: unknown error
* 102: "User already exists."

### signIn
* 200: success
* 201: unknown error
* 202: "User does not exist."
* 203: "Password mismatch."

### authenticate
* 200: success
* 201: unknown error
* 202: "Invalid token"