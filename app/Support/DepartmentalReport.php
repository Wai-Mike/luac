<?php

namespace App\Support;

class DepartmentalReport
{
    public const ASSOCIATION = 'LUAC AKOOK DE YIEU YOUTH ASSOCIATION – JUBA';

    public const KINDS = [
        'monthly' => 'Monthly Departmental Progress Report',
        'weekly' => 'Weekly Departmental Progress Report',
        'post_event' => 'Post-Event Departmental Report',
        'quarterly' => 'Quarterly Departmental Progress Report',
        'departmental' => 'Monthly Departmental Progress Report',
    ];

    public const DEFAULT_SUBMITTED_TO = 'The Office of the Chairperson';

    public const DEFAULT_CC = [
        'Office of the Secretary General',
        'Office of the Finance Secretary',
        'Office of the External Affairs Secretary',
        'File',
    ];

    /**
     * @return array<string, mixed>
     */
    public static function emptyPayload(): array
    {
        return [
            'submitted_to' => self::DEFAULT_SUBMITTED_TO,
            'submitted_by' => '',
            'prepared_by' => '',
            'submitted_on' => '',
            'purpose' => '',
            'objectives' => '',
            'metrics' => [
                ['metric' => '', 'status' => ''],
            ],
            'highlights' => '',
            'financial_update' => '',
            'challenges' => '',
            'risks' => [
                ['risk' => '', 'effect' => '', 'mitigation' => ''],
            ],
            'actions' => [
                ['item' => '', 'office' => '', 'status' => 'Pending'],
            ],
            'next_priorities' => '',
            'recommendations' => '',
            'conclusion' => '',
            'reviewed_by' => '',
            'approved_by' => '',
            'approved_on' => '',
            'attachment_title' => '',
            'attachment_note' => '',
            'attachment_columns' => ['S/N', 'Full Name', 'School Admitted In'],
            'attachment_rows' => [
                ['', '', ''],
            ],
            'cc' => self::DEFAULT_CC,
        ];
    }

    /**
     * @param  array<string, mixed>|null  $payload
     * @return array<string, mixed>
     */
    public static function normalize(?array $payload): array
    {
        $base = self::emptyPayload();
        $incoming = $payload ?? [];
        $merged = array_replace($base, $incoming);

        foreach (['metrics', 'risks', 'actions', 'attachment_rows', 'cc', 'attachment_columns'] as $key) {
            if (! is_array($merged[$key] ?? null) || $merged[$key] === []) {
                $merged[$key] = $base[$key];
            }
        }

        foreach ($base as $key => $value) {
            if (is_string($value) && ($merged[$key] ?? null) === null) {
                $merged[$key] = '';
            }
        }

        return $merged;
    }

    public static function kindLabel(?string $kind): string
    {
        return self::KINDS[$kind] ?? self::KINDS['monthly'];
    }

    public static function departmentHeading(?string $name): string
    {
        return mb_strtoupper(self::departmentOf($name) === 'Department' ? 'DEPARTMENTAL REPORT' : self::departmentOf($name));
    }

    public static function departmentOf(?string $name): string
    {
        $name = trim((string) $name);
        if ($name === '') {
            return 'Department';
        }

        $rest = preg_replace('/^department(\s+of)?\s+/i', '', $name) ?: $name;

        return 'Department of '.$rest;
    }

    /**
     * @return list<string>
     */
    public static function lines(?string $text): array
    {
        return collect(preg_split('/\r\n|\r|\n/', (string) $text) ?: [])
            ->map(fn ($line) => trim((string) $line))
            ->filter()
            ->values()
            ->all();
    }
}
