import StaggeredMenu from "./components/StaggeredMenu"
import Hero from "./components/Hero"
import About from "./components/About"
import Experience from "./components/Experience"
import Skills from "./components/Skills"
import Projects from "./components/Projects"
import Achievements from "./components/Achievements"
import Contact from "./components/Contact"
import LoadingScreen from "./components/LoadingScreen"

export default function App() {
  return (
    <>
      <LoadingScreen />
      <StaggeredMenu />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Contact />
      </main>
    </>
  )
}
