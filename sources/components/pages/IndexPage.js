import { autobind }                                                             from 'core-decorators';

import { Card }                                                                 from 'components/Card';

export class IndexPage extends React.Component {

    static propTypes = {

    };

    @autobind handleSectionCreate() {

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

            {[ 1, 2, 3 ].map(index => <Card key={index} />)}

        </div>;

    }

}
