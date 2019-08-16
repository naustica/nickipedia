export function fetchSearchStart() {
  return {
    type: 'fetch_search_start',
    payload: {}
  }
}

export function fetchSearchResults(term: string, table: string, page: number) {
  return async function(dispatch: any) {
    try {
    const response = await fetch('api/search?term=' + term + '&table=' + table + '&page=' + page, {
      method: 'get'
    })
    const data = await response.json()
      dispatch({type: 'receive_search_results', payload: {data: data, fetching: false, fetched: true, term: term, table: table, page: page}})
    }
    catch (error) {
      dispatch({error: error})
    }
  }
}

export function cleanSearchResults() {
  return {
    type: 'clean_search_results',
    payload: {}
  }
}
