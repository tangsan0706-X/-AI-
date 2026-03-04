import { defineStore } from 'pinia'
import { ref } from 'vue'
import { videos, workflows, templates, users } from '../data/mock'

export const useSearchStore = defineStore('search', () => {
  const keyword = ref('')
  const activeTab = ref('all')
  const results = ref({ videos: [], workflows: [], templates: [], users: [] })

  function search(q) {
    keyword.value = q
    if (!q.trim()) {
      results.value = { videos: [], workflows: [], templates: [], users: [] }
      return
    }
    const lower = q.toLowerCase()
    results.value = {
      videos: videos.filter(v =>
        v.title.toLowerCase().includes(lower) ||
        v.tags.some(t => t.toLowerCase().includes(lower)) ||
        v.category.toLowerCase().includes(lower) ||
        v.description.toLowerCase().includes(lower)
      ),
      workflows: workflows.filter(w =>
        w.name.toLowerCase().includes(lower) ||
        w.description.toLowerCase().includes(lower) ||
        w.tags.some(t => t.toLowerCase().includes(lower))
      ),
      templates: templates.filter(t =>
        t.name.toLowerCase().includes(lower) ||
        t.category.toLowerCase().includes(lower) ||
        t.description.toLowerCase().includes(lower)
      ),
      users: users.filter(u =>
        u.name.toLowerCase().includes(lower) ||
        u.bio.toLowerCase().includes(lower)
      )
    }
  }

  const totalCount = () => {
    const r = results.value
    return r.videos.length + r.workflows.length + r.templates.length + r.users.length
  }

  return { keyword, activeTab, results, search, totalCount }
})
