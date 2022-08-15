// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Role from "App/Models/Role";

export default class RolesController {
  private $page = 'admin/role/';

  public async index({view}){
    const roles = await Role.all();
    return view.render(this.$page+'index', {
      roles: roles,
    });
  }

  public async create({view}){

  }
}
