import { getArcaneTradition, getImprovedMinorIllusionSpell } from './wizard';
import { translateSchool } from '~/domain/spells/spellTranslations';
import { getProficiencyBonus, getStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';

import styles from '~/components/sheet.css';
export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

export function displayWizardTrait(traitName, trait, pc) {
  switch (traitName) {
    case 'arcaneRecovery':
      return (
        <>
          <strong>
            <u>{trait}. </u>
          </strong>{' '}
          <span className="app__small-text">
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
            <span className="sheet__pending-trait">(!)</span>
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
          <span className="app__small-text">
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
          <span className="app__small-text">
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
          <span className="app__small-text">
            1 + {'<'}nivel de conjuro{'>'} objetivos.
          </span>
        </>
      );

    case 'improvedMinorIllusion':
      return (
        <>
          <span>{trait}</span>
          {!getImprovedMinorIllusionSpell(pc) && (
            <span className="sheet__pending-trait">(!)</span>
          )}
        </>
      );

    case 'grimHarvest':
      return (
        <>
          <strong>
            <u>{trait}.</u>
          </strong>{' '}
          <span className="app__small-text">
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
          <span className="app__small-text">
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
          <span className="app__small-text">
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
          <span className="app__small-text">
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
          <span className="app__small-text">
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
          <span className="app__small-text">
            Todas las invocaciones tienen 30 HP temporales
          </span>
        </>
      );

    default:
  }

  return null;
}
