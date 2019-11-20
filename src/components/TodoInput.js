import React, { Component } from 'react'

export default class TodoInput extends Component {
  render() {
    const {item, handleChange, handleSubmit, editItem} = this.props
    return <div className="card card-body my-3">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text bg-primary text-white">
              <i className="fa fa-book" />
            </div>

          </div>
          <input
          type="text"  id=""
          className="form-control"
          placeholder="Add Todo Item"
          value={item}
          onChange={handleChange}/>
        </div>
        <button type="submit" className="btn btn-block btn-primary mt-3 text-uppercase">
        add Item
        </button>

      </form>
    </div>

  }
}
