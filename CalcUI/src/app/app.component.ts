import { Component } from '@angular/core';
import { ApiService } from 'src/shared/Services/ApiService';
import { signalRService } from 'src/shared/Services/signalRService';
import { NotificationService } from 'src/shared/Services/notification.service'; 
import { distinct } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService, NotificationService]
})
export class AppComponent {
  title = 'CalcApp';
  firstNumber: number;
  secondNumber: number;

  constructor(private apiService: ApiService, 
              private notifyService : NotificationService,
              private SignalRService : signalRService) { 
  }

  ngOnInit(): void {
    //this.SignalRService.init();
    //this.SignalRService.messages.unsubscribe();
    this.SignalRService.messages.pipe(distinct()).subscribe(msg => {
      console.log(msg);
      this.notifyService.showSuccess("Message From SignalR!",msg);
    });
  }

  sendSum() {
    
    const data = {
      NoOne : this.firstNumber,
      NoTwo : this.secondNumber
    };
    
    this.apiService.PostAPI(data).subscribe((res: any) => {
      console.log(res);
    });
  }
}
