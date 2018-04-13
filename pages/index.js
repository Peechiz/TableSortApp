import Header from '../components/Header'
import { Component } from 'react'
import fetch from 'isomorphic-unfetch'

class Index extends Component {

  constructor(props){
    super(props)
    this.compareBy.bind(this);
    this.sortBy.bind(this);
    this.state = {
      json: props.json
    }
  }

  compareBy(key) {
    return (a,b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    }
  }

  sortBy(key) {
    let json = [...this.state.json]
    json.sort(this.compareBy(key))
    this.setState({json})
  }


  render() {

    let json = this.state.json
    return (
      <div>
        <Header />
        <table>
          <thead>
            <tr>
              <th onClick={() => this.sortBy('userId')}>User</th>
              <th onClick={() => this.sortBy('id')}>ID</th>
              <th onClick={() => this.sortBy('title')}>Title</th>
              <th onClick={() => this.sortBy('body')}>Body</th>
            </tr>
          </thead>
          <tbody>
            {json.map(post => (
              <tr key={post.id}>
                <td>{post.userId}</td>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.body}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}



Index.getInitialProps = async function () {
  const res = await fetch('http://jsonplaceholder.typicode.com/posts')
  const data = await res.json()

  return {
    json: data
  }
}

export default Index