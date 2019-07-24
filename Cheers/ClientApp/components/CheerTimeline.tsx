import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Modal, OverlayTrigger, Popover, Tooltip, FormGroup, InputGroup, FormControl, Panel } from 'react-bootstrap';
import { Pane } from 'react-bootstrap/lib/Tab';

export class CheerTimeline extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props);

        this.handleCheerTextChange = this.handleCheerTextChange.bind(this);
        this.handleCheerToInputText = this.handleCheerToInputText.bind(this);
        this.sendCheer = this.sendCheer.bind(this);
        this.getAllCheers = this.getAllCheers.bind(this);

        this.state = {
            allCheers: [],
            cheerPanel: false,
            userName: "",
            cheerTo: '',
            cheerText: '',
            UPN: '',
            allUsers: []
        };
    }

    componentDidMount() {

        let that = this;

        this.getAllCheers();
     
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

        fetch('api/Account/GetAllUsers')
            .then(function (response) {
                // The response is a Response instance.
                // You parse the data into a useable format using `.json()`
                return response.json();

            }).then(function (data) {
                console.log(data);

                that.setState({
                    allUsers: data.allUsers
                });

            });


    }

    getAllCheers(){
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

    handleCheerToInputText(e: any) {

        this.setState({ cheerTo: e.target.value });
    }
    handleCheerTextChange(e: any) {
        this.setState({ cheerText: e.target.value });
    }

    sendCheer() {

        let that = this;
        fetch('api/CheerTimeline/SendCheer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                CheerFrom: this.state.UPN,
                CheerTo: this.state.cheerTo,
                CheerTime: new Date().toISOString(),
                CheerText: this.state.cheerText
            })
        }).then(function (data) {
            console.log(that.state.cheerTo + " - " + that.state.cheerText);
            that.setState({ cheerPanel: false });
            that.getAllCheers();
        });
    }

    public render() {

        return (
            <div>
                <h1>Cheer Timeline</h1>
                <Button bsStyle="primary" onClick={() => this.setState({ cheerPanel: !this.state.cheerPanel })}>
                    Send a Cheer!
                </Button>

                <Panel id="collapsible-panel-example-1" expanded={this.state.cheerPanel}>
                    <Panel.Collapse>
                        <Panel.Body>
                            <form>
                                <FormGroup>
                                    <InputGroup>
                                        <InputGroup.Addon>To:</InputGroup.Addon>
                                        <FormControl componentClass="select" placeholder="select" onChange={this.handleCheerToInputText}>
                                            <option value="select">Select</option>
                                            {this.state.allUsers.map((user: any, i: any) => {
                                                // Return the element. Also pass key     
                                                return (<option key={i} value={user.upn}>{user.fullName}</option>)
                                            })}
                                        </FormControl>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup bsSize="large">
                                    <FormControl name="CheerTextControl" type="text" placeholder="type here" onChange={this.handleCheerTextChange} />
                                </FormGroup>
                            </form>
                            <Button bsStyle="primary" onClick={this.sendCheer}>Send</Button>
                        </Panel.Body>
                    </Panel.Collapse>
                </Panel>

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

