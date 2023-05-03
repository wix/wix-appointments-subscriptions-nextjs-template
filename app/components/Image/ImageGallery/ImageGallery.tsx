import { ServiceImage } from '@app/model/service/service.mapper';
import ImageGalleryClient from '@app/components/Image/ImageGallery/ImageGallery.client';
import { getImageUrlForMedia } from '@app/components/Image/WixMediaImage';

export default function ImageGallery({
  mediaItems,
}: {
  mediaItems: ServiceImage[];
}) {
  return (
    <ImageGalleryClient
      width={600}
      height={400}
      items={mediaItems.map((item) => ({
        src: getImageUrlForMedia(item, 600, 400),
        alt: '',
      }))}
    />
  );
}
