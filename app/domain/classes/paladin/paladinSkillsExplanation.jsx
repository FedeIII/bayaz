import { getStat, getStatMod } from '~/domain/characters';

import styles from '~/components/modal/inventoryItem.module.css';

export const PALADIN_SKILLS_EXPLANATION = {
  divineSense: (skill, pc) => (
    <>
      <p>
        Tus sentidos captan la presencia de un terrible mal como un nauseabundo
        olor, y un bien poderoso resuena en tus oídos como música celestial.
        Como acción, puedes expandir tus sentidos para detectar esas fuerzas.
        Hasta el final de tu siguiente turno, conoces la localización de
        cualquier ser celestial, demoníaco o muerto viviente en un rango de 60
        pies (18 metros) o menos que no esté tras una cobertura total. Conoces
        el tipo (celestial, demoníaco o muerto viviente) de cualquier criatura
        que capten tus sentidos, pero no su identidad (el Conde vampiro Strahd
        von Zarovich, por ejemplo). Dentro del mismo radio también puedes
        detectar la presencia de cualquier objeto o lugar que haya sido
        consagrado o profanado, como con el conjuro sacralizar
      </p>
      <p>
        Puedes usar esta característica {1 + getStatMod(getStat(pc, 'cha'))}{' '}
        veces: 1 + modificador de Carisma ({getStatMod(getStat(pc, 'cha'))}).
        Cuando finalices un descanso prolongado recuperas todos los usos
        gastados.
      </p>
    </>
  ),

  layOnHands: (skill, pc) => (
    <>
      <p>
        Tu toque bendito puede curar heridas. Tienes una reserva de poder
        curativo que se regenera cuando haces un descanso prolongado. Con esa
        reserva puedes restaurar un número total de {pc.level * 5} HP igual a tu
        nivel de paladín ({pc.level}) x 5.
      </p>
      <p>
        Como una acción, puedes tocar a una criatura y utilizar poder de tu
        reserva de curación para restaurar un número de Puntos de Golpe a esa
        criatura igual hasta, como máximo, el máximo que tengas en tu reserva.
      </p>
      <p>
        De forma alternativa, puedes <u>gastar 5 puntos de tu reserva de curación</u>
        para sanar al objetivo de una enfermedad o neutralizar un veneno que le
        esté afectando. Puedes curar varias enfermedades y neutralizar
        diferentes venenos con un solo uso de Imposición de manos, gastando
        puntos de tu reserva de curación por separado para cada uno de ellos.
      </p>
      <p>
        Esta característica no tiene efecto en los muertos vivientes y los
        constructos.
      </p>
    </>
  ),
};
