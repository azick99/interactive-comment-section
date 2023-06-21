import {
  juliusomoPng,
  juliusomoWebp,
  ramsesmironPng,
  ramsesmironWebp,
} from '../../assets/images/avatars'

import CurrentUser from '../../components/CurrentUser'
import EditCommentForm from './EditCommentForm'
import NewReplyForm from './NewReplyForm'

import { ReactComponent as Plus } from '../../assets/images/icon-plus.svg'
import { ReactComponent as Minus } from '../../assets/images/icon-minus.svg'

const Replies = ({
  reply,
  setIsUpdating,
  isUpdating,
  isReplying,
  setIsReplying,
  commentId,
  onPlusClick,
  onMinusClick,
  isSoundOn,
  setIsModalOpen,
}) => {
  const { id, content, createdAt, score, replyingTo, user } = reply

  const onEditClick = (id) => {
    setIsUpdating(id)
  }

  const onReplyClick = (id) => {
    setIsReplying(id)
  }

  let userImage

  const userName = user.username

  if (userName === 'juliusomo') {
    userImage = user.image.png ? juliusomoPng : juliusomoWebp
  } else if (userName === 'ramsesmiron') {
    userImage = user.image.png ? ramsesmironPng : ramsesmironWebp
  }

  return (
    <>
      <div className="bg-white flex sm:flex-row  flex-col-reverse py-6 px-5 gap-5 rounded-md relative ">
        <div className="bg-light-gray rounded-lg flex sm:flex-col justify-between flex-row items-center sm:h-[95px] sm:w-auto w-[8rem] h-auto py-3 px-3">
          <button
            onClick={() => onPlusClick(id)}
            className="plus "
            type="button"
          >
            <Plus />
          </button>
          <span className="text-moderate-blue/90 font-bold">{score}</span>
          <button
            onClick={() => onMinusClick(id)}
            className="minus  h-3"
            type="button"
          >
            <Minus />
          </button>
        </div>
        <div className="flex flex-col w-full gap-y-3">
          <div className="flex items-center gap-x-4 ">
            <img src={userImage} alt={user.username} className="w-[35px]" />
            <span className="font-bold text-dark-blue">{user.username}</span>
            <CurrentUser
              createdAt={createdAt}
              newAdded={reply.new}
              onEditClick={() => onEditClick(id)}
              onReplyClick={() => onReplyClick(id)}
              username={user.username}
              setIsModalOpen={() => setIsModalOpen(id)}
            />
          </div>
          {isUpdating === id ? (
            <EditCommentForm
              commentId={id}
              replyingTo={replyingTo}
              setIsUpdating={setIsUpdating}
              commentContent={content}
            />
          ) : (
            <div>
              <span className="text-moderate-blue font-bold">
                @{replyingTo}
              </span>
              {!reply.new && ' '}
              {content}
            </div>
          )}
        </div>
      </div>
      {isReplying === id && (
        <NewReplyForm
          isReplying={isReplying}
          isSoundOn={isSoundOn}
          setIsReplying={setIsReplying}
          replyId={id}
          id={commentId}
          replyingTo={user.username}
        />
      )}
    </>
  )
}

export default Replies
