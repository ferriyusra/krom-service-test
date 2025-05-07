import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config';
import { Readable } from 'stream';

cloudinary.config({
	cloud_name: config.cloudinary.cloudinaryCloudName,
	api_key: config.cloudinary.cloudinaryApiKey,
	api_secret: config.cloudinary.cloudinaryApiSecret,
});

const getResourceType = (mimetype: string): 'image' | 'raw' => {
	return mimetype.startsWith('image/') ? 'image' : 'raw';
};

const getPublicIdFromUrl = (fileUrl: string) => {
	const fileName = fileUrl.substring(fileUrl.lastIndexOf('/') + 1);
	return fileName.substring(0, fileName.lastIndexOf('.'));
};

const getCleanFilename = (filename: string) => {
	const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');
	const ext = filename.split('.').pop();
	return { nameWithoutExt, ext };
};

export class CloudinaryUploader {
	async uploadSingle(file: Express.Multer.File) {
		const resourceType = getResourceType(file.mimetype);
		const { nameWithoutExt, ext } = getCleanFilename(file.originalname);

		// add extension only for non-image files
		const suffix = resourceType === 'raw' ? `.${ext}` : '';
		const publicId = `${nameWithoutExt}_${Date.now()}${suffix}`;

		return new Promise((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(
				{
					resource_type: resourceType,
					public_id: `uploads/${publicId}`,
					use_filename: true,
					unique_filename: false,
					overwrite: true,
				},
				(error, result) => {
					if (error) return reject(error);
					resolve(result);
				}
			);

			Readable.from(file.buffer).pipe(uploadStream);
		});
	}

	async uploadMultiple(files: Express.Multer.File[]) {
		const uploadPromises = files.map((file) => this.uploadSingle(file));
		return await Promise.all(uploadPromises);
	}

	async remove(fileUrl: string) {
		const publicId = getPublicIdFromUrl(fileUrl);
		return await cloudinary.uploader.destroy(publicId, {
			resource_type: 'raw',
		});
	}
}
