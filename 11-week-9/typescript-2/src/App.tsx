function App() {

  return (
    <>
      <Todo title="nv" description="todo" done={false}/>
    </>
  )
}

interface TodoProp {
  title: string,
  description: string,
  done: boolean
}

function Todo(props: TodoProp) {
  return <div className="todo">
    <h1>{props.title}</h1>
    <h3>{props.description}</h3>
  </div>
}

export default App
