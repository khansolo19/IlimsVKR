import React, { useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { Button, Container, Typography, Box, Grid } from "@mui/material";

import { useProductContext } from "../Context/ProductContextProvider";
import MySkeleton from "../Components/Skeleton/MySkeleton";
import AddCom from "../Components/Comments/AddCom";
import ListCom from "../Components/Comments/ListCom";

const ProdDetail = () => {
  const { prodId } = useParams();
  const { getOneProduct, oneProd } = useProductContext();
  

  useEffect(() => {
    getOneProduct(prodId);
  }, [prodId]);

  return (
    <>
      <Container
        sx={{
          padding: "20px",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          // bgcolor: "#FFEFBA",
        }}
      >
        {oneProd ? (
          <Grid style={{display: "flex"}}>
          <Grid xs={12} md={6}>
           <img width="100%" src={oneProd.img} alt="" />
          </Grid>
          <Grid  xs={12} md={6}>
            <Typography m="5px">{oneProd.surename} {oneProd.name} {oneProd.middlename}</Typography>
            <Typography m="5px">{oneProd.price} сом</Typography>
            <Typography m="5px">
              {oneProd.description}
            </Typography>
            <Typography m="5px">
              {oneProd.education}
            </Typography>
            <Typography m="5px">
              {oneProd.treatment_profile}
            </Typography>
            <Typography m="5px">
              {oneProd.experience}
            </Typography>
          </Grid>
            
          </Grid>
        ) : (
          <MySkeleton />
        )}
         <Link to={`/feedback/${prodId}`} className="mobile-link">
           <Button variant="outlined" color="info">
                {" "}
                Оставить отзыв
              </Button>
              </Link>
              <br></br>
              <br></br>
        <Link to="/products" className="mobile-link">
              <Button variant="outlined" color="warning">
                {" "}
                Назад
              </Button>
              {" "}
            </Link>
      </Container>
      <Box>
        <ListCom />
        <AddCom />
      </Box>
    </>
  );
};

export default ProdDetail;
