export const BARD_SKILLS_EXPLANATION = {
  bardicInspiration: (skill, pc) => (
    <>
      <p>
        Puedes inspirar a otros a través de palabras estimulantes o de la
        música. Para hacerlo, usas una acción adicional en tu turno para elegir
        una criatura distinta de ti mismo dentro de un rango de 60 pies (18
        metros) y que pueda escucharte. Esa criatura gana un dado de Inspiración
        de Bardo, un{' '}
        {pc.level >= 15
          ? 'd12'
          : pc.level >= 10
          ? 'd10'
          : pc.level >= 5
          ? 'd8'
          : 'd6'}
        .
      </p>
      <p>
        Una vez, dentro de los siguientes 10 minutos, esa criatura puede tirar
        el dado y agregar el resultado a una prueba de habilidad, una tirada de
        ataque o de salvación que haga. La criatura puede esperar a ver el
        resultado del d20 antes de decidir usar el dado de Inspiración de Bardo,
        pero debe hacerlo antes de que el DM diga si la tirada tuvo éxito o no.
        Una vez que el dado de Inspiración de Bardo es usado, se pierde. Una
        criatura sólo puede tener un dado de Inspiración de Bardo a la vez.
      </p>
      <p>
        Puedes usar este rasgo una cantidad de veces equivalente a tu
        modificador de Carisma (mínimo 1). Recuperas todos los usos gastados
        cuando terminas un descanso prolongado.
      </p>
      <p>
        Tu dado de Inspiración de Bardo cambia cuando alcanzas determinados
        niveles. El dado se convierte en 1d8 al nivel 5, en 1d10 al nivel 10 y
        en 1d12 al nivel 15.
      </p>
    </>
  ),

  jackOfAllTrades: () => (
    <p>
      Empezando en el nivel 2, puedes añadir la mitad de tu bonificador de
      competencia, redondeado hacia abajo, a cualquier prueba de habilidad que
      realices que no incluya ya tu bonificador de competencia.
    </p>
  ),

  songOfRest: () => (
    <>
      <p>
        Empezando al nivel 2, puedes usar música o una oración reconfortante
        para ayudar a revitalizar a tus aliados heridos durante un descanso
        corto. Si tú o cualquier criatura amistosa que escucha tu interpretación
        recobra Puntos de Golpe al final del descanso corto, esa criatura
        recupera 1d6 de puntos adicionales.
      </p>
      <p>
        Los Puntos de Golpe extra se incrementan cuando alcanzas determinados
        niveles en esta clase: 1d8 al nivel 9, 1d10 al nivel 13 y 1d12 al nivel
        17.
      </p>
    </>
  ),
};
