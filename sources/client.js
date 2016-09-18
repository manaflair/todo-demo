import ReactDOM                                                                 from 'react-dom';

import { Application }                                                          from 'components/Application';

let main = document.createElement('div');
document.body.appendChild(main);

ReactDOM.render(
    <Application />
, main);
