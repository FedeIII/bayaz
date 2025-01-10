import { getSpellcastingAbility } from '~/domain/spells/spells';
import {
  getInvocation,
  getInvocations,
  getPactSpells,
  getTomeRituals,
  getArcanum,
} from '~/domain/classes/warlock/warlock';
import {
  getLoreSpells,
  getMagicalSecretsSpells,
} from '~/domain/classes/bard/bard';
import { t } from '~/domain/translations';
import { getStat, getStatMod, getProficiencyBonus } from '~/domain/characters';
import { increment } from '~/domain/display';

////////////
// COMMON //
////////////

export function AlternativeSpellBonus(props) {
  const { pc, spell } = props;

  const pcCastingStat = getSpellcastingAbility(pc);

  let alternativeBonus = null;

  if (spell.castingStat && spell.castingStat !== pcCastingStat) {
    alternativeBonus =
      getProficiencyBonus(pc.level) +
      getStatMod(getStat(pc, spell.castingStat));
  }

  if (spell.type && pc.pClass !== spell.type) {
    alternativeBonus =
      getProficiencyBonus(pc.level) +
      getStatMod(getStat(pc, getSpellcastingAbility(pc, spell.type)));
  }

  if (alternativeBonus) {
    return (
      <>
        {' '}
        (CD{8 + alternativeBonus}, {increment(alternativeBonus)})
      </>
    );
  }

  return null;
}

export function AlternativeSpellCastingStat(props) {
  const { pc, spell } = props;

  const pcCastingStat = getSpellcastingAbility(pc);

  if (spell.castingStat && spell.castingStat !== pcCastingStat) {
    return (
      <span className="spells__data spells__tooltip">
        ({t(spell.castingStat)})
      </span>
    );
  }

  if (spell.type && pc.pClass !== spell.type) {
    return (
      <span className="spells__data spells__tooltip">
        ({t(getSpellcastingAbility(pc, spell.type))})
      </span>
    );
  }

  return null;
}

/////////////
// WARLOCK //
/////////////

export function WarlocksInvocation(props) {
  const { pc, spell } = props;

  const invocations = getInvocations(pc).map(getInvocation);

  const invocation = invocations.find(inv => inv.spell === spell.name);
  if (invocation) {
    return (
      <span className="spells__data spells__tooltip">
        (Invocación,{' '}
        {invocation.spendSlot ? 'Consume hueco' : 'No consume hueco'})
      </span>
    );
  }
  return null;
}

export function WarlocksPact(props) {
  const { pc, spell } = props;

  const pactSpells = getPactSpells(pc);

  return pactSpells.map(s => s.name).includes(spell.name) ? (
    <span className="spells__data spells__tooltip"> (Don del Pacto)</span>
  ) : null;
}

export function WarlocksTomeRituals(props) {
  const { pc, spell } = props;
  const tomeRituals = getTomeRituals(pc);

  return tomeRituals.includes(spell.name) ? (
    <span className="spells__data spells__tooltip"> (Ritual)</span>
  ) : null;
}

export function WarlocksArcanum(props) {
  const { pc, spell } = props;
  const arcanum = getArcanum(pc);

  return arcanum.includes(spell.name) ? (
    <span className="spells__data spells__tooltip"> (Arcanum)</span>
  ) : null;
}

//////////
// BARD //
//////////

export function BardsSchoolOfLore(props) {
  const { pc, spell } = props;
  const loreSpells = getLoreSpells(pc);

  return loreSpells.map(s => s.name).includes(spell.name) ? (
    <span className="spells__data spells__tooltip">
      {' '}
      (Colegio del Conocimiento)
    </span>
  ) : null;
}

export function BardsMagicalSecrets(props) {
  const { pc, spell } = props;
  const magicalSecretsSpells = getMagicalSecretsSpells(pc);

  return magicalSecretsSpells.map(s => s.name).includes(spell.name) ? (
    <span className="spells__data spells__tooltip"> (Secretos Mágicos)</span>
  ) : null;
}
