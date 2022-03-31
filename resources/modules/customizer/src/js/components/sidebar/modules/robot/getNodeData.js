// Получение data нового элемента (ноды)
const getNodeData = (type) => {
  let data = { type };

  switch (type){
    case "documentAction":
      data = {
        "type": "documentAction",
        "nodeData": {
          "type": "document",
          "data": {
          }
        },
      };
      break;
    case "crudAction":
      data = {
        "type": "crudAction",
        "nodeData": {
          "type": "crud",
          "data": {
            "method": "",
            "body": {},
            "record": "",
            "model_id": "",
          }
        }
      };
      break;
    case "apiAction":
      data = {
        "type": "apiAction",
        "nodeData": {
          "type": "api",
          "data": {
            "source": "",
            "method": "",
            "headers": "",
            "name": "",
            "url": "",
            "data": ""
          }
        },
      };
      break;
    case "messageAction":
      data = {
        "type": "messageAction",
        "nodeData": {
          "type": "send_notification",
          "data": {
            "entities": "",
            "entitiesData": {
              "users": [],
              "roles": [],
              "dynamicValue": "",
            },
            "channel": "",
            "content": {},
          }
        }
      };
      break;
    case "condition":
      data = {
        "type": "condition",
        "nodeData": {
          "operator": "",
          "body": []
        }
      };
      break;
    case "start":
      data = {
        "type": "start",
        "nodeData": {
          "operator": "",
          "body": []
        }
      };
      break;
    case "robot":
      data = {
        "type": "robot",
        "nodeData": {
          "id": "",
        }
      };
      break;
    case "bot":
      data = {
        "type": "bot",
        "nodeData": {
          "type": "bot",
          "data": {
            "shortcode": "",
            "content": [],
          }
        }
      };
      break;
  }
  return data;
}

export default getNodeData
