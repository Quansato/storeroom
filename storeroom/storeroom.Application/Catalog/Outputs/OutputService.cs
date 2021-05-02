using storeroom.Application.Catalog.Outputs.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using storeroom.Data.Entities;
using System;
using System.Collections.Generic;
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
            if (request.StoreroomReceiveId != null)
            {
                var output = new Output()
                {
                    Id = request.Id,
                    OutputCode = request.OutputCode,
                    StoreroomId = request.StoreroomId,
                    StoreroomReceiveId = request.StoreroomReceiveId,
                    NameRecipient=request.UserRecipient,
                    DateOutput=request.Date,
                    DateDocument=request.DateDocument,
                    UserId=request.UserId,
                    MaterialOutputs=request.MaterialOutput                   
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
                    NameRecipient=request.UserRecipient,
                    DateOutput=request.Date,
                    DateDocument=request.DateDocument,
                    UserId = request.UserId,
                    MaterialOutputs=request.MaterialOutput
                };
                _context.Outputs.Add(output);
            }
            return await _context.SaveChangesAsync();
        }

        public async Task<int> Delete(int OutputId)
        {
            var output = await _context.Outputs.FindAsync(OutputId);
            if (output == null) throw new StoreroomException($"Cannot find a purchaseOrder: {OutputId}");
            _context.Outputs.Remove(output);
            return await _context.SaveChangesAsync();
        }

        public Task<PagedResult<OutputViewModel>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<PagedResult<OutputViewModel>> GetAllPaging(OutputSearchRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<PagedResult<OutputViewModel>> GetDetail(int OutputId)
        {
            throw new NotImplementedException();
        }

        public Task<PagedResult<MaterialOutputViewModel>> GetMaterialByPurchaseId(int OutputId)
        {
            throw new NotImplementedException();
        }

        public Task<int> Update(OutputUpdateRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateDetail(MaterialOutputCreateRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
