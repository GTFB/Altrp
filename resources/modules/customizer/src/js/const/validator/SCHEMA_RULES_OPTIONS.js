const SCHEMA_RULES_OPTIONS = {
  string: [
    {
      label: 'Email',
      value: 'email',
    },
    {
      label: 'Regular Expression',
      value: 'regex',
    },
    // {
    //   label: 'Phone',
    //   value: 'mobile',
    // },
    {
      label: 'Confirmed',
      value: 'confirmed',
    },
    {
      label: 'Trim',
      value: 'trim',
    },
    {
      label: 'Max Length',
      value: 'maxLength',
    },
    {
      label: 'Min Length',
      value: 'minLength',
    },
    {
      label: 'Unique',
      value: 'unique',
    },
    {
      label: 'Exists',
      value: 'exists',
    },
    {
      label: 'GUID/UUID',
      value: 'uuid',
    },
    {
      label: 'Required If Exists',
      value: 'requiredIfExists',
    },
    {
      label: 'Required If Not Exists',
      value: 'requiredIfNotExists',
    },
  ],
  number: [
    {
      label: 'Required If Exists',
      value: 'requiredIfExists',
    },
    {
      label: 'Required If Not Exists',
      value: 'requiredIfNotExists',
    },
    {
      label: 'Range',
      value: 'range',
    },
    {
      label: 'Unique',
      value: 'unique',
    },
    {
      label: 'Exists',
      value: 'exists',
    },
    {
      label: 'Unsigned',
      value: 'unsigned',
    },

  ],
  boolean: [
    {
      label: 'Required If Exists',
      value: 'requiredIfExists',
    },
    {
      label: 'Required If Not Exists',
      value: 'requiredIfNotExists',
    },
    {
      label: 'Unique',
      value: 'unique',
    },
    {
      label: 'Exists',
      value: 'exists',
    },

  ],
  date: [
    {
      label: 'Required If Exists',
      value: 'requiredIfExists',
    },
    {
      label: 'Required If Not Exists',
      value: 'requiredIfNotExists',
    },
    {
      label: 'Unique',
      value: 'unique',
    },
    {
      label: 'Exists',
      value: 'exists',
    },

  ],
  file: [
    {
      label: 'Required If Exists',
      value: 'requiredIfExists',
    },
    {
      label: 'Required If Not Exists',
      value: 'requiredIfNotExists',
    },
    {
      label: 'Unique',
      value: 'unique',
    },
    {
      label: 'Exists',
      value: 'exists',
    },

  ],
  array: [
    {
      label: 'Required If Exists',
      value: 'requiredIfExists',
    },
    {
      label: 'Required If Not Exists',
      value: 'requiredIfNotExists',
    },
    {
      label: 'Unique',
      value: 'unique',
    },
    {
      label: 'Exists',
      value: 'exists',
    },

  ],
  object: [
    {
      label: 'Required If Exists',
      value: 'requiredIfExists',
    },
    {
      label: 'Required If Not Exists',
      value: 'requiredIfNotExists',
    },
    {
      label: 'Unique',
      value: 'unique',
    },
    {
      label: 'Exists',
      value: 'exists',
    },

  ],
}


export default SCHEMA_RULES_OPTIONS
