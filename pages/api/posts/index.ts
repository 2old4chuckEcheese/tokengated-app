import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });
  if (!session) return res.status(401).end();

  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      include: { author: true, likes: true, comments: true }
    });
    return res.json(posts);
  }

  if (req.method === 'POST') {
    const { content, imageUrl, linkPreviewImage } = req.body;
    const post = await prisma.post.create({
      data: {
        content,
        imageUrl,
        linkPreviewImage,
        authorId: session.user.id,
        latestInteraction: new Date()
      }
    });
    return res.status(201).json(post);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
