import React from 'react'
import { formatToLocalTime } from '../Services/WeatherService';

function TimeandLocation() {
  return (
    <div>
      <div className=" flex items-center justify-center my-6">
     <p className="text-white text-xl font-extralight">
     {formatToLocalTime}
     </p>


      </div>

      <div className=" flex items-center justify-center my-3">
        <p className="text-white text-3xl font-medium">Berlin, DE</p>
        
      </div>
      
    </div>
  )
}

export default TimeandLocation;