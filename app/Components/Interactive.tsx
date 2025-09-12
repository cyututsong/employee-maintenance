"use client";
import { useState } from "react";
import { getAge } from "../utils/employeeUtils";

type Employee = {
  firstname: string;
  lastname: string;
  age: number;
};

export default function Interactive() {
  const [typeName, setTypeName] = useState("Rodney");
  const [result, setResult] = useState<Employee[]>([]);

  const handleClick = () => {
    const employeeInfo = getAge({ typeName });
    setResult(employeeInfo); // now result is an array of employees
  };

  return (
    <div>
      <input
        type="text"
        id="typeName"
        value={typeName}
        onChange={e => setTypeName(e.target.value)}
        placeholder="Type something..."
        className="border p-2 rounded"
      />

      <button
        className="ml-2 p-2 bg-blue-500 text-white rounded"
        onClick={handleClick}
      >
        Submit
      </button>

      <div className="mt-4" id="outPut">
        {result.length > 0 ? (
          result.map((info, index) => (
            <p key={index}>
              Member Name: {info.firstname} {info.lastname} Age: {info.age}
            </p>
          ))
        ) : (
          <p>No members found</p>
        )}
      </div>
    </div>
  );
}
