import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Modal, OverlayTrigger, Popover, Tooltip, FormGroup, InputGroup, FormControl } from 'react-bootstrap';

export class CheerTimeline extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.sendCheer = this.sendCheer.bind(this);
        this.handleCheerTextChange = this.handleCheerTextChange.bind(this);
        this.handleCheerToInputText = this.handleCheerToInputText.bind(this);

        this.state = {
            show: false,
            cheerTo: '',
            cheerText: ''
        };
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
        console.log(this.state.cheerTo + " - " + this.state.cheerText);
        
    }

    public render() {

        return (
            <div>
                <h1>Timeline</h1>

                <Button bsStyle="primary" onClick={this.handleShow}>
                    Send Cheer
              </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Cheer!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <InputGroup>
                                <InputGroup.Addon>To: </InputGroup.Addon>
                                <FormControl type="text" onChange={this.handleCheerToInputText} />
                            </InputGroup>
                            <FormGroup bsSize="large">
                                <FormControl name="CheerTextControl" type="text" placeholder="Large text" onChange={this.handleCheerTextChange} />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.sendCheer}>Send</Button>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

