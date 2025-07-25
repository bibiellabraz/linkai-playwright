
export interface User {
    name: string
    username: string
    password: string
}

export const Users = {

  "validUser": {
    "name": "gabriella",
    "username": "gabriella",
    "password": "pwd123"
  },
  "WrongPassword": {
    "name": "gabriella",
    "username": "gabriella",
    "password": "123456"
  },
  "userNotFound": {
    "name": "gabriella",
    "username": "not-found",
    "password": "123456"
  },
  "emptyFields": {
    "name": "gabriella",
    "username": "",
    "password": ""
  },
  "missingUsername": {
    "name": "gabriella",
    "username": "",
    "password": "pwd123"
  },
  "missingPassword": {
    "name": "gabriella",
    "username": "gabriella",
    "password": ""
  }
}