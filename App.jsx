import React from 'react';


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '0',
    };
  }
  CLR(estado) {
    estado = '0';
    return (estado);
  }
  BCK(estado) {
    let num = estado.substring(0,estado.indexOf('<<'));
    estado = estado.substring(0,num.length-1);
    if(estado.length === 0){
      estado = 0;
    }
    return (estado);
  }
  separador(operador, estado) {
    const A = estado.substring(0, estado.indexOf(operador));
    const B = estado.substring(estado.indexOf(operador) + 1, estado.length - 1);
    const operadores = [A, B];
    // // // console.log(operadores);
    return operadores;
  }
  suma(operadores) {
    return parseFloat(operadores['0']) + parseFloat(operadores['1']);
  }
  resta(operadores) {
    return parseFloat(operadores['0']) - parseFloat(operadores['1']);
  }
  mult(operadores) {
    return parseFloat(operadores['0']) * parseFloat(operadores['1']);
  }
  divi(operadores) {
    return parseFloat(operadores['0']) / parseFloat(operadores['1']);
    
  }
  OPERACIONES(estado) {
    if (estado.includes('+')) {
      const operadores = this.separador('+', estado);
      estado = this.suma(operadores);
      // console.log(estado);
    } else if (estado.includes('-')) {
      const operadores = this.separador('-', estado);
      estado = this.resta(operadores);
      // console.log(estado);
    } else if (estado.includes('*')) {
      const operadores = this.separador('*', estado);
      estado = this.mult(operadores);
      // console.log(estado);
    } else if (estado.includes('%')) {
      const operadores = this.separador('%', estado);
      estado = this.divi(operadores);
      // console.log(estado);
    }else {
      estado = estado.substring(0, estado.length - 1);
    }
    
    return estado;
  
  }
  ONCLICK(numero) {
    let estado = '';
    if (this.state.display === '0') {
      if (numero === '=' || numero === '+' || numero === '*' || numero === '-' || numero === 'CLR') {
        estado = '0';
      } else if (numero === '.') {
        estado = '0.';
      } else {
        estado = numero;
      }
    }
    if (this.state.display !== '0') {
      estado = this.state.display + '' + numero;
      if (numero === 'CLR') {
        // // console.log(numero);
        estado = this.CLR(estado);
      }else if (numero === '<<') {
        // // console.log(numero);
        estado = this.BCK(estado);
      } else if (numero === '=') {
        // // console.log(numero);
        if(this.OPERACIONES(estado) > 999999999){
          estado = 'ERROR'
        }else{
          estado = this.OPERACIONES(estado);
        }
        
      }
    }
    if(estado > 99999999 ){
      this.setState({ display: estado.substring(0,9)});
    }else{
      this.setState({ display: estado });
    }
    // // console.log('holi', numero);
  }
  renderDisplay() {
  }
  render() {
    const botoncitos = [];
    const operaciones = [];
    for(let i = 1; i < 10; i = i + 1) {
      botoncitos.push(<Botoncitos ONCLICK={this.ONCLICK.bind(this)} number = {i}/>);
    }
    botoncitos.push(<Botoncitos ONCLICK= {this.ONCLICK.bind(this)} number = '0'/>);
    botoncitos.push(<Botoncitos ONCLICK= {this.ONCLICK.bind(this)} number = '.'/>);
    botoncitos.push(<Botoncitos ONCLICK= {this.ONCLICK.bind(this)} number = '%'/>);
    operaciones.push(<Botoncitos ONCLICK= {this.ONCLICK.bind(this)} number = '+'/>);
    operaciones.push(<Botoncitos ONCLICK= {this.ONCLICK.bind(this)} number = '-'/>);
    operaciones.push(<Botoncitos ONCLICK= {this.ONCLICK.bind(this)} number = '*'/>);
    operaciones.push(<Botoncitos ONCLICK= {this.ONCLICK.bind(this)} number = '='/>);

    return (
     <div className={'container'} style = {{}}>
      <div>
       <Titulo />
      </div>
      <div className={'input-field col s6'}>
       <Pantallita display={this.state.display} renderDisplay={this.renderDisplay}/>
      </div>
      <div style={{ display:"grid",gridTemplateColumns: "160px 160px",gridTemplateRows: "55px  " }}>
        <Botoncitos ONCLICK={this.ONCLICK.bind(this)} number = 'CLR'/>
        <Botoncitos ONCLICK={this.ONCLICK.bind(this)} number = '<<'/>
      </div>
      <div style={{ display:"grid",gridTemplateColumns: "240px 80px  ",gridTemplateRows: "320px  " }}>
       <div style={{ display:"grid",gridTemplateColumns: "80px 80px 80px ",gridTemplateRows: "55px 55px 55px 55px " }}>
        {botoncitos}
       </div>
       <div style={{ display:"grid",gridTemplateColumns: "80px  ",gridTemplateRows: "55px 55px 55px 55px " }}>
        {operaciones}
       </div>
      </div>
     </div>
    );
  }
}
class Pantallita extends React.Component {
  render() {
    return(
      <input  style={{width:"320px"}} type="text" name="pantallita" value={this.props.display} onChange={this.props.renderDisplay} />
	  );
  }
}
class Botoncitos extends React.Component {
  onclickN() {
    this.props.ONCLICK(this.props.number);
  }
  render() {
    return (
      <button className={'waves-effect waves-purple btn-large'}  onClick={this.onclickN.bind(this)}>{this.props.number}</button>
    );
  }
}
class Titulo extends React.Component {
  render() {
    return (
      <h1 className="header teal-text text-pink">Calculadora</h1>
    );
  }
}
