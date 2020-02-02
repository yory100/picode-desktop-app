export default function updateFontSize (newFontSize) {
  codeMirrorElement.style.fontSize = newFontSize + 'px';
  resultBoxElement.style.fontSize = newFontSize + 'px';
  JsonStore.pushOrUpdate('font-size', newFontSize);
}