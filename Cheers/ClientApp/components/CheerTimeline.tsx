import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Panel } from 'react-bootstrap';
import { Pane } from 'react-bootstrap/lib/Tab';

export class CheerTimeline extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            allCheers: []
        };
    }

    componentDidMount() {
        let that = this;
        fetch('api/CheerTimeline/Getallcheers')
            .then(function (response) {
                // The response is a Response instance.
                // You parse the data into a useable format using `.json()`
                return response.json();

            }).then(function (data) {
                console.log(data);

                that.setState({
                    allCheers: data.allcheers
                });
            });
    }

    public render() {

        return (
            <div>
                <h1>Timeline</h1>

                {this.state.allCheers.map((cheer: any, i: any) => {
                    // Return the element. Also pass key     
                    return (
                        <Panel key={i} bsStyle="info">
                            <Panel.Heading>
                                <Panel.Title componentClass="h3">Cheers to: <b>{cheer.cheerTo}</b></Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>{cheer.cheerText}</Panel.Body>

                            <Panel.Footer >by : {cheer.cheerFrom}</Panel.Footer>
                        </Panel>)
                })}

            </div>
        );
    }
}

