import { prepare }                                                              from '@manaflair/async-props';
import { resourceSetAll, resourceCreate }                                       from '@manaflair/json-talk/actions';
import { PropTypes as JsonTalkPropTypes }                                       from '@manaflair/json-talk/react';
import { fetchJsonServer, hydrateResource }                                     from '@manaflair/json-talk';
import { autobind }                                                             from 'core-decorators';
import UUID                                                                     from 'pure-uuid';
import ImmutablePropTypes                                                       from 'react-immutable-proptypes';
import { connect }                                                              from 'react-redux';

import { Card }                                                                 from 'components/Card';

@prepare((state, props, context, dispatch) => {

    return fetchJsonServer(`/api/sections?include=Notes,Notes.Section`).then(serverData => {

        dispatch(resourceSetAll(serverData.all));

    });

})

@connect((state, props) => ({

    sections: state.resourceRegistry.get(resource => resource.type === `Section`, { include: { Notes: [ `Section` ] } })

}))

export class IndexPage extends React.Component {

    static propTypes = {

        dispatch: React.PropTypes.func.isRequired,

        sections: ImmutablePropTypes.iterableOf(JsonTalkPropTypes.resourceOf(`Section`)).isRequired

    };

    @autobind handleSectionCreate() {

        let title = prompt(`How do you wish to call this new section?`, ``);

        if (!title)
            return;

        let section = hydrateResource({ type: `Section`, id: new UUID(4).format(), attributes: { title }, relationships: { Notes: { data: [] } } });

        this.props.dispatch(resourceCreate(section));

    }

    render() {

        return <div className={`p-a-1 p-b-0`}>

            <nav className={`navbar navbar-fixed-top navbar-light bg-faded`}>
                <form className={`form-inline pull-xs-right`}>
                    <button type={`button`} className={`btn btn-outline-success`} onClick={e => this.handleSectionCreate()}>
                        <i className={`fa fa-plus`} /> Create a new section
                    </button>
                </form>
            </nav>

            <nav className={`navbar`} style={{ visibility: `hidden` }}>
                <form className={`form-inline pull-xs-right`}>
                    <button type={`button`} className={`btn`}>
                        <i className={`fa fa-plus`} /> Create a new section
                    </button>
                </form>
            </nav>

            {this.props.sections && this.props.sections.valueSeq().sortBy(section => section.attributes.get(`createdAt`)).map(section =>
                <Card key={section.key} section={section} />
            )}

        </div>;

    }

}
