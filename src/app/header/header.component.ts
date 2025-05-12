import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../theme.service';
@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [MatToolbarModule, MatIconModule, CommonModule],
})
export class HeaderComponent {
  title = 'ApexAutomotive';
  slogan = 'Más que autos, experiencias al límite';
  showSlogan = true;

  constructor(public themeService: ThemeService) {}

  // Método para alternar el tema
  toggleTheme() {
    this.themeService.toggleTheme();
  }

  // Getter para verificar el tema actual
  get isDarkTheme(): boolean {
    return this.themeService.isDarkTheme();
  }

  particles = Array.from({ length: 15 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 10,
  }));
}
