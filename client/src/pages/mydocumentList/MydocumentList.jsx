import "./mydocumentList.scss";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
// import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DocumentContext } from "../../context/documentContext/DocumentContext";
import { deleteDocument, getMyDocuments} from "../../context/documentContext/apiCalls";

// Import new document tab
import Newdocs from "../../components/newdocs/Newdocs"

// Import info tab
import Infotab from "../../components/infotab/Infotab";

// Import Read tab
import Readdocs from "../../components/readdocs/Readdocs";

// Import Edit tab
import Editdocs from "../../components/editdocs/Editdocs";

export default function MydocumentList() {
  const { documents, dispatch } = useContext(DocumentContext);
  // const verify = JSON.parse(window.localStorage.getItem('user'))._id;

  useEffect(() => {
    getMyDocuments(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteDocument(id, dispatch);
  };

  const columns = [
    {
      field: "document",
      headerName: "Document",
      headerAlign: 'center',
      width: 200,
      editable: true,
      sortable: true,
      filterable: true,
      renderCell: (params) => {
        return (
          <div className="documentListItem">
            {params.row.title}
          </div>
        );
      },
    },
    // { field: "genre", headerName: "Genre", width: 120 },
    { field: "author", headerName: "Author", width: 120 ,editable: false,
    sortable: true,
    filterable: true,},
    { field: "classify", headerName: "Classify", width: 180 ,editable: false,
    sortable: true,
    filterable: true,},
    { field: "year", headerName: "Year", width: 100 ,editable: true,
    sortable: true,
    filterable: true,},
    
    {
      field: "action",
      headerName: "Action",
      headerAlign: 'center',
      width: 250,
      renderCell: (params) => {
        return (
          <>
            <Readdocs dataFromParent={params.row} />
            <Infotab dataFromParent={params.row}/>
            {/* <Link
              to={{ pathname: "/mydocuments/" + params.row._id, document: params.row }}
            >
              <button className="documentListEdit">Edit</button>
            </Link> */}
            <Editdocs dataFromParent={params.row} />
            <DeleteOutlineIcon
              className="documentListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  
  return (
    <div className="mydocument">
      <div className="mydocument-container">
      <div className="mydocument-top">
        <img src="images/bg-left.png" alt="" className="mydocument-img" />
          <div className="mydocument-title">
            My Document
          </div>
          </div>
        <div className="new-document">
          {/* <Link to="/newDocument">
          </Link> */}
          <Newdocs/>
      </div>
        <div className="library-bottom">
          <div className="datatable-data">
            <DataGrid
              rows={documents}
              disableSelectionOnClick 
              columns={columns}
              pageSize={8}
              checkboxSelection
              getRowId={(e) => e._id}
              rowHeight={80} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
