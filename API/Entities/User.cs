namespace API.Entities {
	public class User: IdentityUser<int> {
        public UserAddress Address { get; set; }
    }
}