import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    inputList: "default",
    listData : []
  };

  componentDidMount() {
    let check = localStorage.getItem("data");
    this.setState({
      listData: (check) ? JSON.parse(localStorage.getItem("data")) : []
    })
  }

  handlerForm = (e) => {
    e.preventDefault();
    //console.log(this.state.inputList);
    this.setState({inputList: ''});

    let list = this.state.listData;
    list.push({
      id: list.length + 1,
      name: this.state.inputList
    });
    
    this.setState({listData: list});

    localStorage.setItem("data", JSON.stringify(this.state.listData));
    
    // this.setState(state => {
    //   inputList: state.inputList
    // });
    // console.log(this.state.inputList);
    
  };

  handleInput = e => {
    this.setState({inputList: e.target.value}); // untuk satuan input
    console.log(e.target.value);
  };

  handleMultipleInput = (e) => {
    this.setState({ [e.target.name] : e.target.value}); // untuk generic input
  }

  handleDelete = (e, id) => {
    let list = this.state.listData;
    let idx = list.map((item) => {
      return item.id;
    }).indexOf(id);
    list.splice(idx, 1);
    this.setState({listData: list});
    localStorage.setItem("data", JSON.stringify(this.state.listData));
    // this.setState(state => {
    //   listData: state.listData.map(item => 
    //     item.id == e.id ? {} : item
    //   )
    // });
  }

  // Items(props) {
  //   const numbers = props.numbers;
  //   const listItems = numbers.map((number) =>
  //     <li>{number}</li>
  //   );
  //   return (
  //     <ul>{listItems}</ul>
  //   );
  // }



  render() {

    // const angka = [1,2,3];

    return (
      <div className="App">
        <header className="App-header">
          <form onSubmit={this.handlerForm} autoComplete="off">
            <input name="inputList" onChange={this.handleInput} type="text" value={this.state.inputList} />
            <label>{this.state.inputList}</label>
          </form>

          <ul>
              {(this.state.listData.length >0 ) ? this.state.listData.map((item) =>
                <li key={item.id}>
                  <div>
                    <input type="checkbox"/>
                    <label>{item.name}</label>
                    <button title={item.id} onClick={(e) => this.handleDelete(e, item.id)}>Hapus</button>
                  </div>
                </li>
              ) : ''}
          </ul>

        </header>
      </div>
    );
  }
}

export default App;
