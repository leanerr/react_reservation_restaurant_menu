import React,{Component} from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import axios from 'axios';
import {Col,Row} from 'react-grid-system';
import CheckBox from "./CheckBox";
let moment = require('moment-jalaali');
moment().format('jYYYY/jM/jD');

export default class Week extends Component {
    constructor(props) {
        super(props);
        this.handleDayClick = this.handleDayClick.bind(this);

        this.state = {
            article : [{day:0},{day:0},{day:0},{day:0},{day:0},{day:0},{day:0},{day:0},{day:0},{day:0},{day:0},{day:0},{day:0},{day:0},{day:0},{day:0}],
            counts : [{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0},{count:0}],
            cSelected: [],
            cSelected2: [],
            days: [],
            days2: [],
            shit:true,
            selectedDays: [],
            auth : false,
            errors:[]
        };
        this.onCheckboxBtnClick = this.onCheckboxBtnClick.bind(this);
    }

    // componentWillMount(){
    //     if(!this.auth()){
    //         return
    //     }
    //     let token = localStorage.getItem('token');
    //     this.getOrders(token);
    //
    // }





    componentWillMount(){
         setTimeout("location.reload();",23000,);






        if(!this.auth()){
            return



        }

        let token = localStorage.getItem('token');
        this.getOrders(token);
        axios.post(`http://185.94.98.187:3020/api/v2/getfoodname2`,{token})
            .then( response => {





                this.setState({
                    article : response.data.menus
                });

            console.log(this.state.article)

            })
            .catch( error => {
                console.log(error);
            })

    }



    componentDidMount() {



        if(!this.auth()){
            return
           this.load();

        }


        let token = localStorage.getItem('token');
        this.getOrders(token);
        axios.post(`http://185.94.98.187:3020/api/v2/getsevenuser?token=${token}`)
            .then( response => {


                this.setState({
                   counts: response.data.data

                });
            console.log(response);
            console.log(this.state.counts[0].count) ;
            console.log(this.state.counts);
            })
            .catch( error => {
                console.log(error);
            })

    }


////////////////////////////////////////////////





