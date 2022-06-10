using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

using API.Data;
using API.Entities.OrderAggregate;

namespace API.Controllers {
	[Authorize]
    public class OrdersController: BaseApiController {
		public OrdersController(StoreContext context): base(context) {}
        
		[HttpGet]
		public async Task<ActionResult<List<Order>>> GetOrders() {
			return await _context.Orders
				.Include(o => o.OrderItems)
				.Where(x => x.BuyerId == User.Identity.Name)
				.ToListAsync();
		}

		[HttpGet("{id}")]
		public async Task<ActionResult<Order>> GetOrder(int id) {
			return await _context.Orders
				.Include(o => o.OrderItems)
				.Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
				.FirstOrDefaultAsync();
		}		
    }
}