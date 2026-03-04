/**
 * localStorage 工具函数
 */

const PREFIX = 'xcr_'

export function getItem(key, defaultValue = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key)
    if (raw === null) return defaultValue
    return JSON.parse(raw)
  } catch {
    return defaultValue
  }
}

export function setItem(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    // quota exceeded, silently fail
  }
}

export function removeItem(key) {
  localStorage.removeItem(PREFIX + key)
}
