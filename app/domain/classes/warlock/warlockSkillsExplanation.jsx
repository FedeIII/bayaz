import { getSpellSavingThrow } from "~/domain/spells/spells";

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
};
