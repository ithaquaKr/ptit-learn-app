import "./mydocumentList.scss";
import { DataGrid } from '@mui/x-data-grid';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DocumentContext } from "../../context/documentContext/DocumentContext";
import { deleteDocument, getDocuments} from "../../context/documentContext/apiCalls";

export default function MydocumentList() {
  const { documents, dispatch } = useContext(DocumentContext);
  const verify = JSON.parse(window.localStorage.getItem('user'))._id;

  useEffect(() => {
    getDocuments(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteDocument(id, dispatch);
  };

  const mydocuments = documents.filter((documents) => documents.verify.includes(verify));
  // Rất hạn chế, cần nâng cấp phần filter này, nên filter ngay từ lúc lấy data từ database.
  // Update trong tương lai

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
    { field: "year", headerName: "Year", width: 100 ,editable: true,
    sortable: true,
    filterable: true,},
    { field: "uploadby", headerName: "Upload By", width: 100 ,editable: true,
    sortable: true,
    filterable: true,},
    {
      field: "action",
      headerName: "Action",
      headerAlign: 'center',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/mydocuments/" + params.row._id, document: params.row }}
            >
              <button className="documentListEdit">Edit</button>
            </Link>
            <Link
              to={{ pathname: "/read/" + params.row._id, document: params.row }}
            >
              <button className="documentListRead">Read</button>
            </Link>
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
    <div className="documentList">
      <div className="datatableTitle">
        My Documents
      </div>
      <div className="link">
        <Link to="/newDocument">
          <button className="link-button">
          New Document
          </button>
        </Link>
      </div>
      <div style={{ 
        height: 600, 
        width: 800, 
        padding: 40,     
      }}>
      <DataGrid
        rows={mydocuments}
        disableSelectionOnClick 
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(e) => e._id}
      />
       </div>
    </div>
  );
}
