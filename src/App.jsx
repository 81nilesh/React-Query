import './App.css'
import PostList from './components/PostList'

function App() {

  // const { data, isLoading, isError, error, status } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: fetchPosts,
  // })
  // console.log(data, isLoading, status);
  return (
    <>
      <h2 className='title'>My Posts</h2>
      <PostList />
    </>
  )
}

export default App
