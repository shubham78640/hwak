import React, { useEffect, useState } from "react";
import { Button, Box, CircularProgress } from "@mui/material";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase";
//import db from "./firebase"
import { useNavigate } from "react-router-dom";
import { onSnapshot } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Navbaar from "./Navbaar/Navbaar";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

const db = getFirestore(app);

function OcrToFirebase({ details }) {
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState({});
  const [imageurl, setImageUrl] = useState("");
  const [flag, setFlag] = useState(false);
  const [empEmail, setEmpEmail] = useState("");
  const [expDetails, setExpDetails] = useState({});
  const [alert, setAlert] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(res).length > 0) {
      setFlag(true);
    } else {
      setFlag(false);
    }
  }, [res]);

  useEffect(() => {
    const details1 = details?.row?.invoiceImage;
    const email = details?.row?.email;
    const expenseDetails = details?.row;
    setEmpEmail(email);
    setImageUrl(details1);
    setExpDetails(expenseDetails);
    console.log("det", details);
  }, []);

  const AddBill = () => {
    try {
      const apidata = addDoc(
        collection(db, "ocrdatbaseitems"),
        //res,
        { email: empEmail, ...res }
      )
        .then((res) => res)
        .then((red) => {
          navigate("/tab");
          console.log(red);
        })

        .catch((err) => console.log("err", err));
    } catch (err) {
      console.log("err");
    }
  };

  const handleonclick = async () => {
    setLoading(true);
    window.open(imageurl, "_blank", "width=600,height=400");
    console.log("details JSON:", imageurl);
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST,OPTIONS",
          },

          body: JSON.stringify({
            model: "gpt-4-vision-preview",

            messages: [
              {
                role: "user",
                content: [
                  {
                    type: "text",
                    text: "Develop an AI model to transform visual invoice data into structured JSON text. This model must accurately extract and categorize critical invoice elements with high precision. The primary fields for extraction include 'invoice_number', capturing the unique identifier of the invoice; 'invoice_date', detailing when the invoice was issued; 'total_amount', representing the final amount due after all calculations; 'items', listing the products or services provided; 'quantity', noting the amount of each item; 'description', providing detailed explanations of each item; and 'vendor_name', identifying the seller. The output must strictly adhere to JSON format, focusing solely on these key invoice components without including any extraneous text or data. and in items rate pice amount and unit price All data comes in 'unit_price' and in items item, name , item name add data comes in 'item', and all data come in string formate only.",
                    // text: "Develop an AI model to transform visual invoice data into structured JSON text. This model must accurately extract and categorize critical invoice elements with high precision. The primary fields for extraction include 'invoice_number', capturing the unique identifier of the invoice; 'invoice_date', detailing when the invoice was issued; 'total_amount', representing the final amount due after all calculations; 'items', listing the products or services provided; 'quantity', noting the amount of each item; 'description', providing detailed explanations of each item; and 'vendor_name', identifying the seller. The output must strictly adhere to JSON format, focusing solely on these key invoice components without including any extraneous text or data."
                    //"Convert image data to text in JSON format no other extra text allowed main fields are same as invoice_number, invoice_date, total_amout, items, quentity, discription, vendor_name",
                  },

                  {
                    type: "image_url",
                    image_url: {
                      //  url:"https://1.bp.blogspot.com/-9lR-V7pCE1o/X6uQCmRhrwI/AAAAAAACYUo/1Jf5PkooINsd1DclNWa4ZXHNIqfy40V6QCLcBGAsYHQ/s16000/100-free-invoice-templates-print-email-invoices.png"
                      // url:"https://i.pinimg.com/originals/7f/d5/f6/7fd5f6b8bfcca3b465098e7bb6d532fd.jpg"
                      // url:"https://images.examples.com/wp-content/uploads/2018/06/Free-Sales-Invoice-Example.jpg"
                      // url: "https://pbs.twimg.com/media/C2xuqnWWEAAqRqF.jpg",
                      // "url": "https://media-cdn.tripadvisor.com/media/photo-s/12/ca/02/c9/bill.jpg"
                      // url: "https://www.zoho.com/invoice/images/invoice-templates/excel-invoice-template/excel-invoice-template-2x.jpg",
                      url: imageurl,
                    },
                  },
                ],
              },
            ],
            max_tokens: 300,
          }),
        }
      );

      const data = response; // Assign on verable and save the response in that veriable
      //.choices[0].message.content;

      // if(data){

      //   const data1 = await data?.json();
      //   const data2 = data1?.choices?.[0]?.message?.content;
      //   console.log("helpp ",data2);
      // }

      const data1 = await data?.json(); // Convert Jata in JSON Function

      const data2 = data1?.choices?.[0]?.message?.content; //Assign one Veriable and reach Endpoint of our response(Data)

      //const data3 = data2.toString().split("```json")[1]?.split("```")[0]; // use Split function for Slipt String Value and save Split data in data3 veriable

      // const data4 = data3 ? JSON.parse(data3):""; // After Spliting data comes in String Formate so use JSON.parse() function to convert tring data in to JSON formate
      if (data2) {
        const data3 = data2.toString().split("```json")?.[1]?.split("```")?.[0];
        const data4 =
          data3 && Object.keys(data3).length ? JSON.parse(data3) : undefined;
        setRes(data4);
        console.log("AI result", data4);
        if (Object.keys(data4).length) {
          //  setLoading(true);
        }
      }
      console.log("data", res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  const handleChange = (e, index = -1) => {
    console.log("evalue", e.target.name, e.target.value, index);
    const value = e.target.value;
    const key = e.target.name;
    if (index == -1) {
      res[key] = value;
    } else {
      res.items[index][key] = value;
      console.log("updateitem new");
    }
    setRes(res);
    console.log("response new", res);
  };

  return (
    <>
      <Navbaar />
      <Box mt={2} p={2}>
        {/* <Stack sx={{ width: '100%' }} spacing={2}>
     {alert? <Alert severity="success">Data Saved Successfully.</Alert>:""}
      </Stack> */}
        <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              Employee Email- {empEmail}
            </Typography>
            <Typography variant="h5" component="div">
              Employee Name- {expDetails.name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              brand = {expDetails.brand}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              brand = {expDetails.subBrand}
            </Typography>
            <Typography variant="body2">
              Remarks - {expDetails.remarks}
              <br />
            </Typography>
          </CardContent>
        </Card>

        <Box mt={4}>
          <Button
            variant="contained"
            color="warning"
            sx={{}}
            onClick={handleonclick}
          >
            AI Itemization
          </Button>
        </Box>
        {/* use loging  For hide Data and show loading  */}
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mt={4}
          >
            <CircularProgress color="warning" />
          </Box>
        ) : (
          <Box>
            <Box mt={5}>
              {/* use flag For hide Data and sjow loading logic */}
              {flag ? (
                <div>
                  <Box mt={5}>
                    Total Amount-
                    <input
                      style={{ fontSize: "18px" }}
                      defaultValue={res.total_amount}
                      name="total_amount"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                  </Box>

                  <Box mt={5}>
                    Invoice Number -
                    <input
                      style={{ fontSize: "18px" }}
                      defaultValue={res.invoice_number}
                      name="invoice_number"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                  </Box>
                  <Box mt={5}>
                    Bill Invoice date -
                    <input
                      type="text"
                      style={{ fontSize: "18px" }}
                      defaultValue={res.invoice_date}
                      name="invoice_date"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                  </Box>

                  <Box mt={5}>
                    Vendor Name -
                    <input
                      style={{ fontSize: "18px" }}
                      defaultValue={res.vendor_name}
                      name="vendor_name"
                      onChange={(event) => {
                        handleChange(event);
                      }}
                    />
                  </Box>

                  <Box>
                    {/* Data Item Wise Code Mapping Start Here */}

                    {res?.items &&
                      res.items.map((el, index) => (
                        <div>
                          <Box sx={{ display: "flex" }}>
                            <Box mt={5}>
                              Item Name -
                              <input
                                type="text"
                                defaultValue={el.description}
                                name="description"
                                onChange={(event) => {
                                  handleChange(event, index);
                                }}
                              />
                            </Box>

                            <Box mt={5} ml={4}>
                              Item QTY -
                              <input
                                type="text"
                                defaultValue={el.quantity}
                                name="quantity"
                                onChange={(event) => {
                                  handleChange(event, index);
                                }}
                              />
                            </Box>
                            <Box mt={5} ml={4}>
                              Item rate -
                              <input
                                type="text"
                                defaultValue={el.unit_price}
                                name="rate"
                                onChange={(event) => {
                                  handleChange(event, index);
                                }}
                              />
                            </Box>
                          </Box>

                          {/* Data Item Wise Code Mapping End Here */}
                        </div>
                      ))}
                  </Box>

                  {/* For Connect with firebase and Save Response Button Code Start here */}

                  <Box mt={4}>
                    <Button
                      variant="contained"
                      color="warning"
                      sx={{}}
                      onClick={AddBill}
                    >
                      Initiate Approval
                    </Button>
                  </Box>
                  {/* For Connect with firebase and Save Response Button Code End here */}
                </div>
              ) : (
                "Please Click to Fetch All Data From AI "
              )}
            </Box>
          </Box>
        )}
      </Box>

      {/* <Box mt={4}>
        <Button variant="contained" sx={{}} onClick={AddBill}>
          Submit
        </Button>
      </Box> */}

      {/* {res?.items &&
        res.items.map((el, index) => (
          <div>
            <input
              type="text"
              defaultValue={el.description}
              name="description"
              onChange={(event) => {
                handleChange(event, index);
              }}
            />
            <input
              type="text"
              defaultValue={el.quantity}
              name="quantity"
              onChange={(event) => {
                handleChange(event, index);
              }}
            />
            <input
              type="text"
              defaultValue={el.rate}
              name="rate"
              onChange={(event) => {
                handleChange(event, index);
              }}
            />
          </div>
        ))} */}
    </>
  );
}

export default OcrToFirebase;
