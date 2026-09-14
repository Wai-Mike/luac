<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreDepartmentRequest;
use App\Http\Requests\Admin\UpdateDepartmentRequest;
use App\Models\Department;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class DepartmentController extends Controller
{
    use AuthorizesRequests;

    public function index(): Response
    {
        $departments = Department::query()
            ->withCount('users')
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
            'department' => $department->load(['head:id,name', 'users:id,name,email,department_id,office']),
            'executives' => User::query()
                ->where(fn ($q) => $q->where('is_executive', true)->orWhere('role', User::ROLE_ADMIN))
                ->orderBy('name')
                ->get(['id', 'name', 'email', 'department_id', 'office']),
        ]);
    }

    public function update(UpdateDepartmentRequest $request, Department $department): RedirectResponse
    {
        $data = $request->validated();
        $memberIds = $data['member_ids'] ?? [];
        unset($data['member_ids']);

        $department->update($data);

        if ($request->has('member_ids')) {
            User::query()
                ->where('department_id', $department->id)
                ->whereNotIn('id', $memberIds)
                ->update(['department_id' => null]);

            if ($memberIds !== []) {
                User::query()->whereIn('id', $memberIds)->update(['department_id' => $department->id]);
            }
        }

        if (! empty($data['head_id'])) {
            User::query()->whereKey($data['head_id'])->update(['department_id' => $department->id]);
        }

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
