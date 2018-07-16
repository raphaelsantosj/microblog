'use strict'
const Thinking = use('App/Models/Thinking')
const Reply = use('App/Models/Reply')

class ThinkingController {

  async thinking ({ request, auth, response }) {
      // get currently authenticated user
      const user = auth.current.user

      // Save thinking to database
      const thinking = await Tweet.create({
          user_id: user.id,
          thinking: request.input('thinking')
      })

      // fetch thinking's relations
      await thinking.loadMany(['user', 'favorites', 'replies'])

      return response.json({
          status: 'success',
          message: 'Tweet posted!',
          data: thinking
      })
  }

  async show ({ params, response }) {
      try {
          const thinking = await Tweet.query()
              .where('id', params.id)
              .with('user')
              .with('replies')
              .with('replies.user')
              .with('favorites')
              .firstOrFail()

          return response.json({
              status: 'success',
              data: thinking
          })
      } catch (error) {
          return response.status(404).json({
              status: 'error',
              message: 'Tweet not found'
          })
      }
  }

  async reply ({ request, auth, params, response }) {
      // get currently authenticated user
      const user = auth.current.user

      // get thinking with the specified ID
      const thinking = await Tweet.find(params.id)

      // persist to database
      const reply = await Reply.create({
          user_id: user.id,
          thinking_id: thinking.id,
          reply: request.input('reply')
      })

      // fetch user that made the reply
      await reply.load('user')

      return response.json({
          status: 'success',
          message: 'Reply posted!',
          data: reply
      })
  }

}

module.exports = ThinkingController
