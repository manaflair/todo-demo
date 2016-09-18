import { autobind }                                                             from 'core-decorators';
import { Link }                                                                 from 'react-router';

import { Note }                                                                 from 'components/Note';

export class SectionPage extends React.Component {

    static propTypes = {

    };

    @autobind handleNoteCreate() {

    }

    render() {

        return <div className={`p-a-1 p-b-0`}>

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

            {[ 1, 2, 3 ].map(index => <Note key={index} />)}

        </div>;

    }

}
