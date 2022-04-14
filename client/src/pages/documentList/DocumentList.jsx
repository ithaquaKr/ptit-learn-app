import "./documentList.scss";
import GridViewIcon from '@mui/icons-material/GridView';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { DocumentContext } from "../../context/documentContext/DocumentContext";
import { deleteDocument, getDocuments } from "../../context/documentContext/apiCalls";

export default function DocumentList() {
  const { documents, dispatch } = useContext(DocumentContext);

  useEffect(() => {
    getDocuments(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteDocument(id, dispatch);
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "document",
      headerName: "Document",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="documentListItem">
            <img className="documentListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "year", width: 120 },
    { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/document/" + params.row._id, document: params.row }}
            >
              <button className="documentListEdit">Edit</button>
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
      <GridViewIcon
        rows={documents}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  );
}
