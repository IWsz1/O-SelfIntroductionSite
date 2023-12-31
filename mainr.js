function namechange (){
  document.getElementById("introduction").textContent = "浅賀宇宙(2001年9月26日)は東京都江東区出身、好きな食べ物１位はお寿司！";
  document.querySelectorAll(".rankinga,.rankingb,.rankingc").forEach(ranking => {
    ranking.classList.add("active");
  });
}
document.getElementById("titlepicture").addEventListener("click", namechange);


// ボタンを取得
const next = document.getElementById("next");
const prev = document.getElementById("prev");
// 写真達を動かすためにul取得
const ul = document.querySelector(".slide ul");
// スライドを一つずつ全て取得
const slides = document.querySelectorAll(".slide li")
// 円ボタンの配列
const sirclebuttons =[];
// ページナンバー
let pagenunber = 0;


// functionで処理を関数化　最初と最後のスライドで横ボタン消し処理
function sidebuttonsoff(){
  // 初めのページでも最後のページでもなかったら横ボタンを表示し直す
  prev.classList.remove("off");
  next.classList.remove("off");
  // ページ数が０で初めのページだったら横ボタンを消す
  if(pagenunber === 0){
    prev.classList.add("off");
  }
  // slides.lengthでスライドの数を数字化　ページ数がスライドの全ページ数とが一緒だったら横ボタンを消す
  if(pagenunber === slides.length - 1){
    next.classList.add("off");
  }
}



// slidesをページ数分横に動かす処理
function slidemove(){
  // slidesの横幅を取得
  const slidewidth = ul.getBoundingClientRect().width;
  // 現在地でなく初めの位置からどこに移動するか　スライドページナンバー分動かす
  ul.style.transform =`transLateX(${-1 * slidewidth * pagenunber}px)`;
}

// 円ボタンの作成＆円ボタンがクリックされたら
function setupsircle(){
  // 円ボタンの数の設定
  for(let i = 0; i < slides.length; i++){
    // HTMLでの円ボタン生成
    const button = document.createElement("button");
    // HTMLからnavを呼び出しその中にbuttonを入れ込む
    document.querySelector(".sirclebutton").appendChild(button);
    // sirclebuttonsの中に円ボタンを入れ込む
    sirclebuttons.push(button);
    // 円ボタンがクリックされたら
    button.addEventListener("click",() => {
      // ページ数をクリックされたボタン番号に
      pagenunber = i;
      // 横ボタン消す必要あるかチェック
      sidebuttonsoff();
      // スライドを動かす
      slidemove();
      // 円ボタンの現在地表記
      sirclebuttoncurrent()
    });
  }
}
// 円ボタンの現在地表記
function sirclebuttoncurrent(){
  // 円ボタンそれぞれに対しcurrentを消去
  sirclebuttons.forEach(sirclebutton => {
    sirclebutton.classList.remove("current")
  })
  // ページナンバーの円ボタンに現在地表記
  sirclebuttons[pagenunber].classList.add("current")
}

// 円ボタンの動作
setupsircle();
// 円ボタンの現在地表記
sirclebuttoncurrent();
// 初めの表示の際の横ボタンの消す必要があるかチェック
sidebuttonsoff();


// nextボタンを押したら
next.addEventListener("click", () =>{
  // ページを次の数字へ
  pagenunber++;
  // 横ボタン消す必要あるかチェック
  sidebuttonsoff();
  // スライドを動かす
  slidemove();
  // 円ボタンの現在地表記
  sirclebuttoncurrent()
});
// prevボタンを押したら
prev.addEventListener("click",() =>{
  // ページを一つ前の数字へ
  pagenunber--;
  // 横ボタン消す必要あるかチェック
  sidebuttonsoff();
  // スライドを動かす
  slidemove();
  // 円ボタンの現在地表記
  sirclebuttoncurrent()
});