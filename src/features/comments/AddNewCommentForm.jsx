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
        value={content}
        onChange={onTextChanged}
        onKeyDown={onEnterClick}
        className="border"
      ></textarea>
      <button
        type="button"
        onClick={onCommentAdd}
        className="uppercase py-2 px-6 bg-moderate-blue active:bg-moderate-blue/60 text-white rounded-md self-start "
      >
        send
      </button>
    </section>
  )
}

export default AddNewCommentForm
