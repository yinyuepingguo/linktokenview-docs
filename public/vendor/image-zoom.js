/*!
 * image-zoom.js —— Docsify 正文图片点击放大（轻量灯箱，无外部依赖）
 *
 * 为什么自建：本仓库要求运行时资源全部放在本地 vendor/，不依赖外部 CDN；
 * 而 docsify 本身不提供图片放大能力，全屏截图在正文宽度下常常看不清细节。
 *
 * 行为：
 *   · 点击正文（.markdown-section）内的图片 → 全屏查看；
 *   · 点击遮罩、按 Esc → 关闭；
 *   · 打开期间锁定 body 滚动，关闭后恢复。
 *
 * 事件委托挂在 document 上，因此 docsify 切换路由后重新渲染的图片同样生效。
 */
(function () {
  'use strict'

  var OVERLAY_ID = 'dshImageZoomOverlay'
  var STYLE_ID = 'dshImageZoomStyle'

  var CSS = [
    '.markdown-section img { cursor: zoom-in; }',
    '#' + OVERLAY_ID + ' {',
    '  position: fixed;',
    '  top: 0; right: 0; bottom: 0; left: 0;',
    '  z-index: 9999;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  padding: 2vh 2vw;',
    '  background: rgba(15, 23, 42, 0.92);',
    '  cursor: zoom-out;',
    '}',
    '#' + OVERLAY_ID + ' img {',
    '  max-width: 96vw !important;',
    '  max-height: 96vh !important;',
    '  width: auto;',
    '  height: auto;',
    '  margin: 0;',
    '  border-radius: 8px;',
    '  background: #fff;',
    '  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);',
    '}',
    '#' + OVERLAY_ID + ' .dshImageZoomHint {',
    '  position: absolute;',
    '  left: 0; right: 0; bottom: 16px;',
    '  text-align: center;',
    '  color: rgba(255, 255, 255, 0.72);',
    '  font-size: 13px;',
    '  pointer-events: none;',
    '}'
  ].join('\n')

  function injectStyle() {
    if (document.getElementById(STYLE_ID) !== null) return
    var style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = CSS
    document.head.appendChild(style)
  }

  function close() {
    var overlay = document.getElementById(OVERLAY_ID)
    if (overlay !== null && overlay.parentNode !== null) {
      overlay.parentNode.removeChild(overlay)
    }
    document.body.style.overflow = ''
    document.removeEventListener('keydown', onKeydown)
  }

  function onKeydown(event) {
    if (event.key === 'Escape' || event.keyCode === 27) close()
  }

  function open(src, alt) {
    close()

    var overlay = document.createElement('div')
    overlay.id = OVERLAY_ID
    overlay.setAttribute('role', 'dialog')
    overlay.setAttribute('aria-modal', 'true')
    overlay.setAttribute('aria-label', alt || '图片预览')

    var img = document.createElement('img')
    img.src = src
    img.alt = alt || ''
    overlay.appendChild(img)

    var hint = document.createElement('div')
    hint.className = 'dshImageZoomHint'
    hint.textContent = '点击任意位置或按 Esc 关闭'
    overlay.appendChild(hint)

    overlay.addEventListener('click', close)
    document.body.appendChild(overlay)
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeydown)
  }

  document.addEventListener('click', function (event) {
    var target = event.target
    if (target === null || target.tagName !== 'IMG') return
    if (typeof target.closest !== 'function') return
    // 只接管正文图片；遮罩自身的图片交给遮罩的关闭逻辑
    if (target.closest('#' + OVERLAY_ID) !== null) return
    if (target.closest('.markdown-section') === null) return
    event.preventDefault()
    open(target.getAttribute('data-src') || target.currentSrc || target.src, target.alt)
  })

  // 样式在脚本加载时就注入，保证「可点击」的鼠标指针在第一次点击前就生效。
  injectStyle()
})()
