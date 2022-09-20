import axios from 'axios';
import fs from 'fs-extra';

const INITIAL_ID_XKCD_COMIC = 2600;
const MAX_ID_XKCD_COMICS = 2674;

for (let id = INITIAL_ID_XKCD_COMIC; id < MAX_ID_XKCD_COMICS; id++) {
  const url = `https://xkcd.com/${id}/info.0.json`
  const {data} = await axios.get(url);
  const {num, news, transcript, ...restOfComic} = data;
  const comicToStore = {id, ...restOfComic};
  
  fs.writeJSON(`./comics/${id}.json`, comicToStore);
}