// Welcome
import React, { memo } from "react";
import { HeadCircuit, Code } from "@phosphor-icons/react";
import { logo_1 } from "../../assets";
import styles from "./Welcome.module.css";

const Welcome = () => {
  return (
    <div className={styles.container}>
      <Header />
      <MiddleSection />
      <FeatureSection />
    </div>
  );
};

const Header = memo(() => (
  <header className={styles.logoContainer}>
    <img src={logo_1} alt="Logo" className={styles.logo} />
    <span className={styles.appName}>AI TUTOR</span>
  </header>
));

const MiddleSection = memo(() => (
  <section className={styles.middle}>
    <p className={styles.bigParagraph}>
      AI Tutor platform by Tshwane University of Technology and merSETA Chair in Tech-Enabled TVET
    </p>
    <p className={styles.smallParagraph}>
      Discover the future of education with our AI-driven platform.
      Personalize your learning, enhance your skills, and achieve your goals quickly with the tools you need to succeed.
    </p>
  </section>
));

const FeatureSection = memo(() => {
  const features = [
    {
      id: 1,
      icon: <HeadCircuit size={24} color="#30B0C7" />,
      text: "Transform Your Learning Experience with AI",
    },
    {
      id: 2,
      icon: <Code size={24} color="#30B0C7" />,
      text: "Unlock your potential with our AI-powered platform",
    },
  ];

  return (
    <footer className={styles.footer}>
      {features.map(({ id, icon, text }) => (
        <div key={id} className={styles.section}>
          {icon}
          <p className={styles.shortParagraph}>{text}</p>
        </div>
      ))}
    </footer>
  );
});

export default Welcome;
