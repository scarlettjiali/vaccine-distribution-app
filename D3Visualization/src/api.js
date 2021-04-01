const PROXY = 'https://api.allorigins.win/get?url=';

export const fetchCandidates = async () => {
  const data = await (
    await fetch(
      `${PROXY}https://interactives.ap.org/elections/live-data/production/2020-11-03/president/metadata.json`
    )
  ).json();
  return JSON.parse(data.contents).candidates;
};

export const fetchResults = async () => {
  const data = await (
    await fetch(
      `${PROXY}https://interactives.ap.org/elections/live-data/production/2020-11-03/president/summary.json`
    )
  ).json();
  return JSON.parse(data.contents).results;
};
