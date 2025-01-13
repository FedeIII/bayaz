import { ChooseTrait } from '~/components/summary/skillStates';
import {
  CLASSES,
  getItemProficiencies,
  getStat,
  getStatMod,
  statSavingThrow,
} from '../characters';
import { FEATS, FEATS_LIST } from './featExplanations';
import { t } from '~/domain/translations';
import { getSpell } from '../spells/getSpells';
import { canCastSpells, getSpellcastingAbility } from '../spells/spells';
import { getShieldArmorClass } from '../equipment/armors';
import { getItem } from '../equipment/equipment';
import { includesAll } from '~/utils/array';

function getFeats(pc) {
  return pc.feats?.list || [];
}

export function hasFeat(pc, featId) {
  return getFeats(pc).includes(featId);
}

export function getAvailableFeats(pc) {
  return FEATS_LIST.filter(feat => {
    let isAvailable = true;
    const featData = getFeat(feat.name);

    if (feat.name !== 'elementalAdept' && pc.feats?.list.includes(feat.name)) {
      return false;
    }

    if (featData.requirements) {
      if (featData.requirements.stats) {
        isAvailable = Object.keys(featData.requirements.stats).some(
          key => getStat(pc, key) >= featData.requirements.stats[key]
        );

        if (!isAvailable) {
          return false;
        }
      }

      if (featData.requirements.spellcaster) {
        isAvailable = canCastSpells(pc);

        if (!isAvailable) {
          return false;
        }
      }

      if (featData.requirements.proficiency) {
        isAvailable = getItemProficiencies(pc).includes(
          featData.requirements.proficiency
        );

        if (!isAvailable) {
          return false;
        }
      }
    }

    if (featData.bonus?.proficiency?.length) {
      isAvailable = !includesAll(
        getItemProficiencies(pc),
        featData.bonus?.proficiency
      );

      if (!isAvailable) {
        return false;
      }
    }

    return isAvailable;
  });
}

export function getFeat(featId) {
  return FEATS[featId];
}

export function getExtraStatForFeat(pc, statName) {
  const extraStats = pc.feats?.extraStats || {};
  const extraStatsObj =
    extraStats instanceof Map ? Object.fromEntries(extraStats) : extraStats;

  return Object.keys(extraStatsObj).reduce((extraValue, featName) => {
    const featStats = extraStatsObj[featName];
    return extraValue + featStats.filter(s => s === statName).length;
  }, 0);
}

export function hasToSelectElement(pc) {
  const numberOfElementalAdeptElementss =
    pc.feats?.list?.filter(featId => featId === 'elementalAdept')?.length || 0;
  const numberOfSelectedElements = pc.feats?.elementalAdept?.length || 0;

  return numberOfElementalAdeptElementss > numberOfSelectedElements;
}

export function hasToSelectMartialAdeptManeuvers(pc) {
  return (
    pc.feats?.list?.includes('martialAdept') &&
    pc.feats?.martialAdept?.length < 2
  );
}

export function getFeatTraits(pc) {
  const feats = pc.feats?.list || [];

  return feats.reduce(
    (featsMap, featId) => ({
      ...featsMap,
      [featId]: t(featId),
    }),
    {}
  );
}

export function displayFeat(featId, pc) {
  const feat = getFeat(featId);

  const displayed = t(featId);
  if (displayed.indexOf('[---') === 0) return null;
  if (!displayed) return null;

  return (
    <>
      <u>
        <strong>{displayed}</strong>
      </u>
      {feat?.chooseTrait?.(pc) && <ChooseTrait />}
      {feat?.extraDisplay?.(pc)}
    </>
  );
}

export function isFeat(traitName) {
  return !!FEATS[traitName];
}

export function getLuckyFeat(pc) {
  return pc.feats?.luckyFeat || 0;
}

export const MAX_LUCK_POINTS = 3;

export function hasToSelectFeatStat(pc, featName) {
  const feat = getFeat(featName);
  if (!feat || !feat.bonus || !feat.requiredStatSelection) return false;

  return !pc.feats?.extraStats?.[featName];
}

export function hasToSelectCantrip(pc, featName) {
  const feat = getFeat(featName);
  if (!feat.bonus?.cantrip) return false;

  return !pc.feats.cantrips?.[featName];
}

export function hasToSelectSpells(pc, featName) {
  const feat = getFeat(featName);
  if (!feat.bonus?.spells) return false;

  return (
    (pc.feats.spells?.[featName]?.length || 0) < (feat.bonus.spells.amount || 1)
  );
}

export function getSpellSniperCantrip(pc) {
  if (!pc.feats?.list?.includes('spellSniper')) return null;

  const spellSniperCantrip = getSpell(pc.feats?.cantrips?.spellSniper);

  if (!spellSniperCantrip) return null;

  let castingStat = null;

  if (canCastSpells(pc)) {
    const pcCastStat = getSpellcastingAbility(pc);

    spellSniperCantrip.class.forEach(sClass => {
      if (pc.pClass === sClass) {
        castingStat = pcCastStat;
      }
    });

    if (!castingStat) {
      spellSniperCantrip.class.forEach(sClass => {
        const spellCastingStat = CLASSES()[sClass].spellcastingAbility;
        if (spellCastingStat === pcCastStat) {
          castingStat = spellCastingStat;
        }
      });
    }
  }

  if (!castingStat) {
    const classesWithMods = spellSniperCantrip.class.map(sClass => ({
      sClass,
      mod: getStatMod(getStat(pc, CLASSES()[sClass].spellcastingAbility)),
    }));
    const maxClass = classesWithMods.reduce((max, curr) =>
      curr.mod > max.mod ? curr : max
    );
    castingStat = CLASSES()[maxClass.sClass].spellcastingAbility;
  }

  return { ...spellSniperCantrip, castingStat };
}

export function getRitualCasterSpells(pc) {
  return pc.feats?.spells?.ritualCaster || [];
}

export function getDexSavingThrowForShieldMaster(pc) {
  const {
    items: {
      equipment: { shield: pShield = null },
    },
  } = pc;

  if (!pc.feats?.list?.includes('shieldMaster') || !pShield) return 0;

  return (
    statSavingThrow('dex', getStat(pc, 'dex'), pc) +
    getShieldArmorClass(getItem(pShield))
  );
}

export function getFeatProficiencies(pc) {
  return getFeats(pc).reduce((proficiencies, featId) => {
    const feat = getFeat(featId);
    if (feat?.bonus?.proficiency?.length) {
      proficiencies.push(...feat.bonus.proficiency);
    }
    return proficiencies;
  }, []);
}
