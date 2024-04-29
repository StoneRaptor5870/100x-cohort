import Card, { PersonPropsTypes } from "./components/Card.tsx";

const person: PersonPropsTypes[] = [
  {
    name: "Nischay",
    interests: ["coding", "music", "video games"],
    job: "freelance dev",
    socials: [
      {
        socialName: "LinkedIn",
        url: "https://www.linkedin.com/",
      },
    ],
  },
];

function App() {

  return (
    <div className="w-full h-screen bg-slate-800 text-white p-3">
      {person.map((per, index) => {
        return (
          <Card
            key={index}
            interests={per.interests}
            job={per.job}
            name={per.name}
            socials={per.socials}
          />
        );
      })}
    </div>
  );
}

export default App
