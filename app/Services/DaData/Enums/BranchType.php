<?php

namespace App\Services\DaData\Enums;

/**
 * Class BranchType
 */
class BranchType
{

    const MAIN   = 1;
    const BRANCH = 2;

    /**
     * @var string[]
     */
    public static $map  = [
        self::MAIN     => 'MAIN',
        self::BRANCH   => 'BRANCH',
    ];

}
