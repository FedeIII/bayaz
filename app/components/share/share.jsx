import { useState } from 'react';
import classNames from 'classnames';

import { useRemoveMenu } from '~/components/hooks/useRemoveMenu';

export default function Share(props) {
  const { title, img, animationInactive } = props;

  useRemoveMenu();

  const [isAnimationActive, setIsAnimationActive] = useState(
    !animationInactive
  );

  const [showTitle, setShowTitle] = useState(true);

  return (
    <div className="share__container">
      <h1 className="share__title">
        {showTitle && (
          <span onClick={() => setShowTitle(false)}>
            <span className="share__title-capital">{title?.slice(0, 1)}</span>
            {title?.slice(1)}
          </span>
        )}
      </h1>
      <div className="share__image-container-float">
        <img
          src={img}
          className={classNames('share__image', {
            'share__image--float': isAnimationActive,
          })}
          height="100%"
          onClick={() => setIsAnimationActive(is => !is)}
        />
      </div>
    </div>
  );
}
