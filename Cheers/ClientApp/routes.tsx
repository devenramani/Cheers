import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import { CheerTimeline } from './components/CheerTimeline';
import { Feedback } from './components/Feedback';
import { StartStop } from './components/StartStop';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
    <Route path='/cheertimeline' component={ CheerTimeline } />
    <Route path='/feedback' component={ Feedback } />
    <Route path='/startstop' component={ StartStop } />
</Layout>;
