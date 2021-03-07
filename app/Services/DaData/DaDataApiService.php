<?php


namespace App\Services\DaData;


use App\Services\DaData\Facades\DaDataAddress;
use App\Services\DaData\Facades\DaDataName;
use App\Services\DaData\Facades\DaDataEmail;
use App\Services\DaData\Facades\DaDataPhone;
use App\Services\DaData\Facades\DaDataCompany;
use App\Services\DaData\Facades\DaDataBank;
use App\Services\DaData\Facades\DaDataPassport;

class DaDataApiService
{
    // ***************
    //     АДРЕСА
    // ***************

    /**
     * Стандартизировать адрес (привести к общему стандарту)
     * @param string $address
     * @return \App\Services\DaData\DaDataAddress
     */
    public function addressStandardization(string $address)
    {
        return DaDataAddress::standardization($address);
    }

    /**
     * Получить подсказки по адресам
     * @param string $query
     * @param int $count
     * @param int $language
     * @param array $locations
     * @param array $locations_geo
     * @param array $locations_boost
     * @param array $from_bound
     * @param array $to_bound
     * @return \App\Services\DaData\DaDataAddress
     */
    public function addressPrompt(
        string $query,
        int $count,
        int $language,
        array $locations = [],
        array $locations_geo = [],
        array $locations_boost = [],
        array $from_bound = [],
        array $to_bound = []
    ) {
        return DaDataAddress::prompt(
            $query,
            $count,
            $language,
            $locations,
            $locations_geo,
            $locations_boost,
            $from_bound,
            $to_bound
        );
    }

    /**
     * Определить адрес по заданным координатам
     * @param float $lat
     * @param float $lon
     * @param int $count
     * @param int $radius_meters
     * @param int $language
     * @return \App\Services\DaData\DaDataAddress
     */
    public function addressGeoLocate(float $lat, float $lon, int $count, int $radius_meters, int $language)
    {
        return DaDataAddress::geolocate($lat, $lon, $count, $radius_meters, $language);
    }

    /**
     * Определить адрес по IP
     * @param string $ip
     * @param int $count
     * @param int $language
     * @return \App\Services\DaData\DaDataAddress
     */
    public function addressByIP(string $ip, int $count, int $language)
    {
        return DaDataAddress::iplocate($ip, $count, $language);
    }

    /**
     * Определить адрес по КЛАДР или ФИАС коду
     * @param string $ip
     * @param int $count
     * @param int $language
     * @return \App\Services\DaData\DaDataAddress
     */
    public function addressByCode(string $ip, int $count, int $language)
    {
        return DaDataAddress::id($ip, $count, $language);
    }

    /**
     * Определить ближайшее почтовое отделение (ПОЧТА РОССИИ)
     * @param string $address
     * @param int $count
     * @param int $language
     * @return \App\Services\DaData\DaDataAddress
     */
    public function addressPostalUnit(string $address, int $count, int $language)
    {
        return DaDataAddress::postalUnitByAddress($address, $count, $language);
    }

    /**
     * Определить почтовое отделение по почтовому индексу (ПОЧТА РОССИИ)
     * @param int $code
     * @param int $count
     * @param int $language
     * @return \App\Services\DaData\DaDataAddress
     */
    public function addressPostalUnitById(int $code, int $count, int $language)
    {
        return DaDataAddress::postalUnitById($code, $count, $language);
    }

    /**
     * Определить почтовое отделение по координатам (ПОЧТА РОССИИ)
     * @param float $lat
     * @param float $lon
     * @param int $radius_meters
     * @param int $count
     * @param int $language
     * @return \App\Services\DaData\DaDataAddress
     */
    public function addressPostalUnitByGeoLocate(float $lat, float $lon, int $radius_meters, int $count, int $language)
    {
        return DaDataAddress::postalUnitByGeoLocate($lat, $lon, $radius_meters, $count, $language);
    }

    /**
     * Определить идентификатор города в службе доставки на основании КЛАДР-кода города
     * @param string $code
     * @return \App\Services\DaData\DaDataAddress
     */
    public function addressDelivery(string $code)
    {
        return DaDataAddress::delivery($code);
    }

    /**
     * Найти адрес в справочнике ФИАС по коду КЛАДР или ФИАС
     * @param string $code
     * @return \App\Services\DaData\DaDataAddress
     */
    public function addressByFiasCode(string $code)
    {
        return DaDataAddress::fias($code);
    }

    // **************
    //     ИМЕНА
    // **************

    /**
     * Стандартизирвать имя (ФИО)
     *  - Исправляет опечатки и транслитерирует.
     *  - Проставляет пол.
     *  - Склоняет по падежам (кого? кому? кем?).
     * @param string $name
     * @return \App\Services\DaData\DaDataName
     */
    public function nameStandardization(string $name)
    {
        return DaDataName::standardization($name);
    }

