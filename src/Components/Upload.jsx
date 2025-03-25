import React, { useState, useContext } from "react";
import { Form, Container, Button } from "react-bootstrap";
import axios from "axios";
import AuthContext from "../AuthContext"; // Assuming you have AuthContext

export default function Upload() {
  const [file, setFile] = useState(null);
  const { user } = useContext(AuthContext);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file || !user) {
      alert("Please select a file and ensure you are logged in.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("userId", user.userId);

    try {
      const response = await axios.post("http://filecloud.us-east-2.elasticbeanstalk.com/files/uploadfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem('token')}` // Include JWT token if required
        }
      });
      console.log("File uploaded successfully:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <Container className="pb-5 pt-5">
        <div
          className="p-3 d-block"
          style={{
            backgroundColor: "#eee",
            width: "100%",
            height: "300px",
            marginTop: "20px",
          }}
        >
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Control type="file" onChange={handleFileChange} />
          </Form.Group>
          <Button className="pt-10" onClick={handleUpload}>Submit</Button>
        </div>
      </Container>
    </>
  );
}
