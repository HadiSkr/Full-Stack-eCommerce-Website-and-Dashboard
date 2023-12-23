import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-rolepermission',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule, MatTableModule],
  templateUrl: './rolepermission.component.html',
  styleUrl: './rolepermission.component.css'
})
export class RolepermissionComponent implements OnInit {
  constructor(private http: HttpClient) {}

  roles: any[] = [];
  permissions: any[] = [];

  ngOnInit() {
    this.getRoles();
    this.getpermissions();

    }

    getRoles(): void {
      this.http.get<any[]>('http://localhost/roles').subscribe(
        (data) => {
          this.roles = data;
          //this.checkPermissions();
                },
        (error) => {
          console.error(error);
        }
      );
    }


    getpermissions(): void {
      this.http.get<any[]>('http://localhost/permissions').subscribe(
        (data) => {
          this.permissions = data;
                },
        (error) => {
          console.error(error);
        }
      );
    }
    checkPermissions(): void {
      for (const role of this.roles) {
        const permissions = role.permissions;
        for (const permission of this.permissions) {
          permission.assigned = permissions.includes(permission.name);
        }
      }
    }
  
    checkPermission(role: any, permission: any): boolean {
      return role.permissions.includes(permission.name);
    }
}
