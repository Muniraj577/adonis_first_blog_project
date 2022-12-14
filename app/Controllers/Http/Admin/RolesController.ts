// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Database from "@ioc:Adonis/Lucid/Database";
import Permission from "App/Models/Permission";
import Role from "App/Models/Role";
import RoleValidator from "App/Validators/RoleValidator";

export default class RolesController {
  private $page = "admin/role/";

  public async index({ view }) {
    const roles = await Role.all();
    return view.render(this.$page + "index", {
      roles: roles,
    });
  }

  public async create({ view }) {
    const permissions = await Permission.all();
    return view.render(this.$page + "create", {
      permissions: permissions,
    });
  }

  public async store({ request, response, session }) {
    await request.validate(RoleValidator);

    const role = await Role.create({
      name: request.input("name"),
    });
    role.related('permissions').sync(request.input('permissions'))
    session.flash('success', 'Role created successfully')
    response.redirect().toRoute('admin.role.index')
  }

  public async edit({view, params}) {
    const role = await Role.findOrFail(params.id);
    var permission_ids = await Database.from('role_permissions').select('permission_id').where('role_id', params.id);
     permission_ids = permission_ids.map(({permission_id}) => permission_id);
    return view.render(this.$page+"edit", {
      role: role,
      rolesPermission: permission_ids,
      permissions: await Permission.all(),
    });

  }
}
