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

/**
 * Добавляет контроллеры действия для элемента
 * @param {BaseElement} element - элемент
 * @param {string} sectionLabel - заголовок секции
 * @param {string} idPrefix - префикс, который добавляется ко всем id секция и контроллеров
 */
export function actionsControllers(element, sectionLabel = 'Actions', idPrefix = '') {
  /**
   * Список произвольных действия для кнопки START
   */
  element.startControlSection(idPrefix + 'actions_section', {
    tab: TAB_CONTENT,
    hideOnEmail: true,
    label: sectionLabel,
  });

  let actionsRepeater = new Repeater();

  actionsRepeater.addControl('type', {
    label: 'Type',
    type: CONTROLLER_SELECT,
    nullable: true,
    responsive: false,
    options: [
      {
        value: 'form',
        label: 'Form',
      },
      {
        value: 'email',
        label: 'Send Email',
      },
      {
        value: 'toggle_element',
        label: 'Toggle Elements',
      },
      {
        value: 'toggle_popup',
        label: 'Toggle Popup',
      },
      {
        value: 'print_page',
        label: 'Print Page',
      },
      {
        value: 'print_elements',
        label: 'Print Elements',
      },
      {
        value: 'scroll_to_element',
        label: 'Scroll to Element',
      },
      {
        value: 'scroll_to_top',
        label: 'Scroll to Top',
      },
      {
        value: 'scroll_to_bottom',
        label: 'Scroll to Bottom',
      },
      {
        value: 'redirect',
        label: 'Redirect',
      },
      {
        value: 'trigger',
        label: 'Trigger Action',
      },
      {
        value: 'page_to_pdf',
        label: 'Page to PDF',
      },
      {
        value: 'elements_to_pdf',
        label: 'Elements to PDF',
      },
      {
        value: 'data_to_csv',
        label: 'Data Convert to CSV',
      },
      {
        value: 'table_to_csv',
        label: 'Table to CSV',
      },
      {
        value: 'table_to_xls',
        label: 'Table to XLS'
      },
      {
        value: 'login',
        label: 'Login',
      },
      {
        value: 'logout',
        label: 'Logout',
      },
      {
        value: 'set_data',
        label: 'Set Data',
      },
      {
        value: 'forms_manipulate',
        label: 'Forms Manipulate',
      },
      {
        value: 'update_current_datasources',
        label: 'Update Current Datasources',
      },
      {
        value: 'custom_code',
        label: 'Custom JS-Code',
      },
      {
        value: 'play_sound',
        label: 'Play Sound',
      },
      {
        value: 'delay',
        label: 'Delay',
      },
    ],
  });

  actionsRepeater.addControl('email_template', {
    type: CONTROLLER_SELECT2,
    prefetch_options: true,
    label: 'Email Template',
    isClearable: true,
    options_resource: '/admin/ajax/templates/options?template_type=email&value=guid',
    nullable: true,
    conditions: {
      'type': 'email',
    },
  });

  actionsRepeater.addControl('code', {
    type: CONTROLLER_TEXTAREA,
    dynamic: false,
    responsive: false,
    label: 'Code',
    conditions: {
      type: [
        'custom_code'
      ],
    },
  });

  actionsRepeater.addControl('aliases', {
    type: CONTROLLER_TEXTAREA,
    dynamic: false,
    responsive: false,
    label: 'Aliases',
    conditions: {
      type: [
        'update_current_datasources'
      ],
    },
  });

  actionsRepeater.addControl('milliseconds', {
    type: CONTROLLER_NUMBER,
    dynamic: false,
    responsive: false,
    label: 'Duration in Milliseconds',
    conditions: {
      type: [
        'delay',
        'play_sound',
      ],
    },
  });

  actionsRepeater.addControl('loop', {
    type: CONTROLLER_SWITCHER,
    dynamic: false,
    responsive: false,
    label: 'Loop (Caution)',
    conditions: {
      type: [
        'play_sound',
      ],
    },
  });

  actionsRepeater.addControl('action', {
    type: CONTROLLER_TEXT,
    dynamic: false,
    responsive: false,
    label: 'Add Action Name',
    conditions: {
      type: [
        'trigger'
      ],
    },
  });

  actionsRepeater.addControl('forms_change', {
    label: 'Change',
    type: CONTROLLER_SELECT,
    responsive: false,
    nullable: true,
    options: [
      {
        value: 'select_all',
        label: 'Select All',
      },
      {
        value: 'clear',
        label: 'Clear Value',
      },
    ],
    conditions: {
      type: 'forms_manipulate',
    },
  });

  actionsRepeater.addControl('form_method', {
    label: 'Method',
    type: CONTROLLER_SELECT,
    responsive: false,
    nullable: true,
    options: [
      {
        value: 'GET',
        label: 'Get',
      },
      {
        value: 'PUT',
        label: 'Put',
      },
      {
        value: 'POST',
        label: 'Post',
      },
      {
        value: 'DELETE',
        label: 'Delete',
      },
    ],
    conditions: {
      type: 'form',
    },
  });

  actionsRepeater.addControl('custom_headers', {
    label: 'Custom Headers',
    type: CONTROLLER_TEXTAREA,
    responsive: false,
    conditions: {
      type: 'form',
    },
  });

  actionsRepeater.addControl('from', {
    label: 'From',
    type: CONTROLLER_TEXT,
    responsive: false,
    conditions: {
      type: 'email',
    },
  });

  actionsRepeater.addControl('to', {
    label: 'Email',
    type: CONTROLLER_TEXT,
    responsive: false,
    conditions: {
      type: 'email',
    },
  });

  actionsRepeater.addControl('subject', {
    label: 'Subject',
    type: CONTROLLER_TEXTAREA,
    responsive: false,
    conditions: {
      type: 'email',
    },
  });

  actionsRepeater.addControl('attachments', {
    label: 'Attachments',
    type: CONTROLLER_TEXTAREA,
    responsive: false,
    conditions: {
      type: 'email',
    },
  });

  actionsRepeater.addControl('form_id', {
    label: 'Form ID',
    dynamic: false,
    responsive: false,
    conditions: {
      type: [
        'form',
        'login',
      ],
    },
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
        'table_to_xls'
      ],
    },
  });

  actionsRepeater.addControl('form_url', {
    label: 'URL',
    responsive: false,
    dynamic: false,
    description: '/ajax/models/tests/{{id}}',
    conditions: {
      type: [
        'form',
        'redirect',
      ],
    },
  });

  actionsRepeater.addControl('media_url', {
    label: 'Media URL',
    responsive: false,
    dynamic: false,
    conditions: {
      type: [
        'play_sound',
      ],
    },
  });

  actionsRepeater.addControl('forms_bulk', {
    label: 'Bulk Requests',
    type: CONTROLLER_SWITCHER,
    responsive: false,
    dynamic: false,
    conditions: {
      type: [
        'form',
      ],
    },
  });

  actionsRepeater.addControl('bulk_path', {
    label: 'Bulk Path',
    responsive: false,
    dynamic: false,
    conditions: {
      type: [
        'form',
      ],
      forms_bulk: true,
    },
  });

  actionsRepeater.addControl('back', {
    label: 'Back',
    type: CONTROLLER_SWITCHER,
    responsive: false,
    dynamic: false,
    conditions: {
      type: [
        'redirect',
      ],
    },
  });

  actionsRepeater.addControl('outer', {
    label: 'Outer',
    type: CONTROLLER_SWITCHER,
    responsive: false,
    dynamic: false,
    conditions: {
      type: [
        'redirect',
      ],
    },
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
        'forms_manipulate',
      ],
    },
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
        'toggle_offcanvas',
        'table_to_xls',
      ],
    },
  });

  actionsRepeater.addControl('template_name', {
    label: 'Template name',
    responsive: false,
    dynamic: false,
    description: 'template_name',
    conditions: {
      type: [
        'table_to_xls'
      ]
    }
  });

  actionsRepeater.addControl('template_data', {
    label: 'Data',
    type: CONTROLLER_TEXTAREA,
    responsive: false,
    dynamic: false,
    description: 'template_data',
    conditions: {
      type: [
        'table_to_xls'
      ]
    }
  });

  actionsRepeater.addControl('path', {
    type: CONTROLLER_TEXTAREA,
    label: 'Path',
    responsive: false,
    dynamic: false,
    description: 'altrppagestate.alias',
    conditions: {
      type: [
        'data_to_csv',
        'set_data',
        'form',
      ],
    },
  });

  actionsRepeater.addControl('data', {
    type: CONTROLLER_TEXTAREA,
    label: 'Data for Form',
    responsive: false,
    dynamic: false,
    description: 'param_1 | {{altrpdata.alias}}',
    conditions: {
      type: [
        'form',
      ],
    },
  });
  // actionsRepeater.addControl('custom_headers', {
  //   type: CONTROLLER_TEXTAREA,
  //   label: 'Data',
  //   responsive: false,
  //   dynamic: false,
  //   description: 'param_1 | {{altrpdata.alias}}',
  //   conditions: {
  //     type: [
  //       'form',
  //     ],
  //   },
  // });

  actionsRepeater.addControl('set_type', {
    label: 'Set Type',
    type: CONTROLLER_SELECT,
    responsive: false,
    nullable: true,
    options: [
      {
        label: 'Toggle',
        value: 'toggle',
      },
      {
        label: 'Set',
        value: 'set',
      },
      {
        label: 'Toggle/Set',
        value: 'toggle_set',
      },
      {
        label: 'Increment',
        value: 'increment',
      },
      {
        label: 'Decrement',
        value: 'decrement',
      },
      {
        label: 'Push Items',
        value: 'push_items',
      },
      {
        label: 'Remove Items',
        value: 'remove_items',
      },
    ],
    conditions: {
      type: 'set_data',
    },
  });

  actionsRepeater.addControl('count', {
    label: 'Count',
    type: CONTROLLER_NUMBER,
    responsive: false,
    dynamic: false,
    conditions: {
      type: [
        'set_data',
      ],
      set_type: [
        'push_items',
        'decrement',
        'increment',
      ],
    },
  });

  actionsRepeater.addControl('value', {
    label: 'Value',
    type: CONTROLLER_TEXTAREA,
    responsive: false,
    dynamic: false,
    description: 'Value or Path to Value',
    conditions: {
      type: [
        'set_data',
      ],
      set_type: [
        'set',
        'toggle_set',
        'push_items',
      ],
    },
  });

  actionsRepeater.addControl('popup_id', {
    type: CONTROLLER_SELECT2,
    prefetch_options: true,
    label: 'Popup ID',
    isClearable: true,
    options_resource: '/admin/ajax/templates/options?template_type=popup&value=guid',
    nullable: true,
    responsive: false,
    conditions: {
      type: [
        'toggle_popup',
      ],
    },
  });

  actionsRepeater.addControl('confirm', {
    type: CONTROLLER_TEXTAREA,
    dynamic: false,
    responsive: false,
    label: 'Confirm Text',
  });

  actionsRepeater.addControl('alert', {
    type: CONTROLLER_TEXTAREA,
    dynamic: false,
    responsive: false,
    label: 'Success',
  });

  actionsRepeater.addControl('reject', {
    type: CONTROLLER_TEXTAREA,
    dynamic: false,
    responsive: false,
    label: 'Reject',
  });

  element.addControl(idPrefix + 'actions', {
    label: 'Actions',
    type: CONTROLLER_REPEATER,
    responsive: false,
    fields: actionsRepeater.getControls(),
  });

  element.endControlSection();
  /**
   * Список произвольных действия для кнопки END
   */
}