import { getStat, getStatMod } from '~/domain/characters';
import { increment } from '~/domain/display';
import { getSpellSavingThrow } from '~/domain/spells/spells';

export const WARLOCK_SKILLS_EXPLANATION = {
  feyPresence: (skill, pc) => (
    <>
      <p>
        Comenzando en el nivel 1 tu patrón te otorga la habilidad de proyectar
        la presencia seductora y aterrorizante de los feéricos. Como una acción,
        puedes forzar a cada criatura en un cubo de 10 pies (3 metros) centrado
        en ti, a que realice una tirada de salvación de Sabiduría contra la CD
        de tus conjuros de brujo ({getSpellSavingThrow(pc)}). Las criaturas que
        fallen su tirada de salvación quedan hechizadas o asustadas por ti (a tu
        elección) hasta el final de tu siguiente turno.
      </p>
      <p>
        Una vez que usas este rasgo, no puedes usarlo nuevamente hasta que
        finalices un descanso corto o prolongado.
      </p>
    </>
  ),

  darkOnesBlessing: (skill, pc) => (
    <p>
      Comenzando en el nivel 1 cuando reduces los Puntos de Golpe de una
      criatura hostil a 0, ganas{' '}
      {increment(getStatMod(getStat(pc, 'cha')) + pc.level)} Puntos de Golpe
      temporales equivalentes a tu modificador de Carisma + tu nivel de brujo
      (con un mínimo de 1).
    </p>
  ),

  awakenedMind: (skill, pc) => (
    <p>
      Comenzando en el nivel 1 tu conocimiento exterior te da la habilidad de
      tocar las mentes de otras criaturas. Puedes comunicarte telepáticamente
      con cualquier criatura que puedas ver en un rango de 30 pies (9 metros) de
      ti. No necesitas compartir un idioma con la criatura para que comprenda tu
      mensaje telepático, pero la criatura debe ser capaz de comprender al menos
      un idioma.
    </p>
  ),
};
