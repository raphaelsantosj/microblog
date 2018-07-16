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

  async unFavorite ({ params, auth, response }) {
      // get currently authenticated user
      const user = auth.current.user

      // fetch favorite
      await Favorite.query()
          .where('user_id', user.id)
          .where('thinking_id', params.id)
          .delete()

      return response.json({
          status: 'success',
          data: null
      })
  }

}

module.exports = FavoriteController
