import { ServiceImage } from '@app/model/service/service.mapper';
import { media as wixMedia } from '@wix/sdk';

export const getImageUrlForMedia = (
  media?: ServiceImage,
  width: number = 640,
  height: number = 320
) =>
  media?.image
    ? wixMedia.getScaledToFillImageUrl(media.image, width, height, {})
    : `https://fakeimg.pl/${width}x${height}/?text=%20`;

export default function WixMediaImage({
  media,
  width = 640,
  height = 320,
}: {
  media?: ServiceImage;
  width?: number;
  height?: number;
}) {
  const imageUrl = getImageUrlForMedia(media, width, height);
  return (
    <div className="flex items-center justify-center ">
      <div className="overflow-hidden  cursor-pointer relative group">
        <img
          className="object-cover w-full group-hover:scale-110 transition duration-300 ease-in-out "
          src={imageUrl}
          alt={''}
        />
      </div>
    </div>
  );
}
