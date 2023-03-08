import React from 'react'
import { Button, Header, Image, Modal, Checkbox, Icon, Table,List, Input, Card, Dropdown, Menu, MenuItem, Search } from 'semantic-ui-react'


export default function Employeerow({employee}) {

  return (
    <Table.Row key={employee.id}>
            <Table.Cell>{employee.DisplayName}</Table.Cell>
            <Table.Cell>{employee.id}</Table.Cell>
            <Table.Cell>{employee.Designation}</Table.Cell>
            <Table.Cell>{employee.EmployeeType}</Table.Cell>
            <Table.Cell>{employee.Experience}</Table.Cell>
            <Table.Cell singleLine>
                <a color='color'>Edit </a>
                <a style={{ color: 'red' }}>Delete</a>
            </Table.Cell>
            <Table.Cell>
            
            </Table.Cell>
        </Table.Row>
  )
}
