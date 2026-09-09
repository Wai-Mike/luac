<?php

namespace App\Http\Requests\Guest;

use App\Support\FundraisingPrograms;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreGuestDonationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'email' => ['nullable', 'email', 'max:255'],
            'program' => ['required', 'string', Rule::in(FundraisingPrograms::titles())],
            'amount' => ['required', 'numeric', 'min:1', 'max:9999999'],
            'currency' => ['required', 'string', 'in:ssp,usd'],
            'payment_method' => ['required', 'string', 'in:cash,bank,mobile_money,other'],
            'notes' => ['nullable', 'string', 'max:1000'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'program.in' => 'Please choose a program from the list.',
            'amount.min' => 'Please enter an amount of at least 1.',
        ];
    }
}