    getOrders(token){
        axios.post(`http://185.94.98.187:3020/api/getsevenuser?token=${token}`)
            .then((response)=> {
                const date = [];
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
    load() {
        window.onload = function () {
            if (!localStorage.justOnce) {
                localStorage.setItem("justOnce", "true");
                window.location.reload();
            }
        }
    }
    auth(){
        let token = localStorage.getItem('token');
        console.log(token);
        if(!token){
            return false
        }
        this.setState({auth:true});
        return true;


    }
    /////////////////////////////////////////////////////

    onCheckboxBtnClick(selected) {
        const index = this.state.cSelected.indexOf(selected);
        if (index < 0) {
            this.state.cSelected.push(selected);
        } else {
            this.state.cSelected.splice(index, 1);
        }
        this.setState({ cSelected: [...this.state.cSelected] });
        console.log(this.state.cSelected);
    }
    onCheckboxBtnClick2(unselected) {
        const index = this.state.cSelected2.indexOf(unselected);
        if (index < 0) {
            this.state.cSelected2.push(unselected);
        } else {
            this.state.cSelected2.splice(index, 1);
        }
        this.setState({
            cSelected2: [...this.state.cSelected2]
        });
        console.log(this.state.cSelected2);

    }


    //////////////////////////////////////////////////
//     onClick1(day){
//       day = `${day.getFullYear()}/${day.getMonth()+1}/${day.getDate()}`;
//         let token = localStorage.getItem('token');
//         axios.post(`http://185.94.98.187:3020/api/v2/rmvorder?token=${token}`, { "days":[day] } ,{})
//             .then((response)=> {
//             })
//             .catch((error)=> {
//                 console.log(error);
//             });
//
//
//
// }
//     onClick2(){
//         let selectedDaysrefactor = this.state.selectedDays.map(day=>{
//             return `${day.getFullYear()}/${day.getMonth()+1}/${day.getDate()}`;
//
//         });
//         let token = localStorage.getItem('token');
//         const params = {
//             days: selectedDaysrefactor,
//         };
//
//         axios.post(`http://185.94.98.187:3020/api/addorder?token=${token}`, { "days":selectedDaysrefactor } ,{})
//             .then((response)=> {
//                 console.log(response.data);
//             })
//             .catch((error)=> {
//                 console.log(error);
//             });
//
//     }


    handleSubmit(event ,day) {
        event.preventDefault();

        let token = localStorage.getItem('token');
        let days = this.state.cSelected;


        console.log(days);axios.post(`http://185.94.98.187:3020/api/v2/addorder?token=${token}`, { days : days } )
            .then((response)=> {

                this.setState({
                    errors : [" اضافه ها ارسال شد  "]

                })
                console.log(this.state.errors);
            })
            .catch((error)=> {
                console.log(error);
            });



        console.log(this.state);


        ////////////



        this.days = this.state.cSelected2;
            console.log(days);


        axios.post(`http://185.94.98.187:3020/api/v2/rmvorder?token=${token}`, { days:this.days })
            .then((response)=> {

                this.setState({
                    errors : [" حذفیها ارسال شد  "]

                })
                console.log(this.state.errors);

            })
            .catch((error)=> {
                console.log(error);
            });
    }





    handleDayClick(day, { selected }) {
        const { selectedDays } = this.state ;
        if (selected) {
            const selectedIndex = selectedDays.findIndex(selectedDay =>
                DateUtils.isSameDay(selectedDay, day)
            );
            selectedDays.splice(selectedIndex, 1);
            this.onClick1(day);

        } else {
            selectedDays.push(day);
            this.onClick2();


        }
        this.setState({ selectedDays });


        console.log(this.state.selectedDays);
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
        axios.post(`http://185.94.98.187:3020/api/v2/login`,userData)
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

    render()
    {



        switch (new Date().getDay()) {
            case 0  : {
                return (
                    <div>

                        {
                            this.state.auth == true ? (

                                <div className="panel" style={{}}>


                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <h1>هردوهو</h1>
                                            <hr/>
                                            <form className="formcheck" onSubmit={this.handleSubmit.bind(this)}>

                                                {
                                                        this.state.counts[19].count ===1  ? (<input type="checkbox" name="vehicle" value=" "
                                                                                                    defaultChecked
                                                                             style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                                             color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[6].daymilady}`)}
                                                                             active={this.state.cSelected2.includes(`${this.state.article[6].daymilady}`)}/>)
                                                    :(<input type="checkbox" name="vehicle" value=" "

                                                             style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                             color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[6].daymilady}`)}
                                                             active={this.state.cSelected.includes(`${this.state.article[6].daymilady}`)}/>)}
                                                <span>شنبه</span><span>{this.state.article[6].day}:{this.state.article[6].name}</span><br/>
                                                    {/*///2//*/}

                                                {
                                                    this.state.counts[20].count===1 ? (
                                                        <input type="checkbox"
                                                               defaultChecked
                                                               name="vehicle" value=" "
                                                               style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                               color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[7].daymilady}`)}
                                                               active={this.state.cSelected2.includes(`${this.state.article[7].daymilady}`)}/>
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "

                                                               style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                               color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[7].daymilady}`)}
                                                               active={this.state.cSelected.includes(`${this.state.article[7].daymilady}`)}/>
                                                    )
                                                }

                                      <span>یکشنبه</span><span>{this.state.article[7].day}:{this.state.article[7].name}</span><br/>
{/*///////////////////3/////*/}

                                                {
                                                    this.state.counts[21].count===1 ?  (
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                               color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[8].daymilady}`)}
                                                               active={this.state.cSelected2.includes(`${this.state.article[8].daymilady}`)}/>
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "

                                                               style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                               color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[8].daymilady}`)}
                                                               active={this.state.cSelected.includes(`${this.state.article[8].daymilady}`)}/>
                                                    )

                                                }
                                         <span>دوشنبه</span><span>{this.state.article[8].day}:{this.state.article[8].name}</span>
                                                <br/>

                                                {/*4*/}

                                                {
                                                        this.state.counts[22].count===1 ? (
                                                            <input type="checkbox" name="vehicle" value=" "
                                                                   defaultChecked
                                                                   style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                                   color="primary"
                                                                   onClick={() => this.onCheckboxBtnClick2(`${this.state.article[9].daymilady}`)}
                                                                   active={this.state.cSelected2.includes(`${this.state.article[9].daymilady}`)}/>
                                                        ):(
                                                            <input type="checkbox" name="vehicle" value=" "

                                                                   style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                                   color="primary"
                                                                   onClick={() => this.onCheckboxBtnClick(`${this.state.article[9].daymilady}`)}
                                                                   active={this.state.cSelected.includes(`${this.state.article[9].daymilady}`)}/>
                                                        )
                                                }
                                       {/*5*/}
                                       <span>سه شنبه</span><span>{this.state.article[9].day}:{this.state.article[9].name}</span>
                                                <br/>

                                                {
                                                       this.state.counts[23].count===1 ? (
                                                           <input type="checkbox" name="vehicle" value=" "
                                                                  defaultChecked
                                                                  style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                                  color="primary"
                                                                  onClick={() => this.onCheckboxBtnClick2(`${this.state.article[10].daymilady}`)}

                                                                  active={this.state.cSelected2.includes(`${this.state.article[10].daymilady}`)}/>
                                                       ) :(
                                                           <input type="checkbox" name="vehicle" value=" "

                                                                  style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                                  color="primary"
                                                                  onClick={() => this.onCheckboxBtnClick(`${this.state.article[10].daymilady}`)}

                                                                  active={this.state.cSelected.includes(`${this.state.article[10].daymilady}`)}/>
                                                       )
                                                }

                                              <span>چهارشنبه</span><span>{this.state.article[10].day}:{this.state.article[10].name}</span>
                                                <br/>

                                                {
                                                    this.state.counts[24].count===1   ? (
                                                            <input type="checkbox" name="vehicle" value=" "
                                                                   defaultChecked
                                                                   style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                                   color="primary"
                                                                   onClick={() => this.onCheckboxBtnClick2(`${this.state.article[11].daymilady}`)}
                                                                   active={this.state.cSelected2.includes(`${this.state.article[11].daymilady}`)}/>
                                                    ):
                                                        (
                                                            <input type="checkbox" name="vehicle" value=" "

                                                                   style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                                   color="primary"
                                                                   onClick={() => this.onCheckboxBtnClick(`${this.state.article[11].daymilady}`)}
                                                                   active={this.state.cSelected.includes(`${this.state.article[11].daymilady}`)}/>
                                                        )


                                                }

                                       <span>پنج شنبه</span><span>{this.state.article[11].day}:{this.state.article[11].name}</span>
                                                <br/>
                                                <hr/>
                                                <button style={{padding: 10, margin: 5}} color="primary" type="submit">
                                                    send
                                                </button>
                                                <button style={{padding: 10, margin: 5}} type="submit" onClick={() => {
                                                    this.setState({auth: false});
                                                    localStorage.removeItem('token');
                                                }}>LogOut
                                                </button>
                                            </form>
                                        </Col>

                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <h3>Selected: {JSON.stringify(this.state.cSelected)}</h3>
                                        </Col>
                                    </Row>
                                </div>


                            ) : (
                                <div className="wellcome">
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12}>

