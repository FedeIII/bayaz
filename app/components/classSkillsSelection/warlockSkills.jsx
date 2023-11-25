import { useEffect, useState } from 'react';

import { translatePatron } from '~/domain/classes/warlock/warlock';
import {
  getSpellPatrons,
  getWarlockSpellSlots,
  getWarlockTotalSpells,
  isSpellFrom,
  WARLOCK_SPELLS,
} from '~/domain/spells/warlock';
import { SkillItem } from '../modal/skillItem';

function WarlockSkills(props) {
  const { pc, setSkillsNamespace, skillRefs, openSkillModal } = props;

  const [selectedPatron, setSelectedPatron] = useState(null);
  const [selectedSpells0, setSelectedSpells0] = useState([]);
  const [selectedSpells1, setSelectedSpells1] = useState([]);

  const spellSlots = getWarlockSpellSlots(pc);
  const totalSpells = getWarlockTotalSpells(pc);

  useEffect(() => {
    setSkillsNamespace(
      'warlockSkills',
      !!selectedPatron &&
        selectedSpells0.filter(v => v).length === spellSlots[0] &&
        selectedSpells1.filter(v => v).length === totalSpells
    );
  }, [setSkillsNamespace, !!selectedPatron, selectedSpells0, selectedSpells1]);

  return (
    <>
      <div className="characters__trait-columns characters__trait-columns--three">
        <div className="characters__trait-label">
          <span className="characters__trait-title">
            Firma un pacto con un ser de otro mundo
          </span>
          <select
            name="patron"
            defaultValue=""
            className="cards__button-card characters__single-select"
            onChange={e => setSelectedPatron(e.target.value)}
          >
            <option value="" disabled></option>
            <option value="archfey">El Archihada</option>
            <option value="fiend">El Diablo</option>
            <option value="greatOldOne">El Gran Antiguo</option>
          </select>

          {selectedPatron === 'archfey' && (
            <p>
              Tu patrón es un noble entre los feéricos. Una criatura de leyenda,
              poseedora de secretos que fueron olvidados antes de que las razas
              mortales nacieran. Las motivaciones de este ser son a menudo
              inescrutables, y a veces caprichosas, y podrían involucrar la
              obtención de mayor poder mágico o reparar antiguos rencores. Los
              seres de este tipo incluyen al Príncipe del Frío; la Reina del
              Aire y la Oscuridad, soberana de la Corte Crepuscular; Titania de
              la Corte del Verano; su consorte Oberon, el Señor Verde; Hyrsam,
              el Príncipe de los Tontos; y antiguas brujas.
            </p>
          )}
          {selectedPatron === 'fiend' && (
            <p>
              Has realizado un pacto con un diablo de los planos inferiores de
              existencia, un ser cuyas metas son malvadas, incluso si peleas
              contra esas metas. Tales seres desean la corrupción o destrucción
              de todas las cosas, incluyéndote a ti. Los diablos con suficiente
              poder para firmar un pacto incluyen señores demoníacos como
              Demogorgon, Orcus, Fraz’Urb-luu y Baphomet; Archidiablos como
              Asmodeo, Dispater, Mefistófeles y Belial; diablos del foso y
              balors que sean especialmente poderosos; y ultroloths y otros
              señores de los yugoloths.
            </p>
          )}
          {selectedPatron === 'greatOldOne' && (
            <>
              <p>
                Tu patrón es una misteriosa entidad cuya naturaleza es
                totalmente ajena al tejido de la realidad. Podría venir del
                Reino Lejano, el espacio más allá de la realidad, o ser uno de
                los dioses antiguos, sólo conocidos en las leyendas. Sus motivos
                son incomprensibles para los mortales, y su conocimiento, tan
                inmenso y antiguo, que incluso las mayores bibliotecas palidecen
                en comparación a los vastos secretos que guardan estos seres. El
                Gran Antiguo podría no ser consciente de tu existencia, o ser
                totalmente indiferente a esta, pero los secretos que aprendiste
                te permiten tomar tu magia de él.
              </p>
              <p>
                Entidades de este tipo incluyen a Ghaunadar, llamado El Que se
                Esconde; Tharizdun, el Dios Encadenado; Dendar, la Serpiente
                Nocturna; Zargon, el Retornante; el Gran Cthulhu; y otros seres
                insondables.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="characters__trait-columns characters__trait-columns--three">
        <div className="characters__trait-label">
          <span className="characters__trait-title">
            Conoces {spellSlots[0]} trucos de brujo
          </span>
          <div className="characters__traits characters__traits--wide">
            {Object.values(WARLOCK_SPELLS)
              .filter(s => s.level === 0)
              .map((spell, i) => (
                <label
                  htmlFor={spell.name}
                  key={spell.name}
                  className="characters__skill-label characters__skill-label--small"
                >
                  <input
                    type="checkbox"
                    name="spells[]"
                    checked={!!selectedSpells0[i]}
                    id={spell.name}
                    value={spell.name}
                    onChange={() =>
                      setSelectedSpells0(oldChecks => {
                        const newChecks = oldChecks.slice();
                        newChecks[i] = !newChecks[i];
                        return newChecks;
                      })
                    }
                  />
                  <SkillItem
                    ref={skillRefs[spell.level].current[spell.name]}
                    traitName={spell.name}
                    trait="spell"
                    openOnRightClick
                    openModal={openSkillModal(spell.level, spell.name)}
                  />
                </label>
              ))}
          </div>
        </div>

        <div className="characters__trait-label">
          <span className="characters__trait-title">
            Conoces {totalSpells} conjuros de nivel 1 de brujo
          </span>
          <div className="characters__traits characters__traits--wide">
            {Object.values(WARLOCK_SPELLS)
              .filter(
                s =>
                  s.level === 1 &&
                  (!getSpellPatrons(s).length || isSpellFrom(s, selectedPatron))
              )
              .map((spell, i) => (
                <label
                  htmlFor={spell.name}
                  key={spell.name}
                  className="characters__skill-label characters__skill-label--small"
                >
                  <input
                    type="checkbox"
                    name="spells[]"
                    checked={!!selectedSpells1[i]}
                    id={spell.name}
                    value={spell.name}
                    onChange={() =>
                      setSelectedSpells1(oldChecks => {
                        const newChecks = oldChecks.slice();
                        newChecks[i] = !newChecks[i];
                        return newChecks;
                      })
                    }
                  />
                  <SkillItem
                    ref={skillRefs[spell.level].current[spell.name]}
                    traitName={spell.name}
                    trait="spell"
                    openOnRightClick
                    openModal={openSkillModal(spell.level, spell.name)}
                  />{' '}
                  {selectedPatron && isSpellFrom(spell, selectedPatron) && (
                    <>({translatePatron(selectedPatron)})</>
                  )}
                </label>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default WarlockSkills;
