import React, { useState } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Forecast.css';
import LinearProgress from '@mui/material/LinearProgress';

function ForeCast({city, forecast:{forecastday}}){
    const [expanded, setExpanded] = useState(false);
    console.log(forecastday);
    const handleChange =
      (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    return(
        <div className="foreCastSection">
        ForeCast for {city}
        {
            forecastday.map(curDateForecast =>
                {
                    const {date, day, hour} = curDateForecast;
                    const {maxtemp_c, mintemp_c, daily_chance_of_rain, condition: {icon, text}} = day;
                return(
                    <Accordion expanded={expanded === date} onChange={handleChange(date)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id={date}
        >
            <img src={icon}/>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            {date} ({text})
          </Typography>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <b>Temp:</b> {mintemp_c} to {maxtemp_c}
          </Typography>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            <b>{daily_chance_of_rain}</b> % of rain possible
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {
            hour.map((curHourForecast,index) =>{
              return(
                <div className="hourtrack">
                  <b>{index}:00</b>
                  <img src={curHourForecast.condition.icon} />
                  <div className="progress">
                  <LinearProgress variant="determinate" value={(curHourForecast.temp_c*100)/maxtemp_c} />
                  </div>
                  {curHourForecast.temp_c} deg
                </div>
              )
            })
          }
        </AccordionDetails>
      </Accordion>
                ) }
            )
        }
        
    </div>
    );
}

export default ForeCast;