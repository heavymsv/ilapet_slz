import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-footer-client',
  templateUrl: './footer-client.component.html',
  styleUrls: ['./footer-client.component.css']
})
export class FooterClientComponent {
  @Input() num: number = 0

  constructor(
    public router: Router,
    public toast: ToastrService,
    public dialog: MatDialog,
    public authService: AuthService
  ) { }

  medley() {
    this.toast.success("Em breve esta funcionalidade ficará disponível!!", "Em desenvolvimento", {
      progressBar: true,
    })
  }

  openDialog(): void {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;

    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      //console.log(`Dialog result: ${result}`);
    })
  }

  navigateByAuth(){
    if(localStorage.getItem('T-WMS_token')){
      if(this.authService.validateRole(['ROLE_ADMIN'])){
        this.router.navigate(['adm']);
      }
      else{
        this.router.navigate(['compromissos']);
      }
    }
  }


}

@Component({
  selector: 'dialog-animations-example-dialog',
  templateUrl: 'dialog-animations-example-dialog.html',
  styleUrls: ['./dialog-animations-example-dialog.css']
})
export class DialogAnimationsExampleDialog {
  constructor(
    private dialogRef: MatDialogRef<DialogAnimationsExampleDialog>,
    public router:Router
  ) {

  }

  sair() {
    this.dialogRef.close(true);
    localStorage.removeItem("T-WMS_token")
    this.router.navigate(['home'])
  }

  close() {
    this.dialogRef.close();
    
  }

  

}
