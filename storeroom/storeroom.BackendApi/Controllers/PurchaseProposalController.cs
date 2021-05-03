using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using storeroom.Application.Catalog.PurchaseProposals;
using storeroom.Application.Catalog.PurchaseProposals.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storeroom.BackendApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseProposalController : ControllerBase
    {
        private readonly IPurchaseProposalService _purchaseProposalService;
        public PurchaseProposalController(IPurchaseProposalService purchaseProposalService)
        {
            _purchaseProposalService = purchaseProposalService;
        }
        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] PurchaseProposalSearchRequest request)
        {
            var materials = await _purchaseProposalService.GetAllPaging(request);
            return Ok(materials);
        }
        [HttpGet("PurchaseId")]
        public async Task<IActionResult> GetMaterialByPurchaseId(int PurchaseId)
        {
            var materials = await _purchaseProposalService.GetMaterialByPurchaseId(PurchaseId);
            return Ok(materials);
        }
        [HttpPost()]
        public async Task<IActionResult> Create(PurchaseProposalCreateRequest request)
        {
            var result = await _purchaseProposalService.Create(request);
            return Ok(result);
        }
        [HttpDelete("{PurchaseOrderId}")]
        public async Task<IActionResult> Delete(int PurchaseProposalId)
        {
            var result = await _purchaseProposalService.Delete(PurchaseProposalId);
            return Ok(result);
        }
        /// <summary>
        /// update purchaseProposal
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut()]
        public async Task<IActionResult> Update(PurchaseProposalUpdateRequest request)
        {
            var result = await _purchaseProposalService.Update(request);
            return Ok(result);
        }
        [HttpPut("detail")]
        public async Task<IActionResult> UpdateDetail(MaterialPurchaseProposalCreateRequest request)
        {
            var result = await _purchaseProposalService.UpdateDetail(request);
            return Ok(result);
        }
        [HttpPut("status")]
        public async Task<IActionResult> UpdateStatus(PurchaseProposalUpdateRequest request)
        {
            var result = await _purchaseProposalService.UpdateStatus(request);
            return Ok(result);
        }
    }
}
