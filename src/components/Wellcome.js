import React,{Component} from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import axios from 'axios';
import {Col,Row} from 'react-grid-system';


export default class Week extends Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);

        this.state = {


            selectedDays: [],
            auth : false,
            errors:[]
        };
    }

    componentWillMount(){
        if(!this.auth()){
            return
        }
        let token = localStorage.getItem('token');
        this.getOrders(token);

    }
    getOrders(token){
        axios.post(`http://185.94.98.187:3020/api/getsevenuser?token=${token}`)
            .then((response)=> {
                const date = []
                response.data.data.map(item=>{
                    if(item.count==1){
                        date.push(item.date);
                    }

                });

                let realDate = date.map(item=>{
                    let era = item.split('/');
                    return new Date(era[0], era[1]-1, era[2]);
                });

                this.setState({
                    selectedDays : realDate
                })


            })
            .catch((error)=> {
                console.log(error);
            });
    }

    auth(){
        let token = localStorage.getItem('token');
        if(!token){
            return false
        }
        this.setState({auth:true});
        return true;
    }


    onClick1(day){
        day = `${day.getFullYear()}/${day.getMonth()+1}/${day.getDate()}`;
        let token = localStorage.getItem('token');
        axios.post(`http://185.94.98.187:3020/api/rmvorder?token=${token}`, { "days":[day] } ,{})
            .then((response)=> {
            })
            .catch((error)=> {
                console.log(error);
            });



    }
    onClick2(){
        let selectedDaysrefactor = this.state.selectedDays.map(day=>{
            return `${day.getFullYear()}/${day.getMonth()+1}/${day.getDate()}`;

        });
        let token = localStorage.getItem('token');
        const params = {
            days: selectedDaysrefactor,
        };

        axios.post(`http://185.94.98.187:3020/api/addorder?token=${token}`, { "days":selectedDaysrefactor } ,{})
            .then((response)=> {
                console.log(response.data);
            })
            .catch((error)=> {
                console.log(error);
            });

    }



    handleDayClick(day, { selected }) {
        const { selectedDays } = this.state
        if (selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            selectedDays.splice(selectedIndex, 1)
            this.onClick1(day);

        } else {
            selectedDays.push(day);
            this.onClick2();


        }
        this.setState({ selectedDays });
    }
    handleLogin(e=null){
        if(e){
            e.preventDefault();
        }
        console.log('login');

        let userData = {
            username : this.username.value,
            password : this.password.value
        }
        axios.post(`http://185.94.98.187:3020/api/login`,userData)
            .then((response)=> {
                if(response.data.message == "رمز عبور اشتباه است"){
                    this.setState({
                        errors : ["رمز عبور اشتباه است"]
                    })
                    return
                }
                if(response.data.message == "اطلاعات وارد شده صحیح نیست"){
                    this.setState({
                        errors : ["اطلاعات وارد شده صحیح نیست"]
                    })
                    return
                }
                if(response.data.status == 'failed'){
                    let errors = response.data.data.map(error=>{
                        return error.message
                    });
                    console.log(errors);
                    this.setState({
                        errors
                    })
                    return
                }
                localStorage.setItem('token',response.data.data.token);
                this.auth();
                this.getOrders(response.data.data.token);

            })
            .catch((error)=> {
                console.log(error);
            });
    }

    handleRegister(e){
        e.preventDefault();
        let userData = {
            username : this.username.value,
            password : this.password.value
        }



        axios.post(`http://185.94.98.187:3020/api/register`,userData)
            .then((response)=> {
                if(response.data.message == "این نام کاربری از قبل وجود دارد"){
                    this.setState({
                        errors : ["این نام کاربری از قبل وجود دارد"]
                    })
                    return
                }
                if(response.data.message == "ثبت نام با موفقیت انجام شد"){
                    this.setState({
                        errors : ["ثبت نام با موفقیت انجام شد"]
                    })
                }
                if(response.data.status == 'failed'){
                    let errors = response.data.data.map(error=>{
                        return error.message
                    });
                    console.log(errors);
                    this.setState({
                        errors
                    })
                    return
                }
                this.handleLogin();



            })
            .catch((error)=> {
                console.log(error);
            });
    }
    render() {
        return (
            <div>



                {
                    this.state.auth == true ?(
                        <div className="week">

                            <DayPicker
                                selectedDays={this.state.selectedDays}
                                onDayClick={this.handleDayClick}
                            />

                            <button style={{padding:"10px",margin:5}} type="submit" onClick={()=>{
                                this.setState({auth:false});
                                localStorage.removeItem('token');
                            }}>LogOut</button>


                        </div>

                    ):(
                        <div className="wellcome">
                            <Row>
                                <Col  xs={12} sm={12} md={12} lg={12}>

                                    <h1>Weekly Food Calendar </h1>

                                    <h2>PNX and Q</h2>
                                </Col>
                            </Row>



                            {
                                this.state.errors.map((error,i)=>{
                                    return <h5 key={i}>{error}</h5>
                                })
                            }
                            <div>
                                <Row>
                                    <Col xs={12} sm={12} md={12} lg={12}>
                                        <form  action="" className="form">

                                            <input style={{padding:"5px",margin:5}} ref={(input)=>{this.username=input}} type="text" className="typ"
                                                   placeholder="username"/><br/>
                                            {/*  <input style={{padding:"5px",margin:5}} ref={(input)=>{this.name=input}} type="text" className="typ"
                                                               placeholder="Name"/><br/>*/}
                                            <input style={{padding:"5px",margin:5}} ref={(input)=>{this.password=input}} type="text" className="submit"
                                                   placeholder="Password"/><br/>


                                            <button style={{padding:"10px",margin:5}} type="submit" onClick={this.handleLogin.bind(this)}>login</button>

                                            {/*    <button style={{padding:"10px",margin:5}} type="submit" onClick={this.handleRegister.bind(this)}>register</button>*/}





                                        </form>
                                    </Col>
                                </Row>

                            </div>


                        </div>
                    )
                }

            </div>
        );
    }

}
