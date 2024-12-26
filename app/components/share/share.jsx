import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import { useRemoveMenu } from '~/components/hooks/useRemoveMenu';

const FADE_TRANSITION_DURATION = 1000;
const FADE_OUT_DURATION = FADE_TRANSITION_DURATION / 5;

export default function Share(props) {
  const { title: newTitle, img: newImg, animationInactive } = props;
  const previousTitle = useRef(newTitle);
  const previousImg = useRef(newImg);

  useRemoveMenu();

  const [isAnimationActive, setIsAnimationActive] = useState(
    !animationInactive
  );
  const [showTitle, setShowTitle] = useState(true);
  const [isFading, setIsFading] = useState(false);

  const title = isFading ? previousTitle.current : newTitle;
  const img = isFading ? previousImg.current : newImg;

  useEffect(() => {
    if (title !== previousTitle.current || img !== previousImg.current) {
      setIsFading(true);

      const timer1 = setTimeout(() => {
        setIsFading(false);
      }, FADE_TRANSITION_DURATION);

      const timer2 = setTimeout(() => {
        previousTitle.current = newTitle;
        previousImg.current = newImg;
      }, FADE_OUT_DURATION);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [newTitle, newImg]);

  return (
    <div className="share__container">
      <h1 className="share__title">
        {showTitle && (
          <span
            onClick={() => setShowTitle(false)}
            className={isFading ? 'fade-out' : ''}
          >
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
            'fade-out': isFading,
          })}
          height="100%"
          onClick={() => setIsAnimationActive(is => !is)}
        />
      </div>
    </div>
  );
}
