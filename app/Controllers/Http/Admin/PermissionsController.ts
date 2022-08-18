import  { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema, rules} from '@ioc:Adonis/Core/Validator'


import Permission from "App/Models/Permission";

export default class PermissionsController {

  private $page = "admin/permission/";

  public async index({view}){
    console.log(this.$page);
    const permissions = await Permission.all();
    return view.render(this.$page+'index', {
      'permissions': permissions,
    });
  }

  public async create({view}){
    return view.render(this.$page+'create');
  }

  public async store({request, response, session}){

    const permissionSchema = schema.create({
      name: schema.string({trim: true},[
        rules.unique({table: 'permissions', column: 'name'})
      ]),
      });
    try{
      await request.validate({
        schema: permissionSchema,
        messages: {
          required: 'The {{ field }} is required',
          'name.unique': 'The name has already taken'
        }
      });

      await Permission.create({
        name: request.input('name')
      });
      session.flash('success', 'Permission created successfully');
      return response.redirect().toRoute('admin.permission.index');
    } catch(error){
        session.flash('errors', error.messages)
        return response.redirect().toRoute('admin.permission.create');
    }

  }

  public async edit({view, params}) {
    const permission = await Permission.findOrFail(params.id);
    return view.render(this.$page+'edit', {
      permission: permission,
    })
  }

  public async update({request, response, session, params}){
    const permissionSchema = schema.create({
      name: schema.string({trim: true},[
        rules.unique({table: 'permissions', column: 'name', whereNot:{id: params.id}})
      ]),
      });

      try{
        await request.validate({
          schema: permissionSchema,
          messages: {
            required: 'The {{ field }} is required',
            'name.unique': 'The name has already taken'
          }
        });

        const permission = await Permission.findOrFail(params.id)
        await permission.merge({
          name: request.input('name')
        }).save();
        session.flash('success', 'Permission updated successfully');
        return response.redirect().toRoute('admin.permission.index');
      } catch(error){
          session.flash('errors', error.messages)
          return response.redirect().toRoute('admin.permission.edit', {id: params.id});
      }
  }


}
