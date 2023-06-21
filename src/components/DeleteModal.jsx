import { useDispatch } from 'react-redux'
import { commentRemoved } from '../features/comments/commetsSlice'

const DeleteModal = ({ isSoundOn, id, setIsModalOpen }) => {
  const dispatch = useDispatch()

  const sound = new Audio('../../public/sounds/button.mp3')

  const onRemoveClick = (id) => {
    dispatch(commentRemoved({ commentId: id }))
    if (isSoundOn) {
      sound.play()
    }
    setIsModalOpen(null)
  }

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center bg-black/50 w-full h-full  overflow-y-auto">
      <div className="flex sm:w-[30vw] w-full gap-y-4 p-6 bg-white flex-col rounded-lg sm:mx-0 mx-14">
        <h1 className="font-bold text-dark-blue lg:text-2xl md:text-xl text-lg ">
          Delete comment
        </h1>
        <p className="pr-10 text-grayish-blue font-medium">
          Are you sure you want to delete this comment?This will remove the
          comment and can&rsquo;t be undone.
        </p>
        <div className="flex justify-center sm:gap-4 gap-5 w-full">
          <button
            className="sm:py-2 py-3 sm:px-7 px-5 rounded-lg bg-slate-500 text-white uppercase"
            onClick={() => setIsModalOpen(null)}
          >
            No, cancel
          </button>
          <button
            className="sm:py-2 py-3 sm:px-7 px-5 rounded-lg bg-soft-red text-white uppercase"
            onClick={() => onRemoveClick(id)}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
