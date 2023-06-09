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
    public class ShippingMethodsController : ControllerBase
    {
        private readonly IGenericServiceFactory Service;
        public ShippingMethodsController(IGenericServiceFactory service)
        {
            Service = service;
        }
        
        [HttpGet]
        public async Task<IList<DdShipMethod>> Index()
        {
            var shipMethods = await Service
                .Get<DdShipMethod>()
                .SearchAsync(new object[] { });
                
            return shipMethods;
        }
    }
}
