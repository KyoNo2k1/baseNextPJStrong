interface Props {
  src: string;
  height: number;
}

export function PreImage({ src, height }: Props) {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      {src ? (
        <div
          className='w-full mb-10 mobile:h-full'
          style={{
            height: height,
            backgroundImage: `url(${process.env.NEXT_PUBLIC_DEV_IMAGE_API_URL}${src})`,
            backgroundOrigin: 'initial',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            opacity: 1,
          }}
        ></div>
      ) : (
        <div
          className='w-full mb-10 mobile:h-full'
          style={{
            height: height,
            backgroundImage: `url("images/default.png")`,
            backgroundOrigin: 'initial',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            opacity: 1,
          }}
        ></div>
      )}
    </div>
  );
}
