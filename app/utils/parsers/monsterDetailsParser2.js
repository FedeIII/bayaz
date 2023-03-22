(async function () {
  var monsterLinks = [
    'https://www.aidedd.org/dnd/monstres.php?vo=deep-gnome-svirfneblin',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=will-o--wisp',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=adult-black-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=adult-blue-dracolich',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=adult-blue-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=adult-brass-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=adult-bronze-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=adult-copper-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=adult-gold-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=adult-green-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=adult-red-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=adult-silver-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=adult-white-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=ancient-black-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=ancient-blue-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=ancient-brass-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=ancient-bronze-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=ancient-copper-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=ancient-gold-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=ancient-green-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=ancient-red-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=ancient-silver-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=ancient-white-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=lizard-king-queen',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=young-black-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=young-blue-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=young-brass-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=young-bronze-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=young-copper-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=young-gold-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=young-green-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=young-red-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=young-red-shadow-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=young-silver-dragon',
    // 'https://www.aidedd.org/dnd/monstres.php?vo=young-white-dragon',
  ];

  window.monstersDetails = {};
  window.namesWithErrors = [];

  for (let link of monsterLinks) {
    try {
      const details = { actions: {}, legendaryActions: {} };
      var data = await fetch(link).then(res => res.text());

      const doc = new DOMParser().parseFromString(data, 'text/html');

      details.notes = doc.querySelectorAll('.type')[0].textContent;
      const name = doc.querySelector('h1').textContent;

      var red = doc.querySelectorAll('.red')[0];

      var stats = [].slice.call(doc.querySelectorAll('.carac'));

      details.stats = {};

      stats.forEach(statNode => {
        var groups = statNode.innerHTML.match(
          /<strong>(.+)<\/strong><br>(.+) \(?/
        );
        details.stats[groups[1].toLowerCase()] = groups[2];
      });

      red.querySelectorAll('div').forEach(node => red.removeChild(node));

      var groups = [
        ...red.innerHTML.matchAll(/(?<=<strong>)(.+?)<\/strong> (.+?)(<|$)/g),
      ];
      for (let group of groups) {
        details[group[1]] = group[2];
      }

      debugger;

      if (
        [...doc.querySelectorAll('.sansSerif')[0].childNodes].filter(
          node => node instanceof Text
        ).length
      ) {
        groups = [...doc.querySelectorAll('.sansSerif')[0].childNodes].filter(
          node =>
            node instanceof Text ||
            node.textContent === 'Actions' ||
            node.textContent === 'LegendaryActions'
        );
      } else {
        groups = [...doc.querySelectorAll('p, .rub')];
      }

      var actions = false;
      var legendaryActions = false;
      for (let group of groups) {
        var nodes;
        if (group.childNodes.length) {
          nodes = [...group.childNodes];
        } else {
          nodes = [group];
        }

        if (nodes[0].textContent === 'Actions') {
          actions = true;
        } else if (nodes[0].textContent === 'Legendary actions') {
          legendaryActions = true;
        } else if (legendaryActions) {
          if (nodes.length === 1) {
            details.legendaryActions[nodes[0].textContent] = '';
          } else {
            details.legendaryActions[nodes[0].innerText] =
              nodes[1].textContent.substring(2);
          }
        } else if (actions) {
          if (nodes.length === 1) {
            details.actions[nodes[0].textContent] = '';
          } else {
            details.actions[nodes[0].innerText] =
              nodes[1].textContent.substring(2);
          }
        } else {
          if (nodes.length === 1) {
            details[nodes[0].textContent] = '';
          } else {
            details[nodes[0].innerText] = nodes[1].textContent.substring(2);
          }
        }
      }

      window.monstersDetails[name] = details;
    } catch (error) {
      namesWithErrors.push(link);
    }
  }

  console.log('done');
})();
