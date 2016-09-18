import { fetchJsonServer, resolveSelector }                                     from '@manaflair/json-talk';
import { autobind }                                                             from 'core-decorators';
import { Link }                                                                 from 'react-router';

import { Note }                                                                 from 'components/Note';

export class SectionPage extends React.Component {

    static propTypes = {

    };

    constructor(props) {

        super(props);

        this.state = { section: null };

    }

    componentDidMount() {

        fetchJsonServer(`/api/sections/${this.props.params.id}?include=Notes,Notes.Section`).then(serverData => {
            this.setState({ section: resolveSelector(serverData.all, serverData.main, { include: { Notes: [ `Section` ] } }) });
        });

    }

    @autobind handleNoteCreate() {

    }

    render() {

        return this.state.section ? <div className={`p-a-1 p-b-0`}>

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

            {this.state.section.relationships.get(`Notes`).data.valueSeq().sortBy(note => note.attributes.get(`createdAt`)).map(note =>
                <Note key={note.key} note={note} />
            )}

        </div> : null;

    }

}
