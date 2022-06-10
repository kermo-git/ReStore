namespace API.DTOs {
	public class OrderItemDTO {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public long Price  { get; set; }
        public string PictureURL  { get; set; }
        public int Quantity { get; set; }        
    }
}