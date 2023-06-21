import { useDispatch, useSelector } from 'react-redux'
import { Fragment, useState } from 'react'

import {
  amyrobsonPng,
  amyrobsonWebp,
  juliusomoPng,
  juliusomoWebp,
  maxblagunPng,
  maxblagunWebp,
} from '../../assets/images/avatars'

import Replies from './Replies'
import EditCommentForm from './EditCommentForm'
import CurrentUser from '../../components/CurrentUser'
import NewReplyForm from './NewReplyForm'
import { scoreDecreased, scoreIncreased } from './commetsSlice'
import { findCommentAndReplyById } from '../../utils/heplerFunctions'
import DeleteModal from '../../components/DeleteModal'

import { ReactComponent as Plus } from '../../assets/images/icon-plus.svg'
import { ReactComponent as Minus } from '../../assets/images/icon-minus.svg'

const CommentsList = ({ isSoundOn }) => {
  const comments = useSelector((state) => state.comments)

  const [isUpdating, setIsUpdating] = useState('')
  const [isReplying, setIsReplying] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(null)

  const dispatch = useDispatch()

  const onEditClick = (id) => {
    //helper function file
    const isCommentClicked = findCommentAndReplyById(comments, id)
    setIsUpdating(isCommentClicked)
  }

  const onReplyClick = (id) => {
    const isReplyClicked = findCommentAndReplyById(comments, id)
    setIsReplying(isReplyClicked)
  }

  const onPlusClick = (id) => {
    dispatch(scoreIncreased({ commentId: id }))
  }
  const onMinusClick = (id) => {
    dispatch(scoreDecreased({ commentId: id }))
  }

  return (
    <section
      id="comment"
      className="flex flex-col gap-5 sm:w-[60vw] w-full sm:mx-auto m-5 sm:pr-0 pr-4"
    >
      {comments.map((comment) => {
        const { id, content, createdAt, user, score, replies } = comment

        let userImage
        if (user.username === 'juliusomo') {
          userImage = user.image.png ? juliusomoPng : juliusomoWebp
        } else if (user.username === 'amyrobson') {
          userImage = user.image.png ? amyrobsonPng : amyrobsonWebp
        } else if (user.username === 'maxblagun') {
          userImage = user.image.png ? maxblagunPng : maxblagunWebp
        }

        return (
          <Fragment key={id}>
            {isModalOpen !== null && (
              <DeleteModal
                isSoundOn={isSoundOn}
                id={isModalOpen}
                setIsModalOpen={setIsModalOpen}
              />
            )}

            <div className="bg-white flex sm:flex-row  flex-col-reverse py-6 px-5 gap-5 rounded-md relative">
              <div className="bg-light-gray rounded-lg flex sm:flex-col justify-between flex-row items-center sm:h-[95px] sm:w-auto w-[8rem] h-auto py-3 px-3 ">
                <button
                  onClick={() => onPlusClick(id)}
                  className="plus"
                  type="button"
                >
                  <Plus />
                </button>
                <span className="text-moderate-blue/90 font-bold">{score}</span>
                <button
                  onClick={() => onMinusClick(id)}
                  className="minus h-3"
                  type="button"
                >
                  <Minus />
                </button>
              </div>

              <div className="flex flex-col w-full gap-y-3">
                <div className="flex items-center gap-x-3">
                  <img
                    src={userImage}
                    alt={user.username}
                    className="w-[35px]"
                  />
                  <span className="font-bold text-dark-blue">
                    {user.username}
                  </span>
                  <CurrentUser
                    isSoundOn={isSoundOn}
                    createdAt={createdAt}
                    newAdded={comment.new}
                    id={id}
                    setIsModalOpen={() => setIsModalOpen(id)}
                    onEditClick={() => onEditClick(id)}
                    username={user.username}
                    onReplyClick={() => onReplyClick(id)}
                  />
                </div>
                {isUpdating === id ? (
                  <EditCommentForm
                    commentId={id}
                    setIsUpdating={setIsUpdating}
                    commentContent={content}
                  />
                ) : (
                  <div className="w-[95%]">{content}</div>
                )}
              </div>
            </div>

            {isReplying === id && (
              <NewReplyForm
                isReplying={isReplying}
                isSoundOn={isSoundOn}
                setIsReplying={setIsReplying}
                id={id}
                replyingTo={user.username}
              />
            )}

            {!!replies.length && (
              <div className="sm:pl-10 pl-5 sm:ml-10 flex flex-col gap-5 border-l-2 border-l-grayish-blue/10 border-solid">
                {replies.map((reply) => (
                  <Replies
                    reply={reply}
                    key={reply.id}
                    isSoundOn={isSoundOn}
                    setIsUpdating={setIsUpdating}
                    isUpdating={isUpdating}
                    isReplying={isReplying}
                    commentId={id}
                    onPlusClick={onPlusClick}
                    onMinusClick={onMinusClick}
                    setIsReplying={setIsReplying}
                    setIsModalOpen={setIsModalOpen}
                  />
                ))}
              </div>
            )}
          </Fragment>
        )
      })}
    </section>
  )
}

export default CommentsList
