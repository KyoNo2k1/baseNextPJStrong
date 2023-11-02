import { useFadeEffect, _popoverStyles, _popoverVisibleStyles } from '@/shared/hooks/useFadeEffect';
const Fade = ({
  children,
  visible,
  className = '',
}: {
  children: React.ReactNode;
  visible: boolean;
  className?: string;
}) => {
  const [_isTransitioning, shouldBeVisible, refModal] = useFadeEffect(visible);

  return (
    <>
      {_isTransitioning && (
        <div ref={refModal} className={className} style={shouldBeVisible ? _popoverVisibleStyles : _popoverStyles}>
          <>{children}</>
        </div>
      )}
    </>
  );
};

export default Fade;
