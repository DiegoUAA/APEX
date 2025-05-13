import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: boolean = false;

  admins = [
    { username: 'AngelGarza', password: '1234', fullName: 'Administrador Uno' },
    { username: 'OsbaldoEscalera', password: 'abcd', fullName: 'Administrador Dos' },
    {
      username: 'DiegoReyes',
      password: 'adminpass',
      fullName: 'Administrador Tres',
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const found = this.admins.find(
      (admin) =>
        admin.username === this.username && admin.password === this.password
    );

    if (found) {
      this.authService.login(this.username);
      this.error = false;
      this.router.navigate(['/']); // Te manda al inicio
    } else {
      this.error = true;
    }
  }
}
