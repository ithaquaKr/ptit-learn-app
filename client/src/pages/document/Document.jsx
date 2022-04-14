import { Link, useLocation } from "react-router-dom";
import "./document.scss";
import PublishIcon from '@mui/icons-material/Publish';

export default function Document() {
  const location = useLocation();
  const document = location.document;
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Document</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={document.img} alt="" className="productInfoImg" />
            <span className="productName">{document.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{document._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">genre:</span>
              <span className="productInfoValue">{document.genre}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">year:</span>
              <span className="productInfoValue">{document.year}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{document.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" placeholder={document.title} />
            <label>Year</label>
            <input type="text" placeholder={document.year} />
            <label>Genre</label>
            <input type="text" placeholder={document.genre} />
            <label>Limit</label>
            <input type="text" placeholder={document.limit} />
            <label>Trailer</label>
            <input type="file" placeholder={document.trailer} />
            <label>Video</label>
            <input type="file" placeholder={document.video} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={document.img}
                alt=""
                className="productUploadImg"
              />
              <label for="file">
                <PublishIcon/>
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
