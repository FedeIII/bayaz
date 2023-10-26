import styles from '~/components/sheet.module.css';
import spellStyles from '~/components/spells.module.css';

function DeathSavingThrows() {
  return (
    <>
      <div className={`${styles.data} ${styles.deathSavingThrowSuccess}`}>
        <input
          type="checkbox"
          name="savingThrowSuccess0"
          id="savingThrowSuccess0"
          value="savingThrowSuccess0"
          className={`${styles.data} ${spellStyles.preparedSpell}`}
          style={{
            left: '4px',
            top: '0px',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowSuccess0"
          className={spellStyles.preparedSpellNotChecked}
          style={{
            left: '5px',
            top: '-3px',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowSuccess0"
          className={spellStyles.preparedSpellChecked}
          style={{
            left: '4px',
            top: '0px',
            zIndex: 10,
          }}
        >
          ◍
        </label>
      </div>
      <div className={`${styles.data} ${styles.deathSavingThrowSuccess}`}>
        <input
          type="checkbox"
          name="savingThrowSuccess1"
          id="savingThrowSuccess1"
          value="savingThrowSuccess1"
          className={`${styles.data} ${spellStyles.preparedSpell}`}
          style={{
            left: '29px',
            top: '0px',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowSuccess1"
          className={spellStyles.preparedSpellNotChecked}
          style={{
            left: '31px',
            top: '-3px',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowSuccess1"
          className={spellStyles.preparedSpellChecked}
          style={{
            left: '29px',
            top: '0px',
            zIndex: 10,
          }}
        >
          ◍
        </label>
      </div>
      <div className={`${styles.data} ${styles.deathSavingThrowSuccess}`}>
        <input
          type="checkbox"
          name="savingThrowSuccess2"
          id="savingThrowSuccess2"
          value="savingThrowSuccess2"
          className={`${styles.data} ${spellStyles.preparedSpell}`}
          style={{
            left: '54px',
            top: '0px',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowSuccess2"
          className={spellStyles.preparedSpellNotChecked}
          style={{
            left: '56px',
            top: '-3px',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowSuccess2"
          className={spellStyles.preparedSpellChecked}
          style={{
            left: '54px',
            top: '0px',
            zIndex: 10,
          }}
        >
          ◍
        </label>
      </div>
      <div className={`${styles.data} ${styles.deathSavingThrowFailure}`}>
        <input
          type="checkbox"
          name="savingThrowFailure0"
          id="savingThrowFailure0"
          value="savingThrowFailure0"
          className={`${styles.data} ${spellStyles.preparedSpell}`}
          style={{
            left: '5px',
            top: '-7px',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowFailure0"
          className={spellStyles.preparedSpellNotChecked}
          style={{
            left: '5px',
            top: '-7px',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowFailure0"
          className={spellStyles.preparedSpellChecked}
          style={{
            left: '4px',
            top: '-4px',
            zIndex: 10,
          }}
        >
          ◍
        </label>
      </div>
      <div className={`${styles.data} ${styles.deathSavingThrowFailure}`}>
        <input
          type="checkbox"
          name="savingThrowFailure1"
          id="savingThrowFailure1"
          value="savingThrowFailure1"
          className={`${styles.data} ${spellStyles.preparedSpell}`}
          style={{
            left: '5px',
            top: '-7px',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowFailure1"
          className={spellStyles.preparedSpellNotChecked}
          style={{
            left: '31px',
            top: '-7px',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowFailure1"
          className={spellStyles.preparedSpellChecked}
          style={{
            left: '30px',
            top: '-4px',
            zIndex: 10,
          }}
        >
          ◍
        </label>
      </div>
      <div className={`${styles.data} ${styles.deathSavingThrowFailure}`}>
        <input
          type="checkbox"
          name="savingThrowFailure2"
          id="savingThrowFailure2"
          value="savingThrowFailure2"
          className={`${styles.data} ${spellStyles.preparedSpell}`}
          style={{
            left: '56px',
            top: '-7px',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowFailure2"
          className={spellStyles.preparedSpellNotChecked}
          style={{
            left: '56px',
            top: '-7px',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowFailure2"
          className={spellStyles.preparedSpellChecked}
          style={{
            left: '55px',
            top: '-4px',
            zIndex: 10,
          }}
        >
          ◍
        </label>
      </div>
    </>
  );
}

export default DeathSavingThrows;
