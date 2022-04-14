import { useContext, useState } from "react";
import "./newDocument.scss";
import storage from "../../firebase";
import { createDocument } from "../../context/documentContext/apiCalls";
import { DocumentContext } from "../../context/documentContext/DocumentContext";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
export default function NewDocument() {
  const [document, setDocument] = useState(null);
  const [file, setFile] = useState(null);
  // const [documentTitle, setDocumentTitle] = useState(null);
  // const [imgSm, setImgSm] = useState(null);
  // const [trailer, setTrailer] = useState(null);
  // const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const { dispatch } = useContext(DocumentContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setDocument({ ...document, [e.target.name]: value });
  };
  
  const upload = (items) => {
    items.forEach((item) => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.log(error);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setDocument((prev) => {
              return { ...prev, [item.label]: url };
            });
            setUploaded((prev) => prev + 1);
          });
        }
      );
    });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    upload([
      { file: file, label: "file" },
      // { file: documentTitle, label: "documentTitle" },
    //   { file: imgSm, label: "imgSm" },
    //   { file: trailer, label: "trailer" },
    //   { file: video, label: "video" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // setDocument({ ...document, [e.target.uploadby]: localStorage.getItem("_id") });
    createDocument(document, dispatch);
  };

  return (
    <>
    <div className="newDocument">
    <Sidebar />
      <div className="newDocument-container">
      <Navbar />
      <div className="newProduct">
        <h1 className="addProductTitle">New Document</h1>   
        <form className="addProductForm">
          <div className="addProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="vd:Bài giảng Giải tích 2"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Description</label>
            <input
              type="text"
              placeholder="description"
              name="desc"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Year</label>
            <input
              type="text"
              placeholder="Year"
              name="year"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Classify</label>
            <input
              type="text"
              placeholder="vd:môn Đại cương"
              name="classify"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Author</label>
            <input
              type="text"
              placeholder="Author"
              name="author"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Limit</label>
            <input
              type="number"
              placeholder="limit"
              name="limit"
              onChange={handleChange}
            />
          </div>
          <div className="addProductItem">
            <label>Is Series?</label>
            <select name="isSeries" id="isSeries" 
            onChange={handleChange}
            >
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
          </div>
          <div className="addProductItem">
            <label>File</label>
            <input
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          {uploaded === 1 ? (
            <button className="addProductButton"  
            onClick={handleSubmit}
            >
              Create
            </button>
          ) : (
            <button className="addProductButton" onClick={handleUpload} >
              Upload
            </button>
          )}
        </form>
        </div>
      </div>
    </div>
    </>
  );
}
