import View from '@ioc:Adonis/Core/View'

import get_logo_url from '../helpers/get_logo_url'
import getLocale from '../helpers/getLocale'
import print_statics from '../helpers/print_statics'
import config from '../helpers/config'
import get_altrp_setting from '../helpers/get_altrp_setting'
import getFavicons from '../helpers/getFavicons'
import getResponsiveSetting from '../helpers/getResponsiveSetting'
import * as _ from 'lodash'
import getAddingClasses from '../helpers/getAddingClasses'
import allowedForUser from '../helpers/allowedForUser'
import getContent from '../helpers/getContent'
import renderAsset from '../helpers/renderAsset'
import renderSectionBG from "../helpers/renderSectionBG";
import getColumnClasses from "../helpers/getColumnClasses";
import getLatestVersion from "../helpers/getLatestVersion";
import data_get from "../helpers/data_get";
import renderInputCheckbox from "../helpers/widgets-renders/renderInputCheckbox";
import renderInputRadio from "../helpers/widgets-renders/renderInputRadio";
import getSectionWidthClass from "../helpers/widgets-renders/getSectionWidthClass";

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
View.global('renderSectionBG', renderSectionBG)
View.global('getColumnClasses', getColumnClasses)
View.global('getLatestVersion', getLatestVersion)
View.global('data_get', data_get)
View.global('getSectionWidthClass', getSectionWidthClass)
/**
 * RENDERS START
 */
View.global('renderInputCheckbox', renderInputCheckbox)
View.global('renderInputRadio', renderInputRadio)
/**
 * RENDERS END
 */
View.global('isEmpty', _.isEmpty)

