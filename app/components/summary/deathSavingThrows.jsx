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
          style={{
            left: '4px',
            top: '0px',
            zIndex: 10,
          }}
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
            left: '4px',
            top: '0px',
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
          style={{
            left: '29px',
            top: '0px',
            zIndex: 10,
          }}
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
            left: '29px',
            top: '0px',
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
          style={{
            left: '54px',
            top: '0px',
            zIndex: 10,
          }}
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
            left: '54px',
            top: '0px',
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
          style={{
            top: '-1vh',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowFailure0"
          className="spells__prepared-spell-not-checked"
          style={{
            top: '-1vh',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowFailure0"
          className="spells__prepared-spell-checked"
          style={{
            left: '4px',
            top: '-1vh',
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
          style={{
            left: '5px',
            top: '-7px',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowFailure1"
          className="spells__prepared-spell-not-checked"
          style={{
            left: '1.7vw',
            top: '-1vh',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowFailure1"
          className="spells__prepared-spell-checked"
          style={{
            left: '30px',
            top: '-1vh',
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
          style={{
            left: '3.4vw',
            top: '-1vh',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowFailure2"
          className="spells__prepared-spell-not-checked"
          style={{
            left: '3.4vw',
            top: '-1vh',
            zIndex: 10,
          }}
        />
        <label
          htmlFor="savingThrowFailure2"
          className="spells__prepared-spell-checked"
          style={{
            left: '55px',
            top: '-1vh',
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
