// vehicles.component.ts
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { VehicleService } from '../shared/vehicle.service';
import { Vehicle } from '../vehicle';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-vehicle',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    FormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
  ],
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css'],
})
export class VehicleComponent {
  selectedType = 'all';
  vehicleTypes = ['SUV', 'Coupe', 'Pickup', 'Performance'];
  vehicles: any[] = [];
  financingOptions = ['Crédito bancario', 'Arrendamiento', 'Pago de contado'];
  today: Date = new Date();
  selectedVehicleId: number | null = null;
  isHovered: { [key: number]: boolean } = {};

  quoteData = {
    fullName: '',
    email: '',
    financingType: '',
    promotions: '',
    contactDate: '',
  };

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.vehicles = this.vehicleService.getVehicles();
  }

  get filteredVehicles() {
    if (this.selectedType === 'all') return this.vehicles;
    return this.vehicles.filter((v) => v.type === this.selectedType);
  }

  viewDetails(id: number) {
    this.router.navigate(['/vehicle-details', id]);
  }

  toggleQuoteForm(vehicleId: number): void {
    if (this.selectedVehicleId === vehicleId) {
      this.selectedVehicleId = null;
      this.resetForm();
    } else {
      this.selectedVehicleId = vehicleId;
    }
  }

  resetForm() {
    this.quoteData = {
      fullName: '',
      email: '',
      financingType: '',
      promotions: '',
      contactDate: '',
    };
  }

  submitQuote(form: any) {
    if (form.valid) {
      const storedQuotes = JSON.parse(localStorage.getItem('quotes') || '[]');
      storedQuotes.push({
        vehicleId: this.selectedVehicleId,
        ...this.quoteData,
      });
      localStorage.setItem('quotes', JSON.stringify(storedQuotes));

      this.snackBar.open('Cotización enviada exitosamente.', 'Cerrar', {
        duration: 3000,
        panelClass: ['snackbar-success'],
      });

      this.selectedVehicleId = null;
      this.resetForm();
    }
  }

  getTypeColor(type: string): string {
    const colorMap: { [key: string]: string } = {
      'SUV': '#2196F3',
      'Coupe': '#F44336',
      'Pickup': '#4CAF50',
      'Performance': '#9C27B0'
    };
    return colorMap[type] || '#607D8B';
  }
}
