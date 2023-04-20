import styles from '~/components/modal/inventoryItem.module.css';

export const WIZARD_SKILLS_EXPLANATION = {
  arcaneRecovery: (skill, pc) => (
    <p>
      Has aprendido a recuperar parte de tus energías mágicas gracias al estudio
      de tu libro de conjuros. Una vez por día, cuando finalizas un descanso
      corto, puedes elegir qué espacios de conjuros quieres recuperar. Los
      espacios de conjuros pueden tener un{' '}
      <u>nivel combinado igual a {Math.ceil(pc.level / 2)}</u> (la mitad de tu
      nivel de mago, redondeando hacia arriba), aunque <u>ninguno</u> de los
      espacios de conjuros puede ser <u>de nivel 6 o superior</u>. Por ejemplo,
      si eres un mago de nivel 4, puedes recuperar hasta dos niveles en espacios
      de conjuros. Puedes recuperar tanto dos espacios de conjuros de nivel 1 o
      un espacio de conjuros de nivel 2.
    </p>
  ),
};
