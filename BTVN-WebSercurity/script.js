// --- Utilities ---
function sanitize(s) {
  return s.replace(/[^A-Za-z]/g, "").toUpperCase();
}
function mod(a, m) {
  return ((a % m) + m) % m;
}

// --- Caesar ---
function caesar(text, k, enc = true) {
  let shift = enc ? k : -k;
  return text.replace(/[A-Za-z]/g, c => {
    let base = c === c.toUpperCase() ? 65 : 97;
    return String.fromCharCode(base + mod(c.charCodeAt(0) - base + shift, 26));
  });
}

// --- Affine ---
function gcd(a, b) { return b === 0 ? a : gcd(b, a % b); }
function modInv(a, m) {
  a = mod(a, m);
  for (let x = 1; x < m; x++) if ((a * x) % m === 1) return x;
  return -1;
}
function affine(text, a, b, enc = true) {
  let s = sanitize(text);
  if (enc) {
    return [...s].map(ch => {
      let p = ch.charCodeAt(0) - 65;
      return String.fromCharCode(65 + mod(a * p + b, 26));
    }).join("");
  } else {
    let inv = modInv(a, 26);
    if (inv === -1) return "(invalid a)";
    return [...s].map(ch => {
      let c = ch.charCodeAt(0) - 65;
      return String.fromCharCode(65 + mod(inv * (c - b), 26));
    }).join("");
  }
}

// --- Columnar Transposition ---
function keyOrder(key) {
  let arr = [...key.toUpperCase()].map((ch,i)=>({ch,i}));
  arr.sort((a,b)=> a.ch===b.ch ? a.i-b.i : a.ch.localeCompare(b.ch));
  let order = new Array(arr.length);
  arr.forEach((obj,rank)=> order[obj.i]=rank);
  return order;
}
function columnarEncrypt(text, key) {
  let s = sanitize(text);
  let cols = key.length, rows = Math.ceil(s.length / cols);
  s = s.padEnd(rows*cols,"X");
  let table = [];
  for (let r=0;r<rows;r++) table.push(s.slice(r*cols,(r+1)*cols));
  let order = keyOrder(key), out="";
  for (let rank=0;rank<cols;rank++){
    let col = order.indexOf(rank);
    for (let r=0;r<rows;r++) out+=table[r][col];
  }
  return out;
}
function columnarDecrypt(text,key) {
  let s = sanitize(text);
  let cols = key.length, rows = Math.ceil(s.length/cols);
  let order = keyOrder(key);
  let table = Array.from({length:rows},()=>Array(cols).fill("X"));
  let p=0;
  for (let rank=0;rank<cols;rank++){
    let col = order.indexOf(rank);
    for (let r=0;r<rows;r++) table[r][col] = s[p++]||"X";
  }
  return table.map(row=>row.join("")).join("");
}

// --- Vigenere ---
function vigenere(text, key, enc = true) {
  let p = sanitize(text), k = sanitize(key);
  if (!k) return "(empty key)";
  return [...p].map((ch,i)=>{
    let pi = ch.charCodeAt(0)-65;
    let ki = k[i%k.length].charCodeAt(0)-65;
    return String.fromCharCode(65 + mod(enc ? pi+ki : pi-ki,26));
  }).join("");
}

// --- Playfair ---
function playfairTable(key) {
  let s="", seen=Array(26).fill(false);
  function add(ch){
    if(ch==="J") ch="I";
    let idx = ch.charCodeAt(0)-65;
    if(!seen[idx]){ seen[idx]=true; s+=ch; }
  }
  for(let ch of sanitize(key)) add(ch);
  for(let i=0;i<26;i++){
    let ch=String.fromCharCode(65+i);
    if(ch==="J") continue; add(ch);
  }
  let table=[], pos={};
  for(let r=0,p=0;r<5;r++){
    table[r]=[];
    for(let c=0;c<5;c++){
      let ch=s[p++]; table[r][c]=ch; pos[ch]={r,c};
    }
  }
  return {table,pos};
}
function playfairPairs(s){
  s=sanitize(s).replace(/J/g,"I");
  let pairs=[];
  for(let i=0;i<s.length;){
    let a=s[i], b=s[i+1]||"X";
    if(a===b){ pairs.push([a,"X"]); i++; }
    else { pairs.push([a,b]); i+=2; }
  }
  return pairs;
}
function playfairEncrypt(text,key){
  let {table,pos}=playfairTable(key);
  let pairs=playfairPairs(text), out="";
  for(let [A,B] of pairs){
    let pa=pos[A], pb=pos[B];
    if(pa.r===pb.r){
      out+=table[pa.r][(pa.c+1)%5]+table[pb.r][(pb.c+1)%5];
    } else if(pa.c===pb.c){
      out+=table[(pa.r+1)%5][pa.c]+table[(pb.r+1)%5][pb.c];
    } else {
      out+=table[pa.r][pb.c]+table[pb.r][pa.c];
    }
  }
  return out;
}
function playfairDecrypt(text,key){
  let {table,pos}=playfairTable(key);
  let s=sanitize(text), out="";
  for(let i=0;i<s.length;i+=2){
    let A=s[i],B=s[i+1]; let pa=pos[A],pb=pos[B];
    if(pa.r===pb.r){
      out+=table[pa.r][mod(pa.c-1,5)]+table[pb.r][mod(pb.c-1,5)];
    } else if(pa.c===pb.c){
      out+=table[mod(pa.r-1,5)][pa.c]+table[mod(pb.r-1,5)][pb.c];
    } else {
      out+=table[pa.r][pb.c]+table[pb.r][pa.c];
    }
  }
  return out;
}

// --- Main handler ---
function runCipher(){
  let type=document.getElementById("cipher").value;
  let mode=document.getElementById("mode").value;
  let text=document.getElementById("inputText").value;
  let result="";
  if(type==="caesar"){
    let k=+prompt("Enter key k (0-25):");
    result= mode==="encrypt"? caesar(text,k,true): caesar(text,k,false);
  } else if(type==="affine"){
    let a=+prompt("Enter a (coprime with 26):");
    let b=+prompt("Enter b (0-25):");
    result= mode==="encrypt"? affine(text,a,b,true): affine(text,a,b,false);
  } else if(type==="columnar"){
    let key=prompt("Enter keyword:");
    result= mode==="encrypt"? columnarEncrypt(text,key): columnarDecrypt(text,key);
  } else if(type==="vigenere"){
    let key=prompt("Enter key:");
    result= mode==="encrypt"? vigenere(text,key,true): vigenere(text,key,false);
  } else if(type==="playfair"){
    let key=prompt("Enter key:");
    result= mode==="encrypt"? playfairEncrypt(text,key): playfairDecrypt(text,key);
  }
  document.getElementById("output").textContent = result;
}
