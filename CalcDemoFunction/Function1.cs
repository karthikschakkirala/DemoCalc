using System;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.SignalRService;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace CalcDemoFunction
{
    public class Function1
    {
        private readonly ILogger<Function1> _logger;

        public Function1(ILogger<Function1> log)
        {
            _logger = log;
        }

        [FunctionName("message")]
        public void Run(
            [ServiceBusTrigger("calcmessage", "CalcMessageSubscription", Connection = "AzureServiceBusConnectionString")]string mySbMsg,
            [SignalR(HubName = "broadcast")] IAsyncCollector<SignalRMessage> signalRMessages)
        {
            signalRMessages.AddAsync(new SignalRMessage()
            {
                Target = "notify",
                Arguments = new object[] { mySbMsg }
            }).RunSynchronously();

            _logger.LogInformation($"C# ServiceBus topic trigger function processed message: {mySbMsg}");
        }
    }
}
