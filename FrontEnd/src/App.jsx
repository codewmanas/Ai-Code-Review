import { useState, useEffect, use, useActionState } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs" 
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(` function sum(){ return 1+ 1 }`)

  const [review, setReview] = useState(``)


  useEffect(() => {
    prism.highlightAll()
  })

  async function reviewCode(){
   const response = await axios.post('http://localhost:3000/ai/get-review', {code})
  
   setReview(response.data);
  }

  return (
    <>
    <main>
      <div className="left">
        <div className="code">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, 'javascript')}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 16,
                border: '1px solid #ddd',
                borderRadius: 5,
                height: '100%',
                width: '100%'
              }}
              />
        </div>
        <div className="review"
        onClick={reviewCode}
        >Review</div>
      </div>
      <div className="right">
        { 
          review
        }
      </div>
    </main>
    </>
  )
}


function sum(){
  return 1 + 2
}

export default App
