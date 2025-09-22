"use client";
import { useState, useEffect } from "react";
import { deleteEmployee, saveFields, loadEmployees, selectEmployee } from "../utils/EmployeeService";


export default function EmployeeMaintenance() {

    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        dob: "",
        position: ""
    });

    const [isDisabled, setIsDisabled] = useState(true);

    const [employees, setEmployees] = useState<any[]>([]);
    // Load employees on component mount
    useEffect(() => {
        setEmployees(loadEmployees());
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };


    const handleDelete = () => {
        const selectedEmployee = formData.fname;
        deleteEmployee(selectedEmployee);
        setEmployees(loadEmployees());
        setFormData({ fname: "", lname: "", email: "", phone: "", dob: "", position: "" }); // clear form
        setIsDisabled(true);
    }


    const handleSelect = (fname: any) => {
            const matchedEmployees = selectEmployee(fname); // ganto ang pagset ng variable pag return value mula sa function

            //ganto naman ang pag set ng value mula sa react input ang katumbas na code nito sa vanilla js ay document.getElementbyID(fname).value("matchedEmployees");       
            setFormData((prev) => ({
                ...prev,
                fname:matchedEmployees[0].fname,
                lname:matchedEmployees[0].lname,
                email:matchedEmployees[0].email,
                phone:matchedEmployees[0].phone,
                dob:matchedEmployees[0].dob,
                position:matchedEmployees[0].position
            }));

    };


  
    // Save employee and refresh list
    const handleSave = () => {
        const updatedEmployees = saveFields(formData); // calling savFields function from utils
        setEmployees(loadEmployees()); // refresh list
        setFormData({ fname: "", lname: "", email: "", phone: "", dob: "", position: "" }); // clear form
        setIsDisabled(true);
    };




  return (
     <div className="container mx-auto p-4 flex flex-col">


     <div className="container mx-auto p-4 flex flex-col gap-4 w-1/2">
        <h1 className="text-3xl font-bold text-center mb-5">Employee Maintenance</h1>
        <div className="flex flex-row gap-6">
            <input className ="px-3 py-2 w-1/2 border-1 rounded-sm" type="text" name="fname" id="fname" placeholder="Enter your First Name" 
                   value={formData.fname} onChange={handleChange}  
                   disabled={isDisabled} />
            <input className ="px-3 py-2 w-1/2 border-1 rounded-sm" type="text" name="lname" id="lname" placeholder="Enter your Last Name" value={formData.lname} onChange={handleChange}  disabled={isDisabled} />
        </div>
        <div className="flex flex-row gap-6">
            <input className="px-3 py-2 w-1/2 border-1 rounded-sm" type="email" name="email" id="email" placeholder="Enter your Email" value={formData.email} onChange={handleChange}  disabled={isDisabled} />
            <input className="px-3 py-2 w-1/2 border-1 rounded-sm" type="text" name="phone" id="phone" placeholder="Enter your Phone Number" value={formData.phone} onChange={handleChange}  disabled={isDisabled} />
        </div>
        <div className="flex flex-row gap-6">
            <input type="date" name="dob" id="dob" className="px-3 py-2 w-full border-1 rounded-sm" value={formData.dob} onChange={handleChange}  disabled={isDisabled} />
        </div>

        <div className="flex flex-row gap-6">
            <select name="position" id="position" className="px-3 py-2 w-full border-1 rounded-sm" value={formData.position} onChange={handleChange}  disabled={isDisabled}>
                <option value="">Select Position</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="manager">Manager</option>
            </select>
        </div>

        <div className="container mx-auto p-4 flex flex-col border-1 rounded-sm" id="listOfEmployees">

            {employees.length === 0 ? (
            <p className="text-gray-500">No employees saved yet.</p>
            ) : (
            <ul className="list-disc pl-5">
                {employees.map((emp) => (
                <li key={emp.fname} className="cursor-pointer" onClick={()=> handleSelect(emp.fname)}>
                    {emp.fname} {emp.lname} - {emp.position}
                </li>
                ))}
            </ul>
            )}

        </div>


        <div className="grid grid-cols-4 gap-4">   
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setIsDisabled(false)}>Add</button>
            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" onClick={() => setIsDisabled(false)}>Update</button>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={() => handleDelete()}>Delete</button>
            <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600" onClick={() => handleSave()}>Save</button>
        </div>
     </div>

   </div>
  );
}

