import { useDispatch } from 'react-redux'
import { juliusomoPng, juliusomoWebp } from '../../assets/images/avatars'
import { useRef, useState } from 'react'
import { replyAdded } from './commetsSlice'
import { handleKeyDown } from '../../utils/heplerFunctions'
import useInputFocus from '../../utils/useInputFocus'

const NewReplyForm = ({
  setIsReplying,
  isReplying,
  id,
  replyingTo,
  isSoundOn,
}) => {
  const [content, setContent] = useState(`@${replyingTo} `)
  const inputRef = useRef(null)

  //from costum hook
  useInputFocus(isReplying, inputRef)

  const dispatch = useDispatch()

  const onTextChanged = (e) => setContent(e.target.value)

  const sound = new Audio('../../../public/sounds/livechat.mp3')

  const onReplyAdd = () => {
    if (content) {
      dispatch(replyAdded(content.slice(replyingTo.length + 1), replyingTo, id))
      if (isSoundOn) {
        sound.play()
      }
    }
    setContent('')
    setIsReplying(false)
  }

  const onEnterClick = (e) => handleKeyDown(e, onReplyAdd)

  return (
    <section
      id="add"
      className="flex sm:w-[60vw] w-full sm:mx-auto m-5 bg-white p-6"
    >
      <img
        src={juliusomoPng || juliusomoWebp}
        alt="currentUser"
        className="self-start"
      />
      <textarea
        placeholder="Add comment..."
        rows="4"
        cols="50"
        ref={inputRef}
        value={content}
        onChange={onTextChanged}
        onKeyDown={onEnterClick}
        className="border"
      ></textarea>
      <div className="flex flex-col gap-y-2">
        <button
          type="button"
          onClick={onReplyAdd}
          className="uppercase py-2 px-6 bg-moderate-blue active:bg-moderate-blue/60 text-white rounded-md self-start"
        >
          reply
        </button>
        <button
          type="button"
          onClick={() => setIsReplying(false)}
          className="uppercase py-2 px-6 bg-soft-red active:bg-soft-red/60 text-white rounded-md self-start"
        >
          cencel
        </button>
      </div>
    </section>
  )
}

export default NewReplyForm
