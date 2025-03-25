import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { FaArrowDown } from 'react-icons/fa';
import axios from 'axios';
import AuthContext from '../AuthContext';

export default function Profile() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!user || !user.userId) {
        console.error('User ID is undefined.');
        return;
      }

      console.log('Fetching files for user ID:', user.userId);

      try {
        const response = await axios.get(`http://filecloud.us-east-2.elasticbeanstalk.com/file/${user.userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        console.log('Files fetched successfully:', response.data);
        setUploadedFiles(response.data);
      } catch (error) {
        console.error('Error fetching file names:', error);
      }
    };

    fetchFiles();
  }, [user]);

  const handleDownload = async (fileName) => {
    try {
      const response = await axios.get(`http://filecloud.us-east-2.elasticbeanstalk.com/files/${fileName}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        responseType: 'blob'
      });

      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement('a');
      fileLink.href = fileURL;
      fileLink.setAttribute('download', fileName);
      document.body.appendChild(fileLink);
      fileLink.click();
      document.body.removeChild(fileLink);
    } catch (error) {
      console.error('Error downloading the file:', error);
    }
  };

  return (
    <>
      <Container className="d-flex flex-column justify-content-center align-items-center min-vh-90 mt-4">
        <div className="text-center">
          <h2>Filecloud</h2>
          <p className="mt-2">One stop destination for all the File Storage</p>
        </div>
      </Container>

      <Container className="pb-5">
        <div className="h-100 w-100 p-3 d-block" style={{ backgroundColor: "#eee" }}>
          <Container className="my-5">
            <h2>Profile</h2>
            <p className="fw-bold">{user && user.username ? `Welcome, ${user.username}!` : 'Username not found'}</p>
          </Container>

          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Date of Upload</th>
                <th>Size</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {uploadedFiles.map(file => (
                <tr key={file}>
                  <td>{file}</td>
                  <td>{file.uploadDate}</td>
                  <td>{file.fileSize}</td>
                  <td>
                    <Button variant="link" size="sm" onClick={() => handleDownload(file)}>
                      <FaArrowDown />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
}
