import { useParams } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";

import ResultsHero from "./ResultsHero";
import ResultsStats from "./ResultStats";
import Class10Results from "./Class10Results";
import Class12Results from "./Class12Results";
import ResultsCTA from "./ResultsCTA";

const AcademicResults = () => {
  useScrollToTop();

  const { classId } = useParams();

  return (
    <>
      <ResultsHero classId={classId} />

      <ResultsStats classId={classId} />

      {classId === "10" && (
        <Class10Results />
      )}

     {classId === "12" && (
        <Class12Results />
      )}

      <ResultsCTA />  
    </>
  );
};

export default AcademicResults;