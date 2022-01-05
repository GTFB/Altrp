import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";
import empty from "../../helpers/empty";
import Env from "@ioc:Adonis/Core/Env";
import {SessionContract} from "@ioc:Adonis/Addons/Session";
import Drive from '@ioc:Adonis/Core/Drive'
import storage_path from "../../helpers/storage_path";
import appIsInstalled from "../../helpers/appIsInstalled";

export default class InstallationChecker {
  public async handle({response, request, session}: HttpContextContract, next: () => Promise<void>) {
    const segments = request.url().split('/')
    if (segments[1] == 'install') {
      // Check if installation is processing
      let installInProgress = false;
      if (
        !empty(session.get('database_imported'))
        || !empty(session.get('cron_jobs'))
        || !empty(session.get('install_finish'))
      ) {
        installInProgress = true;
      }
      if ( await this.alreadyInstalled( session) && !installInProgress) {
        return response.redirect('/');
      }
    } else {
      // Check if the website is installed
      if (!await this.alreadyInstalled(session)) {
        return response.redirect('/install');
      }

    }

    await next();
  }


  public async alreadyInstalled( session: SessionContract) {
    // Check if installation has just finished
    if (Env.get('APP_ENV') === 'local') {
      return true;
    }

    if (!empty(session.get('install_finish'))) {
      // Write file
      await Drive.put(storage_path('installed'), '');

      session.forget('install_finish');
      session.clear();

      // Redirect to the homepage after installation
      return true;
    }

    // Check if the app is installed
    return appIsInstalled();
  }

}
