import { ReactComponent as DeleteIcon } from '../assets/images/icon-delete.svg';
import { ReactComponent as ReplyIcon } from '../assets/images/icon-reply.svg';
import { ReactComponent as EditIcon } from '../assets/images/icon-edit.svg';
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
      <>
        <span className="bg-moderate-blue text-white px-1">You</span>
        {dateRendered}
        <div className="flex items-center ">
          <span
            className="icon-span-red active:text-soft-red/60 text-soft-red flex items-center "
            onClick={setIsModalOpen}
          >{/*icon-span-red/blue in index.css file to better readability*/}
            <DeleteIcon />
            delete
          </span>
          <span
            className="icon-span-blue active:text-moderate-blue/60 text-moderate-blue flex items-center"
            onClick={onEditClick}
          >
            <EditIcon />
            Edit
          </span>
        </div>
      </>
    )
  }

  return (
    <>
      {dateRendered}
      <div className="icon-span-blue active:text-moderate-blue/60 text-moderate-blue flex items-center" onClick={onReplyClick}>
        <ReplyIcon />
        <span>Reply</span>
      </div>
    </>
  )
}

export default CurrentUser
