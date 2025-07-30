import { faker } from '@faker-js/faker'

export interface UserSignup {
    name: string
    username: string
    password: string
    confirmPassword: string
    email: string
}

export interface UserLogin {
  name: string
  username: string
  password: string
}

export function getFakeUser() {

      const defautPassword = 'pwd123'

      return {
        name: faker.person.fullName(),
        username: faker.internet.username().replace('.', ''),
        email: faker.internet.email(),
        password: defautPassword,
        confirmPassword: defautPassword
    }
}

export function getNewUser() {

      const defautPassword = 'pwd123'

      return {
        name: 'gabriella',
        username: 'gabriella',
        email: 'bibiellabraz@gmail.com',
        password: defautPassword,
        confirmPassword: defautPassword
    }

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