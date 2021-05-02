using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using storeroom.Application.Catalog.PurchaseOrders;
using storeroom.Application.Catalog.PurchaseOrders.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storeroom.BackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseOrderController : ControllerBase
    {
        private readonly IPurchaseOrderService _purchaseOrderService;
        public PurchaseOrderController(IPurchaseOrderService purchaseOrderService)
        {
            _purchaseOrderService = purchaseOrderService;
        }
        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] PurchaseOrderSearchRequest request)
        {
            var materials = await _purchaseOrderService.GetAllPaging(request);
            return Ok(materials);
        }
        [HttpGet("PurchaseId")]
        public async Task<IActionResult> GetMaterialByPurchaseId(int PurchaseId)
        {
            var materials = await _purchaseOrderService.GetMaterialByPurchaseId(PurchaseId);
            return Ok(materials);
        }
        [HttpPost()]
        public async Task<IActionResult> Create(PurchaseOrderCreateRequest request)
        {
            var result = await _purchaseOrderService.Create(request);
            return Ok(result);
        }
        [HttpDelete("{PurchaseOrderId}")]
        public async Task<IActionResult> Delete(int PurchaseOrderId)
        {
            var result = await _purchaseOrderService.Delete(PurchaseOrderId);
            return Ok(result);
        }
        /// <summary>
        /// update purchaseOrder
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut()]
        public async Task<IActionResult> Update(PurchaseOrderUpdateRequest request)
        {
            var result = await _purchaseOrderService.Update(request);
            return Ok(result);
        }
        [HttpPut("detail")]
        public async Task<IActionResult> UpdateDetail(MaterialPurchaseOrderCreateRequest request)
        {
            var result = await _purchaseOrderService.UpdateDetail(request);
            return Ok(result);
        }
    }
}
