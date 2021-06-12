using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using storeroom.Application.Catalog.Storerooms;
using storeroom.Application.Catalog.Storerooms.Dtos;
using storeroom.Application.Catalog.Storerooms.InventoryDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storeroom.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreroomController : ControllerBase
    {
        private readonly IStoreroomService _storeroomService;
        public StoreroomController(IStoreroomService storeroomService)
        {
            _storeroomService = storeroomService;
        }

        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] GetStoreroomPagingRequest request)
        {
            var materialgroups = await _storeroomService.GetAllPaging(request);
            return Ok(materialgroups);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int storeroomId)
        {
            var storeroom = await _storeroomService.GetDetail(storeroomId);
            if (storeroom == null)
            {
                return BadRequest("Cannot find storeroom");
            }
            return Ok(storeroom);
        }
        [HttpPost()]
        public async Task<IActionResult> Create(StoreroomCreateRequest request)
        {
            var result = await _storeroomService.Create(request);
            return Ok(result);
        }
        [HttpPut()]
        public async Task<IActionResult> Update(StoreroomUpdateRequest request)
        {
            var result = await _storeroomService.Update(request);
            return Ok(result);
        }
        [HttpDelete("{ma}")]
        public async Task<IActionResult> Delete(int ma)
        {
            var result = await _storeroomService.Delete(ma);
            return Ok(result);
        }


        [HttpGet("/Inventory")]
        public async Task<IActionResult> GetInventory(string keyword, DateTime? date, int? storeroomId)
        {
            var materialgroups = await _storeroomService.GetInventoryDetail(keyword,date,storeroomId);
            return Ok(materialgroups);
        }

        [HttpPost("Inventory")]
        public async Task<IActionResult> CreateInventory(InventoryCreateRequest request)
        {
            var result = await _storeroomService.CreateInventory(request);
            return Ok(result);
        }
        [HttpPut("Inventory/Detail")]
        public async Task<IActionResult> UpdateInventory(InventoryDetailViewModel request)
        {
            var result = await _storeroomService.UpdateInventoryDetail(request);
            return Ok(result);
        }
    }
}
