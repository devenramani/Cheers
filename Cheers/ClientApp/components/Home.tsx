import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Button, Modal, OverlayTrigger, Popover, Tooltip, FormGroup, InputGroup, FormControl } from 'react-bootstrap';


export class Home extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props);

        

        this.state = {
            userName: "",
            UPN: ''            
        };
    }

    componentDidMount() {

        console.log(this.props);

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

       
    }

   


    public render() {
        return <div>
            <h1>Hello {this.state.userName}</h1>
        </div>;



    }
}
