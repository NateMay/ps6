const fetchBy = async (param: string, term: string) => {
  const response = await fetch(
    `https://api.datamuse.com/words?${param}=${term}`
  );
  return response.json();
};

export const queryRyhme = async (term: string) => fetchBy("rel_rhy", term);

export const querySynonym = async (term: string) => fetchBy("ml", term);
