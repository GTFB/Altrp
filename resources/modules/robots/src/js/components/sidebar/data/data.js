export const dataAction =  {
    "type": "action",
    "nodeData": {}
};

export const dataCondition = {  
    "type": "condition",
    "nodeData": {
        "type": "none",
        "operator": "&&",
        "body": [
            {
                ">": [
                    3,
                    3
                ]
            },
            {
                "<": [
                    1,
                    3
                ]
            },
        ]
    }
};

export const defaultCrud = {
    "type": "crud",
    "data": {
        "method": "",
        "body": {},
        "record_id": null,
        "model_id": ""
    }
};

export const sendMail = {
    "type": "send_mail",
    "data": {
        "entities": "",
        "subject": "",
        "message": ""
    }
};

export const sendNotice = {
    "type": "send_notification",
    "data": {
        "entities": "",
        "channels": [
            "broadcast",
            "telegram",
            "mail"
        ],
        "message": ""
    }
};