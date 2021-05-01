using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using storeroom.Application.Catalog.Materials;
using storeroom.Application.Catalog.Materials.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storeroom.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialController : ControllerBase
    {
        private readonly IMaterialService _materialService;
        public MaterialController(IMaterialService materialService)
        {
            _materialService = materialService;
        }

        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] SearchRequest request)
        {
            var materials = await _materialService.GetAllPaging(request);
            return Ok(materials);
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(MaterialUpdateRequest request)
        {
            var result = await _materialService.Update(request);
            return Ok(result);
        }
        [HttpPost()]
        public async Task<IActionResult> Create(MaterialCreateRequest request)
        {
            var result = await _materialService.Create(request);
            return Ok(result);
        }
        [HttpDelete("{MaterialId}")]
        public async Task<IActionResult> Delete(int MaterialId)
        {
            var result = await _materialService.Delete(MaterialId);
            return Ok(result);
        }
        [HttpGet("GetDetail")]
        public async Task<IActionResult> GetDetail([FromQuery] int MaterialId)
        {
            var material = await _materialService.GetDetail(MaterialId);
            return Ok(material);
        }
    }
}
