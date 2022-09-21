const time = (string = '') => {
  console.time(`[🤤 dirty-scraper] ${string}`);

  return () => console.timeEnd(`[🤤 dirty-scraper] ${string}`);
};

export default time;
