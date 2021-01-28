export const defaultData = [
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
];