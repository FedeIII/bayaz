import {
  FIGHTING_STYLES,
  translateFightingStyle,
} from '~/domain/classes/fighter/fighter';

function FighterSkills(props) {
  return (
    <>
      <p>
        <label>
          <span className="app__pale-text">Escoge estilo de combate</span>
          <br />
          <select
            name="fighting-style"
            defaultValue=""
            className="cards__button-card"
          >
            <option value="" disabled></option>
            {FIGHTING_STYLES.map(fightingStyle => (
              <option value={fightingStyle} key={fightingStyle}>
                {translateFightingStyle(fightingStyle)}
              </option>
            ))}
          </select>
        </label>
      </p>

      <h3 className="app__pale-text">{translateFightingStyle('archery')}</h3>
      <p className="app__paragraph">
        Ganas un bonificador de +2 a las tiradas de ataque que hagas con armas a
        distancia.
      </p>

      <h3 className="app__pale-text">{translateFightingStyle('defense')}</h3>
      <p className="app__paragraph">
        Mientras lleves puesta una armadura ganas un +1 la CA.
      </p>

      <h3 className="app__pale-text">{translateFightingStyle('dueling')}</h3>
      <p className="app__paragraph">
        Cuando llevas un arma cuerpo a cuerpo en una mano y ningún arma más,
        ganas un bonificador de +2 a las tiradas de daño con esa arma.
      </p>

      <h3 className="app__pale-text">
        {translateFightingStyle('great-Weapon-fighting')}
      </h3>
      <p className="app__paragraph">
        Cuando obtienes un 1 o un 2 en un dado de daño con un arma a dos manos,
        puedes volver a realizar la tirada de daño y debiendo usar la nueva
        tirada, incluso si vuelve a ser un 1 o un 2. El arma debe ser un arma a
        dos manos o tener la propiedad versátil para ganar este beneficio.
      </p>

      <h3 className="app__pale-text">
        {translateFightingStyle('protection')}
      </h3>
      <p className="app__paragraph">
        Cuando una criatura que puedes ver ataca a un objetivo que no eres tú y
        está a 5 pies o menos de ti, puedes usar tu reacción para hacer que el
        enemigo tenga desventaja en la tirada de ataque. Debes estar usando un
        escudo.
      </p>

      <h3 className="app__pale-text">
        {translateFightingStyle('two-weapon-fighting')}
      </h3>
      <p className="app__paragraph">
        Cuando luchas con el estilo de lucha de dos armas, puedes añadir tu
        modificador de característica al daño del segundo ataque.
      </p>
    </>
  );
}

export default FighterSkills;
