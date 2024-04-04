import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  useGridApiEventHandler,
  GridToolbar,
 
 
} from "@mui/x-data-grid";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { app } from "../firebase";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
import Navbaar from "./Navbaar/Navbaar";
const db = getFirestore(app);




function ApprovalUserDataTable({setDetails}) {

  const [datatable, setDatatable] = useState([]);
  const [res, setRes] = useState({});


  const columns = [
    {
      field: "invoiceNumber",
      headerName: "Invoice Number",
      width: 100,
      //editable: true,
      description:"Invoice Number",
    },
    {
      field: "approvalID",
      headerName: " approvalID",
      width: 90,
    //  editable: true,
      description:"Approval Id",
    },
    {
      field: "name",
      headerName: "Employee Name",
      width: 130,
     // editable: true,
      description:"Employee Name",
    },
  
    {
      field: "vendorName",
      headerName: "Vendor Name",
      width: 120,
      // editable: true,
      description:"Email",
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      // editable: true,
      description:"Email",
    },
    {
      field: "invoiceType",
      headerName: "Invoice Type",
      description: "Invoice Type",
      sortable: true,
      width: 110,
      
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 110,
      editable: true,
      description:"Brand",
    },
    {
      field: "subBrand",
      headerName: "Sub Brand",
      width: 110,
      editable: true,
      description:"Sub Brand",
    },
    {
      field: "remarks",
      headerName: "Remarks",
      width: 130,
      editable: true,
      description:"Remarks",
    },
    {
      field: "location",
      headerName: "Location",
      width: 140,
      editable: true,
      description:"Location",
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      width: 100,
      editable: true,
      description:"Total Amount",
    },
    {
      field: "capex_opex",
      headerName: "Capex Opex",
      width: 70,
      editable: true,
      description:"Capex Opex",
    },
    {
      field: "descriptionOfExpense",
      headerName: "Description Of Expense",
      width: 140,
      editable: true,
      description:"Description Of Expense",
    },
     {
        field: "expenseCategory",
        headerName: "Expense Category",
        width: 140,
        editable: true,
        description:"Expense Category",
      },
      {
        field: "expenseSubCategory",
        headerName: "Expense Sub Category",
        width: 140,
        editable: true,
        description:"Expense Sub Category",
      },
      {
        field: "paymentMode",
        headerName: "Payment Mode",
        width: 140,
        editable: true,
        description:"Payment Mode",
      },


  ];




const handleEvent =(event)=>{
 
  setDetails(event)
  navigate("/asd")
}




  let navigate = useNavigate();
 

  useEffect(() => {

const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "expenseApprovalForm"));
    const fetchedData = querySnapshot.docs.map(doc => 
      doc.data());
    setDatatable(fetchedData)
    
    console.log("Data from Firestore:", fetchedData);
  } catch (err) {
    console.error("Error fetching data:", err);
  }
};



    fetchData();
  }, []);
 console.log("tabledata", datatable);
 console.log("tabldescriptionOfExpense",datatable[0]?.brand)
  return (
    <>
    <Box sx={{marginBottom:"5px"}}>

    <Navbaar/>
    </Box>
  
      <Box
        p={0.5}
        sx={{
          height: 620,
          width: "100%",
          backgroundColor: "#f2f2f2",
          minHeight: "600px",
          maxHeight: "100%",
          '& .discuss': {
            backgroundColor: '#fff44f',
            color: '#1a3e72',
          },
          '& .accept': {
            backgroundColor: '#3CB371',
            color: '#EFEFEF', 
          },
          '& .reject': {
             backgroundColor: '#DD6464',
            color: '#EFEFEF',
          },

        }}
      >
        <DataGrid
          getRowId={(row) => row.invoiceNumber}
          rows={datatable?datatable:""}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[500]}
          components={{ Toolbar: GridToolbar }}
          rowHeight={32}
          onRowClick={handleEvent}
          // initialState={{
          //   sorting: {
          //     sortModel: [
          //       {
          //         field: 'submissionDate',
          //         sort: 'desc',
          //       },
          //     ],
          //   },
          // }}
          // getCellClassName={(params) => {
          //   if ( params.value === "Reject") {
          //     return 'reject';
          //   }
          //   if ( params.value === "Accept") {
          //     return 'accept';
          //   }
          //   if ( params.value === "Discuss") {
          //     return 'discuss';
          //   }
          // }}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </Box>
    </>
  );
}

export default ApprovalUserDataTable;
