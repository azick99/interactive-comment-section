export const findCommentAndReplyById = (comments, id) =>
  comments.find((comment) => comment.id === id).id

export const findCommentById = (comments, id) =>
  comments.find((comment) => comment.id === id)

export const findReplies = (comments) =>
  comments.map((comment) => comment.replies)

export const findComment = (comments) => comments.map((comment) => comment)

export const handleKeyDown = (event, added) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    added()
  }
}
