import * as React from 'react';
import { RouteComponentProps } from 'react-router';


export class Feedback extends React.Component<RouteComponentProps<{}>, any> {
    constructor(props: any) {
        super(props);

        this.state = {

        };
    }

    public render() {
        return (
            <h1>Feedback</h1>

        );
    }
}