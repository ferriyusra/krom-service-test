import { Response } from 'express';
import { IReqUser } from '../../util/interface';
import { MediaService } from '../media/media.service';
import response from '../../util/response';

export class MediaController {
	constructor(private readonly mediaService: MediaService) {}

	async single(req: IReqUser, res: Response) {
		if (!req.file) {
			return response.error(res, null, 'File not found');
		}

		try {
			const result = await this.mediaService.uploadSingle(req.file);
			return response.success(res, result, 'File successfully uploaded');
		} catch {
			return response.error(res, null, 'File failed to upload');
		}
	}

	async remove(req: IReqUser, res: Response) {
		try {
			const { fileUrl } = req.body as { fileUrl: string };
			const result = await this.mediaService.remove(fileUrl);
			return response.success(res, result, 'success remove file');
		} catch {
			return response.error(res, null, 'failed remove file');
		}
	}
}
