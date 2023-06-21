import { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentUpdated } from './commetsSlice'
import useInputFocus from '../../utils/useInputFocus'

const EditCommentForm = ({
  commentId,
  setIsUpdating,
  isUpdating,
  commentContent,
  replyingTo,
}) => {
  const [content, setContent] = useState(
    replyingTo ? `@${replyingTo} ${commentContent}` : commentContent
  )
  const inputRef = useRef(null)

  useInputFocus(isUpdating, inputRef)

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
        className="border"
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
