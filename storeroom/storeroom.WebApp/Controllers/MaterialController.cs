using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using storeroom.Application.Catalog.Materials;
using storeroom.Application.Catalog.Materials.Dtos;
using storeroom.Application.Catalog.Materials.Dtos.MStoreroom;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading;
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

        [HttpGet("exportv2")]
        public async Task<IActionResult> ExportV2(CancellationToken cancellationToken)
        {
            // query data from database  
            var materials = await _materialService.GetAll();
            var list = new List<MaterialViewModel>();
            foreach(var i in materials)
            {
                list.Add(new MaterialViewModel
                {
                    Id = i.Id,
                    MaterialCode = i.MaterialCode,
                    Description = i.Description,
                    DisplayName = i.DisplayName,
                    Price = i.Price,
                    YearManufacture = i.YearManufacture,
                    UnitId = i.UnitId,
                    UnitName = i.UnitName,
                    UnitOrderId = i.UnitOrderId,
                    UnitOrderName = i.UnitOrderName,
                    MaterialGroupId = i.MaterialGroupId   ,
                    MaterialGroupName = i.MaterialGroupName,
                    CountryId = i.CountryId,
                    CountryName = i.CountryName,
                    BrandId = i.BrandId,
                    BrandName = i.BrandName,
                    ExperyDate = i.ExperyDate,
                    Status = i.Status,
                    Img = i.Img,
                    Specification = i.Specification,
                    QRCode = i.QRCode

                });
            }
            var stream = new MemoryStream();

            using (var package = new ExcelPackage(stream))
            {
                var workSheet = package.Workbook.Worksheets.Add("Sheet1");
                // Set default width cho tất cả column
                workSheet.DefaultColWidth = 20;
                workSheet.DefaultRowHeight = 20;
                // Tự động xuống hàng khi text quá dài
                //workSheet.Cells.Style.WrapText = true;
                using (var range = workSheet.Cells["A1:U1"])
                {
                    // Set PatternType
                    range.Style.Fill.PatternType = ExcelFillStyle.DarkGray;
                    // Set Màu cho Background
                    range.Style.Fill.BackgroundColor.SetColor(Color.Yellow);
                    // Canh giữa cho các text
                    range.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
                    // Set Font cho text  trong Range hiện tại
                    range.Style.Font.SetFromFont(new Font("Arial", 10));
                    // Set Border
                    range.Style.Border.Bottom.Style = ExcelBorderStyle.Thick;
                    // Set màu ch Border
                    range.Style.Border.Bottom.Color.SetColor(Color.Blue);
                }
                workSheet.Cells.LoadFromCollection(list, true);
                package.Save();
            }
            stream.Position = 0;
            string excelName = $"Material-{DateTime.Now.ToString("yyyyMMddHHmmssfff")}.xlsx";

            //return File(stream, "application/octet-stream", excelName);  
            return File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", excelName);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut("materialStoreroom/quantity")]
        public async Task<IActionResult> UpdateMS(MaterialStoreroomVm request)
        {
            var result = await _materialService.UpdateStock(request);
            return Ok(result);
        }

        [HttpPut("materialStoreroom/dinhMuc")]
        public async Task<IActionResult> UpdateQuantityMinMax(MaterialStoreroomVm request)
        {
            var result = await _materialService.UpdateQuantityMinMax(request);
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

        [HttpGet("GetMaterialToAdd")]
        public async Task<IActionResult> GetMaterialToAdd([FromQuery] MaterialStoreroomGetPaging request)
        {
            var materials = await _materialService.GetAllMaterialToAdd(request);
            return Ok(materials);
        }

        [HttpGet("GetQuantity")]
        public async Task<IActionResult> GetQuantity(int materialId, int storeroomId)
        {
            var materials = await _materialService.GetQuantityMax(materialId, storeroomId);
            return Ok(materials);
        }

        [HttpDelete("materialStoreroom")]
        public async Task<IActionResult> DeleteMS(int storeroomId, int materialId)
        {
            var result = await _materialService.DeleteMS(storeroomId, materialId);
            return Ok(result);
        }
    }
}
