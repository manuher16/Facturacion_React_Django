import React, { useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import ItemClient from './ItemClient';
const ListClients = (props) => {
    const [clients] = useState(props.clients);
    const list = []

    for (let i = 0; i < clients.length; i++) {
        list.push(<ItemClient key={i} client={clients[i]} />)
    }
    return (
        <ListGroup>
            {list}
        </ListGroup>

    );
};
export default ListClients;