import { ChangeEvent, useState } from 'react';

export default function TypeScriptEvents() {
  const [accessory, setAccessory] = useState('');

  // With the non-inline event handler, we need to type the event
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setAccessory(event.currentTarget.value);
  }

  return (
    <form onSubmit={(event) => event.preventDefault()}>
      <input value={accessory} onChange={handleChange} />

      <input
        value={accessory}
        // With the inline event handler, we don't need the type
        onChange={(event) => setAccessory(event.currentTarget.value)}
      />
    </form>
  );
}
