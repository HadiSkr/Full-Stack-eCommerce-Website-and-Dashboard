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
import { MatDialog } from '@angular/material/dialog';
import { RoleDialogComponent } from '../role-dialog/role-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RolepermissionComponent } from '../rolepermission/rolepermission.component';

@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [RouterLink, CommonModule, NavbarComponent, SidebarComponent, MatTableModule, MatPaginatorModule, HttpClientModule, MatIconModule, MatButtonModule, MatDialogModule,RolepermissionComponent],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.css'
})
export class AdminsComponent {
  displayedColumns: string[] = ['id', 'name', 'role', 'permissions', 'email', 'phone','actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private dialog: MatDialog,private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.http.get<any[]>('http://localhost/usersinfo').subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }
  deleteuser(id: number){
    const url = `http://localhost/user/${id}`;

    this.http.delete(url).subscribe(
      () => {
        alert('user deleted successfully.');
        this.getData(); 
      },
      (error) => {
        console.error(error); 
        alert('An error occurred while deleting the user.');
            }
    );
  }


  openRoleDialog(element: any): void {
    this.http.get<any[]>('http://localhost/roles').subscribe(response => {
      const roles = response.map(role => role.name); 
  
      const dialogRef = this.dialog.open(RoleDialogComponent, {
        data: {
          currentRole: element.role,
          availableRoles: roles 
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          element.role = result;
          this.snackBar.open('Role updated successfully.', 'Close', {
            duration: 2000
          });
        }
      });
    });
  }
}
