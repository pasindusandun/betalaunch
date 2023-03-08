// import React from 'react'

// export default function Addemployee(props) {

//   return (
//     <div>
//         <Form className="rootdiv" onSubmit={(e)=>{onSubmitHandler(e)}}>
//         <Form.Field required>
//           <label>Question</label>
//           <input placeholder='Question' name="Question" type="text" onChange={(e)=>{setQuestionatt({...questionatt,Question:e.target.value})}}/>
//         </Form.Field>
//         <Form.Field >
//           <label>Status</label>
//           <input   placeholder='Status' value='Draft' disabled type="text" on={(e)=>{setQuestionatt({...questionatt,Category:e.target.value})}}/>
//         </Form.Field>
//         <Form.Field required >
//           <label>Category:</label>
//           <Dropdown
//                       compact
//                       selection
//                       onChange={(e,{value}) => onclickhandle(e,value)}
//                       // onChange={({value}) => {setSelectstatus(value)}}
//                       options={CategoryOptions}
//                       value={selectstatus}
//                     // defaultValue={CategoryOptions[0].value}
//                     >

//                     </Dropdown>
//         </Form.Field>
//         {/* <Button type='submit' onClick={(e)=>{onSubmitHandler(e)}} >Submit</Button> */}
//         <Message negative  hidden={!errormsg}>
//     <Message.Header >Fields are empty</Message.Header>
//   </Message>
//         <Form.Button content='Submit' />
//       </Form>
//       </div>

//   )
// }
