import React from 'react';
import { useSelector } from 'react-redux';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import {ListPets} from "./pages/list-pets/list-pets";
import '../src/pages/list-pets/list-pets-style.scss'

export function Routes() {
    const loading = useSelector(state => state?.loader?.loading);
    return (
        <BrowserRouter>
            <div className="loader-style" id="cover-spin" style={{display:loading ? 'flex':'none'}}/>
            <Switch>
                <Route path="/" exact component={ListPets}/>
                <Route path="**">
                    <Redirect to="/"/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
