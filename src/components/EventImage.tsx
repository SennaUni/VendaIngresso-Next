import Image from "next/image";

export type EventImageProps = {
  src: string;
  alt: string;
};

const EventImage = ({ src, alt }: EventImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={277}
      height={277}
      priority
      className="rounded-2xl"
    />
  );
};

export default EventImage;
