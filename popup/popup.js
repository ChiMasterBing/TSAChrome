let ul = document.createElement('ul'),
    current = 'Original',
    vision = {
      'Original': '',
      'Protonopia': '100%',
      'Protonopia2': '100%',
      'Deuteranopia': '100%',
      'Tritanopia': '100%',
    }

Object.keys(vision).forEach(function (el) {
  let li = document.createElement('li');
  li.dataset['type'] = el;
  li.textContent = el;
  li.addEventListener('click', handler, false);
  el == current && li.classList.add('current');
  ul.appendChild(li);
})

function handler(e) {
  current = this.dataset['type'];
  $.all('li').forEach(function(li) {
    li.classList.remove('current');
  })
  this.classList.add('current');
  chrome.tabs.insertCSS(null, { code: 'html { -webkit-filter: url(#' + current + '); }' });
}

function $(selector, context) {
  return (context || document).querySelector(selector);
}
$.all = function (selector, context) {
  return Array.prototype.slice.call((context || document).querySelectorAll(selector));
}
document.body.appendChild(ul);
