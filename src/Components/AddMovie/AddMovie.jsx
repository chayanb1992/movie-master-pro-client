import React from "react";

const AddMovie = () => {
  const handleAddMovie = (e) => {
    e.preventDefault();
    const data = { name, email };
    fetch("http://localhost:3000/movie", {
      method: "POST",
      headers: {
        "constent-thpe": "applicaion/json",
      },
      body: JSON.stringify(data),
    });
  };
  return <div></div>;
};

export default AddMovie;
