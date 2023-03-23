import store from '@/store'

// 智能转换语言
export function switchLanguage(cn, en) {
  let text = ''
  let { language } = store.state.user.user

  switch(language) {
    case 'cn':
      text = cn;
      break;
    case 'en':
      text = en;
      break;
    default: 
      text = 'cn'
  }

  return text
}