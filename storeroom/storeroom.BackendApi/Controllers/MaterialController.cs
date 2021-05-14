using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using storeroom.Application.Catalog.Materials;
using storeroom.Application.Catalog.Materials.Dtos;
using storeroom.Application.Catalog.Materials.Dtos.MStoreroom;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storeroom.BackendApi.Controllers
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
        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut("materialStoreroom")]
        public async Task<IActionResult> UpdateMS(MaterialStoreroomVm request)
        {
            var result = await _materialService.UpdateStock(request);
            return Ok(result);
        }

        [HttpPost("materialStoreroom")]
        public async Task<IActionResult> CreateMS(MaterialStoreroomVm request)
        {
            var result = await _materialService.UpdateMaterialToStoreroom(request);
            return Ok(result);
        }

        [HttpGet("materialStoreroom/paging")]
        public async Task<IActionResult> GetMS([FromQuery] MaterialStoreroomGetPaging request)
        {
            var materials = await _materialService.GetAllMSPaging(request);
            return Ok(materials);
        }
    }
}
