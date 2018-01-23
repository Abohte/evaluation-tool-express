// routes/games.js
const router = require('express').Router()
const passport = require('../../config/auth')
const { Class, User } = require('../../models')

const authenticate = passport.authorize('jwt', { session: false })

const loadClass = (req, res, next) => {
  const id = req.params.id

  Class.findById(id)
    .then((aClass) => {
      req.aClass = aClass
      next()
    })
    .catch((error) => next(error))
}

// const getStudents = (req, res, next) => {
//   Promise.all(req.aClass.students.map(student => User.findById(player.userId)))
//     .then((users) => {
//       // Combine player data and user's name
//       req.players = req.game.players.map((player) => {
//         const { name } = users
//           .filter((u) => u._id.toString() === player.userId.toString())[0]
//
//         return {
//           userId: player.userId,
//           pairs: player.pairs,
//           name
//         }
//       })
//       next()
//     })
//     .catch((error) => next(error))
// }

module.exports = io => {
  router
    .get('/classes/:id/students', (req, res, next) => {
      if (!req.aClass || !req.students) { return next() }
      res.json(req.students)
    })
    //
    // .post('/games/:id/players', authenticate, loadClass, (req, res, next) => {
    //   if (!req.game) { return next() }
    //
    //   const userId = req.account._id
    //
    //   if (req.game.players.filter((p) => p.userId.toString() === userId.toString()).length > 0) {
    //     const error = Error.new('You already joined this game!')
    //     error.status = 401
    //     return next(error)
    //   }
    //
    //   // Add the user to the players
    //   req.game.players.push({ userId, pairs: [] })
    //
    //   req.game.save()
    //     .then((game) => {
    //       req.game = game
    //       next()
    //     })
    //     .catch((error) => next(error))
    // },
    // // Fetch new player data
    // getPlayers,
    // // Respond with new player data in JSON and over socket
    // (req, res, next) => {
    //   io.emit('action', {
    //     type: 'GAME_PLAYERS_UPDATED',
    //     payload: {
    //       game: req.game,
    //       players: req.players
    //     }
    //   })
    //   res.json(req.players)
    // })
    //
    // .delete('/games/:id/players', authenticate, (req, res, next) => {
    //   if (!req.game) { return next() }
    //
    //   const userId = req.account._id
    //   const currentPlayer = req.game.players.filter((p) => p.userId.toString() === userId.toString())[0]
    //
    //   if (!currentPlayer) {
    //     const error = Error.new('You are not a player of this game!')
    //     error.status = 401
    //     return next(error)
    //   }
    //
    //   req.game.players = req.game.players.filter((p) => p.userId.toString() !== userId.toString())
    //   req.game.save()
    //     .then((game) => {
    //       req.game = game
    //       next()
    //     })
    //     .catch((error) => next(error))
    //
    // },
    // // Fetch new player data
    // getPlayers,
    // // Respond with new player data in JSON and over socket
    // (req, res, next) => {
    //   io.emit('action', {
    //     type: 'GAME_PLAYERS_UPDATED',
    //     payload: {
    //       game: req.game,
    //       players: req.players
    //     }
    //   })
    //   res.json(req.players)
    // })

  return router
}
