import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path:'/',
    name: 'todo',
    component:() => import('../views/Todo.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
