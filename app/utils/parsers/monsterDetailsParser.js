(async function () {
  var monsterNames = [
    'Commoner',
    'Crawling Claw',
    'Myconid Sprout',
    'Bandit',
    'Cultist',
    'Flumph',
    'Guard',
    'Manes',
    'Monodrone',
    'Noble',
    'Slaad Tadpole',
    'Tribal Warrior',
    'Twig Blight',
    'Aarakocra',
    'Acolyte',
    'Bullywug',
    'Drow',
    'Duodrone',
    'Flying Sword',
    'Kenku',
    'Kuo-toa',
    'Mud Mephit',
    'Needle Blight',
    'Pixie',
    'Pteranodon',
    'Smoke Mephit',
    'Troglodyte',
    'Winged Kobold',
    'Gas Spore',
    'Jackalwere',
    'Myconid Adult',
    'Piercer',
    'Scout',
    'Svirfneblin',
    'Thug',
    'Tridrone',
    'Vine Blight',
    'Animated Armor',
    'Fire Snake',
    'Goblin Boss',
    'Half-Ogre',
    'Kuo-toa Whip',
    'Quadrone',
    'Quaggoth Spore Servant',
    'Scarecrow',
    'Spy',
    'Thri-kreen',
    'Young Faerie Dragon',
    'Yuan-ti Pureblood',
    'Adult Faerie Dragon',
    'Allosaurus',
    'Bandit Captain',
    'Berserker',
    'Carrion Crawler',
    'Cave Bear',
    'Cult Fanatic',
    'Druid',
    'Githzerai Monk',
    'Gnoll Pack Lord',
    'Intellect Devourer',
    'Lizardfolk Shaman',
    'Myconid Sovereign',
    'Orc Eye of Gruumsh',
    'Orog',
    'Pentadrone',
    'Peryton',
    'Priest',
    'Quaggoth',
    'Rug of Smothering',
    'Saber-toothed Tiger',
    'Sahuagin Priestess',
    'Specter (poltergeist)',
    'Spined Devil',
    'Will-o-wisp',
    'Ankylosaurus',
    'Bugbear Chief',
    'Displacer Beast',
    'Githyanki Warrior',
    'Grell',
    'Hobgoblin Captain',
    'Hook Horror',
    'Knight',
    'Quaggoth Thonot',
    'Spectator',
    'Veteran',
    'Water Weird',
    'Yeti',
    'Yuan-ti Malison',
    'Banshee',
    'Bone Naga',
    'Flameskull',
    'Gnoll Fang of Yeenoghu',
    'Helmed Horror',
    'Lizard King/Queen',
    'Orc War Chief',
    'Shadow Demon',
    'Succubus',
    'Barlgura',
    'Beholder Zombie',
    'Cambion',
    'Drow Elite Warrior',
    'Gladiator',
    'Mezzoloth',
    'Red Slaad',
    'Revenant',
    'Sahuagin Baron',
    'Umber Hulk',
    'Young Remorhaz',
    'Chasme',
    'Cyclops',
    'Galeb Duhr',
    'Githzerai Zerth',
    'Hobgoblin Warlord',
    'Kuo-toa Archpriest',
    'Mage',
    'Young Brass Dragon',
    'Young White Dragon',
    'Blue Slaad',
    'Drow Mage',
    'Grick Alpha',
    'Mind Flayer',
    'Young Black Dragon',
    'Young Copper Dragon',
    'Yuan-ti Abomination',
    'Assassin',
    'Drow Priestess of Lolth',
    'Fomorian',
    'Githyanki Knight',
    'Green Slaad',
    'Mind Flayer Arcanist',
    'Young Bronze Dragon',
    'Young Green Dragon',
    'Abominable Yeti',
    'Gray Slaad',
    'Nycaloth',
    'Young Blue Dragon',
    'Young Silver Dragon',
    'Death Slaad',
    'Yochlol',
    'Young Gold Dragon',
    'Young Red Dragon',
    'Dao',
    'Marid',
    'Arcanaloth',
    'Archmage',
    'Adult Brass Dragon',
    'Adult White Dragon',
    'Beholder',
    'Ultroloth',
    'Young Red Shadow Dragon',
    'Adult Black Dragon',
    'Adult Copper Dragon',
    'Beholder (in lair)',
    'Death Tyrant',
    'Adult Bronze Dragon',
    'Adult Green Dragon',
    'Death Tyrant (in lair)',
    'Vampire (spellcaster)',
    'Vampire (warrior)',
    'Adult Blue Dragon',
    'Adult Silver Dragon',
    'Mummy Lord (in lair)',
    'Adult Blue Dracolich',
    'Adult Gold Dragon',
    'Adult Red Dragon',
    'Death Knight',
    'Goristro',
    'Demilich',
    'Demilich (in lair)',
    'Ancient Brass Dragon',
    'Ancient White Dragon',
    'Ancient Black Dragon',
    'Ancient Copper Dragon',
    'Ancient Bronze Dragon',
    'Ancient Green Dragon',
    'Lich (in lair)',
    'Ancient Blue Dragon',
    'Ancient Silver Dragon',
    'Empyrean',
    'Ancient Gold Dragon',
    'Ancient Red Dragon',
  ];

  window.monstersDetails = {};
  window.namesWithErrors = [];

  for (let name of monsterNames) {
    try {
      const nameParam = name
        .replace('Young ', '')
        .replace('Adult ', '')
        .replace('Ancient ', '')
        .toLowerCase()
        .replaceAll(' ', '-')
        .replaceAll('-(in-lair)', '');

      const details = { actions: {}, legendaryActions: {} };
      var data = await fetch(
        `https://www.aidedd.org/dnd/monstres.php?vo=${nameParam}`
      ).then(res => res.text());

      const doc = new DOMParser().parseFromString(data, 'text/html');

      details.notes = doc.querySelectorAll('.type')[0].textContent;

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

      if (
        [...doc.querySelectorAll('.sansSerif')[0].childNodes].filter(
          node => node instanceof Text
        )
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
      namesWithErrors.push(name);
    }
  }

  console.log('done');
})();
