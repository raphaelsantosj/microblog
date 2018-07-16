'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.get('/', ({ request }) => {
  return { greeting: 'Hello world in JSON' }
})

Route.group(() => {
  Route.post('/signup', 'UserController.signup')
  Route.post('/login', 'UserController.login')
})

Route.group(() => {
  Route.get('/me', 'UserController.me')
  Route.put('/update_profile', 'UserController.updateProfile')
  Route.put('/change_password', 'UserController.changePassword');
})
.prefix('account')
.middleware(['auth:jwt'])

Route.group(() => {
  Route.get('/users_to_follow', 'UserController.usersToFollow');
  Route.post('/follow/:id', 'UserController.follow')
  Route.delete('/unfollow/:id', 'UserController.unFollow')
  Route.get('/timeline', 'UserController.timeline')
})
.prefix('users')
.middleware(['auth:jwt'])

Route.group(() => {
  Route.get(':username', 'UserController.showProfile')
})
.middleware(['auth:jwt'])

Route.post('/thinking', 'ThinkingController.thinking').middleware(['auth:jwt'])
