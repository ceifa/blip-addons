import * as React from 'react';
import * as ReactDOM from 'react-dom';

export const Hello = (): JSX.Element => <div>Hello</div>;

ReactDOM.render(<Hello />, document.getElementById('root'));
