// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController {
  public async dashboard({view}){
    return view.render('admin/dashboard');
  }
}
