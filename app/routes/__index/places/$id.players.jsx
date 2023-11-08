import { useEffect, useRef, useState } from 'react';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { useRemoveMenu } from '~/components/hooks/useRemoveMenu';
import { getSettlement } from '~/services/settlements.server';
import random from '~/domain/random';

import styles from '~/components/places.module.css';

export const loader = async ({ params }) => {
  const place = await getSettlement(params.id);

  if (!place) {
    throw new Error('Place not found');
  }

  let audioFiles;
  const path = await import('path');
  const fs = await import('fs/promises');
  const publicFolderPath = path.join(
    process.cwd(),
    // `public/audio/settlements/${place.type}`
    `public/audio/settlements/village`
  );
  try {
    audioFiles = await fs.readdir(publicFolderPath);
  } catch (error) {
    audioFiles = [];
  }

  return json({ place, audioFiles });
};

export const action = async ({ request }) => {
  return null;
};

function PlaceForPlayers() {
  const { place, audioFiles } = useLoaderData();
  const { name, img } = place;

  useRemoveMenu();

  const audioRef = useRef();
  const [track, setTrack] = useState();
  const [audioCtx, setAudioCtx] = useState();
  const [gainNode, setGainNode] = useState(null);

  useEffect(() => {
    if (audioCtx) {
      setTrack(audioCtx.createMediaElementSource(audioRef.current));
      setGainNode(audioCtx.createGain());
    }
  }, [audioCtx]);

  useEffect(() => {
    if (track) {
      track.connect(gainNode).connect(audioCtx.destination);

      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      audioRef.current.play();
      audioRef.current.dataset.playing = 'true';

      let state =
        audioRef.current.getAttribute('aria-checked') === 'true' ? true : false;
      audioRef.current.setAttribute('aria-checked', state ? 'false' : 'true');
    }
  }, [track]);

  function startAudio() {
    if (audioCtx) {
      if (audioRef.current.dataset.playing === 'true') {
        audioRef.current.pause();
        audioRef.current.dataset.playing = 'false';
      } else {
        audioRef.current.play();
        audioRef.current.dataset.playing = 'true';
      }

      let state =
        audioRef.current.getAttribute('aria-checked') === 'true' ? true : false;
      audioRef.current.setAttribute('aria-checked', state ? 'false' : 'true');
    } else {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      setAudioCtx(new AudioContext());
    }
  }

  const [audioFile, setAudioFile] = useState(null);
  useEffect(() => {
    setAudioFile(random.element(audioFiles));
  }, []);

  const [volume, setVolume] = useState(1);
  useEffect(() => {
    if (gainNode) {
      gainNode.gain.value = volume;
    }
  }, [volume]);

  return (
    <>
      <h1 className={`${styles.title} ${styles.titleFloat}`}>
        <span>
          <span className={styles.titleCapital}>{name?.slice(0, 1)}</span>
          {name?.slice(1)}
        </span>
      </h1>
      {!!audioFile && (
        <audio
          loop
          ref={audioRef}
          src={`/audio/settlements/village/${audioFile}`}
          type="audio/mp3"
        >
          Your browser does not support the audio element.
        </audio>
      )}
      <div className={`${styles.imageContainerFloat}`}>
        <img
          src={`/images/places/${img}`}
          className={`${styles.image} ${styles.imageFloat}`}
          width="100%"
          height="100%"
          onClick={startAudio}
        />
      </div>
      <div className={styles.volumeControls}>
        <input
          type="range"
          id="volume"
          className={styles.volumeSlider}
          min="0"
          max="2"
          value={volume}
          list="gain-vals"
          step="0.01"
          data-action="volume"
          orient="vertical"
          onChange={e => setVolume(e.target.value)}
        />
        <datalist id="gain-vals">
          <option value="0" label="min" />
          <option value="2" label="max" />
        </datalist>
      </div>
    </>
  );
}

export default PlaceForPlayers;
