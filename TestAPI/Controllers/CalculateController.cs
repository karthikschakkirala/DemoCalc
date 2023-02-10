using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.ServiceBus;
using Microsoft.Extensions.Configuration;
using System;
using System.Text;
using System.Threading.Tasks;
using TestAPI.Models;

namespace TestAPI.Controllers
{
    [Route("api/calculate")]
    [ApiController]
    public class CalculateController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string ServiceBusConnectionString;
        private readonly string TopicName;

        static ITopicClient topicClient;

        public CalculateController(IConfiguration configuration)
        {
            _configuration = configuration.GetSection("AppSettings");
            ServiceBusConnectionString = _configuration["ServiceBusConnectionString"];
            TopicName = _configuration["TopicName"];
        }

        [Route("sum")]
        [HttpPost]
        public async Task<ActionResult> Sum(CalcParametersVM calcParameters)
        {
            int total = Int32.Parse(calcParameters.NoOne) + Int32.Parse(calcParameters.NoTwo);
            await SendMessageAsync("Sum of two is: " + total);
            return Ok(new
            {
                Success = true,
                StatusCode = 200
            });
        }

        [Route("sum2")]
        [HttpGet]
        [EnableCors("ApiCorsPolicy")]
        public async Task<IActionResult> Sum2(int no1, int no2)
        {
            int total = no1 + no2;
            await SendMessageAsync("Sum2 of two is: " + total);
            return Ok(new
            {
                Success = true,
                StatusCode = 200
            });
        }

        private async Task SendMessageAsync(string messageBody)
        {
            topicClient = new TopicClient(ServiceBusConnectionString, TopicName);

            var message = new Message(Encoding.UTF8.GetBytes(messageBody));
            await topicClient.SendAsync(message);

            await topicClient.CloseAsync();
        }
    }
}
