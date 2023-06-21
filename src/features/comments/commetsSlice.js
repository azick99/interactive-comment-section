import { createSlice } from '@reduxjs/toolkit'
import data from '../../data/data.json'
import { juliusomoPng, juliusomoWebp } from '../../assets/images/avatars'
import { nanoid } from 'nanoid'
import { findCommentById, findReplies } from '../../utils/heplerFunctions'

const { comments } = data

// Check if comments data exists in localStorage
// const storedComments = localStorage.getItem('comments')
// const initialState = storedComments ? JSON.parse(storedComments) : [...comments]

const initialState = [...comments]

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    // state = comments
    replyAdded: {
      reducer(comments, action) {
        const { commentId, reply } = action.payload
        const comment = findCommentById(comments, commentId)

        const existingReply = findReplies(comments)

        if (existingReply) {
          existingReply.push(reply)
        }

        if (comment) {
          comment.replies.push(reply)
        }
      },

      prepare(content, replyingTo, commentId) {
        return {
          payload: {
            commentId,
            reply: {
              id: nanoid(),
              content,
              createdAt: new Date().toISOString(),
              new: true,
              score: 0,
              replyingTo,
              user: {
                image: {
                  png: juliusomoPng,
                  webp: juliusomoWebp,
                },
                username: 'juliusomo',
              },
              replies: [],
            },
          },
        }
      },
    },

    commentAdded: {
      reducer(comments, action) {
        comments.push(action.payload)
      },
      prepare(content) {
        return {
          payload: {
            id: nanoid(),
            content,
            createdAt: new Date().toISOString(),
            new: true,
            score: 0,
            user: {
              image: {
                png: juliusomoPng,
                webp: juliusomoWebp,
              },
              username: 'juliusomo',
            },
            replies: [],
          },
        }
      },
    },

    commentUpdated(comments, action) {
      const { id, content } = action.payload

      comments.forEach((comment) => {
        if (comment.id === id) {
          comment.content = content
        }

        comment.replies.forEach((reply) => {
          if (reply.id === id) {
            reply.content = content
          }
        })
      })
    },

    scoreIncreased(comments, action) {
      const { commentId } = action.payload

      comments.forEach((comment) => {
        if (comment.id === commentId) {
          comment.score++
        }
        comment.replies.forEach((reply) => {
          if (reply.id === commentId) {
            reply.score++
          }
        })
      })
    },

    scoreDecreased(comments, action) {
      const { commentId } = action.payload

      comments.forEach((comment) => {
        if (comment.id === commentId) {
          if (comment.score > 0) {
            comment.score--
          }
        }
        comment.replies.forEach((reply) => {
          if (reply.id === commentId) {
            if (reply.score > 0) {
              reply.score--
            }
          }
        })
      })
    },

    commentRemoved(comments, action) {
      const { commentId } = action.payload

      comments.forEach((comment) => {
        const replyIndex = comment.replies.findIndex(
          (reply) => reply.id === commentId
        )
        const commentIndex = comments.findIndex(
          (comment) => comment.id === commentId
        )

        if (replyIndex !== -1) {
          comment.replies.splice(replyIndex, 1)
        }
        if (commentIndex !== -1) {
          comments.splice(commentIndex, 1)
        }
      })
    },
  },
})

export const {
  commentAdded,
  commentUpdated,
  replyAdded,
  scoreIncreased,
  scoreDecreased,
  commentRemoved,
} = commentsSlice.actions

// export default function persistedCommentsReducer(state, action) {
//   // Call the original comments reducer
//   const newState = commentsSlice.reducer(state, action)

//   // Store the updated comments data in localStorage
//   localStorage.setItem('comments', JSON.stringify(newState))

//   return newState
// }

export default commentsSlice.reducer
