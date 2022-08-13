// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";

export default class UsersController {
  public async index({response}) {
    const users = await User.all();
    return response.send(users);
    // return view.render('admin.user.index');
  }

  public async store() {
    const user = await User.create({
      name: 'Muniraj Rajbanshi',
      email: 'munirajrajbanshi@gmail.com',
      phone: '9810450653',
      address: 'Anamnagar, Kathmandu',
      age: 25,
    });

    console.log(user.$isPersisted)
  }

  public async update({response}) {
    const user = await User.findOrFail(1);
    user.name = 'Muniraj Rajbanshi';
    user.save();

    return response.send(user);
  }


  public async storeUser({response}) {
    const users = await User.createMany([
      {
        name: 'Sovit Maharjan',
        email: 'sovitmaharjan@gmail.com',
        phone: '9810450653',
        address: 'Anamnagar, Kathmandu',
        age: 25,
      },
      {
        name: 'Amar Rai',
        email: 'amarrai@gmail.com',
        phone: '9810450653',
        address: 'Anamnagar, Kathmandu',
        age: 25,
      },
      {
        name: 'Dayahang Rai',
        email: 'dayahangrai@gmail.com',
        phone: '9810450653',
        address: 'Anamnagar, Kathmandu',
        age: 25,
      },
    ])

    return response.send(users);
  }

  public async delete({response, request, params}){
    console.log(params.id);
    const user = await User.find(request.params().id); // request.params().id or params.id
    await user?.delete();
    return response.send(user);
  }


}
