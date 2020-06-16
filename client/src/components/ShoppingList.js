import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropsTypes from 'prop-types';

class ShoppingList extends Component {

    static PropsTypes = {
        getItems: PropsTypes.func.isRequired,
        item: PropsTypes.object.isRequired,
        isAuthenticated: PropsTypes.bool
    }

    componentDidMount() {
        this.props.getItems();
    }

    deleteItem = id => {
        this.props.deleteItem(id); 
    }

    render() {
        const { items } = this.props.item;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({_id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    { this.props.isAuthenticated ? <Button
                                    className="remove-btn mr-2"
                                    color="danger"
                                    size="sm"
                                    onClick={this.deleteItem.bind(this, _id)}
                                    >&times;
                                    </Button> : '' }
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

const mapStateToProps = (state) =>({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { getItems, deleteItem }
)(ShoppingList);