import "./library.scss";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
import { useContext, useEffect } from "react";

import { DocumentContext } from "../../context/documentContext/DocumentContext";
import { getDocuments} from "../../context/documentContext/apiCalls";

// import { Document, Page,pdfjs } from 'react-pdf';

export default function Library() {
  const { documents, dispatch } = useContext(DocumentContext);
  useEffect(() => {
    getDocuments(dispatch);
  }, [dispatch]);

  
  const columns = [
    // {
    //   field: "file",
    //   headerName: "",
    //   headerAlign: 'center',
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //     <div className="read-document">
    //       <img src="https://res.cloudinary.com/itha/image/upload/c_thumb,w_200,g_face/v1651069741/Reinforcement_and_deep_reinforcement_learning_for_wireless_Internet_of_Things__A_survey_rdjlet.pdf
    //       " alt="" />
    //   </div>
    //     );
    //   },
    // },
    {
      field: "document",
      headerName: "Name",
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
    
    { field: "classify", headerName: "Classify", width: 120 ,editable: false,
    sortable: true,
    filterable: true,},
    { field: "author", headerName: "Author", width: 120 ,editable: false,
    sortable: true,
    filterable: true,},
    { field: "year", headerName: "Year", width: 80 ,editable: false,
    sortable: true,
    filterable: true,},
    { field: "uploadby", headerName: "Upload By", width: 100 ,editable: false,
    sortable: true,
    filterable: true,},
    
    {
      field: "read",
      headerName: "Action",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{ pathname: "/read/" + params.row._id, document: params.row }}
            >
              <button className="documentListRead">Read</button>
            </Link>
          </>
        );
      },
    },
  ];

  
  return (
    <div className="documentList">
      <div className="datatableTitle">
        Library
      </div>
      <div className="datatable-data">
        <DataGrid
          rows={documents}
          disableSelectionOnClick
          columns={columns}
          pageSize={8}
          checkboxSelection 
          getRowId={(e) => e._id}
          // rowHeight={140} 
          rowHeight={80} 
        />
      </div>
    </div>
  );
}
