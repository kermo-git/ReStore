using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers {
    public class ProductsController: BaseApiController {
        public ProductsController(StoreContext context): base(context) {}

        [HttpGet]
        public async Task<ActionResult<PagedList<Product>>> GetProducts([FromQuery] ProductParams args) {
			var query = _context.Products
				.Sort(args.OrderBy)
				.Search(args.SearchTerm)
				.Filter(args.Brands, args.Types)
				.AsQueryable();

			var products = await PagedList<Product>.ToPagedList(query, args.PageNumber, args.PageSize);
			Response.AddPaginationHeader(products.MetaData);

            return products;
        }

        [HttpGet("{id}", Name = "GetProduct")]
        public async Task<ActionResult<Product>> GetProduct(int id) {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return NotFound();
            return product;
        }

		[HttpGet("filters")]
		public async Task<IActionResult> GetFilters() {
			var brands = await _context.Products.Select(p => p.Brand).Distinct().ToListAsync();
			var types = await _context.Products.Select(p => p.Type).Distinct().ToListAsync();
			return Ok(new {brands, types});
		}

		[Authorize(Roles = "Admin")]
		[HttpPost]
		public async Task<ActionResult<Product>> CreateProduct(Product product) {
			_context.Products.Add(product);

			var result = await _context.SaveChangesAsync();

			if (result > 0) return CreatedAtRoute("GetProduct", new {Id = product.Id}, product);

			return BadRequest(new ProblemDetails{Title = "Problem creating a new product."});
		}
    }
}