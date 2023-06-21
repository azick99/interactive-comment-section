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
      className="flex flex-col gap-4 sm:w-[60vw] w-full sm:mx-auto m-5 "
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
            <div className="bg-white flex py-6 px-5 gap-5">
              <div className="bg-light-grayish flex sm:flex-col flex-row justify-center items-center my-5 py-2 px-3">
                <Plus onClick={() => onPlusClick(id)} className="plus" />
                <span>{score}</span>
                <Minus onClick={() => onMinusClick(id)} className="minus" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-x-5">
                  <img
                    src={userImage}
                    alt={user.username}
                    className="w-[35px]"
                  />
                  <span>{user.username}</span>
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
                    isUpdating={isUpdating}
                    setIsUpdating={setIsUpdating}
                    commentContent={content}
                  />
                ) : (
                  <div>{content}</div>
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

            {!!replies.length &&
              replies.map((reply) => (
                <div key={reply.id} className="pl-20">
                  <Replies
                    reply={reply}
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
                </div>
              ))}
          </Fragment>
        )
      })}
    </section>
  )
}

export default CommentsList
