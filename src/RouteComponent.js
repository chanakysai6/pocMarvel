import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CharacterDetail from './CharacterDetail';
import CharacterList from './CharacterList';


const RouteComponent = (props) => {
    return (

        <Router>
            <Routes>
                <Route default path="/" element={<CharacterList />} />
                <Route path="/:id" element={<CharacterDetail {...props} />} />
            </Routes>
        </Router>
    );
}

export default RouteComponent;