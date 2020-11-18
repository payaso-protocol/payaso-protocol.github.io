import intl from 'react-intl-universal';
import localeUS from './en_US';
import localeZH from './zh_CN';


export const LOCALES_DATA = {
  'en_US': localeUS,
  'zh_CN': localeZH,
}

export const locales = [
  {
    name: '简体中文',
    value: 'zh_CN',
  },
  {
    name: 'English',
    value: 'en_US',
  },
]



export function t(key, variables) {
  return intl.get(key, variables);
}

export function tHTML(key, variables) {
  return intl.getHTML(key, variables);
}