                                            <h1>Weekly Food Calendar </h1>

                                            <h2>PNX and Q</h2>
                                        </Col>
                                    </Row>


                                    {
                                        this.state.errors.map((error, i) => {
                                            return <h5 key={i}>{error}</h5>
                                        })
                                    }
                                    <div>
                                        <Row>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <form action="" className="form">

                                                    <input style={{padding: "5px", margin: 5}} ref={(input) => {
                                                        this.username = input
                                                    }} type="text" className="typ"
                                                           placeholder="username"/><br/>
                                                    {/*  <input style={{padding:"5px",margin:5}} ref={(input)=>{this.name=input}} type="text" className="typ"
                                                               placeholder="Name"/><br/>*/}
                                                    <input style={{padding: "5px", margin: 5}} ref={(input) => {
                                                        this.password = input
                                                    }} type="text" className="submit"
                                                           placeholder="Password"/><br/>


                                                    <button style={{padding: "10px", margin: 5}} type="submit"
                                                            onClick={this.handleLogin.bind(this)}>login
                                                    </button>

                                                    {/*    <button style={{padding:"10px",margin:5}} type="submit" onClick={this.handleRegister.bind(this)}>register</button>*/}


                                                </form>
                                            </Col>
                                        </Row>

                                    </div>


                                </div>
                            )
                        }

                    </div>
                )


            }
            case 1  : {
                return (
                    <div>

                        {
                            this.state.auth == true ? (

                                <div className="panel" style={{}}>


                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <h1>هردوهو</h1>
                                            <hr/>
                                            <form className="formcheck" onSubmit={this.handleSubmit.bind(this)}>



                                                {
                                                    this.state.counts[18].count===1 ?
                                                        (
                                                            <input type="checkbox" name="vehicle" value=" "
                                                                   defaultChecked
                                                                   style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                                   color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[5].daymilady}`)}
                                                                   active={this.state.cSelected2.includes(`${this.state.article[5].daymilady}`)}
                                                                   />
                                                        ):
                                                        (
                                                            <input type="checkbox" name="vehicle" value=" "
                                                                   style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                                   color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[5].daymilady}`)}
                                                                   active={this.state.cSelected.includes(`${this.state.article[5].daymilady}`)}/>
                                                        )

                                                }

                                              <span>شنبه</span><span>{this.state.article[5].day}:{this.state.article[5].name}</span><br/>


                                                {/*2*/}




                                                {
                                                    this.state.counts[19].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                               color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[6].daymilady}`)}
                                                               active={this.state.cSelected2.includes(`${this.state.article[6].daymilady}`)}/>
                                                        ) :(
                                                            <input type="checkbox" name="vehicle" value=" "
                                                                   style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                                   color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[6].daymilady}`)}
                                                                   active={this.state.cSelected.includes(`${this.state.article[6].daymilady}`)}/>
                                                        )
                                                }


                                                <span>یکشنبه</span><span>{this.state.article[6].day}:{this.state.article[6].name}</span><br/>
                                                {/*3*/}

                                                {
                                                    this.state.counts[20].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                               color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[7].daymilady}`)}
                                                               active={this.state.cSelected2.includes(`${this.state.article[7].daymilady}`)}/>
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                               color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[7].daymilady}`)}
                                                               active={this.state.cSelected.includes(`${this.state.article[7].daymilady}`)}/>
                                                    )
                                                }
                                               <span>دوشنبه</span><span>{this.state.article[7].day}:{this.state.article[7].name}</span>

                                                {/*4*/}

                                                <br/>

                                                {
                                                    this.state.counts[21].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                               color="primary"
                                                               onClick={() => this.onCheckboxBtnClick2(`${this.state.article[8].daymilady}`)}
                                                               active={this.state.cSelected2.includes(`${this.state.article[8].daymilady}`)}/>
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                               color="primary"
                                                               onClick={() => this.onCheckboxBtnClick(`${this.state.article[8].daymilady}`)}
                                                               active={this.state.cSelected.includes(`${this.state.article[8].daymilady}`)}/>
                                                    )
                                                }

                                                <span>سه شنبه</span><span>{this.state.article[8].day}:{this.state.article[8].name}</span>
                                                <br/>
                                                {/*5*/}
                                                {
                                                    this.state.counts[22].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                               color="primary"
                                                               onClick={() => this.onCheckboxBtnClick2(`${this.state.article[9].daymilady}`)}
                                                               active={this.state.cSelected2.includes(`${this.state.article[9].daymilady}`)}/>
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                               color="primary"
                                                               onClick={() => this.onCheckboxBtnClick(`${this.state.article[9].daymilady}`)}
                                                               active={this.state.cSelected.includes(`${this.state.article[9].daymilady}`)}/>
                                                    )
                                                }

                                         <span>چهارشنبه</span><span>{this.state.article[9].day}:{this.state.article[9].name}</span>
                                                <br/>

                                                {/*6*/}

                                                {
                                                    this.state.counts[23].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                               color="primary"
                                                               onClick={() => this.onCheckboxBtnClick2(`${this.state.article[10].daymilady}`)}
                                                               active={this.state.cSelected2.includes(`${this.state.article[10].daymilady}`)}/>
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               style={{display: 'CheckBox', padding: 10, margin: 10}}
                                                               color="primary"
                                                               onClick={() => this.onCheckboxBtnClick(`${this.state.article[10].daymilady}`)}
                                                               active={this.state.cSelected.includes(`${this.state.article[10].daymilady}`)}/>
                                                    )
                                                }
          <span>پنج شنبه</span><span>{this.state.article[10].day}:{this.state.article[10].name}</span>
                                                <br/>
                                                <hr/>
                                                <button style={{padding: 10, margin: 5}} color="primary" type="submit">
                                                    send
                                                </button>
                                                <button style={{padding: 10, margin: 5}} type="submit" onClick={() => {
                                                    this.setState({auth: false});
                                                    localStorage.removeItem('token');
                                                }}>LogOut
                                                </button>
                                            </form>
                                        </Col>

                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <h3>Selected: {JSON.stringify(this.state.cSelected)}</h3>
                                        </Col>
                                    </Row>
                                </div>


                            ) : (
                                <div className="wellcome">
                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12}>

                                            <h1>Weekly Food Calendar </h1>

                                            <h2>PNX and Q</h2>
                                        </Col>
                                    </Row>


                                    {
                                        this.state.errors.map((error, i) => {
                                            return <h5 key={i}>{error}</h5>
                                        })
                                    }
                                    <div>
                                        <Row>
                                            <Col xs={12} sm={12} md={12} lg={12}>
                                                <form action="" className="form">

                                                    <input style={{padding: "5px", margin: 5}} ref={(input) => {
                                                        this.username = input
                                                    }} type="text" className="typ"
                                                           placeholder="username"/><br/>
                                                    {/*  <input style={{padding:"5px",margin:5}} ref={(input)=>{this.name=input}} type="text" className="typ"
                                                               placeholder="Name"/><br/>*/}
                                                    <input style={{padding: "5px", margin: 5}} ref={(input) => {
                                                        this.password = input
                                                    }} type="text" className="submit"
                                                           placeholder="Password"/><br/>


                                                    <button style={{padding: "10px", margin: 5}} type="submit"
                                                            onClick={this.handleLogin.bind(this)}>login
                                                    </button>

                                                    {/*    <button style={{padding:"10px",margin:5}} type="submit" onClick={this.handleRegister.bind(this)}>register</button>*/}


                                                </form>
                                            </Col>
                                        </Row>

                                    </div>


                                </div>
                            )
                        }

                    </div>
                )


            }
            case 2  :
            {
                return(
                    <div>

                        {
                            this.state.auth == true ?(

                                <div className="panel" style={{}}>


                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <h1 >هردوهو</h1>
                                            <hr/>
                                            <form className="formcheck"  onSubmit={this.handleSubmit.bind(this)} >


                                                {
                                                        this.state.counts[17].count===1 ?(
                                                            <input type="checkbox" name="vehicle" value=" "
                                                                   defaultChecked
                                                                   style={{display:'CheckBox' ,padding:10 ,margin:10}}   color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[4].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[4].daymilady}`)} />
                                                        ):(
                                                            <input type="checkbox" name="vehicle" value=" " style={{display:'CheckBox' ,padding:10 ,margin:10}}   color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[4].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[4].daymilady}`)} />
                                                        )
                                                }

                                                <span>شنبه</span><span>{this.state.article[4].day}:{this.state.article[4].name}</span><br/>

                                                {/*2*/}
                                                {
                                                    this.state.counts[18].count===1 ? (
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}}  color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[5].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[5].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" " style={{display:'CheckBox' ,padding:10 ,margin:10}}  color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[5].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[5].daymilady}`)} />
                                                    )
                                                }
<span>یکشنبه</span><span>{this.state.article[5].day}:{this.state.article[5].name}</span><br/>

                                                {/*3*/}

                                                {
                                                    this.state.counts[19].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[6].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[6].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[6].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[6].daymilady}`)} />
                                                    )
                                                }
                                            <span>دوشنبه</span><span>{this.state.article[6].day}:{this.state.article[6].name}</span>
                                                <br/>

                                                {/*4*/}
                                                {
                                                    this.state.counts[20].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[7].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[7].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[7].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[7].daymilady}`)} />
                                                    )
                                                }


                                                <span>سه شنبه</span><span>{this.state.article[7].day}:{this.state.article[7].name}</span>
                                                <br/>

                                                {/*5*/}
                                                {
                                                    this.state.counts[21].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[8].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[8].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[8].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[8].daymilady}`)} />
                                                    )

                                                }
                                    <span>چهارشنبه</span><span>{this.state.article[8].day}:{this.state.article[8].name}</span>
                                                <br/>

                                                {/*6*/}

                                                {
                                                    this.state.counts[22].count===1 ? (
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[9].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[9].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[9].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[9].daymilady}`)} />
                                                    )
                                                }
                                                <span>پنج شنبه</span><span>{this.state.article[9].day}:{this.state.article[9].name}</span>
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


                                                    <button style={{padding:"10px",margin:5 }} type="submit" onClick={this.handleLogin.bind(this)}>login</button>

                                                    {/*    <button style={{padding:"10px",margin:5}} type="submit" onClick={this.handleRegister.bind(this)}>register</button>*/}





                                                </form>
                                            </Col>
                                        </Row>

                                    </div>


                                </div>
                            )
                        }

                    </div>
                )
            }case 3  :
            {
                return(
                    <div>

                        {
                            this.state.auth == true ?(

                                <div className="panel" style={{}}>


                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <h1 >هردوهو</h1>
                                            <hr/>
                                            <form className="formcheck"  onSubmit={this.handleSubmit.bind(this)} >

                                                {
                                                    this.state.counts[16].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}}   color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[3].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[3].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" " style={{display:'CheckBox' ,padding:10 ,margin:10}}   color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[3].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[3].daymilady}`)} />
                                                    )
                                                }

 <span>شنبه</span><span>{this.state.article[3].day}:{this.state.article[3].name}</span><br/>

                                                {/*2*/}


                                                {
                                                    this.state.counts[17].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}}  color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[4].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[4].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" " style={{display:'CheckBox' ,padding:10 ,margin:10}}  color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[4].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[4].daymilady}`)} />
                                                    )


                                                }
                                              <span>یکشنبه</span><span>{this.state.article[4].day}:{this.state.article[4].name}</span><br/>
                                                {/*3*/}

                                                {
                                                        this.state.counts[18].count===1 ? (
                                                            <input type="checkbox" name="vehicle" value=" "
                                                                   defaultChecked
                                                                   style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[5].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[5].daymilady}`)} />
                                                        ):(
                                                            <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[5].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[5].daymilady}`)} />
                                                    )
                                                }
                                               <span>دوشنبه</span><span>{this.state.article[5].day}:{this.state.article[5].name}</span>
                                                <br/>

                                                {/*4*/}

                                                {
                                                    this.state.counts[19].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[6].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[6].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[6].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[6].daymilady}`)} />
                                                    )
                                                }

                               <span>سه شنبه</span><span>{this.state.article[6].day}:{this.state.article[6].name}</span>
                                                <br/>


                                                {/*4*/}

                                                {
                                                    this.state.counts[20].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[7].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[7].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[7].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[7].daymilady}`)} />
                                                    )
                                                }
                                               <span>چهارشنبه</span><span>{this.state.article[7].day}:{this.state.article[7].name}</span>
                                                <br/>

                                                {/*4*/}

                                                {
                                                 this.state.counts[21].count===1 ?(
                                                     <input type="checkbox" name="vehicle" value=" "
                                                            defaultChecked
                                                            style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[8].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[8].daymilady}`)} />
                                                 )  :(
                                                     <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[8].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[8].daymilady}`)} />
                                                 )
                                                }

                               <span>پنج شنبه</span><span>{this.state.article[8].day}:{this.state.article[8].name}</span>
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


                                                    <button style={{padding:"10px",margin:5 }} type="submit" onClick={this.handleLogin.bind(this)}>login</button>

                                                    {/*    <button style={{padding:"10px",margin:5}} type="submit" onClick={this.handleRegister.bind(this)}>register</button>*/}





                                                </form>
                                            </Col>
                                        </Row>

                                    </div>


                                </div>
                            )
                        }

                    </div>
                )
            }case 4  :
        {
            return(
                <div>

                    {
                            this.state.auth == true ?(

                                <div className="panel" style={{}}>


                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <h1 >هردوهو</h1>
                                            <hr/>
                                            <form className="formcheck"  onSubmit={this.handleSubmit.bind(this)} >
                                                {
                                                    this.state.counts[15].count===1 ?(
                                                        <input type="checkbox" name="vehicle"  value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}}  color="primary"  onClick={() => this.onCheckboxBtnClick2(`${this.state.article[2].daymilady}`) } active={this.state.cSelected2.includes(`${this.state.article[2].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle"  value=" "   style={{display:'CheckBox' ,padding:10 ,margin:10}}  color="primary"  onClick={() => this.onCheckboxBtnClick(`${this.state.article[2].daymilady}`) } active={this.state.cSelected.includes(`${this.state.article[2].daymilady}`)} />
                                                    )

                                                }


                                                <span>شنبه</span><span>  {this.state.article[2].day}:{this.state.article[2].name}</span><br/>

                                                {/*2*/}

                                                {
                                                    this.state.counts[16].count===1 ?(
                                                        <input type="checkbox" name="vehicle"  value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}}  color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[3].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[3].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle"  value=" " style={{display:'CheckBox' ,padding:10 ,margin:10}}  color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[3].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[3].daymilady}`)} />
                                                    )
                                                }


                               <span>یکشنبه</span><span>{this.state.article[3].day}:{this.state.article[3].name}</span><br/>


                                                {/*3*/}
                                                {this.state.counts[17].count===1 ?(
                                                    <input type="checkbox" name="vehicle" value=" "
                                                           defaultChecked
                                                           style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[4].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[4].daymilady}`)} />
                                                ):(
                                                    <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[4].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[4].daymilady}`)} />
                                                )
                                                }
