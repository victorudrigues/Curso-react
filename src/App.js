import { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    posts: []
  }
  componentDidMount() {
    this.loadPost();
  }

// função carregar o post
  loadPost = async () => {
    //  Pegar o fetch
    const postResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosResponse = fetch('https://jsonplaceholder.typicode.com/photos')

    // tratar a Promise
    const [ posts, photos ] = await Promise.all([ postResponse, photosResponse ]);
    // pegar o valor em json
    const postJson = await posts.json();
    const photosJson = await photos.json();
   
    // Resolver o problema de ter mais photos que posts
    const photosAndPosts = postJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url}
    })
     // setar a variavel com esse novo valor
    this.setState({ posts: photosAndPosts})

}

  render() {
    const { posts } = this.state

    return (
      <section className='container'>
        <div className='posts'>
          {posts.map(post => (
            <div className="post">
              <img src={post.cover} alt={post.title}/>
              <div className='post-content' key={post.id}>
                <p> {post.title}</p>
                <h1>{post.id}</h1>
              </div>
            </div>
          ))}
        </div>
      </section>

    )
  }

};

// class App extends Component {
//   state = {
//     posts: [
//         {
//           id: 1,
//           body: 'corpo 1',
//           title: 'titulo 1'
//         },
//         {
//           id: 2,
//           body: 'corpo 2',
//           title: 'titulo 2'
//         },
//         {
//           id: 3,
//           body: 'corpo 3',
//           title: 'titulo 3'
//         }
//       ]
//     }

//   render() {
//     const { posts } = this.state
//     return (
//       <div className="App">
//         {posts.map( post => (
//           <div key={post.id}>
//            <h1>{post.title}</h1>
//            <p>{post.body}</p>
//           </div>
//          ))}
//     </div>
//     )
//   }
// }

// function App() {
//   return (
// <div className="App">
//   <header className="App-header">
//     <img src={logo} className="App-logo" alt="logo" />
//     <p>
//       Olá mundo!
//     </p>
//     <a
//       className="App-link"
//       href="https://reactjs.org"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       Learn React
//     </a>
//   </header>
// </div>
//   );
// }

export default App;
