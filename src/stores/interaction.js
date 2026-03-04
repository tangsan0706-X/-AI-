import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getItem, setItem } from '../utils/localStorage'

export const useInteractionStore = defineStore('interaction', () => {
  // { videoId: true }
  const likes = ref(getItem('likes', {}))
  const collections = ref(getItem('collections', {}))
  const forks = ref(getItem('forks', {}))
  // { userId: true }
  const follows = ref(getItem('follows', {}))

  function toggleLike(videoId) {
    if (likes.value[videoId]) {
      delete likes.value[videoId]
    } else {
      likes.value[videoId] = true
    }
    likes.value = { ...likes.value }
    setItem('likes', likes.value)
  }

  function toggleCollection(videoId) {
    if (collections.value[videoId]) {
      delete collections.value[videoId]
    } else {
      collections.value[videoId] = true
    }
    collections.value = { ...collections.value }
    setItem('collections', collections.value)
  }

  function toggleFork(videoId) {
    if (forks.value[videoId]) {
      delete forks.value[videoId]
    } else {
      forks.value[videoId] = true
    }
    forks.value = { ...forks.value }
    setItem('forks', forks.value)
  }

  function toggleFollow(userId) {
    if (follows.value[userId]) {
      delete follows.value[userId]
    } else {
      follows.value[userId] = true
    }
    follows.value = { ...follows.value }
    setItem('follows', follows.value)
  }

  function isLiked(videoId) { return !!likes.value[videoId] }
  function isCollected(videoId) { return !!collections.value[videoId] }
  function isForked(videoId) { return !!forks.value[videoId] }
  function isFollowing(userId) { return !!follows.value[userId] }

  function getLikedIds() { return Object.keys(likes.value).map(Number) }
  function getCollectedIds() { return Object.keys(collections.value).map(Number) }
  function getForkedIds() { return Object.keys(forks.value).map(Number) }

  return {
    likes, collections, forks, follows,
    toggleLike, toggleCollection, toggleFork, toggleFollow,
    isLiked, isCollected, isForked, isFollowing,
    getLikedIds, getCollectedIds, getForkedIds
  }
})
