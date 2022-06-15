import React from 'react';
import Box from '@mui/material/Box';
import { Link, useParams } from "react-router-dom";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Rating, Stack, Button } from '@mui/material';
import { useEffect } from 'react';
import { useProductContext } from '../Context/ProductContextProvider';
import { useState } from 'react';



export default function Feedback() {
  const { id } = useParams();
  const { getOneProduct, oneProd, saveEditedProd } = useProductContext();
  const [thoroughness, setThoroughness] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [attitude, setAttitude] = useState(0);
  const [informing, setInforming] = useState(0);


  useEffect(() => {
    getOneProduct(id);
  }, [id]);

  function countAverage(arr){
    let result = 0;
    if(arr){
      arr.forEach(item=>{
        result+=item
      })
      return result/arr.length
    }
  }

  const countAverageRating = () => {
    oneProd.rating.thoroughness.push(thoroughness)
    oneProd.rating.efficiency.push(efficiency)
    oneProd.rating.attitude.push(attitude)
    oneProd.rating.informing.push(informing)
    let averageRating = countAverage(oneProd.rating.thoroughness) + countAverage(oneProd.rating.efficiency) + countAverage(oneProd.rating.attitude) + countAverage(oneProd.rating.informing);
    const newObj = {
      ...oneProd,
      rating:{
        ...oneProd.rating,
        average: averageRating/4,
      }
    }
    saveEditedProd(newObj)
  }


  return (
    <div >

    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 3, width: '50ch' },
      }}
      noValidate
      autoComplete="off"
    >
      {
        oneProd ? (
          <>
            <h3>Thoroughness : {countAverage(oneProd.rating.thoroughness)}</h3>
            <h3>Efficiency : {countAverage(oneProd.rating.efficiency)}</h3>
            <h3>Attitude : {countAverage(oneProd.rating.attitude)}</h3>
            <h3>Informing : {countAverage(oneProd.rating.informing)}</h3>
            <h3>Average : {oneProd.rating.average}</h3>
          </>
        ) : (
          <h1>Wait a minute</h1>
        )
      }
      <Stack spacing={1}>
     Тщательность обследования  <Rating name="half-rating" value={thoroughness} onChange={(e)=>setThoroughness(parseInt(e.target.value))} precision={1} /> <br></br>
     Эффективность лечения <Rating name="half-rating" value={efficiency} onChange={(e)=>setEfficiency(parseInt(e.target.value))} precision={1} /> <br></br>
     Отношение к пациенту <Rating name="half-rating"  value={attitude} onChange={(e)=>setAttitude(parseInt(e.target.value))} precision={1} /> <br></br>
     Информирование пациента <Rating name="half-rating" value={informing} onChange={(e)=>setInforming(parseInt(e.target.value))} precision={1} /> <br></br>
     <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Do you recomend the doctor???</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="false" control={<Radio />} label="yes" />
        <FormControlLabel value="true" control={<Radio />} label="no" />
      </RadioGroup>
    </FormControl>
     Общее <Rating readOnly value={ oneProd && oneProd.rating ? oneProd.rating.average : 0 } />
    </Stack>
    
     
      <Button onClick={countAverageRating} variant="contained">Отправить</Button>
      <Link to="/proddetail" className="mobile-link">
              <Button variant="outlined" color="warning">
                {" "}
                Назад
              </Button>
              {" "}
            </Link>
      
    </Box>
    
    </div>
    
  );
}
