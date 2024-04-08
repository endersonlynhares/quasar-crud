import { api } from 'src/boot/axios'
type Post = {
    id: string,
    title: string,
    author: string,
    content: string
}
export default function useApi (url: string) {
  const getAllPosts = async () => {
    try {
      const { data } = await api.get(url)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const createPost = async (post: Post) => {
    try {
      const { data } = await api.post(url, post)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const updatePost = async (post: Post) => {
    try {
      const { data } = await api.put(`${url}/${post.id}`, post)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  const deletePost = async (id: string) => {
    try {
      const { data } = await api.delete(`${url}/${id}`)
      return data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    getAllPosts,
    createPost,
    updatePost,
    deletePost
  }
}
