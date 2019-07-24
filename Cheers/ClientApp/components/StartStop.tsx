import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Modal, OverlayTrigger, Popover, Tooltip, FormGroup, InputGroup, FormControl, Panel, DropdownButton, MenuItem } from 'react-bootstrap';


export class StartStop extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props);

        this.sendStartStop = this.sendStartStop.bind(this);
        this.handleActionControl = this.handleActionControl.bind(this);
        this.handleStartStopSubjectChange = this.handleStartStopSubjectChange.bind(this);
        this.handleStartStopTextChange = this.handleStartStopTextChange.bind(this);
        this.getAllStartStops = this.getAllStartStops.bind(this);

        this.state = {
            allStartStop: [],
            StartStopPanel: false,
            userName: "",
            UPN: '',
            action: "Action",
            StartStopText: "",
            StartStopSubject: ""
        };
    }

    componentDidMount() {

        let that = this;

        this.getAllStartStops();
        
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

    getAllStartStops(){

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
    }

    handleActionControl(eventKey: any) {
        this.setState({
            action: eventKey
        });
    }

    handleStartStopSubjectChange(e: any) {
        this.setState({ StartStopSubject: e.target.value });
        console.log(this.state.StartStopSubject);
    }

    handleStartStopTextChange(e: any) {
        this.setState({ StartStopText: e.target.value });
        console.log(this.state.StartStopText);
    }


    sendStartStop() {
        console.log("send");

        let that = this;
        fetch('api/startstop/SendStartStop', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Title: this.state.action,
                Subject: this.state.StartStopSubject,
                TimeStamp: new Date().toISOString(),
                Text: this.state.StartStopText,
                From: this.state.UPN
            })
        }).then(function (data) {
            //console.log(that.state.action + " - " + that.state.StartStopSubject);
            that.setState({ StartStopPanel: false });
            that.getAllStartStops();
        });
    }


    public render() {

        let cardClass: any = { Start: "success", Stop: "danger" };
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

                                        <DropdownButton onSelect={this.handleActionControl}
                                            componentClass={InputGroup.Button}
                                            id="input-dropdown-addon"
                                            title={this.state.action}
                                        >
                                            <MenuItem eventKey="Start">Start</MenuItem>
                                            <MenuItem eventKey="Stop">Stop</MenuItem>
                                        </DropdownButton>
                                        <FormControl type="text" placeholder="Subject" onChange={this.handleStartStopSubjectChange} />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup bsSize="large">
                                    <FormControl name="CheerTextControl" type="text" placeholder="description" onChange={this.handleStartStopTextChange} />
                                </FormGroup>
                            </form>
                            <Button bsStyle="primary" onClick={this.sendStartStop} >Send</Button>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>

                {this.state.allStartStop.map((ss: any, i: any) => {
                    // Return the element. Also pass key     
                    return (
                        <Panel key={i} bsStyle={cardClass[ss.title]} >
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