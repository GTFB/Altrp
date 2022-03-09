import View from '@ioc:Adonis/Core/View'
import renderTabsSwitcher from '../helpers/widgets-renders/renderTabsSwitcher';
import renderTabs from '../helpers/widgets-renders/renderTabs';
import renderInputImageSelect from '../helpers/widgets-renders/renderInputImageSelect';
import renderInputDate from '../helpers/widgets-renders/renderInputDate';
import renderInputSelectTree from '../helpers/widgets-renders/renderInputSelectTree';
import renderInputDateRange from '../helpers/widgets-renders/renderInputDateRange';
import renderInputGallery from '../helpers/widgets-renders/renderInputGallery';
import renderInputCropImage from '../helpers/widgets-renders/renderInputCropImage';
import renderInputAccept from '../helpers/widgets-renders/renderInputAccept';
import renderInputHidden from '../helpers/widgets-renders/renderInputHidden';
import renderInputFile from '../helpers/widgets-renders/renderInputFile';

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
import renderButton from '../helpers/widgets-renders/renderButton'
import renderImage from '../helpers/widgets-renders/renderImage'
import renderHeading from '../helpers/widgets-renders/renderHeading'
import renderIcon from '../helpers/widgets-renders/renderIcon'
import renderHtml from "../helpers/widgets-renders/renderHtml";
import renderDropbar from "../helpers/widgets-renders/renderDropbar";
import renderVideo from "../helpers/widgets-renders/renderVideo";
import renderInputTextAutocomplete from "../helpers/widgets-renders/renderInputTextAutocomplete";
import renderAccordion from "../helpers/widgets-renders/renderAccordion";
import renderStars from "../helpers/widgets-renders/renderStars";
import renderInputTextCommon from "../helpers/widgets-renders/renderInputTextCommon";
import renderInputTextarea from "../helpers/widgets-renders/renderInputTextarea";
import renderInputCheckbox from "../helpers/widgets-renders/renderInputCheckbox";
import renderInputRadio from "../helpers/widgets-renders/renderInputRadio";
import renderInputSelect from "../helpers/widgets-renders/renderInputSelect";
import renderInputMultiSelect from "../helpers/widgets-renders/renderInputMultiSelect";
import renderInputSlider from "../helpers/widgets-renders/renderInputSlider";

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
View.global('renderTabsSwitcher', renderTabsSwitcher)
View.global('renderTabs', renderTabs)
View.global('renderIcon', renderIcon)
View.global('renderHtml', renderHtml)
View.global('renderDropbar', renderDropbar)
View.global('renderVideo', renderVideo)
View.global('renderInputTextAutocomplete', renderInputTextAutocomplete)
View.global('renderInputTextCommon', renderInputTextCommon)
View.global('renderInputTextarea', renderInputTextarea)
View.global('renderInputCheckbox', renderInputCheckbox)
View.global('renderInputRadio', renderInputRadio)
View.global('renderInputSelect', renderInputSelect)
View.global('renderInputMultiSelect', renderInputMultiSelect)
View.global('renderInputSlider', renderInputSlider)
View.global('renderAccordion', renderAccordion)
View.global('renderStars', renderStars)
View.global('renderInputSelectTree', renderInputSelectTree)
View.global('renderInputImageSelect', renderInputImageSelect)
View.global('renderInputDate', renderInputDate)
View.global('renderInputDateRange', renderInputDateRange)
View.global('renderInputGallery', renderInputGallery)
View.global('renderInputCropImage', renderInputCropImage)
View.global('renderInputAccept', renderInputAccept)
View.global('renderInputHidden', renderInputHidden)
View.global('renderInputFile', renderInputFile)
/**
 * RENDERS END
 */
View.global('isEmpty', _.isEmpty)

