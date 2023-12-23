import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { Component, ViewChild,OnInit} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideRouter, Route, RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [RouterLink,CommonModule, NavbarComponent, SidebarComponent, MatTableModule, MatPaginatorModule, HttpClientModule,MatIconModule,MatButtonModule],


  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
} )
export class ProductsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'price', 'sort_order', 'amount', 'filename','actions'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private snackBar: MatSnackBar,private router: Router) {}

  ngOnInit() {
    this.getData(); 
  }
  deleteProduct(id: number) {
    const url = `http://localhost/product/${id}`;

    this.http.delete(url).subscribe(
      () => {
        alert('Product deleted successfully.');
        this.getData(); 
      },
      (error) => {
        console.error(error); 
        alert('An error occurred while deleting the product.');
            }
    );
  }

  getData() {
    this.http.get<any[]>('http://localhost/products').subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateToAdd(){
    this.router.navigate(['addproducts']); 

  }
  navigateToEdit(categoryId: number){
    this.router.navigate(['editproduct',categoryId]); 

  }

}