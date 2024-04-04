import { Avatar, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import pinch from "../../images/Pinch.png";
import AppsIcon from "@mui/icons-material/Apps";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import styled from "@emotion/styled";
import { app } from "../../firebase";
import { getAuth, signOut } from "firebase/auth";
const P = styled("p")({
  fontWeight: "300",
  color: "grey",
  fontFamily: "sans-serif",
  fontSize:"14px"
});

const auth = getAuth(app);
function Navbaar() {

  let navigate = useNavigate();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const open = Boolean(anchorEl);
   const handleClick = (event) => {
     setAnchorEl(event.currentTarget);
   };
  const logout = () => {
    signOut(auth);
    navigate("/");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: 1,
        justifyContent: "space-between",
        backgroundColor: "#fdf9f2",
        
        // boxShadow:
        //   "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px",
      }}
    >
      <Box
        sx={{
          marginLeft: { sm: 4, xs: 1 },
          display: "grid",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
           <img
            style={{ cursor: "pointer" }}
            width={"70px"}
            src={pinch}
            alt=""
            onClick={() =>{
              navigate("/tab")
            }}
          />

      </Box>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>

        <Box
          sx={{marginRight:{xs:"-35px"}}}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        //  onMouseOver={handleClick}
          >
           
        </Box>

        <Box
          sx={{
            marginLeft: { sm: 0, xs: 1 },
            marginRight:"10px",
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* <img
            style={{ cursor: "pointer" }}
            width={"70px"}
            src={pinch}
            alt=""
          /> */}
          <Button variant="text" color="warning" onClick={logout}>
            logout
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Navbaar;
