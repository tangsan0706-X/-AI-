import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getItem, setItem } from '../utils/localStorage'

export const usePublishStore = defineStore('publish', () => {
  const drafts = ref(getItem('drafts', []))
  const published = ref(getItem('published', []))

  function saveDraft(draft) {
    const id = draft.id || Date.now()
    const idx = drafts.value.findIndex(d => d.id === id)
    const data = { ...draft, id, updatedAt: new Date().toISOString() }
    if (idx >= 0) {
      drafts.value[idx] = data
    } else {
      drafts.value.unshift(data)
    }
    setItem('drafts', drafts.value)
    return id
  }

  function removeDraft(id) {
    drafts.value = drafts.value.filter(d => d.id !== id)
    setItem('drafts', drafts.value)
  }

  function publishWork(work) {
    const id = Date.now()
    const data = {
      ...work,
      id,
      publishedAt: new Date().toISOString(),
      views: 0,
      likes: 0,
      forks: 0
    }
    published.value.unshift(data)
    setItem('published', published.value)
    // remove draft if exists
    if (work.draftId) {
      removeDraft(work.draftId)
    }
    return id
  }

  function getPublishedById(id) {
    return published.value.find(p => p.id === id)
  }

  return { drafts, published, saveDraft, removeDraft, publishWork, getPublishedById }
})
