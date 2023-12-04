function DeathSavingThrows() {
  return (
    <>
      <div className="sheet__data sheet__death-saving-throw-success">
        <input
          type="checkbox"
          name="savingThrowSuccess0"
          id="savingThrowSuccess0"
          value="savingThrowSuccess0"
          className="sheet__data spells__prepared-spell"
        />
        <label
          htmlFor="savingThrowSuccess0"
          className="spells__prepared-spell-not-checked"
          style={{
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowSuccess0"
          className="spells__prepared-spell-checked"
          style={{
            left: '0.2vw',
            top: '0.5vh',
            zIndex: 10,
          }}
        >
          ◍
        </label>
      </div>
      <div className="sheet__data sheet__death-saving-throw-success">
        <input
          type="checkbox"
          name="savingThrowSuccess1"
          id="savingThrowSuccess1"
          value="savingThrowSuccess1"
          className="sheet__data spells__prepared-spell"
        />
        <label
          htmlFor="savingThrowSuccess1"
          className="spells__prepared-spell-not-checked"
          style={{
            left: '1.7vw',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowSuccess1"
          className="spells__prepared-spell-checked"
          style={{
            left: '1.9vw',
            top: '0.5vh',
            zIndex: 10,
          }}
        >
          ◍
        </label>
      </div>
      <div className="sheet__data sheet__death-saving-throw-success">
        <input
          type="checkbox"
          name="savingThrowSuccess2"
          id="savingThrowSuccess2"
          value="savingThrowSuccess2"
          className="sheet__data spells__prepared-spell"
        />
        <label
          htmlFor="savingThrowSuccess2"
          className="spells__prepared-spell-not-checked"
          style={{
            left: '3.4vw',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowSuccess2"
          className="spells__prepared-spell-checked"
          style={{
            left: '3.6vw',
            top: '0.5vh',
            zIndex: 10,
          }}
        >
          ◍
        </label>
      </div>
      <div className="sheet__data sheet__death-saving-throw-failure">
        <input
          type="checkbox"
          name="savingThrowFailure0"
          id="savingThrowFailure0"
          value="savingThrowFailure0"
          className="sheet__data spells__prepared-spell"
        />
        <label
          htmlFor="savingThrowFailure0"
          className="spells__prepared-spell-not-checked"
          style={{
            top: '-0.6vh',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowFailure0"
          className="spells__prepared-spell-checked"
          style={{
            left: '0.2vw',
            top: '-0.2vh',
            zIndex: 10,
          }}
        >
          ◍
        </label>
      </div>
      <div className="sheet__data sheet__death-saving-throw-failure">
        <input
          type="checkbox"
          name="savingThrowFailure1"
          id="savingThrowFailure1"
          value="savingThrowFailure1"
          className="sheet__data spells__prepared-spell"
        />
        <label
          htmlFor="savingThrowFailure1"
          className="spells__prepared-spell-not-checked"
          style={{
            left: '1.7vw',
            top: '-0.6vh',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowFailure1"
          className="spells__prepared-spell-checked"
          style={{
            left: '2vw',
            top: '-0.2vh',
            zIndex: 10,
          }}
        >
          ◍
        </label>
      </div>
      <div className="sheet__data sheet__death-saving-throw-failure">
        <input
          type="checkbox"
          name="savingThrowFailure2"
          id="savingThrowFailure2"
          value="savingThrowFailure2"
          className="sheet__data spells__prepared-spell"
        />
        <label
          htmlFor="savingThrowFailure2"
          className="spells__prepared-spell-not-checked"
          style={{
            left: '3.5vw',
            top: '-0.6vh',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowFailure2"
          className="spells__prepared-spell-checked"
          style={{
            left: '3.6vw',
            top: '-0.2vh',
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
