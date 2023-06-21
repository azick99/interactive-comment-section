import { useState } from 'react'
import AddNewCommentForm from './features/comments/AddNewCommentForm'
import CommentsList from './features/comments/CommentsList'

function App() {
  const [isSoundOn, setIsSoundOn] = useState(true)
  return (
    <main>
      <button
        type="button"
        onClick={() => setIsSoundOn(!isSoundOn)}
        className=" bg-moderate-blue active:bg-moderate-blue/60 text-white uppercase rounded-md absolute sm:m-2 ml-[20rem] z-10  p-2 "
      >
        {isSoundOn ? 'sound off' : 'sound on'}
      </button>
      <CommentsList isSoundOn={isSoundOn} />
      <AddNewCommentForm isSoundOn={isSoundOn} />
    </main>
  )
}

export default App
