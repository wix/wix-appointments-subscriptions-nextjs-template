import { ServiceImage } from '@model/service/service.mapper';
import { media as wixMedia } from '@wix/api-client';

export function getImageUrlForMedia(
  media?: ServiceImage,
  width: number = media?.width ?? 640,
  height: number = media?.height ?? 320
) {
  const imageUrl = media?.url
    ? wixMedia.getScaledToFillImageUrl(
        `wix:image://v1/${media.url}#originWidth=${width}&originHeight=${height}` +
          media?.url,
        width,
        height,
        {}
      )
    : `https://fakeimg.pl/${width}x${height}/?text=%20`;
  return imageUrl;
}

export default function WixMediaImage({
  media,
  width = media?.width ?? 640,
  height = media?.height ?? 320,
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
          alt={media?.altText ?? 'no info available for image'}
        />
      </div>
    </div>
  );
}
