import React from 'react';
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Card, { CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import DropzoneS3Uploader from 'react-dropzone-s3-uploader';
import AddIcon from 'material-ui-icons/Add';

const Upload = () => {
  const dropzoneStyles = {
    margin: 15, 
    border: 'dashed', 
    borderColor: 'grey', 
    borderRadius: 10, 
    width: '100%', 
    height: 200
  };

  let dropzoneFileTypes = [
  //IMAGE FILE TYPES
    'image/png',
    'image/jpg',
    'image/gif',
    'image/bmp',
    'image/svg',
    //VIDEO FILE TYPES
    'video/mp4',
    'video/webm',
    //TEXT FILE TYPES
    'text/plain',
    //AUDIO FILE TYPES
    'audio/mp3',
    'audio/wav',
    'audio/ogg',
    'audio/webm'
  ];

  dropzoneFileTypes = dropzoneFileTypes.join(',');

  const handleFinishedUpload = info => {
    console.log('file ' + info.filename + 'successfully uploaded!');
    console.log('the file link is ' + info.fileUrl);
  };

  const uploadOptions = {
    server: 'http://' + window.location.host
  };
  const s3Url = 'https://qraft-uploads.s3.amazonaws.com';

  return (
    <Grid container spacing={24}>
      <Grid item sm />
      <Grid item xs={12} sm={10} md={8}>
        <Card style={{display: 'flex'}}>
          <DropzoneS3Uploader style={dropzoneStyles} accept={dropzoneFileTypes} onFinish={handleFinishedUpload} s3Url={s3Url} upload={uploadOptions}>
          
          </DropzoneS3Uploader>
        </Card>
      </Grid>
      <Grid item sm></Grid>
    </Grid>
  );
};

export default Upload;