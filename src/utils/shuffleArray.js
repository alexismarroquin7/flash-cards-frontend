function selectRandomItemFromList(arr){
  const index = Math.floor(Math.random() * arr.length)
  return [ arr[index], index ]
}

export function shuffleArray(arr){
  const newArray = [];

  const indexesUsed = new Set();
  let indexesUsedCount = 0;
  
  let itemsShuffling = true;

  while (itemsShuffling){
    if(indexesUsedCount === arr.length){
      itemsShuffling = false
    }

    const [randomItem, index] = selectRandomItemFromList(arr);
    
    if(!indexesUsed.has(index)){
      newArray.push(randomItem);
      indexesUsed.add(index);
      indexesUsedCount += 1;
    }
  }
  
  return newArray;
}