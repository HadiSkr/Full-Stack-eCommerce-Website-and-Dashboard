import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideRouter, Route, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink,MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(private router: Router) {}

  navigateToDashboard() {
    this.router.navigate(['']); 
  }
  
  navigateToProducts(){
    this.router.navigate(['products']); 
  }

  navigateToCategories(){
    this.router.navigate(['categories']); 

  }
  navigateToAdmins(){
    this.router.navigate(['admins']); 
  }
  navigateTocarousel(){
    this.router.navigate(['carousle']); 

  }
}
