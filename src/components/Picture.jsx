
/*
const formidable = require('formidable')
import React, { Fragment } from 'react';
 
  import { CameraFeed } from './addPicture';

 // Upload to local seaweedFS instance
 const uploadImage = async file => {
  const formData = new FormData();
  formData.append('file', file, Date.now() + '.jpg')

  let res = await fetch('/api/upload', {
    method: 'POST',
    body: formData

    
  })

  res = await res.json()
  console.log('result of upload', res);

  // Connect to a seaweedfs instance

  // denna från thomas, funkar även med denna

};




console.log(uploadImage)

export default function UploadPicture(){

  
      return (
          <div className="App">
              <h1>Image capture test</h1>
              <p>Capture image from USB webcamera and upload to form</p>
              <CameraFeed sendFile={uploadImage} />
          </div>
      );
  }*/