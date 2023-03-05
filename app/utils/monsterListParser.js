(function () {
  window.monsterDetailsList = {};

  for (let name in monsterList) {
    const monsterValues = {};
    var doc = new DOMParser().parseFromString(monsterList[name], "text/xml");

    var description = doc.getElementsByClassName("description")[0];
    if (description) {
      var lines = [].slice.call(
        doc.getElementsByClassName("description")[0].querySelectorAll("p,h1")
      );

      monsterValues.actions = {};
      monsterValues.legendaryActions = {};
      var actions = false;
      for (let line of lines) {
        var text = line.innerHTML;
        if (text === "Actions") actions = "actions";
        if (text === "Legendary Actions") actions = "legendary actions";
        if (text) {
          var groups = text.match(/<strong>(.+)<\/strong>:? (.+)/);
          if (actions === "actions") {
            if (groups) monsterValues.actions[groups[1]] = groups[2];
          } else if (actions === "legendary actions") {
            if (groups) monsterValues.legendaryActions[groups[1]] = groups[2];
            else monsterValues.legendaryActions.description = text;
          } else {
            if (groups) monsterValues[groups[1]] = groups[2];
          }
        }
      }

      var statNames = ["str", "dex", "con", "int", "wis", "cha"];
      var statsText = [].slice
        .call(
          doc
            .getElementsByClassName("description")[0]
            .getElementsByTagName("table")[0]
            .getElementsByTagName("td")
        )
        .map((node) => node.innerHTML);
      monsterValues.stats = statNames.reduce(
        (stats, statName, i) => ({
          ...stats,
          [statName]: statsText[i].substring(0, statsText[i].indexOf(" ")),
        }),
        {}
      );

      monsterValues.notes = doc
        .getElementsByClassName("description")[0]
        .getElementsByTagName("em")[0].innerHTML;
    } else {
      monsterValues.noData = true;
      monsterValues.values = monsterList[name];
    }
    monsterDetailsList[name] = monsterValues;
  }
})();
