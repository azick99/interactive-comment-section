import { useDispatch } from 'react-redux'
import { juliusomoPng, juliusomoWebp } from '../../assets/images/avatars'
import {  useState } from 'react'
import { replyAdded } from './commetsSlice'
import { handleKeyDown } from '../../utils/heplerFunctions'

const NewReplyForm = ({
  setIsReplying,
  isReplying,
  id,
  replyId,
  replyingTo,
  isSoundOn,
}) => {
  const [content, setContent] = useState(`@${replyingTo} `)

  //from costum hook

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
    <section id="add" className="sm:pr-0 pr-4">
      <div
        className={`${
          isReplying === replyId ? 'sm:w-[54vw]' : 'sm:w-[60vw]'
        } flex sm:flex-row flex-col-reverse relative justify-between  w-full sm:mx-auto m-5 bg-white p-6 rounded-md gap-3`}
      >
        <img
          src={juliusomoPng || juliusomoWebp}
          alt="currentUser"
          className="self-start sm:w-[50px] w-[40px]"
        />
        <textarea
          placeholder="Add comment..."
          rows="4"
          cols="50"
          value={content}
          onChange={onTextChanged}
          onKeyDown={onEnterClick}
          className="border w-full resize-none rounded-md p-3 pl-5"
        ></textarea>
        <div className="flex sm:flex-col flex-row gap-2 sm:static absolute  right-10">
          <button
            type="button"
            onClick={onReplyAdd}
            className="uppercase sm:py-2 px-6 py-3 bg-moderate-blue active:bg-moderate-blue/60 text-white rounded-md self-start"
          >
            reply
          </button>
          <button
            type="button"
            onClick={() => setIsReplying(false)}
            className="uppercase sm:py-2 px-6 py-3 bg-soft-red active:bg-soft-red/60 text-white rounded-md self-start"
          >
            cencel
          </button>
        </div>
      </div>
    </section>
  )
}

export default NewReplyForm
