using storeroom.Application.Catalog.PurchaseProposals.Dtos;
using storeroom.Application.Dtos;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace storeroom.Application.Catalog.PurchaseProposals
{
    public interface IPurchaseProposalService
    {
        Task<int> Create(PurchaseProposalCreateRequest request);
        Task<int> Update(PurchaseProposalUpdateRequest request);
        Task<int> UpdateDetail(MaterialPurchaseProposalCreateRequest request);
        Task<int> UpdateStatus(PurchaseProposalUpdateRequest request);
        Task<int> Delete(int PurchaseProposalId);
        Task<PagedResult<PurchaseProposalViewModel>> GetDetail(int PurchaseProposalId);

        Task<PagedResult<PurchaseProposalViewModel>> GetAllPaging(PurchaseProposalSearchRequest request);
        Task<PagedResult<PurchaseProposalViewModel>> GetAll();
        Task<PagedResult<MaterialPurchaseProposalViewModel>> GetMaterialByPurchaseId(int PurchaseId);
    }
}
