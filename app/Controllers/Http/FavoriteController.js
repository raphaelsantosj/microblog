'use strict'
const Favorite = use('App/Models/Favorite')

class FavoriteController {

  async favorite ({ request, auth, response }) {
      // get currently authenticated user
      const user = auth.current.user

      const thinkingId = request.input('thinking_id')

      const favorite = await Favorite.findOrCreate(
          { user_id: user.id, thinking_id: thinkingId },
          { user_id: user.id, thinking_id: thinkingId }
      )

      return response.json({
          status: 'success',
          data: favorite
      })
  }

}

module.exports = FavoriteController
