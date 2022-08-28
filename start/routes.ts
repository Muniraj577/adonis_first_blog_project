/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ view }) => {
  return view.render('welcome')
})

Route.group(() => {
  Route.get('dashboard', 'DashboardController.dashboard').as('dashboard');
  Route.group(() => {
    Route.get('', 'UsersController.index').as('index');
    Route.get('store', 'UsersController.store').as('store');
    Route.get('update', 'UsersController.update').as('update');
    Route.get('store-users', 'UsersController.storeUser').as('storeUser');
    Route.get('delete-user/:id', 'UsersController.delete').as('delete');
  }).prefix('user/').as('user');
  Route.group(() => {
    Route.get('', 'RolesController.index').as('index');
    Route.get('create', 'RolesController.create').as('create');
    Route.post('store', 'RolesController.store').as('store');
    Route.get('edit/:id', 'RolesController.edit').as('edit');
    Route.put('update/:id', 'RolesController.update').as('update');
  }).prefix('role/').as('role');
  Route.group(() => {
    Route.get('', 'PermissionsController.index').as('index');
    Route.get('create', 'PermissionsController.create').as('create');
    Route.post('store', 'PermissionsController.store').as('store');
    Route.get('edit/:id', 'PermissionsController.edit').as('edit');
    Route.put('update/:id', 'PermissionsController.update').as('update');
  }).prefix('permission/').as('permission');
}).prefix('admin/').as('admin').namespace('App/Controllers/Http/Admin');
