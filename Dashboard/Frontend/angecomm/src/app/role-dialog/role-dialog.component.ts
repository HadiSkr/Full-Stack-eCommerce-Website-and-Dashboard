import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-role-dialog',
  standalone: true,
  imports: [CommonModule,MatSnackBarModule, MatDialogModule, MatSelectModule, MatFormFieldModule, MatInputModule, FormsModule],
  templateUrl: './role-dialog.component.html',
  styleUrl: './role-dialog.component.css'
})
export class RoleDialogComponent {
  selectedRole: string;
  roles: any[] = [];

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<RoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.selectedRole = data.currentRole;
    this.getRoles();
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  getRoles() {
    this.http.get<any[]>('http://localhost/roles')
      .subscribe(
        (data) => {
          this.roles = data.map((role) => role.name);
        },
        (error) => {
          console.error(error);
        }
      );
  }
}