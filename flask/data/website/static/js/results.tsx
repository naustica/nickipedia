import React from 'react';
import Results from './components/results';


class SearchResult extends React.Component {

      state = {
            results: []
      };

      componentDidMount() {
            var search: string = document.getElementById('root').getAttribute('term');
            fetch('http://0.0.0.0:5000/api/search?term=' + 'peter')
            .then(res => res.json())
            .then((data) => {
                  this.setState({ results: data})
            })
            .catch(console.log)
      };

      render () {
            return (
                  <Results results={this.state.results} />
            )
      }
}

export default SearchResult;
