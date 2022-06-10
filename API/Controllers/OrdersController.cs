using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

using API.Data;
using API.Entities.OrderAggregate;
using API.DTOs;
using API.Entities;
using API.Extensions;

namespace API.Controllers {
	[Authorize]
    public class OrdersController: BaseApiController {
		public OrdersController(StoreContext context): base(context) {}
        
		[HttpGet]
		public async Task<ActionResult<List<OrderDTO>>> GetOrders() {
			return await _context.Orders
				.ProjectOrderToDTO()
				.Where(x => x.BuyerId == User.Identity.Name)
				.ToListAsync();
		}

		[HttpGet("{id}", Name = "GetOrder")]
		public async Task<ActionResult<OrderDTO>> GetOrder(int id) {
			return await _context.Orders
				.ProjectOrderToDTO()
				.Where(x => x.BuyerId == User.Identity.Name && x.Id == id)
				.FirstOrDefaultAsync();
		}		

		[HttpPost]
		public async Task<ActionResult<int>> CreateOrder(CreateOrderDTO orderDTO) {
			var basket = await RetrieveBasket(User.Identity.Name);
			if (basket == null)
				return BadRequest(new ProblemDetails{Title = "Could not locate basket"});

			var orderItems = new List<OrderItem>();

			foreach (var basketItem in basket.Items) {
				var productItem = await _context.Products.FindAsync(basketItem.ProductId);
				productItem.QuantityInStock -= basketItem.Quantity;

				orderItems.Add(
					new OrderItem{
						ItemOrdered = new ProductItemOrdered{
							ProductId = productItem.Id,
							Name = productItem.Name,
							PictureURL = productItem.PictureURL
						},
						Price = productItem.Price,
						Quantity = basketItem.Quantity
					}
				);
			}
			var shippingAddress = orderDTO.ShippingAddress;
			var subTotal = orderItems.Sum(item => item.Price * item.Quantity);
			var deliveryFee = subTotal > 10000 ? 0 : 500;

			var order = new Order{
				BuyerId = User.Identity.Name,
				ShippingAddress = shippingAddress,
				OrderItems = orderItems,
				Subtotal = subTotal,
				DeliveryFee = deliveryFee
			};
			_context.Orders.Add(order);
			_context.Baskets.Remove(basket);

			if (orderDTO.SaveAddress) {
				var user = await _context.Users.FirstOrDefaultAsync(
					x => x.UserName == User.Identity.Name
				);

				user.Address = new UserAddress{
					FullName = shippingAddress.FullName,
					Address1 = shippingAddress.Address1,
					Address2 = shippingAddress.Address2,
					City = shippingAddress.City,
					State = shippingAddress.State,
					Zip = shippingAddress.Zip,
					Country = shippingAddress.Country																								
				};
				_context.Update(user);
			}

			var result = await _context.SaveChangesAsync() > 0;
			if (result) return CreatedAtRoute("GetOrder", new {id = order.Id}, order.Id);

			return BadRequest(new ProblemDetails{Title = "Problem creating an order"});
		}
    }
}