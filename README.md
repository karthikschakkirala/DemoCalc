# DemoCalc

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

