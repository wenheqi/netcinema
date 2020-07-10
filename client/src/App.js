import React from "react";
import "./App.css";
import Navbar from "./components/elements/Navbar";
import Footer from "./components/elements/Footer";
import Section from "./components/elements/Section";
import JumboSearch from "./components/elements/JumboSearch";
import SampleMovies from "./components/elements/SampleMovies";

function App() {
  return (
    <div>
      <Navbar />
      {/* search secion */}
      <Section>
        <JumboSearch />
      </Section>
      <Section>
        <SampleMovies genre="Action" />
      </Section>
      <Section>
        <SampleMovies genre="Comedy" />
      </Section>
      <Section>
        <SampleMovies genre="Drama" />
      </Section>
      <Section>
        <SampleMovies genre="Family" />
      </Section>
      <Section>
        <SampleMovies genre="Horror" />
      </Section>
      <Section>
        <SampleMovies genre="Sci-Fi" />
      </Section>
      <Section>
        <SampleMovies genre="Romance" />
      </Section>
      <Footer />
    </div>
  );
}

export default App;
