<?php

namespace App\Support;

class LuacPayams
{
    public const ALL = ['Belawic', 'Wunlem', 'Mareng'];

    /**
     * @return array<int, string>
     */
    public static function rule(bool $required = true): array
    {
        return [
            $required ? 'required' : 'nullable',
            'string',
            'in:'.implode(',', self::ALL),
        ];
    }
}
