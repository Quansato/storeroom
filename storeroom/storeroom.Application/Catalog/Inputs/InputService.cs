using Microsoft.EntityFrameworkCore;
using storeroom.Application.Catalog.Inputs.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Inputs
{
    public class InputService : IInputService
    {
        private storeroomDbContext _context;
        public InputService(storeroomDbContext context)
        {
            _context = context;
        }

        public async Task<bool> CheckMaterialIsExist(int storeroomId,int Id)
        {
            var material = await _context.MaterialStorerooms.FirstOrDefaultAsync(x=> x.StoreroomId == storeroomId && x.MaterialId == Id);
            if(material == null)
            {
                return false;
            }
            return true;
        }

        public async Task<int> Create(InputCreateRequest request)
        {
            var input = new Input()
            {
                Id = request.Id,
                InputCode = request.InputCode,
                StoreroomId = request.StoreroomId,
                DeliveryUnit = request.DeliveryUnit,
                Shipper=request.Shipper,
                DateInput = request.DateInput,
                DateStatus = request.DateStatus,
                CreationTime = DateTime.Now,
                UserId = request.UserId,
                MaterialInputs = request.MaterialInput
                //Date = request.Date,
                //Status = request.Status,
                //SuplierId = request.SuplierId,
                //Priority = request.Priority,
                //UserId = request.UserId,
                //MaterialPurchaseOrders = request.MaterialPuchaseOrder
            };
            _context.Inputs.Add(input);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int InputId)
        {
            var input = await _context.Inputs.FindAsync(InputId);
            if (input == null) throw new StoreroomException($"Cannot find a input: {InputId}");
            _context.Inputs.Remove(input);
            return await _context.SaveChangesAsync();
        }

        public Task<PagedResult<InputViewModel>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResult<InputViewModel>> GetAllPaging(InputSearchRequest request)
        {
            //1. Select join
            var query = from a in _context.Inputs
                        join b in _context.Storerooms on a.StoreroomId equals b.Id
                        join c in _context.Users on a.UserId equals c.Id
                        select new { a, b, c };
            //2. filter
            //if (!string.IsNullOrEmpty(request.keyword))
            //{
            //    query = query.Where(x => x.a.DisplayName.Contains(request.keyword));
            //}
            if (request.StoreroomId.HasValue)
            {
                query = query.Where(x => x.a.StoreroomId == request.StoreroomId);
            }
            if (!string.IsNullOrEmpty(request.InputCode))
            {
                query = query.Where(x => x.a.InputCode == request.InputCode);
            }
            if (request.Status.HasValue)
            {
                query = query.Where(x => x.a.StoreroomId == request.StoreroomId);
            }
            if (request.Date.HasValue)
            {
                query = query.Where(x => x.a.DateInput == request.Date);
            }
            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.page - 1) * request.limit)
                       .Take(request.limit)
                       .Select(x => new InputViewModel()
                       {
                           Id = x.a.Id,
                           InputCode = x.a.InputCode,
                           StoreroomId = x.a.StoreroomId,
                           DeliveryUnit = x.a.DeliveryUnit,
                           Shipper = x.a.Shipper,
                           DateInput = x.a.DateInput,
                           DateStatus = x.a.DateStatus,
                           UserId = x.a.UserId,
                           UserName = x.c.UserName,
                       }).ToListAsync();
            //4. Select and projection
            var pagedResult = new PagedResult<InputViewModel>()
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }

        public Task<PagedResult<InputViewModel>> GetDetail(int InputId)
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResult<MaterialInputViewModel>> GetMaterialByInputId(int InputId)
        {
            var query = from a in _context.MaterialInputs
                        join b in _context.Materials on a.MaterialId equals b.Id
                        join c in _context.Units on b.UnitId equals c.Id
                        select new { a, b, c };
            query = query.Where(x => x.a.InputId == InputId);
            int totalRow = await query.CountAsync();
            var materials = await query.Select(x => new MaterialInputViewModel()
            {
                InputId = InputId,
                Unit = x.c.DisplayName,
                MaterialId = x.a.MaterialId,
                MaterialName = x.b.Description,
                MaterialCode = x.b.MaterialCode,
                Quantity = x.a.Quantity,
                Price = x.a.Price,
                Description = x.a.Description

            }).ToListAsync();
            var pagedResult = new PagedResult<MaterialInputViewModel>()
            {
                TotalRecord = totalRow,
                Items = materials
            };
            return pagedResult;
        }

        public async Task<int> Update(InputUpdateRequest request)
        {
            var input = await _context.Inputs.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (input == null) throw new StoreroomException($"Cannot find a input: {request.Id}");
            input.Id = request.Id;
            input.InputCode = request.InputCode;
            input.StoreroomId = request.StoreroomId;
            input.DeliveryUnit = request.DeliveryUnit;
            input.Shipper= request.Shipper;
            input.DateInput= request.DateInput;
            input.DateStatus = request.DateStatus;
            input.UserId = request.UserId;
            input.Description = request.Description;
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateDetail(MaterialInputCreateRequest request)
        {
            var materialDetail = await _context.MaterialInputs
                .FirstOrDefaultAsync(x => x.InputId == request.InputId && x.MaterialId == request.MaterialId);
            if (materialDetail == null)
            {
                var materialInput = new MaterialInput()
                {
                    InputId = request.InputId,
                    MaterialId = request.MaterialId,
                    Quantity = request.Quantity,
                    Price = request.Price,
                    Description = request.Description
                };
                _context.MaterialInputs.Add(materialInput);
                return await _context.SaveChangesAsync();
            }

            materialDetail.Quantity = request.Quantity;
            materialDetail.Price = request.Price;
            materialDetail.Description = request.Description;
            return await _context.SaveChangesAsync();
        }
    }
}
