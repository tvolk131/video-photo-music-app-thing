const search = (searchQuery) => ({
  type: 'SEARCH',
  payload: {
    request: {
      method: 'post',
      url: '/qraft/_search',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: {
        query: {
          match: {
            name: {
              query: searchQuery,
              fuzziness: 'AUTO'
            }
          }
        }
      }
    }
  }
});

export { search };