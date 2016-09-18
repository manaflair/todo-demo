import { autobind }                                                             from 'core-decorators';
import { Link }                                                                 from 'react-router';

import { Note }                                                                 from 'components/Note';

export class Card extends React.Component {

    static propTypes = {

    };

    @autobind handleSectionRename() {

    }

    @autobind handleSectionDelete() {

    }

    render() {

        return <div className={`card`}>

            <div className={`card-header`}>
                <div className={`pull-xs-left`}>
                    <div className={`btn p-l-0`} style={{ borderLeft: 0, borderRight: 0, cursor: `auto` }}>
                        A Simple Section
                    </div>
                </div>
                <div className={`pull-xs-right`}>
                    <button className={`btn btn-link`} onClick={e => this.handleSectionRename()} tabIndex={-1}><i className={`fa fa-pencil`} /></button>
                    <button className={`btn btn-link`} onClick={e => this.handleSectionDelete()} tabIndex={-1}><i className={`fa fa-times`} /></button>
                </div>
            </div>

            <Link to={`/note`} className={`list-group list-group-flush`} style={{ color: `currentColor`, textDecoration: `none` }}>
                {[ 1, 2, 3 ].map(index => <div key={index} className={`list-group-item`} style={{ textDecoration: false ? `line-through` : `none` }}>A Simple Note</div>)}
            </Link>

        </div>;

    }

}
