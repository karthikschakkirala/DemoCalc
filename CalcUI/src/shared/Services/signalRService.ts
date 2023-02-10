import { Injectable } from "@angular/core";
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Observable, Subject } from "rxjs";
import { SignalRConnectionInfo } from "../Models/SignalRConnectionInfo";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class signalRService {
    private hubConnection: HubConnection;
    messages: Subject<string> = new Subject();
    private readonly _http: HttpClient;

    constructor(http: HttpClient) {
        this._http = http;;
    }

    private getConnectionInfo(): Observable<SignalRConnectionInfo> {
        let requestUrl = 'https://calcconnectioninfo.azurewebsites.net/api/negotiate';
        return this._http.get<SignalRConnectionInfo>(requestUrl);
    }

    init() {
        this.getConnectionInfo().subscribe((info) => {
            console.log(info);
            let options = {
                accessTokenFactory: () => info.accessToken,
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets
            };

            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(info.url, options)
                .configureLogging(signalR.LogLevel.Debug)
                .build();

            this.hubConnection.start().then(()=> console.log("connection started")).catch(err => console.error(err.toString()));

            this.hubConnection.on('notify', (data: any) => {
                //console.log(data);
                this.messages.next(data);
            });

            this.hubConnection.onclose(() => {
                console.log('connection closed')
            });

            // this.hubConnection.on("receive", (user, msg) => {
            //     console.log('Received', user, msg)
            //   });
        });
    }
}