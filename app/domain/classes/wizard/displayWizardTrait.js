import { getArcaneTradition, getImprovedMinorIllusionSpell } from './wizard';
import { translateSchool } from '~/domain/spells/spellTranslations';
import { getProficiencyBonus, getStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';

import appStyles from '~/components/app.module.css';
import sheetStyles from '~/components/sheet.module.css';

export function displayWizardTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'arcaneRecovery':
      return (
        <>
          <strong>
            <u>{trait}. </u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            Recupera un nivel combinado de {Math.ceil(pc.level / 2)} en
            hechizos.
          </span>
        </>
      );

    case 'arcaneTradition':
      return (
        !getArcaneTradition(pc) && (
          <>
            <strong>{trait}</strong>
            <span className={sheetStyles.pendingTrait}>(!)</span>
          </>
        )
      );

    case 'schoolSavant':
      return (
        <span>
          {trait} {translateSchool(getArcaneTradition(pc))}
        </span>
      );

    case 'arcaneWard':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            {pc.level * 2 + getStatMod(getStat(pc, 'int'))} HP
          </span>
        </>
      );

    case 'portent':
      return (
        <>
          <strong>
            <u>{pc.level >= 14 ? 'Portento Mayor' : trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            {pc.level >= 14 ? '3' : '2'}d20 para reemplazar entre descansos
            prolongados
          </span>
        </>
      );

    case 'sculptSpells':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            1 + {'<'}nivel de conjuro{'>'} objetivos.
          </span>
        </>
      );

    case 'improvedMinorIllusion':
      return (
        <>
          <span>{trait}</span>
          {!getImprovedMinorIllusionSpell(pc) && (
            <span className={sheetStyles.pendingTrait}>(!)</span>
          )}
        </>
      );

    case 'grimHarvest':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            Recuperas HP cuando matas criaturas con conjuros.
          </span>
        </>
      );

    case 'expertDivination':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            Recuperas espacios de conjuro al lanzar conjuros de Adivinación.
          </span>
        </>
      );

    case 'benignTransportation':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            Teletransporte a 10 metros.
          </span>
        </>
      );

    case 'undeadThralls':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            {increment(pc.level)} HP, {increment(getProficiencyBonus(pc.level))}{' '}
            daño con armas.
          </span>
        </>
      );

    case 'empoweredEvocation':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            {increment(getStatMod(getStat(pc, 'int')))} daño por conjuros de
            Evocación
          </span>
        </>
      );

    case 'durableSummons':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className={appStyles.smallText}>
            Todas las invocaciones tienen 30 HP temporales
          </span>
        </>
      );

    default:
  }

  return null;
}
