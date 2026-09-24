/*!
 * sidebar-collapse.js —— 侧边栏按「有没有子项」决定是否可折叠
 *
 * 背景：docsify-themeable 会给侧边栏**每一个**链接画一个箭头
 * （--sidebar-nav-pagelink-background），但主题本身不带折叠逻辑：
 * 箭头只是装饰，点上去只会跳转。于是「LinkTokenView」「Harness」这类
 * 叶子页面看起来像可以展开，而「操作指南」这类真正有子项的分组反而没有开关。
 *
 * 本脚本按下面的规则重建这套交互：
 *   · 有子项的条目 → 左侧留出的 20px 槽位里放一个可点击的箭头，点击折叠/展开；
 *   · 没有子项的叶子页面 → 不显示任何箭头。
 * 叶子条目仍然保留 20px 左内边距，保证同级文字左对齐。
 *
 * docsify 每次路由变化都会重绘侧边栏，所以用 MutationObserver 重新施加，
 * 并把用户折叠过的分组记在内存里，重绘后保持原状。
 */
(function () {
  'use strict'

  var STYLE_ID = 'lvSidebarCollapseStyle'
  var PARENT = 'lvNavParent'
  var COLLAPSED = 'lvNavCollapsed'
  var TOGGLE = 'lvNavToggle'
  var GROUP_LABEL = 'lvNavGroupLabel'

  /** 被用户折叠过的分组，按标签文字记录，重绘后恢复 */
  var collapsedKeys = Object.create(null)

  var CSS = [
    /* 关掉主题给每个链接画的装饰箭头；保留它的 20px 左内边距用于对齐。 */
    '.sidebar-nav li > a[href^="#/"]:not([href*="?id="]),',
    '.sidebar-nav li > a[href^="/"]:not([href*="?id="]) {',
    '  background: none !important;',
    '}',
    /* 折叠态 */
    '.sidebar-nav li.' + COLLAPSED + ' > ul { display: none !important; }',
    /* 纯文本分组：包一层以便对齐和点击 */
    '.sidebar-nav .' + GROUP_LABEL + ' {',
    '  display: inline-block;',
    '  padding: 0.25em 0 0.25em 20px;',
    '  cursor: pointer;',
    '}',
    /* 折叠开关 */
    '.sidebar-nav li.' + PARENT + ' { position: relative; }',
    '.sidebar-nav .' + TOGGLE + ' {',
    '  position: absolute;',
    '  left: 0;',
    '  top: 0;',
    '  width: 20px;',
    '  display: flex;',
    '  align-items: center;',
    '  justify-content: center;',
    '  padding: 0;',
    '  margin: 0;',
    '  border: 0;',
    '  background: none;',
    '  color: #94a3b8;',
    '  cursor: pointer;',
    '  z-index: 1;',
    '}',
    '.sidebar-nav .' + TOGGLE + '::before {',
    '  content: "";',
    '  width: 6px;',
    '  height: 6px;',
    '  border-right: 1.5px solid currentColor;',
    '  border-bottom: 1.5px solid currentColor;',
    '  transform: rotate(45deg) translate(-1px, -1px);',
    '  transition: transform 0.15s ease;',
    '}',
    '.sidebar-nav li.' + COLLAPSED + ' > .' + TOGGLE + '::before {',
    '  transform: rotate(-45deg);',
    '}',
    '.sidebar-nav .' + TOGGLE + ':hover { color: #0d9488; }'
  ].join('\n')

  function injectStyle() {
    if (document.getElementById(STYLE_ID) !== null) return
    var style = document.createElement('style')
    style.id = STYLE_ID
    style.textContent = CSS
    document.head.appendChild(style)
  }

  /** 取条目的可点击标签元素；纯文本分组会被包成 div */
  function labelElement(li) {
    var link = li.querySelector(':scope > a')
    if (link !== null) return link
    var group = li.querySelector(':scope > .' + GROUP_LABEL)
    if (group !== null) return group
    // 纯文本分组：把文本节点包进 div，便于对齐与点击。
    // ⚠️ 必须用 div 而不是 span：主题里 `.sidebar-nav ul > li > span + ul { margin-left: 0 }`
    //    会把分组下面那层 ul 的缩进清零，`.sidebar-nav ul > li > span` 还会把标签
    //    当成 section 标题（大写、加粗、带下边框）。换成 div 就都绕开了。
    for (var i = 0; i < li.childNodes.length; i++) {
      var node = li.childNodes[i]
      if (node.nodeType === 3 && node.textContent.trim() !== '') {
        group = document.createElement('div')
        group.className = GROUP_LABEL
        group.textContent = node.textContent.trim()
        li.replaceChild(group, node)
        return group
      }
    }
    return null
  }

  function setCollapsed(li, label, collapsed) {
    li.classList.toggle(COLLAPSED, collapsed)
    var key = label.textContent.trim()
    if (collapsed) collapsedKeys[key] = true
    else delete collapsedKeys[key]
  }

  function enhance() {
    var nav = document.querySelector('.sidebar-nav')
    if (nav === null) return
    injectStyle()

    var items = nav.querySelectorAll('li')
    for (var i = 0; i < items.length; i++) {
      var li = items[i]
      // 只处理「直接子级里有 ul」的条目，也就是真正有下级的那些
      if (li.querySelector(':scope > ul') === null) continue
      var label = labelElement(li)
      if (label === null) continue

      li.classList.add(PARENT)

      var toggle = li.querySelector(':scope > .' + TOGGLE)
      if (toggle === null) {
        toggle = document.createElement('button')
        toggle.type = 'button'
        toggle.className = TOGGLE
        toggle.setAttribute('aria-label', '展开或折叠')
        li.insertBefore(toggle, li.firstChild)
        // 链接条目：箭头自己处理点击，不要触发跳转
        toggle.addEventListener('click', function (event) {
          event.preventDefault()
          event.stopPropagation()
          var owner = event.currentTarget.parentElement
          setCollapsed(owner, owner.querySelector(':scope > a') || owner.querySelector(':scope > .' + GROUP_LABEL), !owner.classList.contains(COLLAPSED))
        })
      }

      // 纯文本分组没有别的点击目标，整行文字都可以点
      if (label.tagName !== 'A' && label.dataset.lvWired !== '1') {
        label.dataset.lvWired = '1'
        label.addEventListener('click', function (event) {
          event.preventDefault()
          var owner = event.currentTarget.parentElement
          setCollapsed(owner, event.currentTarget, !owner.classList.contains(COLLAPSED))
        })
      }

      // 箭头高度对齐标签行高（折叠时 li 变矮，展开时不能跟着变高）
      var labelHeight = label.offsetHeight
      toggle.style.height = labelHeight > 0 ? labelHeight + 'px' : '2.4em'

      if (collapsedKeys[label.textContent.trim()] === true) li.classList.add(COLLAPSED)
    }
  }

  var scheduled = false
  function schedule() {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(function () {
      scheduled = false
      enhance()
    })
  }

  function start() {
    enhance()
    var nav = document.querySelector('.sidebar-nav')
    if (nav !== null) {
      // docsify 每次路由变化都会重绘侧边栏，重绘后重新施加
      new MutationObserver(schedule).observe(nav, { childList: true, subtree: true })
      return
    }
    // 侧边栏由 docsify 异步渲染，等它出现后再接管
    var bodyObserver = new MutationObserver(function () {
      if (document.querySelector('.sidebar-nav') === null) return
      bodyObserver.disconnect()
      start()
    })
    bodyObserver.observe(document.body, { childList: true, subtree: true })
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start)
  else start()
})()
