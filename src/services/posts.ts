import useApi from 'src/composables/UseApi'

export default function postsService () {
  const { getAllPosts, createPost, deletePost, updatePost } = useApi('posts')

  return { getAllPosts, createPost, deletePost, updatePost }
}
