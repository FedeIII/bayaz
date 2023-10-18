import { getStat, getStatMod } from '~/domain/characters';
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
            <u>{trait}.</u>
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
                  {displayElementalDisciplineKi(discipline)}
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
          {increment(-10 - getStatMod(getStat(pc, 'dex')) - pc.level)} daño
        </>
      );

    case 'slowFall':
      return (
        <>
          <u>{trait}.</u> {increment(-pc.level * 5)} daño
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
