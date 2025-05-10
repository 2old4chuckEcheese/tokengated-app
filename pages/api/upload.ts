import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import cloudinary from '../../lib/cloudinary';

export const config = { api: { bodyParser: false } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: 'Upload error' });
    const file = files.file as formidable.File;
    const result = await cloudinary.uploader.upload(file.filepath);
    res.status(200).json({ url: result.secure_url });
  });
}
