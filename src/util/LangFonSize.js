import JsonStore from './JsonStore';

export function getStoreFontSize () {
  return parseInt(JsonStore.getPropVal('font-size'), 10) || 14;
}

export function updateFontSize (newFontSize) {
  JsonStore.pushOrUpdate('font-size', newFontSize);
}

export function getStoreLang () {
  return JsonStore.getPropVal('language') || 'language';
}

export function updateLang (newLang) {
  JsonStore.pushOrUpdate('language', newLang);
}