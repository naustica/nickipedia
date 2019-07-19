import * as React from 'react'

const Results = ({ results }) => {
  return (
    <div className="container">
    {results.map((result) => (
      <div className="card mb-2" id="result-card">
        <a href={ "/watch/" + result.id } id="result-link">
        <div className="row no-gutters">
          <div className="col-md-3">
            <img src="../static/images/test.jpg" className="card-img-top" id="card-img-result" alt="..."/>
          </div>
          <div className="col-md-4">
            <div className="card-body">
              <h5 className="card-title">{ result.properties.title }</h5>
              <p className="card-text">{ result.properties.text }</p>
            </div>
          </div>
        </div>
        </a>
      </div>
    ))}
    </div>
  )
}

export default Results
