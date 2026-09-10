<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AssociationMeeting;
use App\Models\AssociationReport;
use App\Models\AssociationTask;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class OperationsController extends Controller
{
    public function index()
    {
        return Inertia::render('admin/operations/index', [
            'reports' => AssociationReport::query()->with('author:id,name')->latest()->get(),
            'meetings' => AssociationMeeting::query()
                ->with(['organizer:id,name', 'attendees:id,name'])
                ->orderByDesc('starts_at')
                ->get(),
            'tasks' => AssociationTask::query()
                ->with(['assignee:id,name', 'assigner:id,name'])
                ->latest()
                ->get(),
            'executives' => User::query()
                ->where(fn ($q) => $q->where('is_executive', true)->orWhere('role', User::ROLE_ADMIN))
                ->orderBy('name')
                ->get(['id', 'name', 'email']),
        ]);
    }

    public function storeReport(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'period' => ['nullable', 'string', 'max:80'],
            'summary' => ['required', 'string', 'max:2000'],
            'body' => ['nullable', 'string', 'max:20000'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'is_public' => ['sometimes', 'boolean'],
        ]);

        AssociationReport::query()->create([
            ...$data,
            'is_public' => (bool) ($data['is_public'] ?? false),
            'created_by' => $request->user()?->id,
        ]);

        return back()->with('success', 'Report saved.');
    }

    public function updateReport(Request $request, AssociationReport $report)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'period' => ['nullable', 'string', 'max:80'],
            'summary' => ['required', 'string', 'max:2000'],
            'body' => ['nullable', 'string', 'max:20000'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'is_public' => ['sometimes', 'boolean'],
        ]);

        $report->update([
            ...$data,
            'is_public' => (bool) ($data['is_public'] ?? false),
        ]);

        return back()->with('success', 'Report updated.');
    }

    public function destroyReport(AssociationReport $report)
    {
        $report->delete();

        return back()->with('success', 'Report removed.');
    }

    public function storeMeeting(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'agenda' => ['nullable', 'string', 'max:4000'],
            'location' => ['nullable', 'string', 'max:255'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'status' => ['nullable', Rule::in(['scheduled', 'completed', 'cancelled'])],
            'attendee_ids' => ['nullable', 'array'],
            'attendee_ids.*' => ['integer', 'exists:users,id'],
        ]);

        $meeting = AssociationMeeting::query()->create([
            'title' => $data['title'],
            'agenda' => $data['agenda'] ?? null,
            'location' => $data['location'] ?? null,
            'starts_at' => $data['starts_at'],
            'ends_at' => $data['ends_at'] ?? null,
            'status' => $data['status'] ?? 'scheduled',
            'created_by' => $request->user()?->id,
        ]);

        $meeting->attendees()->sync($data['attendee_ids'] ?? []);

        return back()->with('success', 'Meeting scheduled.');
    }

    public function updateMeeting(Request $request, AssociationMeeting $meeting)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'agenda' => ['nullable', 'string', 'max:4000'],
            'location' => ['nullable', 'string', 'max:255'],
            'starts_at' => ['required', 'date'],
            'ends_at' => ['nullable', 'date', 'after_or_equal:starts_at'],
            'status' => ['required', Rule::in(['scheduled', 'completed', 'cancelled'])],
            'attendee_ids' => ['nullable', 'array'],
            'attendee_ids.*' => ['integer', 'exists:users,id'],
        ]);

        $meeting->update([
            'title' => $data['title'],
            'agenda' => $data['agenda'] ?? null,
            'location' => $data['location'] ?? null,
            'starts_at' => $data['starts_at'],
            'ends_at' => $data['ends_at'] ?? null,
            'status' => $data['status'],
        ]);

        if ($request->has('attendee_ids')) {
            $meeting->attendees()->sync($data['attendee_ids'] ?? []);
        }

        return back()->with('success', 'Meeting updated.');
    }

    public function destroyMeeting(AssociationMeeting $meeting)
    {
        $meeting->delete();

        return back()->with('success', 'Meeting removed.');
    }

    public function storeTask(Request $request)
    {
        $request->merge([
            'assigned_to' => $request->filled('assigned_to') ? $request->integer('assigned_to') : null,
        ]);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:4000'],
            'assigned_to' => ['nullable', 'integer', 'exists:users,id'],
            'due_on' => ['nullable', 'date'],
            'priority' => ['nullable', Rule::in(['normal', 'high'])],
            'status' => ['nullable', Rule::in(['open', 'in_progress', 'done'])],
        ]);

        AssociationTask::query()->create([
            ...$data,
            'priority' => $data['priority'] ?? 'normal',
            'status' => $data['status'] ?? 'open',
            'assigned_by' => $request->user()?->id,
        ]);

        return back()->with('success', 'Task assigned.');
    }

    public function updateTask(Request $request, AssociationTask $task)
    {
        $request->merge([
            'assigned_to' => $request->filled('assigned_to') ? $request->integer('assigned_to') : null,
        ]);

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:4000'],
            'assigned_to' => ['nullable', 'integer', 'exists:users,id'],
            'due_on' => ['nullable', 'date'],
            'priority' => ['required', Rule::in(['normal', 'high'])],
            'status' => ['required', Rule::in(['open', 'in_progress', 'done'])],
        ]);

        $task->update($data);

        return back()->with('success', 'Task updated.');
    }

    public function destroyTask(AssociationTask $task)
    {
        $task->delete();

        return back()->with('success', 'Task removed.');
    }
}
