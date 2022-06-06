using Microsoft.EntityFrameworkCore;

namespace API.Entities.OrderAggregate {
	[Owned]
	public class ProductItemOrdered {
        public int ProductId { get; set; }
		public string Name { get; set; }
		public string PictureURL { get; set; }
    }
}