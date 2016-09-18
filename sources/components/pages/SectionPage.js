import { prepare }                                                              from '@manaflair/async-props';
import { relationshipAdd }                                                      from '@manaflair/json-talk/actions';
import { resourceSetAll, resourceCreate }                                       from '@manaflair/json-talk/actions';
import { PropTypes as JsonTalkPropTypes }                                       from '@manaflair/json-talk/react';
import { Locator, fetchJsonServer, hydrateResource }                            from '@manaflair/json-talk';
import { autobind }                                                             from 'core-decorators';
import UUID                                                                     from 'pure-uuid';
import { connect }                                                              from 'react-redux';
import { Link }                                                                 from 'react-router';

import { Note }                                                                 from 'components/Note';

@prepare((state, props, context, dispatch) => {

    return fetchJsonServer(`/api/sections/${props.params.id}?include=Notes,Notes.Section`).then(serverData => {

        dispatch(resourceSetAll(serverData.all));

        return { sectionLocator: serverData.main.locator };

    });

})

@connect((state, props) => ({

    section: state.resourceRegistry.get(props.sectionLocator, { include: { Notes: [ `Section` ] } })

}))

export class SectionPage extends React.Component {

    static propTypes = {

        dispatch: React.PropTypes.func.isRequired,

        sectionLocator: JsonTalkPropTypes.locatorOf(`Section`).isRequired,
        section: JsonTalkPropTypes.resourceOf(`Section`).isRequired

    };

    @autobind handleNoteCreate() {

        let note = hydrateResource({ type: `Note`, id: new UUID(4).format(), attributes: { content: ``, status: false }, relationships: { Section: { data: this.props.section } } });

        this.props.dispatch(resourceCreate(note, { sideEffects: [
            relationshipAdd(this.props.section, `Notes`, note)
        ] }));

    }

    render() {

        return this.props.section ? <div className={`p-a-1 p-b-0`}>

            <nav className={`navbar navbar-fixed-top navbar-light bg-faded`}>
                <form className={`form-inline pull-xs-left`}>
                    <Link className={`btn btn-outline-secondary`} to={`/`}>
                        <i className={`fa fa-chevron-left`} />
                    </Link>
                </form>
                <form className={`form-inline pull-xs-right`}>
                    <button type={`button`} className={`btn btn-outline-success`} onClick={e => this.handleNoteCreate()}>
                        <i className={`fa fa-plus`} /> Add a new note
                    </button>
                </form>
            </nav>

            <nav className={`navbar`} style={{ visibility: `hidden` }}>
                <form className={`form-inline pull-xs-left`}>
                    <Link className={`btn`} to={`/`}>
                        <i className={`fa fa-chevron-left`} />
                    </Link>
                </form>
                <form className={`form-inline pull-xs-right`}>
                    <button type={`button`} className={`btn`}>
                        <i className={`fa fa-plus`} /> Add a new note
                    </button>
                </form>
            </nav>

            {this.props.section.relationships.get(`Notes`).data.valueSeq().sortBy(note => note.attributes.get(`createdAt`)).map(note =>
                <Note key={note.key} note={note} />
            )}

        </div> : null;

    }

}