<span>دوشنبه</span><span>{this.state.article[4].day}:{this.state.article[4].name}</span>
                                                <br/>

                                                {/*4*/}

                                                {
                                                    this.state.counts[18].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[5].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[5].daymilady}`)} />

                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[5].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[5].daymilady}`)} />
                                                    )
                                                }

                                           <span>سه شنبه</span><span>{this.state.article[5].day}:{this.state.article[5].name}</span>
                                                <br/>

                                                {/*5*/}
                                                {
                                                    this.state.counts[19].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[6].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[6].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[6].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[6].daymilady}`)} />
                                                    )

                                                }

<span>چهارشنبه</span><span>{this.state.article[6].day}:{this.state.article[6].name}</span>
                                                <br/>
                                                        {/*6*/}

                                                {
                                                    this.state.counts[20].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2( `${this.state.article[7].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[7].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick( `${this.state.article[7].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[7].daymilady}`)} />
                                                    )
                                                }

                                                <span>پنج شنبه</span><span>{this.state.article[7].day}:{this.state.article[7].name}</span>
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


                                                    <button style={{padding:"10px",margin:5 }} type="submit" onClick={this.handleLogin.bind(this)}>login</button>

                                                    {/*    <button style={{padding:"10px",margin:5}} type="submit" onClick={this.handleRegister.bind(this)}>register</button>*/}





                                                </form>
                                            </Col>
                                        </Row>

                                    </div>


                                </div>
                            )
                        }

                    </div>
                )
            }case 5  :
            {
                return(
                    <div>

                        {
                            this.state.auth == true ?(

                                <div className="panel" style={{}}>


                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <h1 >هردوهو</h1>
                                            <hr/>
                                            <form className="formcheck"  onSubmit={this.handleSubmit.bind(this)} >

                                                {
                                                    this.state.counts[21].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}}   color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[8].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[8].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" " style={{display:'CheckBox' ,padding:10 ,margin:10}}   color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[8].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[8].daymilady}`)} />
                                                    )

                                                }



                                                <span>شنبه</span><span>{this.state.article[8].day}:{this.state.article[8].name}</span><br/>
                                                {/*2*/}
                                                {
                                                    this.state.counts[22].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}}  color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[9].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[9].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" " style={{display:'CheckBox' ,padding:10 ,margin:10}}  color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[9].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[9].daymilady}`)} />
                                                    )
                                                }
                                                <span>یکشنبه</span><span>{this.state.article[9].day}:{this.state.article[9].name}</span><br/>

                                                {/*3*/}
                                                {
                                                    this.state.counts[23].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[10].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[10].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[10].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[10].daymilady}`)} />
                                                    )
                                                }

                                                <span>دوشنبه</span><span>{this.state.article[10].day}:{this.state.article[10].name}</span>
                                                <br/>
                                                {/*4*/}
                                                {
                                                    this.state.counts[24].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[11].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[11].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[11].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[11].daymilady}`)} />
                                                    )
                                                }
                                               <span>سه شنبه</span><span>{this.state.article[11].day}:{this.state.article[11].name}</span>
                                                <br/>
                                                {/*5*/}
                                                {
                                                    this.state.counts[25].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[12].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[12].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[12].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[12].daymilady}`)} />
                                                    )
                                                }
                                                <span>چهارشنبه</span><span>{this.state.article[12].day}:{this.state.article[12].name}</span>
                                                <br/>

                                                {/*6*/}
                                                {
                                                    this.state.counts[26].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[13].daymilady}` )} active={this.state.cSelected2.includes(`${this.state.article[13].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[13].daymilady}` )} active={this.state.cSelected.includes(`${this.state.article[13].daymilady}`)} />
                                                    )

                                                }

                                               <span>پنج شنبه</span><span>{this.state.article[13].day}:{this.state.article[13].name}</span>
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


                                                    <button style={{padding:"10px",margin:5 }} type="submit" onClick={this.handleLogin.bind(this)}>login</button>

                                                    {/*    <button style={{padding:"10px",margin:5}} type="submit" onClick={this.handleRegister.bind(this)}>register</button>*/}





                                                </form>
                                            </Col>
                                        </Row>

                                    </div>


                                </div>
                            )
                        }

                    </div>
                )
            }case 6  :
            {
                return(
                    <div>

                        {
                            this.state.auth == true ?(

                                <div className="panel" style={{}}>


                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <h1 >هردوهو</h1>
                                            <hr/>
                                            <form className="formcheck"  onSubmit={this.handleSubmit.bind(this)} >
                                                {
                                                    this.state.counts[20].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}}   color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[7].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[7].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" " style={{display:'CheckBox' ,padding:10 ,margin:10}}   color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[7].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[7].daymilady}`)} />
                                                    )
                                                }
                                                <span>شنبه</span><span>{this.state.article[7].day}:{this.state.article[7].name}</span><br/>


                                                {/*2*/}

                                                {
                                                    this.state.counts[21].count===1 ? (
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}}  color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[8].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[8].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" " style={{display:'CheckBox' ,padding:10 ,margin:10}}  color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[8].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[8].daymilady}`)} />
                                                    )
                                                }


                                               <span>یکشنبه</span><span>{this.state.article[8].day}:{this.state.article[8].name}</span><br/>


                                                {/*3*/}
                                                {this.state.counts[22].count===1 ?(
                                                    <input type="checkbox" name="vehicle" value=" "
                                                           defaultChecked
                                                           style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[9].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[9].daymilady}`)} />
                                                ):(
                                                    <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[9].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[9].daymilady}`)} />
                                                )
                                                }

                                        <span>دوشنبه</span><span>{this.state.article[9].day}:{this.state.article[9].name}</span>
                                                <br/>
                                                {/*4*/}
                                                {
                                                    this.state.counts[23].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[10].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[10].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[10].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[10].daymilady}`)} />
                                                    )
                                                }
                                                <span>سه شنبه</span><span>{this.state.article[10].day}:{this.state.article[10].name}</span>
                                                <br/>
                                                {/*5*/}
                                                {
                                                    this.state.counts[24].count===1 ? (
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[11].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[11].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[11].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[11].daymilady}`)} />
                                                    )
                                                }

                                                <span>چهارشنبه</span><span>{this.state.article[11].day}:{this.state.article[11].name}</span>
                                                <br/>
                                                {/*5*/}
                                                {
                                                    this.state.counts[25].count===1 ?(
                                                        <input type="checkbox" name="vehicle" value=" "
                                                               defaultChecked
                                                               style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick2(`${this.state.article[12].daymilady}`)} active={this.state.cSelected2.includes(`${this.state.article[12].daymilady}`)} />
                                                    ):(
                                                        <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[12].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[12].daymilady}`)} />
                                                    )
                                                }

                                                <span>پنج شنبه</span><span>{this.state.article[12].day}:{this.state.article[12].name}</span>
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


                                                    <button style={{padding:"10px",margin:5 }} type="submit" onClick={this.handleLogin.bind(this)}>login</button>

                                                    {/*    <button style={{padding:"10px",margin:5}} type="submit" onClick={this.handleRegister.bind(this)}>register</button>*/}





                                                </form>
                                            </Col>
                                        </Row>

                                    </div>


                                </div>
                            )
                        }

                    </div>
                )
            }case 7  :
            {
                return(
                    <div>

                        {
                            this.state.auth == true ?(

                                <div className="panel" style={{}}>


                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <h1 >هردوهو</h1>
                                            <hr/>
                                            <form className="formcheck"  onSubmit={this.handleSubmit.bind(this)} >

                                                <input type="checkbox" name="vehicle" value=" " style={{display:'CheckBox' ,padding:10 ,margin:10}}   color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[6].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[6].daymilady}`)} /><span>شنبه</span><span>{this.state.article[6].day}:{this.state.article[6].name}</span><br/>

                                                <input type="checkbox" name="vehicle" value=" " style={{display:'CheckBox' ,padding:10 ,margin:10}}  color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[7].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[7].daymilady}`)} /><span>یکشنبه</span><span>{this.state.article[7].day}:{this.state.article[7].name}</span><br/>

                                                <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[8].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[8].daymilady}`)} /><span>دوشنبه</span><span>{this.state.article[8].day}:{this.state.article[8].name}</span>
                                                <br/>
                                                <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[9].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[9].daymilady}`)} /><span>سه شنبه</span><span>{this.state.article[9].day}:{this.state.article[9].name}</span>
                                                <br/>
                                                <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[10].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[10].daymilady}`)} /><span>چهارشنبه</span><span>{this.state.article[10].day}:{this.state.article[10].name}</span>
                                                <br/>
                                                <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[11].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[11].daymilady}`)} /><span>پنج شنبه</span><span>{this.state.article[11].day}:{this.state.article[11].name}</span>
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


                                                    <button style={{padding:"10px",margin:5 }} type="submit" onClick={this.handleLogin.bind(this)}>login</button>

                                                    {/*    <button style={{padding:"10px",margin:5}} type="submit" onClick={this.handleRegister.bind(this)}>register</button>*/}





                                                </form>
                                            </Col>
                                        </Row>

                                    </div>


                                </div>
                            )
                        }

                    </div>
                )
            }
            default :
            {
                return(
                    <div>

                        {
                            this.state.auth == true ?(

                                <div className="panel" style={{}}>


                                    <Row>
                                        <Col xs={12} sm={12} md={12} lg={12}>
                                            <h1 >هردوهو</h1>
                                            <hr/>
                                            <form className="formcheck"  onSubmit={this.handleSubmit.bind(this)} >

                                                <input type="checkbox" name="vehicle" value=" " style={{display:'CheckBox' ,padding:10 ,margin:10}}   color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[5].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[5].daymilady}`)} /><span>شنبه</span><span>{this.state.article[5].day}</span><br/>

                                                <input type="checkbox" name="vehicle" value=" " style={{display:'CheckBox' ,padding:10 ,margin:10}}  color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[6].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[6].daymilady}`)} /><span>یکشنبه</span><span>{this.state.article[6].day}</span><br/>

                                                <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[7].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[7].daymilady}`)} /><span>دوشنبه</span><span>{this.state.article[7].day}</span>
                                                <br/>
                                                <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[8].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[8].daymilady}`)} /><span>سه شنبه</span><span>{this.state.article[8].day}</span>
                                                <br/>
                                                <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[9].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[9].daymilady}`)} /><span>چهارشنبه</span><span>{this.state.article[9].day}</span>
                                                <br/>
                                                <input type="checkbox" name="vehicle" value=" "  style={{display:'CheckBox' ,padding:10 ,margin:10}} color="primary" onClick={() => this.onCheckboxBtnClick(`${this.state.article[10].daymilady}`)} active={this.state.cSelected.includes(`${this.state.article[10].daymilady}`)} /><span>پنج شنبه</span><span>{this.state.article[10].day}</span>
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


                                                    <button style={{padding:"10px",margin:5 }} type="submit" onClick={this.handleLogin.bind(this)}>login</button>

                                                    {/*    <button style={{padding:"10px",margin:5}} type="submit" onClick={this.handleRegister.bind(this)}>register</button>*/}





                                                </form>
                                            </Col>
                                        </Row>

                                    </div>


                                </div>
                            )
                        }

                    </div>
                )
            }
        }


    }

}
