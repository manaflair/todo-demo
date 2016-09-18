import { createHistory }                                                        from 'history';
import { Router, Route, useRouterHistory }                                      from 'react-router';

import { IndexPage }                                                            from 'components/pages/IndexPage';
import { SectionPage }                                                          from 'components/pages/SectionPage';

export class Application extends React.Component {

    render() {

        return <Router history={useRouterHistory(createHistory)()}>
            <Route path={`/:id`} component={SectionPage} />
            <Route path={`/`} component={IndexPage} />
        </Router>;

    }

}
