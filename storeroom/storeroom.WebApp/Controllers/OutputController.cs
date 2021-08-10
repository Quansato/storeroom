using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using storeroom.Application.Catalog.Outputs;
using storeroom.Application.Catalog.Outputs.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storeroom.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OutputController : ControllerBase
    {
        private readonly IOutputService _outputService;
        public OutputController(IOutputService outputService)
        {
            _outputService = outputService;
        }
        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] OutputSearchRequest request)
        {
            var materials = await _outputService.GetAllPaging(request);
            return Ok(materials);
        }
        [HttpGet("OutputId")]
        public async Task<IActionResult> GetMaterialByOutputId(int OutputId)
        {
            var materials = await _outputService.GetMaterialByOutputId(OutputId);
            return Ok(materials);
        }
        [HttpPost()]
        public async Task<IActionResult> Create(OutputCreateRequest request)
        {
            var result = await _outputService.Create(request);
            return Ok(result);
        }
        [HttpPut()]
        public async Task<IActionResult> Update(OutputUpdateRequest request)
        {
            var result = await _outputService.Update(request);
            return Ok(result);
        }

        [HttpDelete()]
        public async Task<IActionResult> Delete(int OutputId)
        {
            var result = await _outputService.Delete(OutputId);
            return Ok(result);
        }

        [HttpPut("detail")]
        public async Task<IActionResult> UpdateDetail(MaterialOutputCreateRequest request)
        {
            var result = await _outputService.UpdateDetail(request);
            return Ok(result);
        }

        [HttpDelete("deleteMultiple/{OutputId}")]
        public async Task<IActionResult> DeleteMaterial(int OutputId)
        {
            var result = await _outputService.DeleteDetail(OutputId);
            return Ok(result);
        }
    }
}
