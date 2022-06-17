import { CONDITIONS_OPTIONS } from '../../../../front-app/src/js/helpers';
import {
  CONTROLLER_NUMBER,
  CONTROLLER_REPEATER,
  CONTROLLER_SELECT,
  CONTROLLER_SELECT2,
  CONTROLLER_SWITCHER,
  CONTROLLER_TEXT,
  CONTROLLER_TEXTAREA,
  TAB_CONTENT
} from '../classes/modules/ControllersManager';
import Repeater from '../classes/Repeater';
import axios from "axios";
import {getElementSettingsSuffix} from "../helpers";

/**
 * Добавляет контроллеры действия для элемента
 * @param {BaseElement} element - элемент
 * @param {string} sectionLabel - заголовок секции
 * @param {string} idPrefix - префикс, который добавляется ко всем id секция и контроллеров
 * @param {string} tab - таб по умолчанию
 * @param {boolean} showChangeEndControllers -
 * @param {boolean} withoutSection
 */
export function actionsControllers(
  element,
  sectionLabel = 'Actions',
  idPrefix = '',
  tab = TAB_CONTENT,
  showChangeEndControllers = false,
  forSection = false
) {
  /**
   * Список произвольных действия для кнопки START
   */
  if(!forSection) {
    element.startControlSection(idPrefix + 'actions_section', {
      tab,
      hideOnEmail: true,
      label: sectionLabel
    });
  }

  if(showChangeEndControllers){
    element.addControl(idPrefix + 'change_end', {
      label: 'Make event when input end?',
      type: CONTROLLER_SWITCHER,
      responsive: false,
      default: false,
      locked: true,
    });

    element.addControl(idPrefix + 'change_end_delay', {
      label: 'Delay between char input (milliseconds)',
      type: CONTROLLER_NUMBER,
      responsive: false,
      conditions: {
        [`${idPrefix + 'change_end'}`]: true
      },
      locked: true,
    });
  }

  // element.addControl('change_action_end', {
  //   label: 'Waiting for change end?',
  //   type: CONTROLLER_SWITCHER,
  //   responsive: false,
  //   default: false
  // });

  let actionsRepeater = new Repeater();

  actionsRepeater.addControl('type', {
    label: 'Type',
    type: CONTROLLER_SELECT2,
    isClearable: true,
    nullable: true,
    responsive: false,
    options: [
      {
        value: 'form',
        label: 'Form'
      },
      {
        value: 'email',
        label: 'Send Email'
      },
      {
        value: 'toggle_element',
        label: 'Toggle Elements'
      },
      {
        value: 'toggle_popup',
        label: 'Toggle Popup'
      },
      {
        value: 'print_page',
        label: 'Print Page'
      },
      {
        value: 'print_elements',
        label: 'Print Elements'
      },
      {
        value: 'scroll_to_element',
        label: 'Scroll to Element'
      },
      {
        value: 'scroll_to_top',
        label: 'Scroll to Top'
      },
      {
        value: 'scroll_to_bottom',
        label: 'Scroll to Bottom'
      },
      {
        value: 'redirect',
        label: 'Redirect'
      },
      {
        value: 'trigger',
        label: 'Trigger Action'
      },
      {
        value: 'page_to_pdf',
        label: 'Page to PDF'
      },
      {
        value: 'elements_to_pdf',
        label: 'Elements to PDF'
      },
      {
        value: 'data_to_csv',
        label: 'Data Convert to CSV'
      },
      {
        value: 'table_to_csv',
        label: 'Table to CSV'
      },
      {
        value: 'table_to_xml',
        label: 'Table to XML'
      },
      {
        value: 'table_to_xls',
        label: 'Table to XLS'
      },
      {
        value: 'login',
        label: 'Login'
      },
      {
        value: 'logout',
        label: 'Logout'
      },
      {
        value: 'set_data',
        label: 'Set Data'
      },
      {
        value: 'forms_manipulate',
        label: 'Forms Manipulate'
      },
      {
        value: 'update_current_datasources',
        label: 'Update Current Datasources'
      },
      {
        value: 'update_current_model',
        label: 'Update Current Model'
      },
      {
        value: 'custom_code',
        label: 'Custom JS-Code'
      },
      {
        value: 'play_sound',
        label: 'Play Sound'
      },
      {
        value: 'delay',
        label: 'Delay'
      },
      {
        value: 'condition',
        label: 'Condition'
      },
      {
        value: 'vi_toggle',
        label: 'Version for the Visually Impaired Toggle'
      },
      {
        value: 'oauth',
        label: 'Oidc Client'
      },
      {
        value: 'metamask_connect',
        label: 'MetaMask Connect'
      },
      {
        value: 'socket_receiver',
        label: 'Socket receiver'
      },
      {
        value: "socket_emit",
        label: "Socket emit"
      },
      {
        value: "set_cookie",
        label: "Set cookie"
      }
    ],
    locked: true,
    onChange: function({value}) {
      if (value === "form" || value === "redirect") {
        this.repeater.changeValue(
          this.itemindex,
          "form_url" + getElementSettingsSuffix(this.controller, false),
          ""
        );
        this.repeater.changeValue(
          this.itemindex,
          "form_url" + getElementSettingsSuffix(this.controller, false),
          ""
        );
      }
    }
  });

  actionsRepeater.addControl('email_template', {
    type: CONTROLLER_SELECT2,
    prefetch_options: true,
    label: 'Email Template',
    isClearable: true,
    options_resource:
      '/admin/ajax/templates/options?template_type=email&value=guid',
    nullable: true,
    conditions: {
      type: 'email'
    },
    locked: true,
  });

  actionsRepeater.addControl('code', {
    type: CONTROLLER_TEXTAREA,
    dynamic: false,
    responsive: false,
    label: 'Code',
    conditions: {
      type: ['custom_code']
    },
    locked: true,
  });

  actionsRepeater.addControl('socket_type', {
    type: CONTROLLER_SELECT,
    label: 'Type',
    options: [
      {
        value: "user",
        label: "User"
      },
      {
        value: "custom",
        label: "Custom"
      },
    ],
    conditions: {
      type: ["socket_receiver"]
    }
  });

  actionsRepeater.addControl('socket_emit_name', {
    type: CONTROLLER_TEXTAREA,
    label: 'Name',
    conditions: {
      type: ["socket_emit"],
    }
  });

  actionsRepeater.addControl('socket_value', {
    type: CONTROLLER_TEXTAREA,
    label: 'Value',
    conditions: {
      type: ["socket_emit"],
    }
  });

  actionsRepeater.addControl('socket_name', {
    type: CONTROLLER_TEXTAREA,
    label: 'Name',
    conditions: {
      type: ["socket_receiver"],
      socket_type: "custom"
    }
  });

  actionsRepeater.addControl('aliases', {
    type: CONTROLLER_TEXTAREA,
    dynamic: false,
    responsive: false,
    label: 'Aliases',
    conditions: {
      type: ['update_current_datasources', "socket_receiver"]
    },
    locked: true,
  });

  actionsRepeater.addControl('milliseconds', {
    type: CONTROLLER_NUMBER,
    dynamic: false,
    responsive: false,
    label: 'Duration in Milliseconds',
    conditions: {
      type: ['delay', 'play_sound']
    },
    locked: true,
  });

  actionsRepeater.addControl('loop', {
    type: CONTROLLER_SWITCHER,
    dynamic: false,
    responsive: false,
    label: 'Loop (Caution)',
    conditions: {
      type: ['play_sound']
    },
    locked: true,
  });

  actionsRepeater.addControl('action', {
    type: CONTROLLER_TEXT,
    dynamic: false,
    responsive: false,
    label: 'Add Action Name',
    conditions: {
      type: ['trigger']
    },
    locked: true,
  });

  actionsRepeater.addControl('forms_change', {
    label: 'Change',
    type: CONTROLLER_SELECT,
    responsive: false,
    nullable: true,
    options: [
      {
        value: 'select_all',
        label: 'Select All'
      },
      {
        value: 'clear',
        label: 'Clear Value'
      }
    ],
    conditions: {
      type: 'forms_manipulate'
    },
    locked: true,
  });

  actionsRepeater.addControl('form_method', {
    label: 'Method',
    type: CONTROLLER_SELECT,
    responsive: false,
    nullable: true,
    options: [
      {
        value: 'GET',
        label: 'Get'
      },
      {
        value: 'PUT',
        label: 'Put'
      },
      {
        value: 'POST',
        label: 'Post'
      },
      {
        value: 'DELETE',
        label: 'Delete'
      }
    ],
    conditions: {
      type: 'form'
    },
    locked: true,
  });

  actionsRepeater.addControl('custom_headers', {
    label: 'Custom Headers',
    type: CONTROLLER_TEXTAREA,
    responsive: false,
    conditions: {
      type: 'form'
    },
    locked: true,
  });

  actionsRepeater.addControl('from', {
    label: 'From',
    type: CONTROLLER_TEXT,
    responsive: false,
    conditions: {
      type: 'email'
    },
    locked: true,
  });

  actionsRepeater.addControl('to', {
    label: 'Email',
    type: CONTROLLER_TEXT,
    responsive: false,
    conditions: {
      type: 'email'
    },
    locked: true,
  });

  actionsRepeater.addControl('subject', {
    label: 'Subject',
    type: CONTROLLER_TEXTAREA,
    responsive: false,
    conditions: {
      type: 'email'
    },
    locked: true,
  });

  actionsRepeater.addControl('attachments', {
    label: 'Attachments',
    type: CONTROLLER_TEXTAREA,
    responsive: false,
    conditions: {
      type: 'email'
    },
    locked: true,
  });

  actionsRepeater.addControl('form_id', {
    label: 'Form ID',
    dynamic: false,
    responsive: false,
    conditions: {
      type: ['form', 'login']
    },
    locked: true,
  });

  actionsRepeater.addControl('name', {
    label: 'File Name',
    dynamic: false,
    responsive: false,
    conditions: {
      type: [
        'page_to_pdf',
        'elements_to_pdf',
        'data_to_csv',
        'table_to_csv',
        'table_to_xml',
        'table_to_xls'
      ]
    },
    locked: true,
  });

  actionsRepeater.addControl('form_page_select', {
    label: 'Page',
    type: CONTROLLER_SELECT2,
    prefetch_options: true,
    options_resource: '/admin/ajax/pages_options',
    conditions: {
      type: ['redirect']
    },
    locked: true,
    onChange: async function ({label}) {
      let pathname = ""
      try {
        let pages = await axios.get("/admin/ajax/pages")
        let findPage = pages.data.find(item => item.title === label)
        if (findPage) {
          pathname = findPage.path
        }
        this.repeater.changeValue(
          this.itemindex,
          "form_url" + getElementSettingsSuffix(this.controller, false),
          pathname
        );
        this.repeater.changeValue(
          this.itemindex,
          "form_url" + getElementSettingsSuffix(this.controller, false),
          pathname
        );
      } catch (error) {
        alert("Page request error")
        console.log(error)
      }
    }
  });

  actionsRepeater.addControl('form_customizer', {
    label: 'Customizer',
    type: CONTROLLER_SELECT2,
    prefetch_options: true,
    options_resource: '/admin/ajax/customizers_options',
    onChange: async function ({value}) {
      let pathname = ""
      try {
        let customizers = await axios.get("/admin/ajax/customizers")
        let findCustomizer = customizers.data.data.find(item => item.name === value)
        if (findCustomizer) {
          let getCustomizer = await axios.get("/admin/ajax/customizers/" + findCustomizer.id)
          let url = getCustomizer.data.data.source?.web_url
          if (url) {
            pathname = new URL(url).pathname
            this.repeater.changeValue(
              this.itemindex,
              "form_url" + getElementSettingsSuffix(this.controller, false),
              pathname
            );
            this.repeater.changeValue(
              this.itemindex,
              "form_url" + getElementSettingsSuffix(this.controller, false),
              pathname
            );
          } else {
            this.repeater.changeValue(
              this.itemindex,
              "form_url" + getElementSettingsSuffix(this.controller, false),
              pathname
            );
            this.repeater.changeValue(
              this.itemindex,
              "form_url" + getElementSettingsSuffix(this.controller, false),
              pathname
            );
          }
        }
      } catch (error) {
        alert("Customizer request error")
        console.log(error)
      }
    },
    conditions: {
      type: ['form']
    },
    locked: true,
  });

  actionsRepeater.addControl('form_url', {
    label: 'URL',
    responsive: false,
    dynamic: false,
    description: '/ajax/models/tests/{{id}}',
    conditions: {
      type: ['form', 'redirect']
    },
    locked: true,
  });

  actionsRepeater.addControl('media_url', {
    label: 'Media URL',
    responsive: false,
    dynamic: false,
    conditions: {
      type: ['play_sound']
    },
    locked: true,
  });

  actionsRepeater.addControl('forms_bulk', {
    label: 'Bulk Requests',
    type: CONTROLLER_SWITCHER,
    responsive: false,
    dynamic: false,
    conditions: {
      type: ['form']
    },
    locked: true,
  });

  actionsRepeater.addControl('bulk_path', {
    label: 'Bulk Path',
    responsive: false,
    dynamic: false,
    conditions: {
      type: ['form'],
      forms_bulk: true
    },
    locked: true,
  });

  actionsRepeater.addControl('back', {
    label: 'Back',
    type: CONTROLLER_SWITCHER,
    responsive: false,
    dynamic: false,
    conditions: {
      type: ['redirect']
    },
    locked: true,
  });

  actionsRepeater.addControl('outer', {
    label: 'Outer',
    type: CONTROLLER_SWITCHER,
    responsive: false,
    dynamic: false,
    conditions: {
      type: ['redirect']
    },
    locked: true,
  });

  actionsRepeater.addControl('elements_ids', {
    label: 'Elements',
    responsive: false,
    dynamic: false,
    description: 'element_id1, element_id12',
    conditions: {
      type: [
        'toggle_element',
        'print_elements',
        'elements_to_pdf',
        'forms_manipulate'
      ]
    },
    locked: true,
  });
  actionsRepeater.addControl('with_breaks', {
    label: 'With Breaks',
    responsive: false,
    dynamic: false,
    type: CONTROLLER_SWITCHER,
    conditions: {
      type: [
        'elements_to_pdf',
      ]
    },
    locked: true,
  });
  actionsRepeater.addControl('p', {
    label: 'Page Paddings',
    responsive: false,
    dynamic: false,
    conditions: {
      type: [
        'elements_to_pdf',
      ]
    },
    locked: true,
  });

  actionsRepeater.addControl('template_name', {
    label: 'Template name',
    responsive: false,
    dynamic: false,
    description: 'template_name',
    conditions: {
      type: ['table_to_xls']
    },
    locked: true,
  });

  actionsRepeater.addControl('all_sources', {
    label: 'All sources',
    type: CONTROLLER_SWITCHER,
    responsive: false,
    dynamic: false,
    conditions: {
      type: ['table_to_xls']
    },
    locked: true,
  });

  actionsRepeater.addControl('all_sources_path', {
    label: 'Path',
    responsive: false,
    dynamic: false,
    description: 'altrpdata.alias',
    conditions: {
      'all_sources': true
    },
    locked: true,
  });

  actionsRepeater.addControl('cookie_name', {
    label: 'Path',
    responsive: false,
    dynamic: false,
    conditions: {
      type: ['set_cookie']
    },
    locked: true,
  });

  actionsRepeater.addControl('cookie_value', {
    label: 'Value',
    type: CONTROLLER_TEXTAREA,
    responsive: false,
    dynamic: false,
    conditions: {
      type: ['set_cookie']
    },
    locked: true,
  });

  actionsRepeater.addControl('element_id', {
    label: 'Element',
    responsive: false,
    dynamic: false,
    description: 'element_id1',
    conditions: {
      type: [
        'scroll_to_element',
        'trigger',
        'table_to_csv',
        'table_to_xml',
        'toggle_offcanvas',
        'table_to_xls'
      ],
      // 'all_sources': false
    },
    locked: true,
  });

  actionsRepeater.addControl('template_data', {
    label: 'Data',
    type: CONTROLLER_TEXTAREA,
    responsive: false,
    dynamic: false,
    description: 'template_data',
    conditions: {
      type: ['table_to_xls'],
      'all_sources': false
    },
    locked: true,
  });

  actionsRepeater.addControl('path', {
    type: CONTROLLER_TEXTAREA,
    label: 'Path',
    responsive: false,
    dynamic: false,
    description: 'altrppagestate.alias',
    conditions: {
      type: ['data_to_csv', 'set_data', 'form']
    },
    locked: true,
  });

  actionsRepeater.addControl('data', {
    type: CONTROLLER_TEXTAREA,
    label: 'Data for Form',
    responsive: false,
    dynamic: false,
    description: 'param_1 | {{altrpdata.alias}}',
    conditions: {
      type: ['form']
    },
    locked: true,
  });

  actionsRepeater.addControl('condition_left', {
    type: CONTROLLER_TEXTAREA,
    label: 'Path',
    responsive: false,
    dynamic: false,
    description: 'altrpdata.alias.props',
    conditions: {
      type: ['condition']
    },
    locked: true,
  });

  actionsRepeater.addControl('compare', {
    label: 'Compare',
    type: CONTROLLER_SELECT,
    responsive: false,
    nullable: true,
    options: CONDITIONS_OPTIONS,
    conditions: {
      type: 'condition'
    },
    locked: true,
  });

  actionsRepeater.addControl('condition_right', {
    type: CONTROLLER_TEXTAREA,
    label: 'Value',
    responsive: false,
    dynamic: false,
    description: 'Data Template ({{altrpdata.alias.props}}) or Value',
    conditions: {
      type: ['condition']
    },
    locked: true,
  });

  actionsRepeater.addControl('set_type', {
    label: 'Set Type',
    type: CONTROLLER_SELECT,
    responsive: false,
    nullable: true,
    options: [
      {
        label: 'Toggle',
        value: 'toggle'
      },
      {
        label: 'Set',
        value: 'set'
      },
      {
        label: 'Toggle/Set',
        value: 'toggle_set'
      },
      {
        label: 'Increment',
        value: 'increment'
      },
      {
        label: 'Decrement',
        value: 'decrement'
      },
      {
        label: 'Push Items',
        value: 'push_items'
      },
      {
        label: 'Remove Items',
        value: 'remove_items'
      },
      {
        label: 'Delete',
        value: 'delete'
      }
    ],
    conditions: {
      type: 'set_data'
    },
    locked: true,
  });

  actionsRepeater.addControl('count', {
    label: 'Count',
    type: CONTROLLER_NUMBER,
    responsive: false,
    dynamic: false,
    conditions: {
      type: ['set_data'],
      set_type: ['push_items', 'decrement', 'increment']
    },
    locked: true,
  });

  actionsRepeater.addControl('value', {
    label: 'Value',
    type: CONTROLLER_TEXTAREA,
    responsive: false,
    dynamic: false,
    description: 'Value or Path to Value',
    conditions: {
      type: ['set_data'],
      set_type: ['set', 'toggle_set', 'push_items',]
    },
    locked: true,
  });

  actionsRepeater.addControl('popup_id', {
    type: CONTROLLER_SELECT2,
    prefetch_options: true,
    label: 'Popup ID',
    isClearable: true,
    options_resource:
      '/admin/ajax/templates/options?template_type=popup&value=guid',
    nullable: true,
    gotoLink: {
      linkTemplate: '/admin/editor?template_id={id}',
      textTemplate: 'Go to Template',
    },
    responsive: false,
    conditions: {
      type: ['toggle_popup']
    },
    locked: true,
  });

  /**
   * Контроллеры настроек oidc-client-js
   */


  actionsRepeater.addControl('method', {
    type: CONTROLLER_SELECT2,
    nullable: true,
    conditions: {
      type: 'oauth'
    },
    options:[
      {
        value: 'signinCallback',
        label: 'signinCallback',
      },
      {
        value: 'signinPopup',
        label: 'signinPopup',
      },
      {
        value: 'signinPopupCallback',
        label: 'signinPopupCallback',
      },
      {
        value: 'signinRedirect',
        label: 'signinRedirect',
      },
      {
        value: 'signinRedirectCallback',
        label: 'signinRedirectCallback',
      },
      {
        value: 'signinSilent',
        label: 'signinSilent',
      },
      {
        value: 'signinSilentCallback',
        label: 'signinSilentCallback',
      },
      {
        value: 'signoutCallback',
        label: 'signoutCallback',
      },
      {
        value: 'signoutPopup',
        label: 'signoutPopup',
      },
      {
        value: 'signoutPopupCallback',
        label: 'signoutPopupCallback',
      },
      {
        value: 'signoutRedirect',
        label: 'signoutRedirect',
      },
      {
        value: 'signoutRedirectCallback',
        label: 'signoutRedirectCallback',
      },
      {
        value: 'getUser',
        label: 'getUser',
      },
    ],
    dynamic: false,
    responsive: false,
    label: 'Method',
    locked: true,
  });

  actionsRepeater.addControl('client_id', {
    dynamic: false,
    conditions: {
      type: 'oauth'
    },
    responsive: false,
    label: 'Client Id',
    locked: true,
  });
  actionsRepeater.addControl('redirect_uri', {
    dynamic: false,
    responsive: false,
    conditions: {
      type: 'oauth'
    },
    label: 'Redirect Uri',
    locked: true,
  });
  actionsRepeater.addControl('post_logout_redirect_uri', {
    dynamic: false,
    responsive: false,
    conditions: {
      type: 'oauth'
    },
    label: 'Post Logout Redirect Uri',
    locked: true,
  });
  actionsRepeater.addControl('response_type', {
    dynamic: false,
    responsive: false,
    conditions: {
      type: 'oauth'
    },
    label: 'Response Type',
    locked: true,
  });
  actionsRepeater.addControl('scope', {
    dynamic: false,
    responsive: false,
    conditions: {
      type: 'oauth'
    },
    label: 'Scope',
    locked: true,
  });
  actionsRepeater.addControl('authority', {
    dynamic: false,
    responsive: false,
    conditions: {
      type: 'oauth'
    },
    label: 'Authority',
    locked: true,
  });
  actionsRepeater.addControl('automaticSilentRenew', {
    type: CONTROLLER_SWITCHER,
    dynamic: false,
    responsive: false,
    conditions: {
      type: 'oauth'
    },
    label: 'Automatic Silent Renew',
    locked: true,
  });
  actionsRepeater.addControl('filterProtocolClaims', {
    type: CONTROLLER_SWITCHER,
    dynamic: false,
    responsive: false,
    conditions: {
      type: 'oauth'
    },
    label: 'Filter Protocol Claims',
    locked: true,
  });
  actionsRepeater.addControl('loadUserInfo', {
    type: CONTROLLER_SWITCHER,
    dynamic: false,
    responsive: false,
    conditions: {
      type: 'oauth'
    },
    label: 'Load User Info',
    locked: true,
  });
  actionsRepeater.addControl('monitorSession', {
    type: CONTROLLER_SWITCHER,
    dynamic: false,
    responsive: false,
    conditions: {
      type: 'oauth'
    },
    label: 'Monitor Session',
    locked: true,
  });
  actionsRepeater.addControl('checkSessionInterval', {
    dynamic: false,
    responsive: false,
    conditions: {
      type: 'oauth'
    },
    label: 'Check Session Interval',
    locked: true,
  });


  actionsRepeater.addControl('confirm', {
    type: CONTROLLER_TEXTAREA,
    dynamic: false,
    responsive: false,
    label: 'Confirm Text',
    locked: true,
  });

  actionsRepeater.addControl('alert', {
    type: CONTROLLER_TEXTAREA,
    dynamic: false,
    responsive: false,
    label: 'Success',
    locked: true,
  });

  actionsRepeater.addControl('reject', {
    type: CONTROLLER_TEXTAREA,
    dynamic: false,
    responsive: false,
    label: 'Reject',
    locked: true,
  });

  element.addControl(idPrefix + 'actions', {
    label: sectionLabel,
    type: CONTROLLER_REPEATER,
    responsive: false,
    stateless: true,
    fields: actionsRepeater.getControls(),
    locked: true,
  });

  if(!forSection) {
    element.endControlSection();
  }
  /**
   * Список произвольных действия для кнопки END
   */
}
window.actionsControllers = actionsControllers
