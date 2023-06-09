using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Appeon.DataStoreDemo.Service.Models;
using Appeon.DataStoreDemo.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace Appeon.DataStoreDemo.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly IGenericServiceFactory Service;
        
        public CustomersController(IGenericServiceFactory service)
        {
            Service = service;
        }
        
        [HttpGet]
        public async Task<IList<DdCustomer>> Index()
        {
            var customers = await Service
                .Get<DdCustomer>()
                .SearchAsync(new object[] { });
                
            return customers;
        }
        
        [HttpGet("CustomerAddress/{customerId}")]
        public async Task<IList<DdCustomerAddress>> AddressDetails(int customerId)
        {
            var customersAddress = await Service
                .Get<DdCustomerAddress>()
                .SearchAsync(new object[] { customerId });

            return customersAddress;
        }
        
        [HttpGet("Creditcard/{customerId}")]
        public async Task<IList<DdCreditcard>> CreditcardDetails(int customerId) 
        {
            var creditCards = await Service.Get<DdCreditcard>().SearchAsync(new object[] { customerId });
            
            return creditCards;
        }
    }
}
