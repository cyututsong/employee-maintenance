
export function deleteEmployee() {
  console.log("Employee Deleted");
}


// Save employee data into localStorage

export function saveFields(formData: {fname: string; lname: string; email: string; phone: string; dob: string; position: string}) {

  const employees = JSON.parse(localStorage.getItem("employees") || "[]");
  employees.push(formData);
  localStorage.setItem("employees", JSON.stringify(employees));


  return employees;

}


// Load all employees from localStorage
export const loadEmployees = () => {
  return JSON.parse(localStorage.getItem("employees") || "[]");
};