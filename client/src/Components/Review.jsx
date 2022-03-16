import React, { useState } from "react";
import { Rating } from "primereact/rating";

import { InputTextarea } from "primereact/inputtextarea";

export const RatingDemo = () => {
  const [rate, setRate] = useState(null);
  const [value, setValue] = useState(null);

  return (
    <div>
      <div className="card">
        <h5>Calificación</h5>
        <Rating
          value={rate}
          cancel={false}
          onChange={(e) => setRate(e.value)}
        />
      </div>

      <InputTextarea
      rows={4}
      cols={50}
        maxLength={150}
        value={value}
        onChange={(e) => setValue(e.target.value)}
    
      />
    </div>
  );
};
