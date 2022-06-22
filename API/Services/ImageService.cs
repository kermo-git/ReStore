using System.Threading.Tasks;

using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http;

using CloudinaryDotNet;
using CloudinaryDotNet.Actions;

namespace API.Services {

	public class ImageService {
		private readonly Cloudinary _cloudinary;

		public ImageService(IConfiguration config) {
			var account = new Account(
				config["Cloudinary:CloudName"],
				config["Cloudinary:ApiKey"],				
				config["Cloudinary:ApiSecret"]						
			);
			_cloudinary = new Cloudinary(account);
		}

		public async Task<ImageUploadResult> UploadImageAsync(IFormFile file) {
			var uploadResult = new ImageUploadResult();

			if (file.Length > 0) {
				using var stream = file.OpenReadStream();

				var uploadParams = new ImageUploadParams{
					File = new FileDescription(file.Name, stream)
				};
				uploadResult = await _cloudinary.UploadAsync(uploadParams);
			}
			return uploadResult;
		}

		public async Task<DeletionResult> DeleteImageAsync(string publicID) {
			var delParams = new DeletionParams(publicID);
			return await _cloudinary.DestroyAsync(delParams);
		}
	}
}