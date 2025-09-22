import { exit } from "process";

export function deleteEmployee(selectedEmployee : string) {
  
    const storedEmployees = localStorage.getItem("employees");
    
    if (!storedEmployees || storedEmployees === "[]") {
      return console.log("No Existed Employee");
    }

    const employees = JSON.parse(storedEmployees);

    const updatedEmployees = employees.filter(
      (emp: any) => emp.email !== selectedEmployee
    );

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    console.log(`Deleted employee with fname: ${selectedEmployee}`);
}


// Save employee data into localStorage

export function saveFields(formData: {fname: string; lname: string; email: string; phone: string; dob: string; position: string}, flag: string) {

  let employees = JSON.parse(localStorage.getItem("employees") || "[]");

  if(flag === "Add") {
    employees.push(formData);
  } else {
      employees = employees.map((emp: any) =>
        emp.email === formData.email ? { ...emp, ...formData } : emp
     );
  }
  //console.log(flag);
  localStorage.setItem("employees", JSON.stringify(employees));
  return employees;

}



export function selectEmployee(fname: any){

    const storedEmployees = localStorage.getItem("employees");
 
    if (!storedEmployees || storedEmployees === "[]"){ // Checking if the storedEmployees is existed in localstorage and not empty in local storage exit if its true
        return  console.log("No employees found in localStorage.");
    }

    const employees = JSON.parse(storedEmployees);

    if (employees.length <= 0) {
       console.log("Employees array is empty.");
       return [];   
    }

    // Filter all employees whose fname matches
    const matched = employees.filter((emp: { fname: string }) => emp.fname === fname);

    console.log("Matched employees:", matched);
    return matched; // ✅ returns all employees under this fname

}

// Load all employees from localStorage
export const loadEmployees = () => {
  return JSON.parse(localStorage.getItem("employees") || "[]");
};

// next naman ay ang update record