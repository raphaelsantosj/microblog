'use strict'

const Model = use('Model')

class Reply extends Model {

  user () {
      return this.belongsTo('App/Models/User')
  }

  thinking() {
    return this.belongsTo('App/Models/Thinking')
  }

}

module.exports = Reply
