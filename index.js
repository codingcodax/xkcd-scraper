import axios from 'axios';
import fs from 'fs-extra';
import log from './log.js';
import time from './time.js';
import getImageSize from './getImageSize.js';

const INITIAL_ID_XKCD_COMIC = 2600;
const MAX_ID_XKCD_COMICS = 2674;

const endTime = time('Process endend in ');

for (let id = INITIAL_ID_XKCD_COMIC; id < MAX_ID_XKCD_COMICS; id++) {
  const url = `https://xkcd.com/${id}/info.0.json`;
  log(`Fetching ${url}`);

  const { data } = await axios.get(url);
  const { num, news, transcript, img, ...restOfComic } = data;
  log(`Fetched comic #${num}. Getting img dimensions...`);

  const { height, width } = await getImageSize({ url: img });
  log(`Got img dimensions: ${width}x${height}`);

  const comicToStore = { id, img, height, width, ...restOfComic };
  const jsonFile = `./comics/${id}.json`;

  await fs.writeJSON(jsonFile, comicToStore);
  log(`Wrote ${jsonFile}! ✅\n`);
}

endTime();
