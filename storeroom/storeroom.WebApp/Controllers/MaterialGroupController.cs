using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using storeroom.Application.Catalog.MaterialGroups;
using storeroom.Application.Catalog.MaterialGroups.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storeroom.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaterialGroupController : ControllerBase
    {
        private readonly IMaterialGroupService _materialGroupService;
        public MaterialGroupController(IMaterialGroupService materialGroupService)
        {
            _materialGroupService = materialGroupService;
        }
        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] GetMaterialGroupPagingRequest request)
        {
            var materialgroups = await _materialGroupService.GetAllPaging(request);
            return Ok(materialgroups);
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDetail(int materialGroupId)
        {
            var materialGroup = await _materialGroupService.GetDetail(materialGroupId);
            if(materialGroup == null)
            {
                return BadRequest("Cannot find materialGroup");
            }
            return Ok(materialGroup);
        }

        [HttpPost()]
        public async Task<IActionResult> Create(MaterialGroupCreateRequest request)
        {
            var result = await _materialGroupService.Create(request);
            return Ok(result);
        }

        [HttpPut()]
        public async Task<IActionResult> Update(MaterialGroupUpdateRequest request)
        {
            var result = await _materialGroupService.Update(request);
            return Ok(result);
        }

        [HttpDelete("{ma}")]
        public async Task<IActionResult> Delete(int ma)
        {
            var result = await _materialGroupService.Delete(ma);
            return Ok(result);
        }
    }
}
