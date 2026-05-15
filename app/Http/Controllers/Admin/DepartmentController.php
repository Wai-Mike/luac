<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreDepartmentRequest;
use App\Http\Requests\Admin\UpdateDepartmentRequest;
use App\Models\Department;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    public function __construct()
    {
        $this->authorizeResource(Department::class, 'department');
    }

    public function index(): Response
    {
        $departments = Department::query()
            ->orderBy('name')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/departments/index', [
            'departments' => $departments,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('admin/departments/create');
    }

    public function store(StoreDepartmentRequest $request): RedirectResponse
    {
        Department::query()->create($request->validated());

        return redirect()->route('admin.departments.index')->with('success', 'Department created.');
    }

    public function show(Department $department): Response
    {
        return Inertia::render('admin/departments/show', [
            'department' => $department,
        ]);
    }

    public function edit(Department $department): Response
    {
        return Inertia::render('admin/departments/edit', [
            'department' => $department,
        ]);
    }

    public function update(UpdateDepartmentRequest $request, Department $department): RedirectResponse
    {
        $department->update($request->validated());

        return redirect()->route('admin.departments.index')->with('success', 'Department updated.');
    }

    public function destroy(Department $department): RedirectResponse
    {
        $department->delete();

        return redirect()->route('admin.departments.index')->with('success', 'Department archived.');
    }

    public function toggleStatus(Department $department): RedirectResponse
    {
        $this->authorize('update', $department);

        $department->update([
            'status' => $department->status === 'active' ? 'inactive' : 'active',
        ]);

        return redirect()->back()->with('success', 'Department status updated.');
    }
}
