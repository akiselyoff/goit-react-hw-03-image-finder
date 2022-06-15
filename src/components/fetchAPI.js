function fetchAPI(query, page) {
  const KEY = '26823171-490067530a76e346906bfc05d';
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=3`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`По запросу ${query} ничего не найдено`));
  });
}
const api = {
  fetchAPI,
};

export default api;
