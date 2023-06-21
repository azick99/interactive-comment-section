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
        className="bg-black text-white "
      >
        {isSoundOn ? 'on' : 'off'}
      </button>
      <CommentsList isSoundOn={isSoundOn} />
      <AddNewCommentForm isSoundOn={isSoundOn} />
    </main>
  )
}

export default App
