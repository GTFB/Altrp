<?php

return [

    /*
     * Префикс к маршрутам
     */
    'route_prefix' => 'admin',

    /*
     * Название папки для миграций
     */
    'migrations_folder_name' => 'altrp_migrations',

    /*
     * Путь к файлам моделей
     */
    'models_path' => 'app/AltrpModels',

    /*
     * Путь к файлам контроллеров
     */
    'controllers_path' => 'app/Http/Controllers/AltrpControllers',

    /*
     * Путь к файлам событий
     */
    'events_path' => 'app/Events/AltrpEvents',

    /*
     * Путь к файлам наблюдателей
     */
    'observers_path' => 'app/Observers/AltrpObservers',

    /*
     * Путь к файлам сервис провайдеров
     */
    'service_providers_path' => 'app/Providers/AltrpProviders',

    /*
     * Путь к файлам уведомлений
     */
    'notifications_path' => 'app/Notifications/AltrpNotifications',

    /*
     * Настройка отправки email новым пользователям
     */
    'send_email_new_users' => env('MAIL_TO_NEW_USERS', true),
];
