import { useParams } from "react-router-dom";

const ResultNavigator = () => {
  const { classId } = useParams();

  return (
    <div style={{ marginTop: "95px" }}>
      {classId === "10" ? (
        <Class10Results />
      ) : (
        <Class12Results />
      )}
    </div>
  );
};

export default ResultNavigator;