<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit2287237f96d8838620db0e2600eb05a5
{
    public static $prefixLengthsPsr4 = array (
        'U' => 
        array (
            'Usuario\\Servidor\\' => 17,
        ),
        'F' => 
        array (
            'Firebase\\JWT\\' => 13,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'Usuario\\Servidor\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
        'Firebase\\JWT\\' => 
        array (
            0 => __DIR__ . '/..' . '/firebase/php-jwt/src',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit2287237f96d8838620db0e2600eb05a5::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit2287237f96d8838620db0e2600eb05a5::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInit2287237f96d8838620db0e2600eb05a5::$classMap;

        }, null, ClassLoader::class);
    }
}
