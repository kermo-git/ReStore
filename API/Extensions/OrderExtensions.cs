using System.Linq;

using Microsoft.EntityFrameworkCore;

using API.DTOs;
using API.Entities.OrderAggregate;

namespace API.Extensions {
    public static class OrderExtensions {
        public static IQueryable<OrderDTO> ProjectOrderToDTO(this IQueryable<Order> query) {
			return query.Select(order => new OrderDTO{
				Id = order.Id,
				BuyerId = order.BuyerId,
				OrderDate = order.OrderDate,
				ShippingAddress = order.ShippingAddress,
				Subtotal = order.Subtotal,
				DeliveryFee = order.DeliveryFee,
				Total = order.GetTotal(),
				OrderStatus = order.OrderStatus.ToString(),

				OrderItems = order.OrderItems.Select(item => new OrderItemDTO{
					ProductId = item.ItemOrdered.ProductId,
					Name = item.ItemOrdered.Name,
					PictureURL = item.ItemOrdered.PictureURL,
					Price = item.Price,
					Quantity = item.Quantity
				}).ToList()
			}).AsNoTracking();
		}
    }
}