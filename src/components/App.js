import * as React from 'react';
import Game from './Game';

export function App({ initialData }) {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <h1>{initialData.appName}</h1>
      <Game />
    </div>
  );
}
