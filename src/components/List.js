import axios from "axios";
import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import { baseURL } from "../utils/constant";

const List = ({ id, task, setUpdateUI, updateMode }) => {
  const removeTask = () => {
    axios.delete(`${baseURL}/delete/${id}`).then((res) => {
      console.log(res);
      setUpdateUI((prevState) => !prevState);
    });
  };
  return (
    <li className="bg-gray-400 text-center p-3 m-3 w-[350px] mx-auto flex items-center justify-between">
      {task}
      <div className="flex gap-3">
        <BiEditAlt
          size={20}
          className="cursor-pointer"
          onClick={() => updateMode(id, task)}
        />
        <BsTrash size={20} className="cursor-pointer" onClick={removeTask} />
      </div>
    </li>
  );
};

export default List;
