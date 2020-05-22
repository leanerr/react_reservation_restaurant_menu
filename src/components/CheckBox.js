import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import {Col,Row} from 'react-grid-system';
import axios from 'axios';

class CheckBox extends Component {
    constructor (props) {
        super(props);
        this.state = {
            cSelected: [],



        };


        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
    }


    onCheckboxBtnClick(selected) {
        const index = this.state.cSelected.indexOf(selected);
        if (index < 0) {
            this.state.cSelected.push(selected);
        } else {
            this.state.cSelected.splice(index, 1);
        }
        this.setState({ cSelected: [...this.state.cSelected] });
    }
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div className="panel" style={{}}>


                <Row>
                    <Col xs={12} sm={12} md={12} lg={12}>
                        <h1 >هردوهو</h1>
                        <hr/>
                        <form className="formcheck"  onSubmit={this.handleSubmit.bind(this)} >

                            <input type="checkbox" name="vehicle" value=" " style={{display:'CheckBox' ,padding:10 ,margin:10}}   color="primary" onClick={() => this.onCheckboxBtnClick('شنبه')} active={this.state.cSelected.includes('شنبه')} /><span>شنبه</span><span></span><br/>

                            <input type="checkbox" name="vehicle" value=" " style={{display:'CheckBox' ,padding:10 ,margin:10}}  color="primary" onClick={() => this.onCheckboxBtnClick('یکشنبه')} active={this.state.cSelected.includes('یکشنبه')} /> یکشنبه<br/>

                            <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick('دوشنبه')} active={this.state.cSelected.includes(' دوشنبه')} />  دوشنبه
                            <br/>
                            <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick('سه شنبه')} active={this.state.cSelected.includes(' سه شنبه')} /> سه شنبه
                            <br/>
                            <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick('چهارشنبه')} active={this.state.cSelected.includes('چهارشنبه')} /> چهارشنبه
                            <br/>
                            <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick('پنج شنبه')} active={this.state.cSelected.includes('پنج شنبه')} /> پنج شنبه
                            <br/>
                            <hr/>
                            <button  style={{padding:10 ,margin:5}} color="primary" type="submit">send</button>
                            <button  style={{padding:10 ,margin:5}} type="submit" onClick={()=>{
                                this.setState({auth:false});
                                localStorage.removeItem('token');
                            }}>LogOut</button>
                        </form>
                    </Col>

                    <Col xs={12} sm={12} md={12} lg={12}>
                        <h3>Selected: {JSON.stringify(this.state.cSelected)}</h3>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default CheckBox;