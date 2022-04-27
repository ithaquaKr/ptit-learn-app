import { useContext, useState } from "react";
import "./newDocument.scss";
import storage from "../../firebase";
import { createDocument } from "../../context/documentContext/apiCalls";
import { DocumentContext } from "../../context/documentContext/DocumentContext";

import Processbutton from "../../components/processbutton/Processbutton"

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { Link, useHistory } from "react-router-dom";

export default function NewDocument() {
  const [document, setDocument] = useState(null);
  const [file, setFile] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const history = useHistory();

  const { dispatch } = useContext(DocumentContext);

  const verify = JSON.parse(window.localStorage.getItem('user'))._id;
  const uploadby = JSON.parse(window.localStorage.getItem('user')).username;

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
    ]);
    document.uploadby = uploadby;
    document.verify = verify;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createDocument(document, dispatch);
      history.push("/mydocuments");
    } catch (err) {
    }
  };

  return (
      <div className="newProduct">
        <div className="newProduct-top">
          <Link to="/mydocuments"  className="back-icon">
            <ArrowBackIosNewIcon/>
          </Link>
        <h1 className="addProductTitle">New Document</h1>   
        </div>
        
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
            <select name = "classify" id="classify" 
              onChange={handleChange}
            >
              <option value="baigiang"> Bài giảng </option>
              <option value="baibao"> Bài báo -  Tạp chí </option>
              <option value="chuyennganh"> E-Book Chuyên ngành </option>
              <option value="nckh"> Đề tài nghiên cứu khoa học </option>
              <option value="luan"> Luận án Tiến sỹ - Luận văn Thạc sỹ </option>
              <option value="sach"> Sách </option>
              <option value="truyen"> Truyện - Tiểu thuyết </option>

            </select>
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
            <label>File</label>
            <input
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          {uploaded === 1 ? (
            <button className="addCreateButton" onClick={handleSubmit}>
              <DoneAllIcon />
            </button>
          ) : (
            <div className="addUploadButton" onClick={handleUpload}>
              <Processbutton/>
            </div>
          )}
          </form>
        </div>
  );
}
