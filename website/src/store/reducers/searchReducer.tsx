interface StateTypes {
  fetching: boolean,
  fetched: boolean,
  error: any,
  data: any,
  changing: boolean,
  changed: boolean,
  page: number,
  table: string,
  term: string
}

const searchReducer = (state: StateTypes = {
  fetching: false,
  fetched: false,
  error: null,
  data: [],
  changing: false,
  changed : false,
  page: 1,
  table: 'video',
  term: ''
}, action: any) => {
  switch (action.type) {
    case 'fetch_search_start':
      state = {
        ...state,
        fetching: true,
        fetched: false
      }
      break
    case 'receive_search_results':
      state = {
        ...state,
        fetching: false,
        fetched: true,
        data: [
          ...state.data,
          ...action.payload.data
        ],
        page: action.payload.page,
        term: action. payload.term,
        table: action.payload.table
      }
      break
    case 'clean_search_results':
      state = {
        ...state,
        fetching: false,
        fetched: false,
        data: [],
        page: 1,
        term: '',
        table: 'video',
        error: null
      }
      break
  }
  return state
}

export default searchReducer
