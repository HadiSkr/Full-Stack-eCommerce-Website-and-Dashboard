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
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink,CommonModule, NavbarComponent, SidebarComponent, MatTableModule, MatPaginatorModule, HttpClientModule,MatIconModule,MatButtonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  displayedColumns: string[] = ['id', 'categoryname', 'description', 'sort_order','filename','actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private http: HttpClient, private snackBar: MatSnackBar,private router: Router) {}
  ngOnInit() {
    this.getData(); 
  }
  deletecategory(id: number) {
    const url = `http://localhost/category/${id}`;

    this.http.delete(url).subscribe(
      () => {
        alert('Category deleted successfully.');
        this.getData(); 
      },
      (error) => {
        console.error(error); 
        alert('An error occurred while deleting the category.');
            }
    );
  }
  
  getData() {
    this.http.get<any[]>('http://localhost/categories').subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  navigateToAdd(){
    this.router.navigate(['addcategories']); 
  }
  navigateToEdit(categoryId: number) {
    this.router.navigate(['/editcategory', categoryId]);
  }

}
