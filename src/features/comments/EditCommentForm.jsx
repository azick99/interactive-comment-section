import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentUpdated } from './commetsSlice'

const EditCommentForm = ({
  commentId,
  setIsUpdating,
  commentContent,
  replyingTo,
}) => {
  const [content, setContent] = useState(
    replyingTo ? `@${replyingTo} ${commentContent}` : commentContent
  )
  const inputRef = useRef(null)


  const dispatch = useDispatch()

  const onTextChanged = (e) => setContent(e.target.value)

  const onCommentUpdated = (commentId) => {
    if (content) {
      dispatch(
        commentUpdated({
          id: commentId,
          content: replyingTo ? content.slice(replyingTo.length + 1) : content,
        })
      )
      setIsUpdating(false)
    }
  }

  return (
    <>
      <textarea
        placeholder="Add comment..."
        rows="4"
        cols="50"
        value={content}
        ref={inputRef}
        onChange={onTextChanged}
        className="border w-full resize-none rounded-md p-3 pl-5"
      ></textarea>
      <button
        type="button"
        onClick={() => onCommentUpdated(commentId)}
        className="uppercase py-2 px-6 bg-moderate-blue text-white rounded-md self-start"
      >
        update
      </button>
    </>
  )
}

export default EditCommentForm
