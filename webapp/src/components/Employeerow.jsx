import React, { useState } from 'react'
import { Button, Header, Image, Modal, Checkbox, Icon, Table, List, Input, Card, Dropdown, Menu, MenuItem, Search } from 'semantic-ui-react'
// import Addemployee from './Addemployee'
import EditEmployee from './EditEmployee'
import axios from "axios";


export default function Employeerow({ employee, editOpen, setEditOpen, employees, setEmployees, empTypOptions }) {
  const [deleteOpen, setDeleteOpen] = useState(false)
  const onDeleteHandler =()=>{
    axios.delete(`http://localhost:5000/user/delete/${employee._id}`).then((res)=>{
            if(res.data.id){
                // props.setEmployees([
                //     ...props.employees,
                //     ...res.data
                // ])
                 setEmployees([
                  ...employees.filter((emp)=> emp.id != res.data.id)
                 ])
                 setDeleteOpen(false)
            }
           
          }).catch((err)=>{
            console.log(err)
          })

  }

  return (
    <Table.Row key={employee.id}>
      <Table.Cell>{employee.DisplayName}</Table.Cell>
      <Table.Cell>{employee.id}</Table.Cell>
      <Table.Cell>{employee.Designation}</Table.Cell>
      <Table.Cell>{employee.EmployeeType}</Table.Cell>
      <Table.Cell>{employee.Experience}</Table.Cell>
      <Table.Cell singleLine>
        <Modal
          onClose={() => setEditOpen(false)}
          onOpen={() => setEditOpen(true)}
          open={editOpen}
          trigger={<a color='color'>Edit </a>}

        >
          <EditEmployee employee={employee} employees={employees} setEmployees={setEmployees} setEditOpen={setEditOpen} empTypOptions={empTypOptions} />
        </Modal>

        <Modal
          closeIcon
          open={deleteOpen}
          trigger={<a style={{ color: 'red' }}>Delete</a>}
          onClose={() => setDeleteOpen(false)}
          onOpen={() => setDeleteOpen(true)}
        >
          <Header icon='archive' content='Delete Employee' />
          <Modal.Content>
            <p>
              Are you sure You want to Delete the Employee {employee.DisplayName} ?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='red' onClick={() => onDeleteHandler()}>
              <Icon name='checkmark' /> Yes
            </Button>
            <Button color='green' onClick={() => setDeleteOpen(false)}>
              <Icon name='remove' /> No
            </Button>
          </Modal.Actions>
        </Modal>


        





      </Table.Cell>
      <Table.Cell>

      </Table.Cell>
    </Table.Row>
  )
}
