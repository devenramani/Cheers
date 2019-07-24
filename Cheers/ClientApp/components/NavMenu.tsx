import * as React from 'react';
import { Link, NavLink } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>Cheers</Link>
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink to={ '/' } exact activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/cheertimeline' } activeClassName='active'>
                                <span className='glyphicon 	glyphicon glyphicon-time'></span> Cheer Timeline
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/startstop' } activeClassName='active'>
                                <span className='glyphicon 	glyphicon glyphicon-list-alt'></span> Start/Stop
                            </NavLink>
                        </li>
                        <li>
                            <a href={'/AzureAd/Account/SignOut'} >
                                <span className='glyphicon glyphicon-log-out'></span> Sign Out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
