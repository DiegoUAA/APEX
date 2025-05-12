import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-contact-form',
    standalone: true,
    imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatRadioModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
    ],
    templateUrl: './contact-form.component.html',
    styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent {
    subjects = [
        'Información sobre vehículos',
        '  Cotización',
        'Servicio postventa',
        'Financiamiento',
        'Otra consulta',
    ];

    contactForm: FormGroup;

    constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
        this.contactForm = this.fb.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        subject: ['', Validators.required],
        date: ['', [Validators.required, this.futureDateValidator]],
        contactMethod: ['', Validators.required],
        message: ['', [Validators.required, Validators.minLength(20)]],
        });
    }

    futureDateValidator(control: any) {
        const selectedDate = new Date(control.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
        return { invalidDate: true };
        }
        return null;
    }

    onSubmit() {
        if (this.contactForm.valid) {
        const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        contacts.push(this.contactForm.value);
        localStorage.setItem('contacts', JSON.stringify(contacts));

        this.snackBar.open('Mensaje enviado correctamente', 'Cerrar', {
            duration: 3000,
            panelClass: ['success-snackbar'],
        });

        this.contactForm.reset();
        }
    }
}