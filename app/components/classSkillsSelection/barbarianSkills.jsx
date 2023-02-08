function BarbarianSkills(props) {
  const { pc } = props;
  const { classSkills: { primalPath } = { skills: [] } } = pc;

  return (
    <p>
      <label>
        Senda Primaria:{' '}
        <select name="primal-path" defaultValue={primalPath}>
          <option value="berserker">Senda del Berserker</option>
          <option value="totem-warrior">Senda del Guerrero Totémico</option>
        </select>
      </label>
    </p>
  );
}

export default BarbarianSkills;
