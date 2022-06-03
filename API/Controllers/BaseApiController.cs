using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using API.Data;
using API.Entities;

namespace API.Controllers {
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController: ControllerBase {
		protected readonly StoreContext _context;

		public BaseApiController(StoreContext context) {
			_context = context;
		}

		protected async Task<Basket> RetrieveBasket(string buyerId) {
			if (string.IsNullOrEmpty(buyerId)) {
				Response.Cookies.Delete("buyerId");
				return null;
			}
			return await _context.Baskets
				.Include(i => i.Items)
				.ThenInclude(p => p.Product)
				.FirstOrDefaultAsync(x => x.BuyerId == buyerId);
		}			
    }
}