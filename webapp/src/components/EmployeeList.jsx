import "../css/EmployeeList.css";
import React, { useEffect, useState } from 'react'
import { Button, Header, Image, Modal, Checkbox, Icon, Table, Input, Card, Dropdown, Menu, MenuItem, Search } from 'semantic-ui-react'
// import { useSelector,useDispatch} from 'react-redux'
import axios from "axios";
import Employeerow from "./Employeerow";
export default function EmployeeList() {
    const [empType, setEmpType] = useState("");
    const [filterEmployees, setFilterEmployees] = useState([]);
    const [filterAttr, setFilterAttr] = useState("");
    const [idFilter,setIdFilter] = useState("")
    const [nameFilter,setNameFilter] = useState("")
    const [maxpage, setMaxpage] = useState(1);
    const [page, setPage] = useState(1);
    // const dispatch  = useDispatch();
    const [open, setOpen] = useState(false);
    const options = [
        { key: 1, text: 'Full time', value: 'Full time' },
        { key: 2, text: 'Part time', value: 'Part time' },
        { key: 3, text: 'Contract Basis', value: 'Contract Basis' },
        { key: 4, text: 'Other', value: 'Other' },
      ]
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:5000/user').then((res)=>{
        if(res.data[0].id){
            setEmployees([
                ...res.data
            ])
        }
       
      }).catch((err)=>{
        console.log(err)
      })
    
    }, [])
    useEffect(() => {
      
    setFilterEmployees(employees.filter((emp)=>emp.EmployeeType == empType))
      console.log('empType',empType)
      console.log('filterEmployees',filterEmployees)
    }, [empType])

    useEffect(() => {
        
        if(empType==""&& filterAttr=="id" ){
            (idFilter=="des")?  employees.sort((a,b)=> a.id-b.id):(employees.sort((a,b)=> b.id-a.id))
        }
        else if(filterAttr=="id" ){
            // (idFilter=="asc")?  filterEmployees.sort((a,b)=> b.id-a.id):(null)
            (idFilter=="des")?  filterEmployees.sort((a,b)=> a.id-b.id):(filterEmployees.sort((a,b)=> b.id-a.id))
        }
        // empType ?():(idFilter=="des"? employees.sort((a,b)=>a.id-b.id):())
        console.log(filterAttr,idFilter)

      
    
    }, [idFilter,filterEmployees,employees])

    useEffect(() => {
        if(empType=="" && filterAttr=="name" ){
            
            (nameFilter=="des")?  employees.sort((a,b)=> a.DisplayName.localeCompare(b.DisplayName)):(employees.sort((a,b)=> b.DisplayName.localeCompare(a.DisplayName)))
        }
        else if(filterAttr=="name" ){
            // (idFilter=="asc")?  filterEmployees.sort((a,b)=> b.id-a.id):(null)
            (nameFilter=="des")?  filterEmployees.sort((a,b)=> a.DisplayName.localeCompare(b.DisplayName)):(filterEmployees.sort((a,b)=> b.DisplayName.localeCompare(a.DisplayName)))
        }
        console.log(filterAttr,nameFilter)
    
    }, [nameFilter,employees,filterEmployees])
    
    
    
  return (
    <div className='carditme'>
      <Card fluid className='carditme'>
        <div className='addquestionbtn'>
        <Dropdown
                      compact
                      selection
                      onChange={(e, { value }) => { setEmpType(value) }}
                      options={options}
                      value={empType}
                    >
                         </Dropdown>
          <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button color="blue">Add People</Button>}
          >
            {/* <Insertquestion questions={questions} setOpen={setOpen} /> */}
          </Modal>
          
        </div>
        {/* <div className='searchCard'>
         

        
        </div> */}
        <div className='carditme'>
          <Card fluid className='carditme'>
            <Table basic>
              <Table.Header>
                <Table.Row key={"0"}>
                  <Table.HeaderCell singleLine>Display Name <Button basic onClick={()=>{
                    nameFilter=="asc"? setNameFilter("des"):(setNameFilter("asc") )
                  setFilterAttr("name")
                  }}><Icon rotated="counterclockwise"  name="exchange"></Icon></Button> </Table.HeaderCell>
                  <Table.HeaderCell singleLine>Emp ID<Button basic onClick={()=>{
                    idFilter=="asc"? setIdFilter("des"):(setIdFilter("asc"))
                    setFilterAttr("id")
                    }}><Icon rotated="counterclockwise"  name="exchange"></Icon></Button></Table.HeaderCell>
                  <Table.HeaderCell>Designation</Table.HeaderCell>
                  <Table.HeaderCell>Emp Type</Table.HeaderCell>
                  <Table.HeaderCell>Experience</Table.HeaderCell>
                  <Table.HeaderCell></Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>

             { empType ? filterEmployees.map((employee) => <Employeerow key={employee.id} employee={employee}/>)
             :( employees.map((employee) => <Employeerow key={employee.id} employee={employee}/>))}
                {/* {search ? 
                (filterquestion.map((question,index) => {
                  // console.log('index',index);
                  // console.log('filterquestion',filterquestion);
                  // console.log('index',lQuestion);
                  if (index >= fquestion-1 && index < lQuestion) {
                    return <Tablerow question={question}  key={question._id} 
                    // questions={questions} setQuestions={setQuestions}
                    />
                  }

                })) : 
                (questions.map((question,index) => {
                  // console.log('nindex',index);
                  // console.log('nfilterquestion',filterquestion);
                  // console.log('nindex',lQuestion);
                  if (index >= fquestion-1 && index < lQuestion) {
                    return <Tablerow question={question}  key={question._id} 
                    // questions={questions} setQuestions={setQuestions}
                    />
                  }
                }))} */}

                
              </Table.Body>
              
            </Table>

          </Card>
        </div>
      </Card>
    </div>
  );
}
