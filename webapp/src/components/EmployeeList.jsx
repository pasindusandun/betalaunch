import "../css/EmployeeList.css";
import React, { useEffect, useState } from 'react'
import { Button,  Modal,  Icon, Table,  Card, Dropdown, Pagination } from 'semantic-ui-react'
import axios from "axios";
import Employeerow from "./Employeerow";
import Addemployee from "./Addemployee";
export default function EmployeeList() {
  const [empType, setEmpType] = useState("");
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [filterAttr, setFilterAttr] = useState("");
  const [idFilter, setIdFilter] = useState("")
  const [nameFilter, setNameFilter] = useState("")
  const [pageSize, setPageSize] = useState(5)
  const [employeeCount, setEmployeeCount] = useState()
  const [maxpage, setMaxpage] = useState(1);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const options = [
    { key: 1, text: 'Full time', value: 'Full time' },
    { key: 2, text: 'Part time', value: 'Part time' },
    { key: 3, text: 'Contract Basis', value: 'Contract Basis' },
    { key: 4, text: 'Other', value: 'Other' },
  ]
  const [employees, setEmployees] = useState([]);

  const OnPageChangeHandler = (data) => {
    setPage(data.activePage)
    console.log('data', data);
  }

  useEffect(() => {
    axios.get('http://localhost:5000/user').then((res) => {
      if (res.data[0].id) {
        setEmployees([
          ...res.data
        ])
      }

    }).catch((err) => {
      console.log(err)
    })

  }, [])


  useEffect(() => {
    setPage(1);

  }, [empType, idFilter, nameFilter])


  useEffect(() => {
    setMaxpage(Math.ceil(employeeCount / pageSize))
    console.log('maxpage', Math.ceil(employeeCount / pageSize))

  }, [employeeCount])
  useEffect(() => {
    setEmployeeCount(filterEmployees.length)
  }, [filterEmployees])


  useEffect(() => {

    if (empType != "") {
      console.log("employees", employees)
      setFilterEmployees([...employees.filter((emp) => emp.EmployeeType == empType)])
      console.log('empType', empType)
      console.log('filterEmployees', filterEmployees)

    }
    else if (empType == "") {
      setEmployeeCount(employees.length)
    }


  }, [empType, employees])

  useEffect(() => {

    if (empType == "" && filterAttr == "id") {
      (idFilter == "des") ? employees.sort((a, b) => a.id - b.id) : (employees.sort((a, b) => b.id - a.id))
    }
    else if (filterAttr == "id") {

      (idFilter == "des") ? filterEmployees.sort((a, b) => a.id - b.id) : (filterEmployees.sort((a, b) => b.id - a.id))
    }

    console.log(filterAttr, idFilter)



  }, [idFilter, filterEmployees, employees])

  useEffect(() => {
    if (empType == "" && filterAttr == "name") {

      (nameFilter == "des") ? employees.sort((a, b) => a.DisplayName.localeCompare(b.DisplayName)) : (employees.sort((a, b) => b.DisplayName.localeCompare(a.DisplayName)))
    }
    else if (filterAttr == "name") {

      (nameFilter == "des") ? filterEmployees.sort((a, b) => a.DisplayName.localeCompare(b.DisplayName)) : (filterEmployees.sort((a, b) => b.DisplayName.localeCompare(a.DisplayName)))
    }
    console.log(filterAttr, nameFilter)

  }, [nameFilter, employees, filterEmployees])



  return (


    <Card fluid

    >
      <h3 style={{ textAlign: 'left', paddingLeft: 10, paddingTop: 10 }}>  People</h3>
      <div
        className='addemployeebtn'
      >
        <Dropdown
          compact
          selection
          onChange={(e, { value }) => { setEmpType(value) }}
          options={options}
          value={empType}
          placeholder="Employee Type"
          style={{ marginRight: 10 }}
        >
        </Dropdown>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button color="blue">Add People</Button>}

        >
          <Addemployee employees={employees} setOpen={setOpen} empTypOptions={options} setEmployees={setEmployees} />
        </Modal>

      </div>
      <br />

      <div>
        <Card fluid

        >
          <Table>
            <Table.Header>
              <Table.Row key={"0"}>
                <Table.HeaderCell singleLine>Display Name <Button basic onClick={() => {
                  nameFilter == "asc" ? setNameFilter("des") : (setNameFilter("asc"))
                  setFilterAttr("name")
                }}><Icon rotated="counterclockwise" name="exchange"></Icon></Button> </Table.HeaderCell>
                <Table.HeaderCell singleLine>Emp ID<Button basic onClick={() => {
                  idFilter == "asc" ? setIdFilter("des") : (setIdFilter("asc"))
                  setFilterAttr("id")
                }}><Icon rotated="counterclockwise" name="exchange"></Icon></Button></Table.HeaderCell>
                <Table.HeaderCell>Designation</Table.HeaderCell>
                <Table.HeaderCell>Emp Type</Table.HeaderCell>
                <Table.HeaderCell>Experience</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>

              {empType ? filterEmployees.map((employee, index) => {
                if ((index >= pageSize * (page - 1)) && (index < pageSize * page)) {
                  return <Employeerow key={employee.id} employee={employee} employees={employees} setEmployees={setEmployees}

                    empTypOptions={options} />
                }

              })
                : (employees.map((employee, index) => {
                  if ((index >= pageSize * (page - 1)) && (index < pageSize * page)) {
                    return <Employeerow key={employee.id} employee={employee} employees={employees} setEmployees={setEmployees}

                      empTypOptions={options} />
                  }

                }))}



            </Table.Body>
            <Table.Footer >
              <Table.HeaderCell colSpan="7" textAlign='right'>
                <Pagination
                  boundaryRange={0}

                  ellipsisItem={null}
                  firstItem={null}
                  lastItem={null}
                  siblingRange={1}
                  totalPages={maxpage}
                  activePage={page}
                  onPageChange={(e, data) => { OnPageChangeHandler(data) }}
                />
              </Table.HeaderCell>
            </Table.Footer>
          </Table>

        </Card>
      </div>
    </Card>

  );
}
