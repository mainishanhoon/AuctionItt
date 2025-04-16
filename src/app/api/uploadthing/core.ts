import { createUploadthing, type FileRouter } from 'uploadthing/next';
import { UploadThingError } from 'uploadthing/server';
import { fetchUser } from '@/hooks/hooks';

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 4,
    },
  })
    .middleware(async () => {
      const session = await fetchUser();
      if (!session) throw new UploadThingError('Unauthorized');

      return { userId: session.user?.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId);
      console.log('File URL', file.url);

      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
