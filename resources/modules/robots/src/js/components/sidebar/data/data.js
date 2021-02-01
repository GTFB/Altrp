export const defaultData = [
  {
    id: '1',
    type: 'input', // input node
    data: {
      label: 'Input Node',
      data: [
        {
          "type": "send_mail",
          "data": {
            "to": "altrp@altrp.dev",
            "message": "message"
          }
        },
        {
          "type": "send_notification",
          "data": {
            "users1": [2,3],
            "users2": "all",
            "users3": "roles:admin,guest",
            "message": "message"
          }
        },
        {
          "type": "crud",
          "data": {
            "method": "create",
            "body": [
              {"id":1},{"name":"User"}
            ],
            "model_class": "App\\User",
            "model_id": "1"
          }
        }
      ]
    },
    position: { x: 250, y: 25 },
  },
  // default node
  {
    id: '2',
    // you can also pass a React component as a label
    data: { label: 'node1' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output', // output node
    data: { label: 'Output Node' },
    position: { x: 250, y: 250 },
  },
  // animated edge
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
];