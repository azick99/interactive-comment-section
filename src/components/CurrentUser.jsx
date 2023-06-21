import { ReactComponent as DeleteIcon } from '../assets/images/icon-delete.svg'
import { ReactComponent as ReplyIcon } from '../assets/images/icon-reply.svg'
import { ReactComponent as EditIcon } from '../assets/images/icon-edit.svg'
import TimeAgo from './TimeAgo'

const CurrentUser = ({
  username,
  createdAt,
  onEditClick,
  newAdded,
  onReplyClick,
  setIsModalOpen,
}) => {
  let dateRendered

  if (newAdded) {
    dateRendered = <TimeAgo timestamp={createdAt} />
  }
  if (!newAdded) {
    dateRendered = <span>{createdAt}</span>
  }
  if (username === 'juliusomo') {
    return (
      <div className='flex w-full justify-between '>
        <div className='flex gap-3 items-center'>
          <span className="bg-moderate-blue text-white  px-2 text-sm rounded-sm">you</span>
          {dateRendered}
        </div>
        <div className="flex gap-5 mr-4 sm:static absolute bottom-10 right-10">
          <button
            type="button"
            className="icon-span-red flex items-center gap-2  active:text-soft-red/60 text-soft-red  transition "
            onClick={setIsModalOpen}
          >
            {/*icon-span-red/blue in index.css file to better readability*/}
            <DeleteIcon />
            <span>Delete</span>
          </button>
          <button
            type="button"
            className="icon-span-blue flex items-center gap-2  active:text-moderate-blue/60 text-moderate-blue  transition font-medium"
            onClick={onEditClick}
          >
            <EditIcon />
            <span>Edit</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className=" flex w-full justify-between">
      {dateRendered}
      <button
        className="icon-span-blue sm:static absolute bottom-10 right-10 flex items-center gap-2 active:text-moderate-blue/60 text-moderate-blue font-medium  transition mr-4"
        onClick={onReplyClick}
        type="button"
      >
        <ReplyIcon />
        <span>Reply</span>
      </button>
    </div>
  )
}

export default CurrentUser
