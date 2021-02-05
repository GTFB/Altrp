export const dataAction =  {
    "type": "action",
    "nodeData": [
        {
            "type": "crud",
            "data": {
                "method": "update",
                "body": {
                    "name": "User",
                    "email": "awdad@mail.ru"
                },
                "model_class": "App\\User",
                "model_id": "4"
            }
        },
        {
            "type": "send_mail",
            "data": {
                "entities": "all",
                "subject": "New subject",
                "message": "Hello my old friend!"
            }
        },
        {
            "type": "send_notice",
            "data": {
                "entities": {"users": [1,2,3], "roles": [1,2,3]},
                "message": "Message has been sent."
            }
        }
    ]
};

export const dataCondition = {  
    "type": "condition",
    "nodeData": [
        {
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
                "and"
            ]
        },
        {
            "operator": "||",
            "body": [
                {
                    ">": [
                        3,
                        1
                    ]
                },
                {
                    "<": [
                        1,
                        3
                    ]
                },
                "and"
            ]
        },
        {
            "operator": "&&",
            "body": [
                {
                    "==": [
                        5,
                        5
                    ]
                },
                {
                    "<": [
                        1,
                        3
                    ]
                },
                {
                    ">": [
                        7,
                        6
                    ]
                },
                "and"
            ]
        },
        {
            "operator": "&&",
            "body": [
                {
                    ">": [
                        3,
                        1
                    ]
                },
                {
                    "<": [
                        1,
                        3
                    ]
                },
                "and"
            ]
        }
    ]
};