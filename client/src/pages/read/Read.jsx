import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link, useLocation } from "react-router-dom";
import "./read.scss";



// // Import Worker
// import { Worker } from '@react-pdf-viewer/core';
// // Import the main Viewer component
// import { Viewer } from '@react-pdf-viewer/core';
// // Import the styles
// import '@react-pdf-viewer/core/lib/styles/index.css';
// // default layout plugin
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// // Import styles of default layout plugin
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';



export default function Read() {
  const location = useLocation();
  const document = location.document;


  // // creating new plugin instance
  // const defaultLayoutPluginInstance = defaultLayoutPlugin();




  return (
  <div className="read-container">
    <div className="read-top">
      <Link to="/home" className="back-icon">
          <ArrowBackIosNewIcon />
      </Link>
      <div className="read-title">
        {document.title}
      </div>
    </div>
      <div className="read-document">
        {/* <video className="video" autoPlay progress controls src={movie.video} /> */}
        <embed 
        src={document.file} width="800px" height="100%" type="application/pdf"></embed>
      {/* render this if we have a pdf file */}
      {/* {document.file&&(
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
            <Viewer fileUrl={document.file}
            plugins={[defaultLayoutPluginInstance]}></Viewer>
          </Worker>
        )}

        {/* render this if we have pdfFile state null   */}
        {/* {!document.file&&<>Something Wrong??!!</>} */} 
      </div>
  </div>  
  );
}




