using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using System.Linq;
using System.Collections.Generic;
using Appeon.DataStoreDemo.Services;
using System.Threading.Tasks;
using Appeon.DataStoreDemo.Service.Models;
using System.Threading;

namespace Appeon.DataStoreDemo.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesOrderController : ControllerBase
    {
        private readonly ISalesOrderService _isalesorderservice;
        private readonly ISalesOrderDetailService _isalesorderdetailservice;
        private readonly IGenericServiceFactory _genericServiceFactory;
        
        
        public SalesOrderController(
            ISalesOrderService isalesorderservice,
            ISalesOrderDetailService orderDetailService,
            IGenericServiceFactory serviceFactory)
        {
            _isalesorderservice = isalesorderservice;
            _isalesorderdetailservice = orderDetailService;
            _genericServiceFactory = serviceFactory;
        }
        
        //GET api/SalesOrder/{id}
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(SalesOrder), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<SalesOrder>> GetAsync(int id)
        {
            try
            {
                object[] objects = new object[] { id };
                var result = await _isalesorderservice.LoadByKeyAsync(objects);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        //GET api/SalesOrder/{id}/details
        [HttpGet("{id}/details")]
        [ProducesResponseType(typeof(IList<SalesOrder>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IList<SalesOrderDetail>>> GetSalesOrderDetailAsync(int id)
        {
            
            try
            {
                var result = await _isalesorderdetailservice.SearchAsync(new object[] { id });
                var service = _genericServiceFactory.Get<DdOrderProduct>();
                var products = await service.SearchAsync(null) ;
                foreach (var detail in result) 
                {
                    detail.ProductName = products.First(prod => prod.Product_Productid == detail.ProductID).Product_Name;
                }
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        
        //POST api/SalesOrder/{pageIndex}/{pageSize}
        [HttpGet("{pageIndex}/{pageSize}")]
        [ProducesResponseType(typeof(Page<SalesOrder>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<Page<SalesOrder>>> GetByPageAsync(
            int pageIndex, 
            int pageSize, 
            int? customerId, 
            DateTime? startOrderDate, 
            DateTime? endOrderDate)
        {
            try
            {
                customerId = customerId ?? 0;
                startOrderDate = startOrderDate ?? new DateTime(2011, 1, 1).Date;
                endOrderDate = endOrderDate ?? new DateTime(2011, 1, 1).Date;
                object[] objects = new object[] { customerId, startOrderDate, endOrderDate };
                var result = await _isalesorderservice.LoadByPageAsync(pageIndex, pageSize, objects, default);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        
        //POST api/SalesOrder/add
        [HttpPost("add")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<int>> AddAsync([FromBody] SalesOrder salesOrder)
        {
            try
            {
                var result = await _isalesorderservice.CreateAsync(salesOrder, default);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        
        //POST api/SalesOrder/update
        [HttpPost("update")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<int>> UpdateAsync([FromBody] SalesOrder salesOrder)
        {
            try
            {
                var result = await _isalesorderservice.UpdateAsync(salesOrder, default);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        
        //DELETE api/SalesOrder/delete/{salesOrderID}
        [HttpDelete("delete/{salesOrderID}")]
        [ProducesResponseType(typeof(int), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<int>> DeleteAsync(int salesOrderID)
        {
            try
            {
                var result = await _isalesorderservice.DeleteByKeyAsync(salesOrderID, default);
                
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        
        //DELETE api/SalesOrder/deleteSalesOrders
        [HttpDelete("deleteSalesOrders")]
        public async Task<ActionResult<int>> DeleteSalesOrdersAsync([FromQuery] string ids)
        {
            var i_ids = ids.Split(',').Select(id => int.Parse(id)).ToList();
            
            try
            {
                var result = await _isalesorderservice.DeleteSalesOrdersAsync(i_ids, default);
                
                return Ok(result);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}
