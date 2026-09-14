<?php

namespace App\Support;

class AssociationMoney
{
    public const CURRENCIES = [
        'SSP' => 'South Sudanese pounds (SSP)',
        'USD' => 'US dollars (USD)',
    ];

    public const PAYMENT_METHODS = [
        'cash' => 'Cash',
        'bank_transfer' => 'Bank transfer',
    ];

    public static function currency(?string $code): string
    {
        $code = strtoupper((string) $code);

        return array_key_exists($code, self::CURRENCIES) ? $code : 'SSP';
    }

    public static function currencyLabel(?string $code): string
    {
        return self::CURRENCIES[self::currency($code)];
    }

    public static function paymentMethod(?string $method): ?string
    {
        return array_key_exists((string) $method, self::PAYMENT_METHODS) ? $method : null;
    }

    public static function paymentLabel(?string $method): string
    {
        $method = self::paymentMethod($method);

        return $method ? self::PAYMENT_METHODS[$method] : '—';
    }
}
