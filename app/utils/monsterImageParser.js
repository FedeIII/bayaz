(async function () {
  var doc = document.getElementById('liste');

  const anchors = [].slice.call(doc.getElementsByTagName('a'));

  window.monsterImages = {};

  for (let anchor of anchors) {
    const data = await fetch(anchor.href).then(response => response.text());
    const imgUrl = data.match(/<img src='(.+)' alt/)?.[1];

    window.monsterImages[anchor.innerText] = imgUrl;
  }

  console.log('done');
})();
