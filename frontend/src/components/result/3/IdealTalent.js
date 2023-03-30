import BarChart from "./BarChart";
import data from "./barData.json";

const IdealTalent = () => {
  return (
    <div>
      기업 키워드
      <BarChart data={data} />
    </div>
  );
};

export default IdealTalent;
