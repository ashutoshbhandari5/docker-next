import React from "react";
import BarGraph from "../components/BarGraph";
import LetterFrequency from "@visx/mock-data/lib/mocks/letterFrequency";

const index = () => {
  return (
    <div>
      <BarGraph data={LetterFrequency} width={900} height={700} />
    </div>
  );
};

export default index;
