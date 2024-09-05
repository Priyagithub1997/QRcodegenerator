
import { useState } from 'react';
import './index.css'

function App() {
  const [img, setimg] = useState("");
  const [loading, setloading] = useState(false);
  const [qrdata, setqrdata] = useState("");
  


  async function generateQR() {
    setimg("");
    try {
      
      setloading(true);
      const URL = `https://api.qrserver.com/v1/create-qr-code/?size=150*150&data=${encodeURIComponent(qrdata)}`;
      setimg(URL);
    }
    catch (err) {
      console.log("Error " + err);

    } finally {
      setloading(false);
    }




  }
  function downloadQR() {
   fetch(img)
   .then ((response)=>(response.blob()))
   .then ((blob)=>{
    const link=document.createElement("a");
    link.href=URL.createObjectURL(blob);
    link.download="qrcode.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
   })
   .catch((error)=>{
    console.error("Error=",error);

   })

  }


  return (
    <>
      <div className="appcontainer">
        <h2>QR CODE GENERATOR</h2>
        {img && <img className="QRcode" src={img} alt="" ></img>}
        {loading && <p>Loading....</p>}
        <label htmlFor="datainput">Enter Data</label>

        <input type="text" id="datainput" placeholder="Enter data for QR code" value={qrdata} onChange={(e) => setqrdata(e.target.value)} />
      
        <div className='btndiv'>
          <button disabled={loading} onClick={generateQR} className='generatebtn'>Generate QR code</button>
          <button onClick={downloadQR} className='downloadbtn'>Download QR code</button>
        </div>

      </div>
    </>
  )
}

export default App
