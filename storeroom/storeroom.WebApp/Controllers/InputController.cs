using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using storeroom.Application.Catalog.Inputs;
using storeroom.Application.Catalog.Inputs.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace storeroom.WebApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InputController : ControllerBase
    {
        private readonly IInputService _inputService;
        public InputController(IInputService inputService)
        {
            _inputService = inputService;
        }
        [HttpGet()]
        public async Task<IActionResult> Get([FromQuery] InputSearchRequest request)
        {
            var materials = await _inputService.GetAllPaging(request);
            return Ok(materials);
        }
        [HttpGet("InputId")]
        public async Task<IActionResult> GetMaterialByInputId(int InputId)
        {
            var materials = await _inputService.GetMaterialByInputId(InputId);
            return Ok(materials);
        }
        
        [HttpGet("CheckMaterialIsExistInStoreroom")]
        public async Task<IActionResult> CheckMaterialIsExist(int StoreroomId,int Id)
        {
            var isExist = await _inputService.CheckMaterialIsExist(StoreroomId,Id);
            return Ok(isExist);
        }

        [HttpPost()]
        public async Task<IActionResult> Create(InputCreateRequest request)
        {
            var result = await _inputService.Create(request);
            return Ok(result);
        }
        [HttpPut()]
        public async Task<IActionResult> Update(InputUpdateRequest request)
        {
            var result = await _inputService.Update(request);
            return Ok(result);
        }
        [HttpPut("detail")]
        public async Task<IActionResult> UpdateDetail(MaterialInputCreateRequest request)
        {
            var result = await _inputService.UpdateDetail(request);
            return Ok(result);
        }
    }
}
