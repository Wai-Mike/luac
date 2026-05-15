<?php

namespace App\Observers;

use App\Models\ActivityLog;
use App\Models\Department;

class DepartmentObserver
{
    public function created(Department $department): void
    {
        $this->write('department.created', 'Department created', $department, [
            'name' => $department->name,
            'slug' => $department->slug,
        ]);
    }

    public function updated(Department $department): void
    {
        $this->write('department.updated', 'Department updated', $department, array_filter([
            'changes' => $department->wasChanged() ? $department->getChanges() : null,
        ]));
    }

    public function deleted(Department $department): void
    {
        $this->write('department.deleted', 'Department archived', $department, [
            'name' => $department->name,
        ]);
    }

    /**
     * @param  array<string, mixed>  $properties
     */
    private function write(string $action, string $description, Department $department, array $properties): void
    {
        ActivityLog::query()->create([
            'user_id' => auth()->id(),
            'action' => $action,
            'description' => $description,
            'subject_type' => $department::class,
            'subject_id' => $department->getKey(),
            'properties' => $properties === [] ? null : $properties,
        ]);
    }
}
