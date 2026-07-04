import StudentLifeHero from "./StudentLifeHero";
import ClubsSocieties from "./ClubsSocieties";
import StudentLeadership from "./StudentLeadership";
import StudentLifeCTA from "./StudentLifeCTA";

const StudentLife = () => {
  return (
    <div className="pt-[90px] bg-white">
      <StudentLifeHero />
      <ClubsSocieties />
      <StudentLeadership />
      <StudentLifeCTA />
    </div>
  );
};

export default StudentLife;