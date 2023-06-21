import { useState } from 'react'
import { juliusomoPng, juliusomoWebp } from '../../assets/images/avatars'
import { useDispatch } from 'react-redux'
import { commentAdded } from './commetsSlice'
import { handleKeyDown } from '../../utils/heplerFunctions'

const AddNewCommentForm = ({ isSoundOn }) => {
  const [content, setContent] = useState('')
  const onTextChanged = (e) => setContent(e.target.value)

  const sound = new Audio('../../../public/sounds/livechat.mp3')

  const dispatch = useDispatch()

  const onCommentAdd = () => {
    if (content) {
      dispatch(commentAdded(content))
      if (isSoundOn) {
        sound.play()
      }
    }
    setContent('')
  }

  //helper function file
  const onEnterClick = (e) => handleKeyDown(e, onCommentAdd)

  return (
    <section id="add" className="sm:pr-0 pr-4">
      <div className="flex sm:flex-row flex-col-reverse relative justify-between sm:w-[60vw] w-full sm:mx-auto m-5 bg-white p-6 rounded-md gap-3">
        <img
          src={juliusomoPng || juliusomoWebp}
          alt="currentUser"
          className="self-start sm:w-[50px] w-[40px]"
        />
        <textarea
          placeholder="Add comment..."
          rows="4"
          value={content}
          onChange={onTextChanged}
          onKeyDown={onEnterClick}
          className="border w-full resize-none rounded-md p-3 pl-2 "
        ></textarea>
        <button
          type="button"
          onClick={onCommentAdd}
          className="uppercase sm:static absolute right-10 sm:py-2 px-6 py-3 bg-moderate-blue active:bg-moderate-blue/60 text-white rounded-md self-start "
        >
          send
        </button>
      </div>
    </section>
  )
}

export default AddNewCommentForm
