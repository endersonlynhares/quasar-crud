<template>
  <q-page padding>
    <q-table
      title="Treats"
      :rows="posts"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn icon="delete" @click="handleDeletePost(props.row.id)" color="negative" dense size="sm" />
      </q-td>
    </template>
  </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { QTableColumn, useQuasar } from 'quasar'
import postsService from 'src/services/posts'

const posts = ref([])
const columns:QTableColumn[] = [
  { name: 'id', field: 'id', label: 'Id', align: 'left', sortable: true },
  { name: 'title', field: 'title', label: 'Title', align: 'left', sortable: true },
  { name: 'author', field: 'author', label: 'Author', align: 'left', sortable: true },
  { name: 'actions', field: 'actions', label: 'Actions', align: 'center' }
]

const $q = useQuasar()

const { getAllPosts, deletePost } = postsService()

const getPosts = async () => {
  try {
    const data = await getAllPosts()
    posts.value = data
  } catch (error) {
    console.log(error)
  }
}

const handleDeletePost = async (id: string) => {
  try {
    $q.dialog({
      dark: true,
      title: 'Remover',
      message: 'Você deseja realmente deletar esse post?',
      cancel: true,
      persistent: true
    }).onOk(async () => {
      const data = await deletePost(id)
      if (data) {
        $q.notify({ message: 'Post apagado com sucesso!', icon: 'check', color: 'positive' })
        await getPosts()
      }
    })
  } catch (error) {
    $q.notify({ message: 'Erro ao apagar posts', icon: 'times', color: 'negative' })
    console.log(error)
  }
}

onMounted(() => {
  getPosts()
})

defineOptions({
  name: 'IndexPage'
})

</script>
