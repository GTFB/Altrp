import View from '@ioc:Adonis/Core/View'
import get_logo_url from "../helpers/get_logo_url";
import getLocale from "../helpers/getLocale";
import print_statics from "../helpers/print_statics";
import config from "../helpers/config";
import get_altrp_setting from "../helpers/get_altrp_setting";
import getFavicons from "../helpers/getFavicons";
import getResponsiveSetting from "../helpers/getResponsiveSetting";
import * as _ from "lodash";
import getAddingClasses from "../helpers/getAddingClasses";
import allowedForUser from "../helpers/allowedForUser";
import getContent from "../helpers/getContent";
import renderAsset from "../helpers/renderAsset";
import renderButton from "../helpers/widgets-renders/renderButton";
import renderImage from "../helpers/widgets-renders/renderImage";
import renderHeading from "../helpers/widgets-renders/renderHeading";


View.global('get_logo_url', get_logo_url)
View.global('getLocale', getLocale)
View.global('config', config)
View.global('print_statics', print_statics)
View.global('get_altrp_setting', get_altrp_setting)
View.global('getFavicons', getFavicons)
View.global('getResponsiveSetting', getResponsiveSetting)
View.global('getAddingClasses', getAddingClasses)
View.global('allowedForUser', allowedForUser)
View.global('getContent', getContent)
View.global('renderAsset', renderAsset)
/**
 * RENDERS START
 */
View.global('renderButton', renderButton)
View.global('renderImage', renderImage)
View.global('renderHeading', renderHeading)
/**
 * RENDERS END
 */
View.global('isEmpty', _.isEmpty)

