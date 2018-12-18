import { Component } from '@angular/core';

@Component({
  selector: 'app-first-actions',
  templateUrl: './first-actions.component.html',
  styleUrls: ['./first-actions.component.scss']
})
export class FirstActionsComponent {

  private showFirstActions = true;

  constructor() { }

  public closeFirstActions(): void {
    this.showFirstActions = false;
  }

}
