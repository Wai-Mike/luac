<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactInboxController extends Controller
{
    public function index()
    {
        $messages = ContactMessage::query()->latest()->paginate(20);

        return Inertia::render('admin/contacts/index', [
            'messages' => $messages,
        ]);
    }

    public function update(Request $request, ContactMessage $contactMessage)
    {
        $validated = $request->validate([
            'status' => ['required', 'in:new,read,archived'],
        ]);

        $contactMessage->update($validated);

        return redirect()->route('admin.contacts.index')->with('success', 'Message updated.');
    }
}
