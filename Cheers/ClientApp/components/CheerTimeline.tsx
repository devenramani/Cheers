import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Button, Modal, OverlayTrigger, Popover, Tooltip, FormGroup, InputGroup, FormControl } from 'react-bootstrap';

export class CheerTimeline extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
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
                                <FormControl type="text" />
                            </InputGroup>
                            <FormGroup bsSize="large">
                                <FormControl type="text" placeholder="Large text" />
                            </FormGroup>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="primary" onClick={this.handleClose}>Send</Button>
                        <Button onClick={this.handleClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

