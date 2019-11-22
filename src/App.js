import React, {
  Component
} from 'react';
import uuid from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.css';
import {  Alert } from 'react-bootstrap';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

class App extends Component {
  state = {
    items: [],
    id: uuid(),
    item: '',
    editItem: false,
    error : false
  };
  handleChange = e => {
    this.setState({
      item: e.target.value,
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    if (this.state.item !== '') {

      const newItem = {
        id: this.state.id,
        title: this.state.item,
      };
      const updatedItems = [...this.state.items, newItem];
      localStorage.setItem('items', JSON.stringify(updatedItems));
      this.setState({
        items: updatedItems,
        item: '',
        id: uuid(),
        editItem: false,
        error: false

      });
    }
    this.setState({
      error: true
    })

  };

  clearList = () => {
    this.setState({
      items: []
    })
    localStorage.clear();

  };
  getLocalStorageData = () => {
    localStorage.getItem('items') && this.setState({
      items: JSON.parse(localStorage.getItem('items')),
    })
  }

  handleDelete = id => {
    const filteredItems = this.state.items.filter((item) => {
      return item.id !== id
    })
    localStorage.setItem('items', JSON.stringify(filteredItems));
    this.setState({
      items: filteredItems
    })
  };
  handleAlertClose = () => {
    this.setState({
      error: false
    })
  }
  handleEdit = id => {
    const filteredItems = this.state.items.filter((item) => {
      return item.id !== id
    })
    const selectedItem = this.state.items.find(item => item.id === id);
    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      id: selectedItem.id,
      editItem: true
    })

  };

  componentDidMount() {
    this.getLocalStorageData()
  }

  render() {
    return (
    <div className = "container">
      <div className = "row">
      <div className = "col-10 mx-auto col-md-8 mt-5">
            <h3 className="text-capitalize text-center" > Todo Input </h3>

            {this.state.error ?
                <Alert variant="danger" onClose={this.handleAlertClose} dismissible>
                <p> Input field can't be blank </p>
                </Alert>
                : null
            }

            <TodoInput item = {
        this.state.item
      }
      handleChange = {
        this.handleChange
      }
      handleSubmit = {
        this.handleSubmit
      }
      editItem = {
        this.state.editItem
      }
      /> <
      TodoList items = {
        this.state.items
      }
      clearList = {
        this.clearList
      }
      handleDelete = {
        this.handleDelete
      }
      handleEdit = {
        this.handleEdit
      }
      /> <
      /div> <
      /div> <
      /div>
    );
  }
}

export default App;