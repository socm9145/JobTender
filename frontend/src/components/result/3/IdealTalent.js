import BarChart from "./BarChart";
import data from "./barData.json";

const IdealTalent = () => {
  return (
    <div>
      <BarChart data={data} />
    </div>
  );
};

export default IdealTalent;
