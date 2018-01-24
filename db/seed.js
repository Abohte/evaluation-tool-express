const request = require('superagent')
const user = require('./fixtures/users.json')
const classes = require('./fixtures/classes.json')

const createUrl = (path) => {
  return `${process.env.HOST || `http://localhost:${process.env.PORT || 3030}`}${path}`
}

const createClasses = (token) => {
  return classes.map((aClass) => {
    return request
      .post(createUrl('/classes'))
      .set('Authorization', `Bearer ${token}`)
      .send(aClass)
      .then((res) => {
        console.log('Class seeded...', res.body.batchNumber)
      })
      .catch((err) => {
        console.error('Error seeding class!', err)
      })
  })
}

const authenticate = (email, password) => {
  request
    .post(createUrl('/sessions'))
    .send({ email, password })
    .then((res) => {
      console.log('Authenticated!')
      return createClasses(res.body.token)
    })
    .catch((err) => {
      console.error('Failed to authenticate!', err.message)
    })
}

request
  .post(createUrl('/users'))
  .send(user)
  .then((res) => {
    console.log('User created!')
    return authenticate(user.email, user.password)
  })
  .catch((err) => {
    console.error('Could not create user', err.message)
    console.log('Trying to continue...')
    authenticate(user.email, user.password)
  })
