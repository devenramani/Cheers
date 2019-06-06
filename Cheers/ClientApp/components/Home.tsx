import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Button, Modal, OverlayTrigger, Popover, Tooltip, FormGroup, InputGroup, FormControl } from 'react-bootstrap';


export class Home extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.sendCheer = this.sendCheer.bind(this);
        this.handleCheerTextChange = this.handleCheerTextChange.bind(this);
        this.handleCheerToInputText = this.handleCheerToInputText.bind(this);

        this.state = {
            userName: "",
            show: false,
            cheerTo: '',
            cheerText: '',
            UPN: '',
            allUsers: []
        };
    }

    componentDidMount() {
        let that = this;
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

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
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
                CheerTime: "time",
                CheerText: this.state.cheerText
            })
        }).then(function (data) {
            console.log(that.state.cheerTo + " - " + that.state.cheerText);
            that.setState({ show: false });
        });
    }

    public render() {
        return <div>
            <h1>Hello {this.state.userName}</h1>

            <Button bsStyle="primary" onClick={this.handleShow}>
                Send a Cheer!
            </Button>

            <Modal show={this.state.show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cheer!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <InputGroup>
                            <InputGroup.Addon>To: </InputGroup.Addon>
                            <FormControl componentClass="select" placeholder="select" onChange={this.handleCheerToInputText}>
                            <option value="select">Select</option>
                                {this.state.allUsers.map((user: any, i: any) => {
                                    // Return the element. Also pass key     
                                    return (<option key={i} value={user.upn}>{user.upn}</option>)
                                })}
                            </FormControl>
                        </InputGroup>
                        <FormGroup bsSize="large">
                            <FormControl name="CheerTextControl" type="text" placeholder="type here"  onChange={this.handleCheerTextChange} />
                        </FormGroup>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.sendCheer}>Send</Button>
                    <Button onClick={this.handleClose}>Close</Button>
                </Modal.Footer>
            </Modal>

        </div>;



    }
}
