# DemoCalc

Architecture Diagram
![architecture_diag drawio](https://user-images.githubusercontent.com/124643079/218223227-2adf6799-1c3b-460f-9c10-e20d0a1e90b9.png)

Sequence Diagram
![sequence_diag drawio](https://user-images.githubusercontent.com/124643079/218223260-fe16fc48-3b8c-49fa-9d5e-1529bc463ecf.png)

Usecase Diagram
![usecase_diag drawio](https://user-images.githubusercontent.com/124643079/218223323-02099183-1405-4ec1-a1ce-51ca08cf8e63.png)


https://uicalcdemokarthik.azurewebsites.net/ - angular app

https://calcdemokarthik.azurewebsites.net - API app

https://calcconnectioninfo.azurewebsites.net - signalR handsack function app

https://calcdemo.azurewebsites.net - ServicBus to SignalR broadcaster function app

http://calcdemosignalr.service.signalr.net - signalR service

https://calcdemo.servicebus.windows.net/calcmessage - servicebus topic


TestAPI is main API project that accepts input from angular app and sends the message in SB topic
CalcUI is Angular APP - sends input to API and subscribes to signalR hub
CalcDemoFunction picks up message from servicebus and publishes to signalR hub
GetAzureSignalRConnection - hosts the negotiate end point for signalR handshake

Visit this app and try out how the response message is transmitted through SignalR hub.
https://uicalcdemokarthik.azurewebsites.net/

