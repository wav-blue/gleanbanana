import BananaIndex from "./BananaIndex";
import Intro from "./Intro";
import Problem from "./Problem";
import Project from "./Project";

const About = () => {
  return (
    <article className="about__wrapper">
      <Intro />
      <Problem />
      <BananaIndex />
      <Project />
    </article>
  );
};

export default About;
