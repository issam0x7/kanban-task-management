

export async function getBoards() {
  const res = await fetch("http://localhost:3001/api/boards");
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json();
}