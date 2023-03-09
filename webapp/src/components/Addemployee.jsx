import React, { useEffect, useState } from 'react'
import '../css/forminput.css'
import { Button, Form, Dropdown, Message, Divider, Icon } from 'semantic-ui-react'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import axios from "axios";
import validator from "validator";

export default function Addemployee(props) {
    const CategoryOptions = [
        { key: 1, text: "Female", value: "Female" },
        { key: 2, text: "Male", value: "Male" }
    ]
    const ExperenceOptions = [
        { key: 1, text: "01 Years", value: "01 Years" },
        { key: 2, text: "02 Years", value: "02 Years" },
        { key: 3, text: "03 Years", value: "03 Years" },
        { key: 4, text: "04 Years", value: "04 Years" },
        { key: 5, text: "05 Years", value: "05 Years" },
        { key: 6, text: "06 Years", value: "06 Years" },
        { key: 7, text: "07 Years", value: "07 Years" },
        { key: 8, text: "08 Years", value: "08 Years" },
        { key: 9, text: "more than 8 Years", value: "more than 8 Years" }
    ]
    const [errMesHidden, setErrMesHidden] = useState(true)
    const [employee, setEmployee] = useState({
        FullName: "",
        NameWithInitials: "",
        DisplayName: "",
        Gender: "",
        DOB: "",
        Email: "",
        MobileNumber: "",
        Designation: "",
        EmployeeType: "",
        JoinedDate: "",
        Experience: "",
        Salary: 0,
        PersonalNotes: ""

    });


    const onSubmitHandler = () => {

        if (validator.isEmail(employee.Email) && employee.FullName != "" && employee.NameWithInitials != "") {
            setErrMesHidden(true)
            axios.post('http://localhost:5000/user', { ...employee, DOB: Date.parse(employee.DOB), JoinedDate: Date.parse(employee.JoinedDate) }).then((res) => {
                if (res.data.id) {
                    props.setEmployees([
                        ...props.employees,
                        res.data
                    ])
                    props.setOpen(false);
                }

            }).catch((err) => {
                console.log(err)
            })
        }
        else {
            setErrMesHidden(false)
        }




    }
    return (
        <div>
            <div

            >
                <h3 style={{ textAlign: 'left', paddingLeft: 10, paddingTop: 10 }}>Add People</h3>
                <div style={{ textAlign: 'right', paddingLeft: 10 }} onClick={() => { props.setOpen(false) }}>
                    <Icon name='close'></Icon>
                </div>

            </div>
            <Divider />
            <Form className="rootdiv"

            >
                <Form.Field required >
                    <label style={{ color: 'blue' }}>Full Name</label>
                    <input placeholder='Full Name' name="FullName" type="text"
                        onChange={(e) => {
                            setEmployee({ ...employee, FullName: e.target.value })

                        }}

                    />
                </Form.Field>


                <Form.Group widths="equal">
                    <Form.Field required>
                        <label style={{ color: 'blue' }}>Name With Initials</label>
                        <input placeholder='Name with Initials' name='NameWithInitials' type="text"
                            onChange={(e) => setEmployee({ ...employee, NameWithInitials: e.target.value })}

                        />
                    </Form.Field>
                    <Form.Field >
                        <label style={{ color: 'blue' }}>Prefered / Display Name</label>
                        <input placeholder='Display Name' name="DisplayName" type="text"
                            onChange={(e) => setEmployee({ ...employee, DisplayName: e.target.value })}
                        />
                    </Form.Field>

                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field  >
                        <label style={{ color: 'blue' }}>Gender:</label>
                        <Dropdown
                            compact
                            selection
                            onChange={(e, { value }) => setEmployee({ ...employee, Gender: value })}
                            options={CategoryOptions}
                            value={employee.Gender}
                        >

                        </Dropdown>

                    </Form.Field>
                    <Form.Field >
                        <label style={{ color: 'blue' }}>Date Of Birth</label>
                        <DatePicker
                            maxDate={new Date()}
                            showYearDropdown
                            dateFormat="yyyy-MM-dd"
                            scrollableYearDropdown
                            selected={employee.DOB}
                            placeholderText="DOB"
                            onChange={(date) => setEmployee({ ...employee, DOB: date })} />
                    </Form.Field>

                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Field >
                        <label style={{ color: 'blue' }}>Email</label>
                        <input placeholder='Email' name='Email' type="email"
                            onChange={(e) => setEmployee({ ...employee, Email: e.target.value })}
                        />
                    </Form.Field>
                    <Form.Field >
                        <label style={{ color: 'blue' }}>Mobile Number</label>
                        <input placeholder='Mobile Number' name="MobileNumber" type="text"
                            onChange={(e) => setEmployee({ ...employee, MobileNumber: e.target.value })}
                        />
                    </Form.Field>
                </Form.Group>

                <Form.Group widths="equal">
                    <Form.Field  >
                        <label style={{ color: 'blue' }}>Designation</label>
                        <input placeholder='Designation' name="Designation" type="text"
                            onChange={(e) => setEmployee({ ...employee, Designation: e.target.value })}
                        />
                    </Form.Field>

                    <Form.Field  >

                        <label style={{ color: 'blue' }}>Employee Type:</label>
                        <Dropdown
                            compact
                            selection
                            onChange={(e, { value }) => setEmployee({ ...employee, EmployeeType: value })}
                            options={props.empTypOptions}
                            value={employee.EmployeeType}

                        >

                        </Dropdown>

                    </Form.Field>
                </Form.Group>



                <Form.Group widths="equal">
                    <Form.Field >
                        <label style={{ color: 'blue' }}>Joined Date</label>
                        <DatePicker

                            showYearDropdown
                            dateFormat="yyyy-MM-dd"
                            scrollableYearDropdown
                            selected={employee.JoinedDate}
                            placeholderText="JoinedDate"

                            onChange={(date) => setEmployee({ ...employee, JoinedDate: date })} />
                    </Form.Field>
                    <Form.Field  >

                        <label style={{ color: 'blue' }}>Experience:</label>
                        <Dropdown
                            compact
                            selection
                            onChange={(e, { value }) => setEmployee({ ...employee, Experience: value })}

                            options={ExperenceOptions}
                            value={employee.Experience}

                        >

                        </Dropdown>

                    </Form.Field>

                </Form.Group>
                <Form.Group>
                    <Form.Field width={8} >
                        <label style={{ color: 'blue' }} >Salary</label>
                        <input placeholder='Salary' name="Salary" type="number"
                            onChange={(e) => {
                                setEmployee({ ...employee, Salary: e.target.value })

                            }}


                        />

                    </Form.Field>
                </Form.Group>


                <Form.TextArea label='Personal Notes'
                    onChange={(e) => setEmployee({ ...employee, PersonalNotes: e.target.value })}
                />



                <Form.Group inline  >
                    <Form.Field width={16} >
                    </Form.Field>
                    <Form.Field width={8} >
                        <a onClick={() => { props.setOpen(false) }}  >cancel </a>
                        <Button color='blue' onClick={() => onSubmitHandler()}>Add People</Button>
                    </Form.Field>


                </Form.Group>


                <Message negative hidden={errMesHidden}>
                    <Message.Header>There was some errors with your submission</Message.Header>

                </Message>

            </Form>
        </div>

    )
}
