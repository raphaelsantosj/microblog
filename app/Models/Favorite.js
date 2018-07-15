'use strict'

const Model = use('Model')

class Favorite extends Model {

  thinking () {
    return this.belongsTo('App/Models/Thinking')
  }

  user () {
    return this.belongsTo('App/Models/User')
  }

}

module.exports = Favorite
