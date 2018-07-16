'use strict'
const Thinking = use('App/Models/Thinking')

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

}

module.exports = ThinkingController
