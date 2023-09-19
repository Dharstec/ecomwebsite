import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-popup',
  templateUrl: './logout-popup.component.html',
  styleUrls: ['./logout-popup.component.scss']
})
export class LogoutPopupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LogoutPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) { }

  ngOnInit(): void {
  }

  closeDialog(value?:string){
    this.dialogRef.close()
  }

  selectYes(){
    this.dialogRef.close({ data: {
      "response":'yes',
    }})
  }

}
