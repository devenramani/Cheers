import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Modal, OverlayTrigger, Popover, Tooltip, FormGroup, InputGroup, FormControl, Panel, DropdownButton, MenuItem } from 'react-bootstrap';


export class StartStop extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props);

        this.state = {

            allStartStop: [],
            StartStopPanel: false,
            userName: "",
            show: false,
            UPN: ''
        };
    }

    componentDidMount() {

        let that = this;
        fetch('api/startstop/GetAllStartStops')
            .then(function (response) {
                // The response is a Response instance.
                // You parse the data into a useable format using `.json()`
                return response.json();

            }).then(function (data) {
                console.log(data);

                that.setState({
                    allStartStop: data.allStartStops
                });
            });

        fetch('api/Account/GetUser')
            .then(function (response) {
                // The response is a Response instance.
                // You parse the data into a useable format using `.json()`
                return response.json();

            }).then(function (data) {
                console.log(data);

                that.setState({
                    userName: data.fullName,
                    UPN: data.upn
                });
            });
    }


    public render() {

        var cardClass = {Start:"success",Stop:"danger"};
        return (
            <div>
                <h1>Start/Stop Timeline</h1>
                <Button bsStyle="primary" onClick={() => this.setState({ StartStopPanel: !this.state.StartStopPanel })}>
                    Start/Stop
                </Button>

                <Panel id="collapsible-panel-example-1" expanded={this.state.StartStopPanel}>
                    <Panel.Collapse>
                        <Panel.Body>
                            <form>
                                <FormGroup>
                                    <InputGroup>
                                        <FormControl type="text" />
                                        <DropdownButton
                                            componentClass={InputGroup.Button}
                                            id="input-dropdown-addon"
                                            title={"Action"}
                                        >
                                            <MenuItem key="Start">Start</MenuItem>
                                            <MenuItem key="Stop">Stop</MenuItem>
                                        </DropdownButton>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup bsSize="large">
                                    <FormControl name="CheerTextControl" type="text" placeholder="type here" />
                                </FormGroup>
                            </form>
                            <Button bsStyle="primary" >Send</Button>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>

                {this.state.allStartStop.map((ss: any, i: any) => {
                    // Return the element. Also pass key     
                    return (
                        <Panel key={i} bsStyle={cardClass.Start} >
                            <Panel.Heading>
                                <Panel.Title componentClass="h3"><b>{ss.title} : {ss.subject}</b></Panel.Title>
                            </Panel.Heading>
                            <Panel.Body>{ss.text}</Panel.Body>

                            <Panel.Footer >by : {ss.from}</Panel.Footer>
                        </Panel>)
                })}

            </div>);
    }
}