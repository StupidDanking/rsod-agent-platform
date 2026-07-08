/**
 * Markdown 渲染工具
 *
 * 用途：
 * - 后面 Day11 智能体对话中，AI 回复通常是 Markdown 格式
 * - 这里统一封装 markdown-it，方便页面直接调用
 */

import MarkdownIt from 'markdown-it'

// 创建 markdown-it 实例
const md = new MarkdownIt({
  html: false,       // 禁用 HTML 标签，避免 XSS 风险
  linkify: true,     // 自动把 URL 转成链接
  typographer: true, // 启用排版优化
  breaks: true,      // 换行符 \n 转成 <br>
})

/**
 * 渲染完整 Markdown 文本
 *
 * @param {string} text Markdown 文本
 * @returns {string} HTML 字符串
 */
export function renderMarkdown(text) {
  if (!text) {
    return ''
  }

  return md.render(text)
}

/**
 * 渲染行内 Markdown 文本
 *
 * 适合渲染一句话、标题、简短提示。
 *
 * @param {string} text Markdown 文本
 * @returns {string} HTML 字符串
 */
export function renderInlineMarkdown(text) {
  if (!text) {
    return ''
  }

  return md.renderInline(text)
}

/**
 * 去掉 Markdown 语法，得到纯文本预览
 *
 * 适合做消息列表摘要、历史记录摘要。
 *
 * @param {string} text Markdown 文本
 * @returns {string} 纯文本
 */
export function stripMarkdown(text) {
  if (!text) {
    return ''
  }

  return text
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)]\([^)]*\)/g, '$1')
    .replace(/[#>*_~\-]/g, '')
    .replace(/\n+/g, ' ')
    .trim()
}

export default md
