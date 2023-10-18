import { getProficiencyBonus, getStat, getStatMod } from '~/domain/characters';
import {
  ELEMENTAL_DISCIPLINES,
  getElementalDisciplines,
  getExtraUnarmoredMovement,
  getKiPoints,
  getMartialArtsDice,
  getMonasticTradition,
  hasToLearnElementalDiscipline,
  translateElementalDisciplines,
} from './monk';
import { increment } from '~/domain/display';

import appStyles from '~/components/app.module.css';
import sheetStyles from '~/components/sheet.module.css';

export function displayMonkTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'unarmoredDefense':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            AC{' '}
            {10 +
              getStatMod(getStat(pc, 'dex')) +
              getStatMod(getStat(pc, 'wis'))}
          </span>
        </>
      );

    case 'martialArts':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            {getMartialArtsDice(pc)}. Ataque sin armas como una acción adicional
          </span>
        </>
      );

    case 'ki':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>{getKiPoints(pc)} Ki</span>
        </>
      );

    case 'flurryOfBlows':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>1 Ki</span>
        </>
      );

    case 'patientDefense':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>1 Ki</span>
        </>
      );

    case 'stepOfTheWind':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>1 Ki</span>
        </>
      );

    case 'stepOfTheWind':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>1 Ki</span>
        </>
      );

    case 'unarmoredMovement':
      return (
        <>
          <strong>
            <u>
              {trait}
              {pc.level >= 9 ? ' Mejorado.' : '.'}
            </u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            {increment(getExtraUnarmoredMovement(pc))}m
          </span>
        </>
      );

    case 'monasticTradition':
      return (
        !getMonasticTradition(pc) && (
          <>
            <strong>{trait}</strong>
            <span className={sheetStyles.pendingTrait}>(!)</span>
          </>
        )
      );

    case 'discipleOftheElements':
      return (
        <>
          <u>{trait}.</u>{' '}
          {hasToLearnElementalDiscipline(pc) && (
            <span className={sheetStyles.pendingTrait}>(!)</span>
          )}
          {!!getElementalDisciplines(pc).length && (
            <ul className={appStyles.smallText}>
              {getElementalDisciplines(pc).map(discipline => (
                <li key={discipline}>
                  {translateElementalDisciplines(discipline)}.{' '}
                  <span className={appStyles.smallText}>
                    {displayElementalDisciplineKi(discipline)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </>
      );

    case 'deflectMissiles':
      return (
        <>
          <u>{trait}.</u>{' '}
          <span className={appStyles.smallText}>
            {increment(-10 - getStatMod(getStat(pc, 'dex')) - pc.level)} daño
          </span>
        </>
      );

    case 'slowFall':
      return (
        <>
          <u>{trait}.</u>{' '}
          <span className={appStyles.smallText}>
            {increment(-pc.level * 5)} daño
          </span>
        </>
      );

    case 'stunningStrike':
      return (
        <>
          <u>{trait}.</u> <span className={appStyles.smallText}>1 Ki</span>
        </>
      );

    case 'wholenessOfBody':
      return (
        <>
          <u>{trait}.</u>{' '}
          <span className={appStyles.smallText}>
            {increment(pc.level * 3)} HP
          </span>
        </>
      );

    case 'tranquility':
      return (
        <>
          <u>{trait}.</u>{' '}
          <span className={appStyles.smallText}>
            DC{' '}
            {8 + getStatMod(getStat(pc, 'wis')) + getProficiencyBonus(pc.level)}
          </span>
        </>
      );

    case 'diamondSoul':
      return (
        <>
          <u>{trait}.</u> <span className={appStyles.smallText}>1 Ki</span>
        </>
      );

    case 'quiveringPalm':
      return (
        <>
          <u>{trait}.</u> <span className={appStyles.smallText}>3 Ki</span>
        </>
      );

    case 'emptyBody':
      return (
        <>
          <u>{trait}.</u>{' '}
          <span className={appStyles.smallText}>4 Ki / 8 Ki</span>
        </>
      );

    case 'perfectSelf':
      return (
        <>
          <u>{trait}.</u> <span className={appStyles.smallText}>+4 Ki</span>
        </>
      );

    default:
  }

  if (trait === 'discipline') return translateElementalDisciplines(traitName);

  return null;
}

function displayElementalDisciplineKi(disciplineName) {
  const discipline = ELEMENTAL_DISCIPLINES[disciplineName];
  let ki = `${discipline.ki} Ki`;
  if (discipline.extraKi) {
    ki += `+ ${discipline.extraKi}`;
  }
  return ki;
}
