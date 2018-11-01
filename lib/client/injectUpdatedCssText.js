export const cssText =
  '@-webkit-keyframes bling{0%{background-color:#d9edf7}to{background-color:#d9edf7}}@-moz-keyframes bling{0%{background-color:#d9edf7}to{background-color:#d9edf7}}@-o-keyframes bling{0%{background-color:#d9edf7}to{background-color:#d9edf7}}@keyframes bling{0%{background-color:#d9edf7}to{background-color:#d9edf7}}.detected-updated,.detected-updated pre{-webkit-animation:bling 2.5s 1;-moz-animation:bling 2.5s 1;-o-animation:bling 2.5s 1;animation:bling 2.5s 1}'


if (typeof document !== 'undefined' && !global.__INJECTED_UPDATED_CSS_TEXT__) {
  const style = document.createElement('style')
  style.textContent = cssText
  style.type = 'text/css'
  document.head.appendChild(style)
  global.__INJECTED_UPDATED_CSS_TEXT__ = true
}
