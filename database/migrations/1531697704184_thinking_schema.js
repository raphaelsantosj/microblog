'use strict'

const Schema = use('Schema')

class ThinkingSchema extends Schema {
  up () {
    this.create('thinkings', (table) => {
      table.increments()
      table.integer('user_id').unsigned().notNullable()
      table.text('thinking').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('thinkings')
  }
}

module.exports = ThinkingSchema
