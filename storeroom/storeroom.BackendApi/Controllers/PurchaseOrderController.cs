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
        [HttpPost()]
        public async Task<IActionResult> Create(PurchaseOrderCreateRequest request)
        {
            var result = await _purchaseOrderService.Create(request);
            return Ok(result);
        }

    }
}
