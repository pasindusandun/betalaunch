import React, { useState } from 'react'
import '../css/forminput.css'
import { Button, Header, Image, Modal, Checkbox, Form, Dropdown, Message, Divider, Icon } from 'semantic-ui-react'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import axios from "axios";

export default function EditEmployee(props) {
    const CategoryOptions = [
        { key: 1, text: "Female", value: "Female" },
        { key: 2, text: "Male", value: "Male" }
    ]
    const [employee, setEmployee] = useState(props.employee);
    const onSubmitHandler=()=>{
        axios.post(`http://localhost:5000/user/update/${employee._id}`,employee).then((res)=>{
            if(res.data.id){
                props.setEmployees([
                    ...props.employees.filter((emp)=>emp.id != res.data.id),
                    res.data
                ])
                props.setEditOpen(false)
            }
           
          }).catch((err)=>{
            console.log(err)
          })
        // props.setEmployees([
        //     ...props.employes,
        //     employee
        // ])
        console.log(employee)
    }
    return (
        <div>
            <div 
            // style={{ }}
            >
            <h3  style={{ textAlign:'left',paddingLeft:10,paddingTop:10}}>Add People</h3>
            <div style={{textAlign:'right',paddingLeft:10}}>
            <Icon  name='close'></Icon>
            </div>
            
            </div>
            <Divider />
            <Form className="rootdiv" 
            // onSubmit={(e) => { onSubmitHandler(e) }}
            >
                <Form.Field required >
                    <label style={{color:'blue'}}>Full Name</label>
                    <input placeholder='Full Name' name="FullName" type="text"
                    value={employee.FullName}
                    onChange={(e) => setEmployee({ ...employee, FullName: e.target.value })}
                    //   onChange={(e)=>{setQuestionatt({...questionatt,Question:e.target.value})}}
                    />
                </Form.Field>


                <Form.Group widths="equal">
                    <Form.Field required>
                        <label style={{color:'blue'}}>Name With Initials</label>
                        <input placeholder='Name with Initials' name='NameWithInitials' type="text"
                        value={employee.NameWithInitials}
                        onChange={(e) => setEmployee({ ...employee, NameWithInitials:  e.target.value })}
                        //   on={(e)=>{setQuestionatt({...questionatt,Salary:e.target.value})}}
                        />
                    </Form.Field>
                    <Form.Field >
                        <label style={{color:'blue'}}>Prefered / Display Name</label>
                        <input placeholder='Display Name' name="DisplayName" type="text"
                        value={employee.DisplayName}
                        onChange={(e) => setEmployee({ ...employee, DisplayName:  e.target.value })}
                        //   onChange={(e)=>{setQuestionatt({...questionatt,Question:e.target.value})}}
                        />
                    </Form.Field>
                    {/* <Form.Field required >
          <label>Full Name</label>
          <input placeholder='Full Name' name="FullName"  type="text" 
        //   onChange={(e)=>{setQuestionatt({...questionatt,Question:e.target.value})}}
          />
        </Form.Field> */}

                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field  >
                        <label style={{color:'blue'}}>Gender:</label>
                        <Dropdown
                            compact
                            selection
                            onChange={(e, { value }) => setEmployee({ ...employee, Gender: value })}
                            // onChange={({value}) => {setSelectstatus(value)}}
                            options={CategoryOptions}
                            value={employee.Gender}
                        // defaultValue={CategoryOptions[0].value}
                        // defaultOpen={employee.Gender}
                        >

                        </Dropdown>

                    </Form.Field>
                    <Form.Field >
                        <label style={{color:'blue'}}>Date Of Birth</label>
                        <DatePicker
                            // placeholder='startDate'
                            maxDate={new Date()}
                            showYearDropdown
                            dateFormat="yyyy-MM-dd"
                            scrollableYearDropdown
                            selected={employee.DOB}
                            placeholderText="DOB"
                            // timeInputLabel='startDate' 
                            onChange={(date) => setEmployee({ ...employee, DOB: date })} />
                    </Form.Field>

                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field >
                        <label style={{color:'blue'}}>Email</label>
                        <input placeholder='Email' name='Email' type="email"
                        onChange={(e) => setEmployee({ ...employee, Email:  e.target.value })}
                        value={employee.Email}
                        //   on={(e)=>{setQuestionatt({...questionatt,Salary:e.target.value})}}
                        />
                    </Form.Field>
                    <Form.Field >
                        <label style={{color:'blue'}}>Mobile Number</label>
                        <input placeholder='Mobile Number' name="MobileNumber" type="text"
                        value={employee.MobileNumber}
                        onChange={(e) => setEmployee({ ...employee, MobileNumber:  e.target.value })}
                        //   onChange={(e)=>{setQuestionatt({...questionatt,Question:e.target.value})}}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field  >
                        <label style={{color:'blue'}}>Designation</label>
                        <input placeholder='Designation' name="Designation" type="text"
                        onChange={(e) => setEmployee({ ...employee, Designation:  e.target.value })}
                        value={employee.Designation}
                        //   onChange={(e)=>{setQuestionatt({...questionatt,Question:e.target.value})}}
                        />
                    </Form.Field>

                    <Form.Field  >

                        <label style={{color:'blue'}}>Employee Type:</label>
                        <Dropdown
                            compact
                            selection
                            onChange={(e, { value }) => setEmployee({ ...employee, EmployeeType: value })}
                            // onChange={({value}) => {setSelectstatus(value)}}
                            options={props.empTypOptions}
                            value={employee.EmployeeType}
                            // defaultOpen={employee.EmployeeType}
                        // defaultValue={CategoryOptions[0].value}
                        >

                        </Dropdown>

                    </Form.Field>
                </Form.Group>



                <Form.Group widths="equal">
                <Form.Field >
                            <label style={{color:'blue'}}>Joined Date</label>
                            <DatePicker
                                // placeholder='startDate'
                                // maxDate={new Date()}
                                showYearDropdown
                                dateFormat="yyyy-MM-dd"
                                scrollableYearDropdown
                                selected={employee.JoinedDate}
                                placeholderText="JoinedDate"
                                // timeInputLabel='startDate' 
                                onChange={(date) => setEmployee({ ...employee, JoinedDate: date })} />
                        </Form.Field>
                    <Form.Field  >
                        
                    <label style={{color:'blue'}}>Experience:</label>
                        <Dropdown
                            compact
                            selection
                            onChange={(e, { value }) => setEmployee({ ...employee, Experience: value })}
                            // onChange={({value}) => {setSelectstatus(value)}}
                            options={CategoryOptions}
                            value={employee.Experience}
                            // defaultOpen={employee.Experience}
                        // defaultValue={CategoryOptions[0].value}
                        >

                        </Dropdown>

                    </Form.Field>

                </Form.Group>
                <Form.Group>
                <Form.Field  width={8} >
                        <label style={{color:'blue'}}>Salary</label>
                        <input placeholder='Salary' name="Salary" type="number"
                        onChange={(e) => setEmployee({ ...employee, Salary:e.target.value })}
                        value={employee.Salary}
                        //   onChange={(e)=>{setQuestionatt({...questionatt,Question:e.target.value})}}
                        />
                    </Form.Field>
                </Form.Group>

                {/* <Form.Field required >
          <label>Category:</label>
          <Dropdown
                      compact
                      selection
                      onChange={(e,{value}) => onclickhandle(e,value)}
                      // onChange={({value}) => {setSelectstatus(value)}}
                      options={CategoryOptions}
                      value={selectstatus}
                    // defaultValue={CategoryOptions[0].value}
                    >

                    </Dropdown>
        </Form.Field> */}
                <Form.TextArea label='Personal Notes'
                onChange={(e) => setEmployee({ ...employee, PersonalNotes:e.target.value })}
                value={employee.PersonalNotes}
                />
                {/* <Button type='submit' onClick={(e)=>{onSubmitHandler(e)}} >Submit</Button> */}
                {/* <Message negative  hidden={!errormsg}>
    <Message.Header >Fields are empty</Message.Header>
  </Message> */}
            <Form.Group inline  >
            <a onClick={()=>{props.setEditOpen(false)}}>cancel </a> 
                <Button color='blue' onClick={()=>onSubmitHandler()}>Update People</Button>

            </Form.Group>
               
                {/* <Form.Button   color='blue'  content='Add People' /> */}
            </Form>
        </div>

    )
}
