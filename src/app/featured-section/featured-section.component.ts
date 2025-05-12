import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule, CarouselComponent } from 'ngx-owl-carousel-o';
import { Vehicle } from '../vehicle';

@Component({
  selector: 'app-featured-section',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, CarouselModule],
  templateUrl: './featured-section.component.html',
  styleUrls: ['./featured-section.component.css']
})
export class FeaturedSectionComponent {
  @Input() featuredVehicles: Vehicle[] = [];
  @ViewChild('owlCarousel', { static: false }) owlCarousel!: CarouselComponent;

  carouselOptions = {
    loop: true,
    margin: 20,
    nav: false,
    dots: true,
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 3 }
    }
  };

  viewDetails(id: number) {
    // lógica de navegación o evento personalizado
  }
}
