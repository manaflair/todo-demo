import { relationshipRemove }                                                   from '@manaflair/json-talk/actions';
import { resourcePatch, resourceDelete }                                        from '@manaflair/json-talk/actions';
import { PropTypes as JsonTalkPropTypes }                                       from '@manaflair/json-talk/react';
import { autobind }                                                             from 'core-decorators';
import { connect }                                                              from 'react-redux';

@connect()

export class Note extends React.Component {

    static propTypes = {

        dispatch: React.PropTypes.func.isRequired,

        note: JsonTalkPropTypes.resourceOf(`Note`).isRequired

    };

    @autobind handleContentUpdate(content) {

        this.props.dispatch(resourcePatch(this.props.note.clear().mergeIn([ `attributes` ], { content })));

    }

    @autobind handleStatusUpdate(status) {

        this.props.dispatch(resourcePatch(this.props.note.clear().mergeIn([ `attributes` ], { status })));

    }

    @autobind handleDelete() {

        this.props.dispatch(resourceDelete(this.props.note, { sideEffects: [
            relationshipRemove(this.props.note.relationships.get(`Section`).data, `Notes`, this.props.note)
        ] }));

    }

    render() {

        return <div className={`form-group`}>
            <div className={`input-group`}>

                <span className={`input-group-addon`}>
                    <input type={`checkbox`} onChange={e => this.handleStatusUpdate(e.target.checked)} checked={this.props.note.attributes.get(`status`)} tabIndex={-1} />
                </span>

                <input type={`text`} className={`form-control`} onChange={e => this.handleContentUpdate(e.target.value)} value={this.props.note.attributes.get(`content`)} style={{ textDecoration: this.props.note.attributes.get(`status`) ? `line-through` : `none` }} />

                <span className={`input-group-btn`}>
                    <button type={`button`} className={`btn btn-secondary`} onClick={e => this.handleDelete()} tabIndex={-1}><i className={`fa fa-times`} /></button>
                </span>

            </div>
        </div>;

    }

}
