using Microsoft.EntityFrameworkCore;
using storeroom.Application.Catalog.Outputs.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.Outputs
{
    public class OutputService : IOutputService
    {
        private storeroomDbContext _context;
        public OutputService(storeroomDbContext context)
        {
            _context = context;
        }
        public async Task<int> Create(OutputCreateRequest request)
        {
            var outputExist = await _context.Outputs.FirstOrDefaultAsync(x => x.OutputCode == request.OutputCode);
            if (outputExist != null)
            {
                return -1;
            }
            if (request.StoreroomReceiveId != 0)
            {
                var output = new Output()
                {
                    Id = request.Id,
                    OutputCode = request.OutputCode,
                    StoreroomId = request.StoreroomId,
                    StoreroomReceiveId = request.StoreroomReceiveId,
                    NameRecipient = request.UserRecipient,
                    DateOutput = request.DateOutput,
                    DateDocument = request.DateDocument,
                    CreationTime = DateTime.Now,
                    UserId = request.UserId,
                    Type = request.Type,
                    MaterialOutputs = request.MaterialOutput,
                    Description = request.Description
                    //Date = request.Date,
                    //Status = request.Status,
                    //SuplierId = request.SuplierId,
                    //Priority = request.Priority,
                    //UserId = request.UserId,
                    //MaterialPurchaseOrders = request.MaterialPuchaseOrder
                };
                _context.Outputs.Add(output);
            }
            else
            {
                var output = new Output()
                {
                    Id = request.Id,
                    OutputCode = request.OutputCode,
                    StoreroomId = request.StoreroomId,
                    Recipient = request.Recipient,
                    NameRecipient = request.UserRecipient,
                    DateOutput = request.DateOutput,
                    DateDocument = request.DateDocument,
                    UserId = request.UserId,
                    MaterialOutputs = request.MaterialOutput,
                    Description=request.Description
                };
                _context.Outputs.Add(output);
            }
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int OutputId)
        {
            var material = await _context.MaterialOutputs.FirstOrDefaultAsync(x => x.OutputId == OutputId);
            if (material != null)
            {
                return -1;
            }
            var output = await _context.Outputs.FindAsync(OutputId);
            if (output == null) throw new StoreroomException($"Cannot find a output: {OutputId}");
            _context.Outputs.Remove(output);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> DeleteDetail(int OutputId)
        {
            _context.MaterialOutputs.RemoveRange(_context.MaterialOutputs.Where(x => x.OutputId == OutputId));
            return await _context.SaveChangesAsync();
        }

        public Task<PagedResult<OutputViewModel>> GetAll()
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResult<OutputViewModel>> GetAllPaging(OutputSearchRequest request)
        {
            //1. Select join
            var query = from a in _context.Outputs
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
            if (!string.IsNullOrEmpty(request.OutputCode))
            {
                query = query.Where(x => x.a.OutputCode.Contains(request.OutputCode));
            }
            if (request.Status.HasValue)
            {
                if (request.Status == 0)
                {
                    query = query.Where(x => x.a.DateOutput > request.StartDate && x.a.DateOutput < request.EndDate);
                }
                else
                {
                    query = query.Where(x => x.a.DateDocument > request.StartDate && x.a.DateDocument < request.EndDate);
                }
            }
            if (request.Date.HasValue)
            {
                query = query.Where(x => x.a.DateOutput == request.Date);
            }
            //3. Paging
            int totalRow = await query.CountAsync();

            var data = await query.Skip((request.page - 1) * request.limit)
                       .Take(request.limit)
                       .Select(x => new OutputViewModel()
                       {
                           Id = x.a.Id,
                           OutputCode = x.a.OutputCode,
                           StoreroomId = x.a.StoreroomId,
                           StoreroomReceiveId = x.a.StoreroomReceiveId,
                           Recipient = x.a.Recipient,
                           UserRecipient = x.a.NameRecipient,
                           Type = x.a.Type,
                           DateOutput = x.a.DateOutput,
                           DateDocument = x.a.DateDocument,
                           UserId = x.a.UserId,
                           UserName = x.c.FirstName + ' ' + x.c.LastName,
                           Description= x.a.Description
                           //MaterialOutputs = request.MaterialOutput
                       }).OrderByDescending(x=>x.DateOutput).ToListAsync();
            //4. Select and projection
            var pagedResult = new PagedResult<OutputViewModel>()
            {
                TotalRecord = totalRow,
                Items = data
            };
            return pagedResult;
        }

        public Task<PagedResult<OutputViewModel>> GetDetail(int OutputId)
        {
            throw new NotImplementedException();
        }

        public async Task<PagedResult<MaterialOutputViewModel>> GetMaterialByOutputId(int OutputId)
        {
            var query = from a in _context.MaterialOutputs
                        join b in _context.Materials on a.MaterialId equals b.Id
                        join c in _context.Units on b.UnitId equals c.Id
                        select new { a, b, c };
            query = query.Where(x => x.a.OutputId == OutputId);
            int totalRow = await query.CountAsync();
            var materials = await query.Select(x => new MaterialOutputViewModel()
            {
                OutputId = OutputId,
                Unit = x.c.DisplayName,
                MaterialId = x.a.MaterialId,
                MaterialName = x.b.DisplayName,
                MaterialCode = x.b.MaterialCode,
                Quantity = x.a.Quantity,
                Price = x.a.Price,
                Description = x.a.Description

            }).ToListAsync();
            var pagedResult = new PagedResult<MaterialOutputViewModel>()
            {
                TotalRecord = totalRow,
                Items = materials
            };
            return pagedResult;
        }

        public async Task<int> Update(OutputUpdateRequest request)
        {
            var output = await _context.Outputs.FirstOrDefaultAsync(x => x.Id == request.Id);
            if (output == null) throw new StoreroomException($"Cannot find a output: {request.Id}");
            output.Id = request.Id;
            output.OutputCode = request.OutputCode;
            output.StoreroomId = request.StoreroomId;
            output.StoreroomReceiveId = request.StoreroomReceiveId;
            output.Recipient = request.Recipient;
            output.NameRecipient = request.UserRecipient;
            output.DateOutput = request.Date;
            output.DateDocument = request.DateDocument;
            output.UserId = request.UserId;
            output.Description = request.Description;
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateDetail(MaterialOutputCreateRequest request)
        {
            var materialDetail = await _context.MaterialOutputs
                .FirstOrDefaultAsync(x => x.OutputId == request.OutputId && x.MaterialId == request.MaterialId);
            if (materialDetail == null)
            {
                var materialOutput = new MaterialOutput()
                {
                    OutputId = request.OutputId,
                    MaterialId = request.MaterialId,
                    Quantity = request.Quantity,
                    Price = request.Price,
                    Description = request.Description
                };
                _context.MaterialOutputs.Add(materialOutput);
                return await _context.SaveChangesAsync();
            }

            materialDetail.Quantity = request.Quantity;
            materialDetail.Price = request.Price;
            materialDetail.Description = request.Description;
            return await _context.SaveChangesAsync();
        }
    }
}
