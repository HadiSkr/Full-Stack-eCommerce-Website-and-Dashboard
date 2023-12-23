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
import { MatDialog } from '@angular/material/dialog';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RolepermissionComponent } from '../rolepermission/rolepermission.component';
import { provideRouter, Route, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [RouterLink,CommonModule, NavbarComponent, SidebarComponent, MatTableModule, MatPaginatorModule, HttpClientModule, MatIconModule, MatButtonModule, MatDialogModule,RolepermissionComponent],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  constructor(private router: Router,private dialog: MatDialog,private http: HttpClient, private snackBar: MatSnackBar) {}
  displayedColumns: string[] = ['id', 'title', 'description','actions','addPicture'];
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  file: File | null = null;  
  carouselId: number = 0;

  ngOnInit() {
    this.getData();
  }
  deletecarousel(id: number){
    const url = `http://localhost/carousel/${id}`;

    this.http.delete(url).subscribe(
      () => {
        alert('carousel deleted successfully.');
        this.getData(); 
      },
      (error) => {
        console.error(error); 
        alert('An error occurred while deleting the carousel.');
            }
    );
  }
  getData() {
    this.http.get<any[]>('http://localhost/carousles').subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }
  
  handleFileInput(event: any, carouselId: number) {
    const target = event.target as HTMLInputElement;
    if (target && target.files) {
      this.file = target.files[0];
          }
          this.carouselId = carouselId;
    //console.log('Carousel ID:', carouselId);
  }


  submitFile(id: number){
    const formData = new FormData();
    if (this.file) {
      formData.append('file', this.file);
    }
    this.http.post<any>(`http://localhost/insertimage/${id}`, formData)
    .subscribe(
      (response) => {
        console.log('file added successfully.');
      },
      (error) => {
        console.error('An error occurred while adding the file:', error);
      }
    );

  }

  navigateToAdd(){
    this.router.navigate(['addcarousel']); 
  }

  
}
