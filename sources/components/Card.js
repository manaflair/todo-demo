import { resourcePatch, resourceDelete, resourceDeleteAll }                     from '@manaflair/json-talk/actions';
import { PropTypes as JsonTalkPropTypes }                                       from '@manaflair/json-talk/react';
import { autobind }                                                             from 'core-decorators';
import { connect }                                                              from 'react-redux';
import { Link }                                                                 from 'react-router';

import { Note }                                                                 from 'components/Note';

@connect()

export class Card extends React.Component {

    static propTypes = {

        dispatch: React.PropTypes.func.isRequired,

        section: JsonTalkPropTypes.resourceOf(`Section`).isRequired

    };

    @autobind handleSectionRename() {

        let title = prompt(`How do you wish to call this section?`, this.props.section.attributes.get(`title`));

        if (!title)
            return;

        this.props.dispatch(resourcePatch(this.props.section.clear().mergeIn([ `attributes` ], { title })));

    }

    @autobind handleSectionDelete() {

        this.props.dispatch(resourceDelete(this.props.section, { sideEffects: [
            resourceDeleteAll(this.props.section.relationships.get(`Notes`).data)
        ] }));

    }

    render() {

        return <div className={`card`}>

            <div className={`card-header`}>
                <div className={`pull-xs-left`}>
                    <div className={`btn p-l-0`} style={{ borderLeft: 0, borderRight: 0, cursor: `auto` }}>
                        {this.props.section.attributes.get(`title`)}
                    </div>
                </div>
                <div className={`pull-xs-right`}>
                    <button className={`btn btn-link`} onClick={e => this.handleSectionRename()} tabIndex={-1}><i className={`fa fa-pencil`} /></button>
                    <button className={`btn btn-link`} onClick={e => this.handleSectionDelete()} tabIndex={-1}><i className={`fa fa-times`} /></button>
                </div>
            </div>

            <Link to={`/${this.props.section.id}`} className={`list-group list-group-flush`} style={{ color: `currentColor`, textDecoration: `none` }}>
                {this.props.section.relationships.get(`Notes`).data.valueSeq().map(note =>
                    <div key={note.key} className={`list-group-item`} style={{ textDecoration: note.attributes.get(`status`) ? `line-through` : `none` }}>
                        {note.attributes.get(`content`)}
                    </div>
                )}
                {this.props.section.relationships.get(`Notes`).data.isEmpty() &&
                    <div className={`list-group-item`} style={{ fontStyle: `italic`, color: `#888888` }}>
                        No notes
                    </div>
                }
            </Link>

        </div>;

    }

}
