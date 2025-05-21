import { useState } from 'react';
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

let ValuePiece = Date | null;

let Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarDoc = () => {
  const { value, onChange } = useState < Value > new Date();

  return (
    <div>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
};

export default CalendarDoc;
