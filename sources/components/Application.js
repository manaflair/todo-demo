import { AsyncRenderer }                                                        from '@manaflair/async-props';
import { createHistory }                                                        from 'history';
import { Router, Route, useRouterHistory }                                      from 'react-router';

import { IndexPage }                                                            from 'components/pages/IndexPage';
import { SectionPage }                                                          from 'components/pages/SectionPage';

export class Application extends React.Component {

    render() {

        return <Router history={useRouterHistory(createHistory)()} render={props => <AsyncRenderer {... props} />}>
            <Route path={`/:id`} component={SectionPage} />
            <Route path={`/`} component={IndexPage} />
        </Router>;

    }

}
