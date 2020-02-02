import JsonStore from "./JsonStore";

export default function updateFontSize (newFontSize, codeMirrorElement, resultBoxElement) {
  codeMirrorElement.style.fontSize = newFontSize + 'px';
  resultBoxElement.style.fontSize = newFontSize + 'px';
  JsonStore.pushOrUpdate('font-size', newFontSize);
}