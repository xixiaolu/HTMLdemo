/**
 * 自动检测 index.html 中 script[src] 是否变化，发现变化弹窗提示刷新
 * 更可靠实现：使用 DOMParser 解析、fetch cache: 'no-store'、可见性处理、日志
 * import '../auto-update';  main.ts 中引入即可
 * 注意：如果 index.html 中 script 是内联的，或者 src 里有版本号（如 ?v=xxx），则此方法不适用
 * 这种情况下需要后端提供一个专门的接口来返回版本号，前端定时轮询这个接口来判断是否更新
 */
let lastSrcs: string[] | null = null
const POLL_MS = 3000
let timer: number | null = null

async function fetchIndexScripts(): Promise<string[]> {
  try {
    const res = await fetch('/?_timestamp=' + Date.now(), { cache: 'no-store' })
    const text = await res.text()
    // 用 DOMParser 解析 HTML，更稳健
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'text/html')
    const scripts = Array.from(doc.querySelectorAll('script[src]'))
      .map(s => s.getAttribute('src') || '')
      .filter(Boolean)
    console.log('[auto-update] fetched scripts:', scripts)
    return scripts
  } catch (err) {
    console.error('[auto-update] fetchIndexScripts error', err)
    return []
  }
}

async function checkUpdate(): Promise<boolean> {
  const newScripts = await fetchIndexScripts()
  if (!lastSrcs) {
    lastSrcs = newScripts
    return false
  }
  if (lastSrcs.length !== newScripts.length) {
    lastSrcs = newScripts
    return true
  }
  for (let i = 0; i < lastSrcs.length; i++) {
    if (lastSrcs[i] !== newScripts[i]) {
      lastSrcs = newScripts
      return true
    }
  }
  return false
}

async function pollOnce() {
  try {
    const changed = await checkUpdate()
    if (changed) {
      // 使用非阻塞提示，避免被浏览器拦截；也可以保留 confirm
      const ok = confirm('检测到新版本，是否刷新页面？')
      if (ok) {
        window.location.reload()
        return
      }
    }
  } catch (err) {
    console.error('[auto-update] pollOnce error', err)
  } finally {
    scheduleNext()
  }
}

function scheduleNext() {
  if (timer) {
    window.clearTimeout(timer)
  }
  // 如果页面不可见，延长间隔，防止被节流
  const interval = document.hidden ? Math.max(POLL_MS, 15000) : POLL_MS
  timer = window.setTimeout(pollOnce, interval)
}

function startAutoRefresh() {
  console.log('[auto-update] start')
  // 首次立即检查一次（不会触发第一次更新弹窗，因为 lastSrcs 初始设为 null）
  pollOnce()
  document.addEventListener('visibilitychange', () => {
    console.log('[auto-update] visibilitychange, hidden=', document.hidden)
    scheduleNext()
  })
  // 清理 unload 时的定时器
  window.addEventListener('beforeunload', () => {
    if (timer) window.clearTimeout(timer)
  })
}

// 启动
startAutoRefresh()