<?php

namespace App\Support;

class ExcelWorkbook
{
    /**
     * @param  list<string>  $headers
     * @param  list<list<string|int|float|null>>  $rows
     */
    public static function spreadsheetMl(string $sheetName, array $headers, array $rows): string
    {
        return self::workbook([[
            'name' => $sheetName,
            'headers' => $headers,
            'rows' => $rows,
        ]]);
    }

    /**
     * @param  list<array{name: string, headers: list<string>, rows: list<list<string|int|float|null>>}>  $sheets
     */
    public static function workbook(array $sheets): string
    {
        $worksheets = '';

        foreach ($sheets as $sheet) {
            $body = self::row($sheet['headers'] ?? [], true);
            foreach ($sheet['rows'] ?? [] as $row) {
                $body .= self::row($row, false);
            }

            $name = self::escape(mb_substr((string) ($sheet['name'] ?? 'Sheet'), 0, 31));
            $worksheets .= <<<XML
 <Worksheet ss:Name="{$name}">
  <Table>
   {$body}
  </Table>
 </Worksheet>
XML;
        }

        return <<<XML
<?xml version="1.0" encoding="UTF-8"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">
 <Styles>
  <Style ss:ID="Header">
   <Font ss:Bold="1"/>
  </Style>
 </Styles>
{$worksheets}
</Workbook>
XML;
    }

    /**
     * @param  list<string|int|float|null>  $values
     */
    private static function row(array $values, bool $header = false): string
    {
        $xml = '<Row>';
        foreach ($values as $value) {
            $style = $header ? ' ss:StyleID="Header"' : '';
            $xml .= '<Cell'.$style.'><Data ss:Type="String">'.self::escape((string) ($value ?? '')).'</Data></Cell>';
        }

        return $xml.'</Row>';
    }

    private static function escape(string $value): string
    {
        return htmlspecialchars($value, ENT_XML1 | ENT_QUOTES, 'UTF-8');
    }
}
