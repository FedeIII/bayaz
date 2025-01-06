import { ChooseTrait } from '~/components/summary/skillStates';
import { getStat } from '../characters';
import { isEldritchknight } from '../classes/fighter/fighter';
import { isWayOfTheFourElements } from '../classes/monk/monk';
import { isArcaneTrickster } from '../classes/rogue/rogue';
import { FEATS, FEATS_LIST } from './featExplanations';
import { t } from '~/domain/translations';

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
        isAvailable =
          ['wizard', 'sorcerer', 'cleric', 'druid', 'bard', 'warlock'].includes(
            pc.pClass
          ) ||
          (pc.pClass === 'ranger' && pc.level >= 2) ||
          (pc.pClass === 'paladin' && pc.level >= 2) ||
          (pc.pClass === 'fighter' && isEldritchknight(pc)) ||
          (pc.pClass === 'rogue' && isArcaneTrickster(pc)) ||
          (pc.pClass === 'monk' && isWayOfTheFourElements(pc)) ||
          isHighElf(pc) ||
          isDrow(pc);

        if (!isAvailable) {
          return false;
        }
      }

      if (featData.requirements.proficiency) {
        isAvailable = pc.proficientItems.some(
          proficientItem =>
            proficientItem.name === featData.requirements.proficiency
        );

        if (!isAvailable) {
          return false;
        }
      }
    }

    return isAvailable;
  });
}

export function getFeat(featId) {
  return FEATS[featId];
}

export function getExtraStatForFeat(pc, statName) {
  return Object.keys(pc.feats?.extraStats || {}).reduce((extraValue, featName) => {
    if (pc.feats?.extraStats?.[featName] === statName) {
      return extraValue + 1;
    }

    return extraValue;
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
  switch (featId) {
    default:
  }

  const feat = getFeat(featId);

  const displayed = t(featId);
  if (displayed.indexOf('[---') === 0) return null;
  if (!displayed) return null;

  return (
    <>
      {displayed}
      {feat?.chooseTrait?.(pc) && <ChooseTrait />}
      {feat?.extraDisplay?.(pc)}
    </>
  );
}

export function isFeat(traitName) {
  return !!FEATS[traitName];
}

export function getLucky(pc) {
  return pc.feats?.lucky || 0;
}

export const MAX_LUCK_POINTS = 3;

export function hasToSelectFeatStat(pc, featName) {
  const feat = getFeat(featName);
  if (!feat || !feat.bonus || !feat.requiredStatSelection) return false;

  return !pc.feats?.extraStats?.[featName];
}
