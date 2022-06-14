import React, {useContext} from 'react';
import Box from '@mui/material/Box';
import { Link, useParams } from "react-router-dom";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Rating, Stack, Button } from '@mui/material';
import { useEffect } from 'react';
import { useProductContext } from '../Context/ProductContextProvider';
import { useState } from 'react';



export default function Feedback() {
  const { id } = useParams();
  const { getOneProduct, oneProd } = useProductContext();
  const [thoroughness, setThoroughness] = useState(0)
  const [efficiency, setEfficiency] = useState(0)
  const [attitude, setAttitude] = useState(0)
  const [average, setAverage] = useState(0)
  const [informing, setInforming] = useState(0)
        

  useEffect(() => {
    getOneProduct(id);
  }, [id]);


  const sendRating = async (id) => {
    let obj = {
        thoroughness: 1,
        efficiency: 2,
        attitude: 3,
        informing: 4,
        average: 2.5
    }
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
            <h3>Thoroughness : {oneProd.rating.thoroughness}</h3>
            <h3>Efficiency : {oneProd.rating.efficiency}</h3>
            <h3>Attitude : {oneProd.rating.attitude}</h3>
            <h3>Informing : {oneProd.rating.informing}</h3>
            <h3>Average : {oneProd.rating.average}</h3>
          </>
        ) : (
          <h1>Wait a minute</h1>
        )
      }
      <Stack spacing={1}>
     Тщательность обследования  <Rating name="half-rating" value={thoroughness} onChange={(e)=>setThoroughness(e.target.value)} precision={1} /> <br></br>
     Эффективность лечения <Rating name="half-rating" defaultValue={1} precision={1} /> <br></br>
     Отношение к пациенту <Rating name="half-rating" defaultValue={3} precision={1} /> <br></br>
     Информирование пациента <Rating name="half-rating" defaultValue={2.5} precision={1} /> <br></br>
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
     Общее <Rating name="half-rating" defaultValue={2.5} precision={1} />
    </Stack>
    
     
      <Button variant="contained">Отправить</Button>
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