    /**
     * Подсказки и автодополнение при вводе имени
     * @param string $name
     * @param int $count
     * @param int $gender
     * @param array $parts
     * @return \App\Services\DaData\DaDataName
     */
    public function namePrompt(string $name, int $count, int $gender, array $parts)
    {
        return DaDataName::prompt($name, $count, $gender, $parts);
    }

    // **********************
    //      EMAIL АДРЕСА
    // **********************

    /**
     * Стандартизировать email адрес
     * - Проверяет формат адреса.
     * - Исправляет распространённые опечатки.
     * - Проверяет, не «одноразовый» ли адрес.
     * - Классифицирует адреса на личные (@mail.ru, @yandex.ru), корпоративные (@myshop.ru) и «ролевые» (info@, support@).
     * @param string $email
     * @return \App\Services\DaData\DaDataEmail
     */
    public function emailStandardization(string $email)
    {
        return DaDataEmail::standardization($email);
    }

    /**
     * Подсказки при вводе email адреса
     * @param string $email
     * @param int $count
     * @return \App\Services\DaData\DaDataEmail
     */
    public function emailPrompt(string $email, int $count)
    {
        return DaDataEmail::prompt($email, $count);
    }

    // ***************************
    //      ТЕЛЕФОННЫЕ НОМЕРА
    // ***************************

    /**
     * Стандартизировать телефонный номер
     * - Проверяет телефон.
     * - Проставляет актуальный код города / DEF-код.
     * - Восстанавливает оператора. Учитывает переносы номера между операторами.
     * - Определяет страну, регион, город и часовой пояс.
     * @param string $phone
     * @return \App\Services\DaData\DaDataPhone
     */
    public function phoneStandardization(string $phone)
    {
        return DaDataPhone::standardization($phone);
    }

    // ******************
    //      КОМПАНИИ
    // ******************

    /**
     * Получить компанию или ИП по ИНН, КПП, ОГРН
     * @param string $id
     * @param int $count
     * @param string $kpp
     * @param int $branch_type
     * @param int $type
     * @return \App\Services\DaData\DaDataCompany
     */
    public function companyById(string $id, int $count, string $kpp, int $branch_type, int $type)
    {
        return DaDataCompany::id($id, $count, $kpp, $branch_type, $type);
    }

    /**
     * Подсказки и автодополнение при вводе компании
     * @param string $company
     * @param int $count
     * @param array $status
     * @param int $type
     * @param string $locations
     * @param string $locations_boost
     * @return \App\Services\DaData\DaDataCompany
     */
    public function companyPrompt(
        string $company,
        int $count,
        array $status,
        int $type,
        string $locations,
        string $locations_boost
    ) {
        return DaDataCompany::prompt($company, $count, $status, $type, $locations, $locations_boost);
    }

    /**
     * Поиск аффилированных компаний по ИНН физлиц и юрлиц
     * @param string $code
     * @param int $count
     * @param array $scope
     * @return \App\Services\DaData\DaDataCompany
     */
    public function companyAffiliated(string $code, int $count, array $scope)
    {
        return DaDataCompany::affiliated($code, $count, $scope);
    }

    // ***************
    //      БАНКИ
    // ***************

    /**
     * Получить банк по конкретному БИК, SWIFT, ИНН или регистрационному номеру
     * @param string $bank
     * @return \App\Services\DaData\DaDataBank
     */
    public function bankById(string $bank)
    {
        return DaDataBank::id($bank);
    }

    /**
     * Подсказки по банкам (поиск по реквизитам банка)
     * @param string $bank
     * @param int $count
     * @param array $status
     * @param array $type
     * @param string $locations
     * @param string $locations_boost
     * @return \App\Services\DaData\DaDataBank
     */
    public function bankPrompt(
        string $bank,
        int $count,
        array $status,
        array $type,
        string $locations,
        string $locations_boost
    ) {
        return DaDataBank::prompt($bank, $count, $status, $type, $locations, $locations_boost);
    }

    // ******************
    //      ПАСПОРТА
    // ******************

    /**
     * Проверяет паспорт по справочнику недействительных паспортов МВД
     * @param string $id
     * @return \App\Services\DaData\DaDataPassport
     */
    public function passportStandardization(string $id)
    {
        return DaDataPassport::standardization($id);
    }

    /**
     * Моментально заполняет организацию, выдавшую паспорт, по коду подразделения
     * @param string $passport
     * @param int $count
     * @return \App\Services\DaData\DaDataPassport
     */
    public function passportByFms(string $passport, int $count)
    {
        return DaDataPassport::fms($passport, $count);
    }
}
