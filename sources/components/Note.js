import { autobind }                                                             from 'core-decorators';

export class Note extends React.Component {

    static propTypes = {

    };

    @autobind handleContentUpdate() {

    }

    @autobind handleStatusUpdate() {

    }

    @autobind handleDelete() {

    }

    render() {

        return <div className={`form-group`}>
            <div className={`input-group`}>

                <span className={`input-group-addon`}>
                    <input type={`checkbox`} onChange={e => this.handleStatusUpdate(e.target.checked)} checked={false} tabIndex={-1} />
                </span>

                <input type={`text`} className={`form-control`} onChange={e => this.handleContentUpdate(e.target.value)} value={`A Simple Note`} style={{ textDecoration: false ? `line-through` : `none` }} />

                <span className={`input-group-btn`}>
                    <button type={`button`} className={`btn btn-secondary`} onClick={e => this.handleDelete()} tabIndex={-1}><i className={`fa fa-times`} /></button>
                </span>

            </div>
        </div>;

    }

}
