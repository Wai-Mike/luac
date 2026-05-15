<?php

namespace Database\Seeders;

use App\Models\Department;
use Illuminate\Database\Seeder;

class DefaultDepartmentsSeeder extends Seeder
{
    public function run(): void
    {
        $definitions = [
            ['name' => 'Executive Office', 'slug' => 'executive-office'],
            ['name' => 'Finance & Administration', 'slug' => 'finance-administration'],
            ['name' => 'ICT & Information', 'slug' => 'ict-information'],
            ['name' => 'Programs & Welfare', 'slug' => 'programs-welfare'],
            ['name' => 'External & Legal Affairs', 'slug' => 'external-legal-affairs'],
        ];

        foreach ($definitions as $def) {
            Department::query()->firstOrCreate(
                ['slug' => $def['slug']],
                [
                    'name' => $def['name'],
                    'description' => null,
                    'status' => 'active',
                ]
            );
        }
    }
}
