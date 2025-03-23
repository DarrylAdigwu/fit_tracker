export async function sendData(route, allData) { 
  try {
    const response = await fetch(`http://localhost:3000/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        allData
      })
    });
    
    /*if(!response.ok) {
      throw new Error (`HTTP error! status: ${response.status}`);
    }*/
     
    const responseData = await response.json();
    return responseData
     
  } catch(err) {
    console.error("Error:", err)
    throw err;
  }
}