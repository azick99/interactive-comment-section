import {
  juliusomoPng,
  juliusomoWebp,
  ramsesmironPng,
  ramsesmironWebp,
} from '../../assets/images/avatars'
import CurrentUser from '../../components/CurrentUser'
import EditCommentForm from './EditCommentForm'
import NewReplyForm from './NewReplyForm'

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
      <div className="bg-white flex py-6 px-5 gap-5">
        <div className="bg-light-grayish flex sm:flex-col flex-row justify-center items-center my-5 py-2 px-3">
          <span onClick={() => onPlusClick(id)}>+</span>
          <span>{score}</span>
          <span onClick={() => onMinusClick(id)}>-</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center">
            <img src={userImage} alt={user.username} className="w-[35px]" />
            <span>{user.username}</span>
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
              isUpdating={isUpdating}
              setIsUpdating={setIsUpdating}
              commentContent={content}
            />
          ) : (
            <div>
              <span className="text-moderate-blue">@{replyingTo}</span>
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
          id={commentId}
          replyingTo={user.username}
        />
      )}
    </>
  )
}

export default Replies
