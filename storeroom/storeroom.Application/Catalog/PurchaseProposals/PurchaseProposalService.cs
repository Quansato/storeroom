using storeroom.Application.Catalog.PurchaseProposals.Dtos;
using storeroom.Application.Dtos;
using storeroom.Data.EF;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.PurchaseProposals
{
    public class PurchaseProposalService : IPurchaseProposalService
    {
        private storeroomDbContext _context;
        public PurchaseProposalService(storeroomDbContext context)
        {
            _context = context;
        }
        public Task<int> Create(PurchaseProposalCreateRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<int> Delete(int PurchaseProposalId)
        {
            throw new NotImplementedException();
        }

        public Task<PagedResult<PurchaseProposalViewModel>> GetAll()
        {
            throw new NotImplementedException();
        }

        public Task<PagedResult<PurchaseProposalViewModel>> GetAllPaging(PurchaseProposalSearchRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<PagedResult<PurchaseProposalViewModel>> GetDetail(int PurchaseProposalId)
        {
            throw new NotImplementedException();
        }

        public Task<PagedResult<MaterialPurchaseProposalViewModel>> GetMaterialByPurchaseId(int PurchaseId)
        {
            throw new NotImplementedException();
        }

        public Task<int> Update(PurchaseProposalUpdateRequest request)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateDetail(MaterialPurchaseProposalCreateRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
