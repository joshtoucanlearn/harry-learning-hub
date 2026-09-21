// Keep the original pet player on the same supplied Paul Allen tracks.
import library from './cosmic-radio-tracks.json';

export const RADIO_TRACKS = library.filter((track) => track.mix === 'paul-allen');
