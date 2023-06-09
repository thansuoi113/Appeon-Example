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
    [Route("api/products")]
    public class ProductsController : ControllerBase
    {
        private readonly IGenericServiceFactory Service;
        
        public ProductsController(IGenericServiceFactory serviceFactory)
        {
            Service = serviceFactory;
        }
        
        [HttpGet]
        public async Task<IList<DdOrderProduct>> ProductsIndex()
        {
            // retrieve all products
            var orderProducts = await Service
                .Get<DdOrderProduct>()
                .SearchAsync(new object[] { 0 });
                
            return orderProducts;
        }
    }
}
