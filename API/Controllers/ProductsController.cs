using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

using API.Data;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.DTOs;
using API.Services;

namespace API.Controllers {
    public class ProductsController: BaseApiController {
        private readonly IMapper _mapper;
		private readonly ImageService _imageService;

		public ProductsController(StoreContext context, IMapper mapper, ImageService imageService): base(context) {
            this._mapper = mapper;
			this._imageService = imageService;
		}

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
		public async Task<ActionResult<Product>> CreateProduct([FromForm] CreateProductDTO productDTO) {
			var product = _mapper.Map<Product>(productDTO);

			if (productDTO.File != null) {
				var uploadResult = await _imageService.UploadImageAsync(productDTO.File);

				if (uploadResult.Error != null) {
					return BadRequest(new ProblemDetails{
						Title = uploadResult.Error.Message
					});
				}
				product.PictureURL = uploadResult.SecureUrl.ToString();
				product.PublicId = uploadResult.PublicId;
			}
			_context.Products.Add(product);

			var result = await _context.SaveChangesAsync();

			if (result > 0) return CreatedAtRoute("GetProduct", new {Id = product.Id}, product);

			return BadRequest(new ProblemDetails{Title = "Problem creating a new product."});
		}

		[Authorize(Roles = "Admin")]
		[HttpPut]
		public async Task<ActionResult> UpdateProduct(UpdateProductDTO productDTO) {
			var product = await _context.Products.FindAsync(productDTO.Id);
			if (product == null) return NotFound();

			_mapper.Map(productDTO, product);

			var result = await _context.SaveChangesAsync();
			if (result > 0) return NoContent();

			return BadRequest(new ProblemDetails{Title = "Problem updating a product"});
		}

		[Authorize(Roles = "Admin")]
		[HttpDelete("{id}")]
		public async Task<ActionResult> DeleteProduct(int id) {
			var product = await _context.Products.FindAsync(id);
			if (product == null) return NotFound();

			_context.Products.Remove(product);

			var result = await _context.SaveChangesAsync();
			if (result > 0) return Ok();
			
			return BadRequest(new ProblemDetails{Title = "Problem deleting a product"});
		}
    }
}