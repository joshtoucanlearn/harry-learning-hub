'use client';

import { useEffect, useRef, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { RADIO_TRACKS } from '@/data/radio-tracks';

const pet = new URL('../assets/radio-pet.png', import.meta.url).href;
const VOLUME_KEY = 'harry-media-radio-volume';

export function RadioPet() {
  const petRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const graph = useRef<{ context: AudioContext; gain: GainNode } | null>(null);
  const indexRef = useRef(0);
  const request = useRef(0);
  const wantsMusic = useRef(false);
  const volumeRef = useRef(25);
  const [index, setIndex] = useState(0);
  const [volume, setVolume] = useState(25);
  const [started, setStarted] = useState(false);
  const [controlsOpen, setControlsOpen] = useState(false);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'playing' | 'paused' | 'error'
  >('idle');
  const track = RADIO_TRACKS[index];
  const active = status === 'playing' || status === 'loading';

  useEffect(() => {
    if (!controlsOpen) return;
    const closeOutside = (event: PointerEvent) => {
      if (!petRef.current?.contains(event.target as Node))
        setControlsOpen(false);
    };
    document.addEventListener('pointerdown', closeOutside);
    return () => document.removeEventListener('pointerdown', closeOutside);
  }, [controlsOpen]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(VOLUME_KEY);
      const value = saved === null ? 25 : Number(saved);
      if (Number.isFinite(value) && value >= 0 && value <= 100) {
        volumeRef.current = value;
        setVolume(value);
      }
    } catch {
      /* Music also works with browser storage disabled. */
    }
    const audio = audioRef.current;
    return () => {
      request.current++;
      wantsMusic.current = false;
      audio?.pause();
      audio?.removeAttribute('src');
      const current = graph.current;
      graph.current = null;
      void current?.context.close().catch(() => {});
    };
  }, []);

  function changeVolume(value: number | readonly number[]) {
    const next = Math.max(
      0,
      Math.min(100, typeof value === 'number' ? value : value[0]),
    );
    volumeRef.current = next;
    setVolume(next);
    if (graph.current) {
      const { gain, context } = graph.current;
      gain.gain.setTargetAtTime(next / 100, context.currentTime, 0.025);
    } else if (audioRef.current) audioRef.current.volume = next / 100;
    try {
      localStorage.setItem(VOLUME_KEY, String(next));
    } catch {
      /* Optional preference. */
    }
  }

  function playTrack(next: number) {
    const audio = audioRef.current;
    if (!audio) return;
    const id = ++request.current;
    wantsMusic.current = true;
    indexRef.current = next;
    setIndex(next);
    setStarted(true);
    setStatus('loading');

    // A gain node lets the slider work on mobile browsers too. Create it only
    // inside the first user gesture, when browsers permit audio activation.
    if (!graph.current && typeof AudioContext !== 'undefined') {
      try {
        const context = new AudioContext();
        const source = context.createMediaElementSource(audio);
        const gain = context.createGain();
        gain.gain.value = volumeRef.current / 100;
        source.connect(gain).connect(context.destination);
        graph.current = { context, gain };
      } catch {
        /* Fall back to the media element's native volume. */
      }
    }
    audio.volume = graph.current ? 1 : volumeRef.current / 100;
    if (audio.src !== RADIO_TRACKS[next].src)
      audio.src = RADIO_TRACKS[next].src;
    else if (audio.error) audio.load();
    const resumed = graph.current?.context.resume();
    void Promise.all([resumed, audio.play()])
      .then(() => {
        if (id === request.current && wantsMusic.current) setStatus('playing');
      })
      .catch(() => {
        if (id !== request.current) return;
        wantsMusic.current = false;
        audio.pause();
        setStatus('error');
      });
  }

  function pause() {
    ++request.current;
    wantsMusic.current = false;
    audioRef.current?.pause();
    setStatus('paused');
  }

  function nextTrack() {
    playTrack((indexRef.current + 1) % RADIO_TRACKS.length);
  }

  return (
    <aside
      ref={petRef}
      className={`radio-pet ${status === 'playing' ? 'is-playing' : ''}`}
      aria-label="Paul Allen’s mix radio"
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') setControlsOpen(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== 'touch') setControlsOpen(false);
      }}
      onFocusCapture={(event) => {
        if (event.target.matches(':focus-visible')) setControlsOpen(true);
      }}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setControlsOpen(false);
      }}
    >
      <audio
        ref={audioRef}
        preload="none"
        onEnded={() => {
          if (wantsMusic.current) nextTrack();
        }}
        onPlaying={() => {
          if (wantsMusic.current) setStatus('playing');
        }}
        onWaiting={() => {
          if (wantsMusic.current) setStatus('loading');
        }}
        onPause={() => {
          if (
            wantsMusic.current &&
            status === 'playing' &&
            !audioRef.current?.ended
          )
            pause();
        }}
        onError={() => {
          if (audioRef.current?.error) {
            wantsMusic.current = false;
            setStatus('error');
          }
        }}
      />
      <button
        className="radio-character"
        type="button"
        onClick={() => (started ? nextTrack() : playTrack(0))}
        aria-label={started ? 'Next radio track' : 'Start Paul Allen’s mix'}
        title={
          started
            ? 'Click for the next track · hover for volume'
            : 'Click to start the mix · hover for volume'
        }
      >
        <img src={pet} alt="" width={256} height={256} />
      </button>
      <div
        className="radio-now-playing sr-only"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {status === 'error' ? (
          'Couldn’t play. Tap play to retry.'
        ) : !started ? (
          'Tap your radio to tune in'
        ) : (
          <span>
            {status === 'loading'
              ? 'Tuning in…'
              : `${track.artist} — ${track.title}`}
          </span>
        )}
      </div>
      <div
        className="radio-controls"
        id="radio-controls"
        hidden={!controlsOpen}
      >
        <button
          className="radio-play"
          type="button"
          onClick={() => (active ? pause() : playTrack(indexRef.current))}
          aria-label={active ? 'Pause radio' : 'Play radio'}
        >
          {active ? (
            <Pause size={14} fill="currentColor" />
          ) : (
            <Play size={14} fill="currentColor" />
          )}
        </button>
        {volume === 0 ? (
          <VolumeX size={14} aria-hidden="true" />
        ) : (
          <Volume2 size={14} aria-hidden="true" />
        )}
        <span className="sr-only" id="radio-volume-label">
          Radio volume
        </span>
        {controlsOpen && (
          <Slider
            className="radio-volume"
            aria-labelledby="radio-volume-label"
            value={[volume]}
            min={0}
            max={100}
            step={1}
            onValueChange={changeVolume}
          />
        )}
        <span className="radio-volume-value" aria-hidden="true">
          {volume}
        </span>
        {status === 'error' && (
          <span className="radio-error">Tap play to retry.</span>
        )}
      </div>
      <button
        className="radio-touch-volume"
        type="button"
        onClick={() => setControlsOpen((open) => !open)}
        aria-label="Radio controls"
        aria-expanded={controlsOpen}
        aria-controls="radio-controls"
      >
        <Volume2 size={14} />
      </button>
    </aside>
  );
}
